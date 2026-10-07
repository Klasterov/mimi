const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_DIMENSION = 1920;
const RASTER_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const HEIC_TYPES = new Set(['image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence']);

export function isHeicImage(file) {
  return HEIC_TYPES.has(file.type.toLowerCase()) || /\.(heic|heif)$/i.test(file.name);
}

async function convertHeicFile(file) {
  const { heicTo } = await import('heic-to/csp');
  const blob = await heicTo({ blob: file, type: 'image/jpeg', quality: 0.9 });
  return new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.jpg`, { type: 'image/jpeg' });
}

// Large originals stay on the user's computer; upload a copy sized for the site.
export async function prepareImage(file, { convertHeic = convertHeicFile } = {}) {
  // HEIC must be converted even when the original is below the size limit.
  if (isHeicImage(file)) {
    try {
      file = await convertHeic(file);
    } catch {
      throw new Error('Не удалось преобразовать HEIC/HEIF. Попробуйте другое фото или сохраните его в JPG.');
    }
  }
  if (file.size <= MAX_IMAGE_BYTES) return file;
  if (!RASTER_TYPES.has(file.type)) {
    throw new Error('Для большого изображения выберите JPG, PNG, WEBP или AVIF. GIF и другие форматы должны быть меньше 2 МБ.');
  }

  const objectUrl = URL.createObjectURL(file);
  const image = new Image();
  try {
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = () => reject(new Error('Не удалось прочитать изображение. Попробуйте сохранить его в JPG или PNG.'));
      image.src = objectUrl;
    });
    const scale = Math.min(1, MAX_DIMENSION / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Браузер не поддерживает подготовку изображения.');

    for (let attempt = 0; attempt < 4; attempt += 1) {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.9 - attempt * 0.1));
      if (!blob) throw new Error('Не удалось уменьшить изображение.');
      if (blob.size <= MAX_IMAGE_BYTES) {
        const extension = blob.type === 'image/webp' ? 'webp' : 'png';
        return new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.${extension}`, { type: blob.type });
      }
      canvas.width = Math.max(1, Math.round(canvas.width * 0.75));
      canvas.height = Math.max(1, Math.round(canvas.height * 0.75));
    }
    throw new Error('Не удалось уменьшить изображение до 2 МБ. Выберите другое фото.');
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
