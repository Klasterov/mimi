const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Test the actual event handlers and draft hook without a browser or database.
function harness() {
  const slots = [];
  let cursor = 0;
  const react = {
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial;
      return [slots[index], (value) => { slots[index] = typeof value === 'function' ? value(slots[index]) : value; }];
    },
    useRef(value) {
      const index = cursor++;
      return slots[index] ||= { current: value };
    },
    useCallback: (callback) => callback,
    useId: () => 'image-input',
    createElement: (type, props, ...children) => ({ type, props: { ...props, children } }),
  };
  const store = new Map([['adminId', 'first']]);
  const storage = {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => store.set(key, value),
    removeItem: (key) => store.delete(key),
  };
  const cache = new Map();
  function load(relative) {
    const file = path.resolve(__dirname, '../src/admin-app', relative);
    if (cache.has(file)) return cache.get(file);
    const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React, esModuleInterop: true },
    }).outputText;
    const module = { exports: {} };
    const requireModule = (name) => {
      if (name === 'react') return react;
      const target = path.resolve(path.dirname(file), name);
      const resolved = ['.js', '.jsx'].map((extension) => target + extension).find((candidate) => fs.existsSync(candidate));
      return load(path.relative(path.resolve(__dirname, '../src/admin-app'), resolved || target));
    };
    new Function('require', 'module', 'exports', 'window', 'localStorage', source)(requireModule, module, module.exports, {}, storage);
    cache.set(file, module.exports);
    return module.exports;
  }
  return { load, store, storage, render: (component) => { cursor = 0; return component(); } };
}

function find(node, predicate) {
  if (!node || typeof node !== 'object') return null;
  if (predicate(node)) return node;
  return (node.props?.children || []).flat(Infinity).map((child) => find(child, predicate)).find(Boolean) || null;
}

test('dropping a file into an image field uploads it and prevents navigation', async () => {
  const h = harness();
  const { ImageFilesInput } = h.load('components/ImageField.jsx');
  const file = { name: 'photo.jpg', type: 'image/jpeg' };
  let uploaded;
  let prevented = false;
  let stopped = false;
  const tree = h.render(() => ImageFilesInput({ onUpload: async (value) => { uploaded = value; } }));
  tree.props.onDrop({ dataTransfer: { files: [file] }, preventDefault: () => { prevented = true; }, stopPropagation: () => { stopped = true; } });
  await Promise.resolve();
  assert.equal(uploaded, file);
  assert.equal(prevented, true);
  assert.equal(stopped, true);
});

test('file picker resets so the same file can be selected again', async () => {
  const h = harness();
  const { ImageFilesInput } = h.load('components/ImageField.jsx');
  let count = 0;
  const tree = h.render(() => ImageFilesInput({ onUpload: async () => { count++; } }));
  const input = find(tree, (node) => node.type === 'input');
  const target = { files: [{ name: 'photo.png', type: 'image/png' }], value: 'photo.png' };
  input.props.onChange({ target });
  await Promise.resolve();
  assert.equal(target.value, '');
  input.props.onChange({ target });
  await Promise.resolve();
  assert.equal(count, 2);
});

test('multi-file drop forwards the entire selection; disabled fields ignore drops', async () => {
  const h = harness();
  const { ImageFilesInput } = h.load('components/ImageField.jsx');
  const files = Array.from({ length: 40 }, (_, i) => ({ name: `${i}.jpg`, type: 'image/jpeg' }));
  let received;
  const drop = { dataTransfer: { files }, preventDefault() {}, stopPropagation() {} };
  h.render(() => ImageFilesInput({ multiple: true, onUpload: async (value) => { received = value; } })).props.onDrop(drop);
  await Promise.resolve();
  assert.deepEqual(received, files);
  received = null;
  h.render(() => ImageFilesInput({ disabled: true, onUpload: async (value) => { received = value; } })).props.onDrop(drop);
  assert.equal(received, null);
});

test('deleting an image clears its URL; replacement and opening are separate controls', () => {
  const h = harness();
  const { default: ImageField } = h.load('components/ImageField.jsx');
  let value = '/old.jpg';
  const field = ImageField({ value, onChange: (next) => { value = next; }, onUpload() {} });
  const uploadZone = find(field, (node) => node.props?.label === 'Заменить изображение');
  assert.ok(uploadZone);
  find(field, (node) => node.type === 'button').props.onClick();
  assert.equal(value, '');
  assert.equal(find(field, (node) => node.type === 'a').props.target, '_blank');
});

test('URL input previews a pasted link and rejects file drops even inside a gallery', async () => {
  const h = harness();
  const { default: ImageField, ImageFilesInput } = h.load('components/ImageField.jsx');
  let value = '';
  let uploads = 0;
  const field = h.render(() => ImageField({ value, onChange: (next) => { value = next; }, onUpload: async () => { uploads++; } }));
  const urlInput = find(field, (node) => node.type === 'input' && node.props['data-image-url']);
  // A bare JSX data attribute has the value true.
  assert.ok(urlInput);
  urlInput.props.onChange({ target: { value: 'https://example.com/photo.jpg' } });
  const updated = h.render(() => ImageField({ value, onChange() {}, onUpload() {} }));
  assert.equal(find(updated, (node) => node.type === 'img').props.src, value);

  let prevented = 0;
  const drop = {
    target: { closest: () => ({}) },
    dataTransfer: { types: ['Files'], files: [{ name: 'photo.jpg', type: 'image/jpeg' }] },
    preventDefault: () => { prevented++; }, stopPropagation() {},
  };
  urlInput.props.onDrop(drop);
  const gallery = h.render(() => ImageFilesInput({ multiple: true, onUpload: async () => { uploads++; } }));
  gallery.props.onDropCapture(drop);
  await Promise.resolve();
  assert.equal(uploads, 0);
  assert.equal(prevented, 2);
  assert.equal(drop.dataTransfer.dropEffect, 'none');
});

test('draft saves the latest edit synchronously and restores its record and images', () => {
  const h = harness();
  const { useAdminDraft } = h.load('utils/useAdminDraft.js');
  const initial = () => ({ title: '', gallery: [] });
  const draft = h.render(() => useAdminDraft('projects', initial));
  draft.setEditingId(42);
  draft.setShowForm(true);
  draft.setFormData((previous) => ({ ...previous, title: 'Последняя правка', gallery: ['/one.jpg', '/two.jpg'] }));
  const saved = JSON.parse(h.store.get('mimi-admin:first:draft:projects:v1'));
  assert.equal(saved.formData.title, 'Последняя правка');
  const reloaded = harness();
  reloaded.store.set('mimi-admin:first:draft:projects:v1', JSON.stringify(saved));
  const restored = reloaded.render(() => reloaded.load('utils/useAdminDraft.js').useAdminDraft('projects', initial));
  assert.equal(restored.editingId, 42);
  assert.equal(restored.showForm, true);
  assert.equal(restored.restored, true);
  assert.deepEqual(restored.formData.gallery, ['/one.jpg', '/two.jpg']);
  restored.setShowForm(false);
  assert.equal(reloaded.store.has('mimi-admin:first:draft:projects:v1'), false);
});

test('drafts are isolated by admin and entity; unavailable storage is reported', () => {
  const h = harness();
  const { useAdminDraft } = h.load('utils/useAdminDraft.js');
  const draft = h.render(() => useAdminDraft('articles', () => ({ title: '' })));
  draft.setShowForm(true);
  draft.setFormData({ title: 'Article' });
  h.store.set('adminId', 'second');
  const { readAdminStorage } = h.load('utils/adminStorage.js');
  assert.equal(readAdminStorage('draft:articles'), null);
  h.store.set('adminId', 'first');
  assert.equal(readAdminStorage('draft:projects'), null);
  h.storage.setItem = () => { throw new Error('Quota exceeded'); };
  draft.setFormData({ title: 'Still editable' });
  const current = h.render(() => useAdminDraft('articles', () => ({ title: '' })));
  assert.equal(current.formData.title, 'Still editable');
  assert.match(current.draftError, /не сохранён/);
});

test('large gallery batches preserve order and successes, retry outages, and continue after failures', async () => {
  const h = harness();
  const { uploadGallery } = h.load('utils/uploadGallery.js');
  const files = Array.from({ length: 50 }, (_, i) => ({ name: `${i}.jpg` }));
  const photos = [];
  const attempts = new Map();
  let progress;
  const result = await uploadGallery(files, {
    delay: async () => {},
    upload: async (file) => {
      const attempt = (attempts.get(file.name) || 0) + 1;
      attempts.set(file.name, attempt);
      if ((file.name === '1.jpg' && attempt < 3) || file.name === '10.jpg') {
        const err = new Error('Unavailable');
        err.response = { status: 503 };
        throw err;
      }
      return `/${file.name}`;
    },
    onUploaded: (url) => photos.push(url),
    onProgress: (next) => { progress = next; },
  });
  assert.equal(result.uploaded, 49);
  assert.deepEqual(result.failures.map((file) => file.name), ['10.jpg']);
  assert.equal(attempts.get('1.jpg'), 3);
  assert.equal(attempts.get('10.jpg'), 3);
  assert.deepEqual(photos, files.filter((file) => file.name !== '10.jpg').map((file) => `/${file.name}`));
  assert.deepEqual(progress, { completed: 50, total: 50, uploaded: 49 });
});

test('gallery validation errors are not retried', async () => {
  const { uploadGallery } = harness().load('utils/uploadGallery.js');
  let attempts = 0;
  const result = await uploadGallery([{ name: 'invalid.jpg' }], {
    upload: async () => { attempts++; const err = new Error('Invalid image'); err.response = { status: 400 }; throw err; },
    onUploaded: () => assert.fail('Invalid image must not be added'),
  });
  assert.equal(attempts, 1);
  assert.equal(result.failures.length, 1);
});

test('reopening a project preserves deleted images instead of restoring another image URL', () => {
  const { normalizeProject } = harness().load('components/ProjectForm.jsx');
  const project = normalizeProject({ image: '', image_url: '/old.jpg', image_main: '', hero_image: '' });
  assert.equal(project.image, '');
  assert.equal(project.imageMain, '');
  assert.equal(project.heroImage, '');
  const legacy = normalizeProject({ image: '/card.jpg' });
  assert.equal(legacy.imageMain, '/card.jpg');
});

test('small HEIC files are converted before the size shortcut, including empty MIME types', async () => {
  const { prepareImage } = harness().load('utils/prepareImage.js');
  for (const type of ['image/heic', 'image/heif-sequence', '']) {
    const original = new File(['heic'], 'Photo.HEIC', { type });
    const jpeg = new File([Buffer.from('ffd8ff', 'hex')], 'Photo.jpg', { type: 'image/jpeg' });
    let converted;
    const result = await prepareImage(original, { convertHeic: async (file) => { converted = file; return jpeg; } });
    assert.equal(converted, original);
    assert.equal(result, jpeg);
    assert.equal(result.type, 'image/jpeg');
  }
});

test('HEIC conversion failure does not upload unsupported bytes; JPEG requires no decoder', async () => {
  const { prepareImage } = harness().load('utils/prepareImage.js');
  await assert.rejects(prepareImage(new File(['broken'], 'bad.heif'), { convertHeic: async () => { throw new Error('Decode failed'); } }), /HEIC\/HEIF/);
  const jpeg = new File(['jpg'], 'good.jpg', { type: 'image/jpeg' });
  assert.equal(await prepareImage(jpeg, { convertHeic: async () => assert.fail('JPEG should bypass HEIC decoder') }), jpeg);
});

test('legacy HEIC image URLs bypass old browser caches and remain stable on repeated renders', () => {
  const { browserImageUrl } = harness().load('../lib/browser-image-url.js');
  assert.equal(browserImageUrl('https://example.com/photo.HEIC'), 'https://example.com/photo.HEIC?format=jpeg');
  assert.equal(browserImageUrl('/uploads/photo.heif?v=1#photo'), '/uploads/photo.heif?v=1&format=jpeg#photo');
  const src = browserImageUrl('/uploads/photo.heic');
  assert.equal(browserImageUrl(src), src);
  assert.equal(browserImageUrl('/uploads/photo.jpg'), '/uploads/photo.jpg');
});
