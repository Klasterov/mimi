import React, { useEffect, useState } from 'react';
import {
  createDetector,
  deleteDetector,
  updateDetector,
} from '../api/detectors';
import api, { uploadAPI } from '../api';
import { loadAllItems, matchesDetector } from '../utils/contentFilters';
import { isVisibleByEntity, toggleOrderedVisibility } from '../utils/orderedVisibility';

const createInitialFormData = () => ({
  slug: '',
  title: '',
  subtitle: '',
  icon: '',
  image: '',
  bg: '',
  linkHover: '',
  isWide: false,
  status: true,
  sort_order: 0,
  detectorExample: {
    title: '',
    text: '',
    image: '',
    imageWidth: 400,
    imageHeight: 400,
    theme: 'light',
    ruler: null,
  },
  hero: {
    title: '',
    text: '',
    image: '',
    imageWidth: 500,
    imageHeight: 400,
    contentWrapperClasses: '',
    imageWrapperClasses: '',
    sectionClasses: '',
  },
  info: {
    sections: [
      {
        title: '',
        list: [],
        text: [],
      },
    ],
    theme: 'light',
  },
});

function DetectorForm() {
  const [detectors, setDetectors] = useState([]);
  const [search, setSearch] = useState('');
  const filteredDetectors = detectors.filter((detector) => matchesDetector(detector, search));
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingField, setUploadingField] = useState('');
  const [formData, setFormData] = useState(createInitialFormData);

  useEffect(() => {
    fetchDetectors();
  }, []);

  const fetchDetectors = async () => {
    setLoading(true);
    try {
      const data = await loadAllItems(api, 'detectors');
      setDetectors(data);
    } catch (err) {
      setError('Не удалось загрузить детекторы.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (detector) => {
    setFormData({
      ...createInitialFormData(),
      ...detector,
      linkHover: detector.linkHover ?? detector.link_hover ?? '',
      isWide: detector.isWide ?? detector.is_wide ?? false,
      status: detector.status ?? true,
      sort_order: detector.sort_order ?? 0,
      detectorExample: {
        ...createInitialFormData().detectorExample,
        ...(detector.detectorExample ?? detector.detector_example ?? {}),
      },
      hero: {
        ...createInitialFormData().hero,
        ...(detector.hero || {}),
      },
      info: {
        ...createInitialFormData().info,
        ...(detector.info || {}),
        sections: detector.info?.sections?.length
          ? detector.info.sections
          : createInitialFormData().info.sections,
      },
    });
    setEditingId(detector.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить этот детектор?')) return;
    setError('');
    setSuccess('');
    try {
      await deleteDetector(id);
      setSuccess('Детектор успешно удалён.');
      fetchDetectors();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.error || err.message || 'Не удалось удалить детектор.');
    }
  };

  const handleToggleVisibility = async (detector) => {
    try {
      await toggleOrderedVisibility({
        entity: 'detectors',
        item: detector,
        items: detectors,
        update: updateDetector,
      });
      await fetchDetectors();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Не удалось изменить видимость детектора.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editingId) {
        await updateDetector(editingId, formData);
        setSuccess('Детектор успешно обновлён.');
      } else {
        await createDetector(formData);
        setSuccess('Детектор успешно создан.');
      }
      setShowForm(false);
      setEditingId(null);
      setFormData(createInitialFormData());
      fetchDetectors();
    } catch (err) {
      console.error('Save error:', err);
      setError(err.response?.data?.error || err.message || 'Не удалось сохранить детектор.');
    }
  };

  const updateNestedField = (path, value) => {
    setFormData((prev) => {
      const keys = path.split('.');
      const obj = { ...prev };
      let current = obj;

      for (let i = 0; i < keys.length - 1; i += 1) {
        const key = keys[i];
        if (Array.isArray(current[key])) {
          current[key] = current[key].map((item) =>
            typeof item === 'object' ? { ...item } : item
          );
        } else if (typeof current[key] === 'object' && current[key] !== null) {
          current[key] = { ...current[key] };
        }
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;
      return obj;
    });
  };

  const handleImageUpload = async (path, file) => {
    if (!file) return;

    setUploadingField(path);
    setError('');
    setSuccess('');

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);
      uploadFormData.append('folder', 'detectors');

      const response = await uploadAPI.uploadImage(uploadFormData);
      const imageUrl = response.data.file.url;

      if (path.includes('.')) {
        updateNestedField(path, imageUrl);
      } else {
        setFormData((prev) => ({ ...prev, [path]: imageUrl }));
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || err.message || 'Не удалось загрузить изображение.');
    } finally {
      setUploadingField('');
    }
  };

  const addSection = () => {
    updateNestedField('info.sections', [...formData.info.sections, { title: '', list: [], text: [] }]);
  };

  const removeSection = (index) => {
    updateNestedField(
      'info.sections',
      formData.info.sections.filter((_, i) => i !== index)
    );
  };

  const updateSection = (index, field, value) => {
    const sections = [...formData.info.sections];
    sections[index][field] = value;
    updateNestedField('info.sections', sections);
  };

  if (loading) return <div className="detector-form-container">Загрузка...</div>;

  return (
    <div className="detector-form-container">
      <div className="detector-header">
        <h2>Управление детекторами</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingId(null);
            setFormData(createInitialFormData());
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Отмена' : '+ Добавить детектор'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <form className="detector-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Основная информация</h3>
            <div className="form-grid">
              <div>
                <label>Слаг *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  placeholder="smoke, wet, temperature"
                />
              </div>
              <div>
                <label>Заголовок *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Датчик дыма"
                />
              </div>
              <div>
                <label>Подзаголовок</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Тревога вовремя"
                />
              </div>
              <div>
                <label>URL иконки</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="/images/detector-page/icons/1.svg"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('icon', e.target.files?.[0])}
                />
                {uploadingField === 'icon' && (
                  <span className="field-help">Загрузка изображения...</span>
                )}
              </div>
              <div>
                <label>URL изображения</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/detector-page/cols/1.png"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('image', e.target.files?.[0])}
                />
                {uploadingField === 'image' && (
                  <span className="field-help">Загрузка изображения...</span>
                )}
              </div>
              <div>
                <label>CSS-класс фона</label>
                <input
                  type="text"
                  value={formData.bg}
                  onChange={(e) => setFormData({ ...formData, bg: e.target.value })}
                  placeholder="bg-white"
                />
              </div>
              <div>
                <label>CSS-класс hover-ссылки</label>
                <input
                  type="text"
                  value={formData.linkHover}
                  onChange={(e) => setFormData({ ...formData, linkHover: e.target.value })}
                  placeholder="hover:text-foreground"
                />
              </div>
              <div>
                <label>Порядок вывода</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData({ ...formData, sort_order: Number(e.target.value) })
                  }
                  placeholder="0"
                />
              </div>
              <div>
                <label>Статус публикации</label>
                <select
                  value={String(formData.status ?? true)}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value === 'true' })
                  }
                >
                  <option value="true">Опубликовано</option>
                  <option value="false">Скрыто</option>
                </select>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isWide}
                    onChange={(e) => setFormData({ ...formData, isWide: e.target.checked })}
                  />
                  Широкий блок
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Пример детектора</h3>
            <div className="form-grid">
              <div>
                <label>Заголовок</label>
                <input
                  type="text"
                  value={formData.detectorExample?.title || ''}
                  onChange={(e) => updateNestedField('detectorExample.title', e.target.value)}
                  placeholder="GS2"
                />
              </div>
              <div>
                <label>Текст</label>
                <textarea
                  value={formData.detectorExample?.text || ''}
                  onChange={(e) => updateNestedField('detectorExample.text', e.target.value)}
                  rows={3}
                  placeholder="Описание..."
                />
              </div>
              <div>
                <label>Изображение</label>
                <input
                  type="text"
                  value={formData.detectorExample?.image || ''}
                  onChange={(e) => updateNestedField('detectorExample.image', e.target.value)}
                  placeholder="/images/detector-page/example/1.png"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload('detectorExample.image', e.target.files?.[0])
                  }
                />
                {uploadingField === 'detectorExample.image' && (
                  <span className="field-help">Загрузка изображения...</span>
                )}
              </div>
              <div>
                <label>Ширина изображения</label>
                <input
                  type="number"
                  value={formData.detectorExample?.imageWidth || 400}
                  onChange={(e) =>
                    updateNestedField('detectorExample.imageWidth', parseInt(e.target.value, 10))
                  }
                />
              </div>
              <div>
                <label>Высота изображения</label>
                <input
                  type="number"
                  value={formData.detectorExample?.imageHeight || 400}
                  onChange={(e) =>
                    updateNestedField('detectorExample.imageHeight', parseInt(e.target.value, 10))
                  }
                />
              </div>
              <div>
                <label>Тема</label>
                <select
                  value={formData.detectorExample?.theme || 'light'}
                  onChange={(e) => updateNestedField('detectorExample.theme', e.target.value)}
                >
                  <option value="light">Светлая</option>
                  <option value="dark">Тёмная</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Hero-блок</h3>
            <div className="form-grid">
              <div>
                <label>Заголовок</label>
                <input
                  type="text"
                  value={formData.hero?.title || ''}
                  onChange={(e) => updateNestedField('hero.title', e.target.value)}
                  placeholder="Датчик дыма"
                />
              </div>
              <div>
                <label>Текст</label>
                <textarea
                  value={formData.hero?.text || ''}
                  onChange={(e) => updateNestedField('hero.text', e.target.value)}
                  rows={3}
                  placeholder="Описание hero-блока..."
                />
              </div>
              <div>
                <label>Изображение</label>
                <input
                  type="text"
                  value={formData.hero?.image || ''}
                  onChange={(e) => updateNestedField('hero.image', e.target.value)}
                  placeholder="/images/detector-page/hero/01.png"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('hero.image', e.target.files?.[0])}
                />
                {uploadingField === 'hero.image' && (
                  <span className="field-help">Загрузка изображения...</span>
                )}
              </div>
              <div>
                <label>Ширина изображения</label>
                <input
                  type="number"
                  value={formData.hero?.imageWidth || 500}
                  onChange={(e) =>
                    updateNestedField('hero.imageWidth', parseInt(e.target.value, 10))
                  }
                />
              </div>
              <div>
                <label>Высота изображения</label>
                <input
                  type="number"
                  value={formData.hero?.imageHeight || 400}
                  onChange={(e) =>
                    updateNestedField('hero.imageHeight', parseInt(e.target.value, 10))
                  }
                />
              </div>
              <div>
                <label>CSS-классы контентного контейнера</label>
                <input
                  type="text"
                  value={formData.hero?.contentWrapperClasses || ''}
                  onChange={(e) =>
                    updateNestedField('hero.contentWrapperClasses', e.target.value)
                  }
                  placeholder="max-md:self-start max-w-127.5"
                />
              </div>
              <div>
                <label>CSS-классы контейнера изображения</label>
                <input
                  type="text"
                  value={formData.hero?.imageWrapperClasses || ''}
                  onChange={(e) =>
                    updateNestedField('hero.imageWrapperClasses', e.target.value)
                  }
                  placeholder="max-md:-mr-10"
                />
              </div>
              <div>
                <label>CSS-классы секции</label>
                <input
                  type="text"
                  value={formData.hero?.sectionClasses || ''}
                  onChange={(e) => updateNestedField('hero.sectionClasses', e.target.value)}
                  placeholder="py-30 md:relative"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Информационные секции</h3>
            {formData.info?.sections?.map((section, idx) => (
              <div key={idx} className="subsection">
                <div className="subsection-header">
                  <h4>Секция {idx + 1}</h4>
                  {formData.info.sections.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-small"
                      onClick={() => removeSection(idx)}
                    >
                      Удалить
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="full-width">
                    <label>Заголовок секции</label>
                    <input
                      type="text"
                      value={section.title || ''}
                      onChange={(e) => updateSection(idx, 'title', e.target.value)}
                      placeholder="Заголовок секции..."
                    />
                  </div>
                  <div className="full-width">
                    <label>Пункты списка, по одному на строку</label>
                    <textarea
                      value={(section.list || []).join('\n')}
                      onChange={(e) =>
                        updateSection(
                          idx,
                          'list',
                          e.target.value.split('\n').filter((item) => item.trim())
                        )
                      }
                      rows={4}
                      placeholder="Пункт 1&#10;Пункт 2&#10;Пункт 3"
                    />
                  </div>
                  <div className="full-width">
                    <label>Текстовые строки, по одной на строку</label>
                    <textarea
                      value={(section.text || []).join('\n')}
                      onChange={(e) =>
                        updateSection(
                          idx,
                          'text',
                          e.target.value.split('\n').filter((item) => item.trim())
                        )
                      }
                      rows={4}
                      placeholder="Текст 1&#10;Текст 2&#10;Текст 3"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addSection}>
              + Добавить секцию
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Сохранить детектор' : 'Создать детектор'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Отмена
            </button>
          </div>
        </form>
      )}

      <div className="detectors-list">
        <h3>Детекторы ({filteredDetectors.length} из {detectors.length})</h3>
        <div className="crud-filters">
          <input type="search" className="search-input" aria-label="Поиск детекторов"
            placeholder="Поиск по названию, описанию или slug" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="button" className="btn btn-secondary" disabled={!search} onClick={() => setSearch('')}>Сбросить поиск</button>
        </div>
        {filteredDetectors.length === 0 ? (
          <p>{search.trim() ? 'Детекторов не найдено' : 'Детекторов пока нет'}</p>
        ) : (
          <div className="detectors-table">
            {filteredDetectors.map((detector) => (
              <div key={detector.id} className="detector-card">
                <div className="detector-card-header">
                  <h4>{detector.title}</h4>
                  <span className="detector-slug">{detector.slug}</span>
                </div>
                <p className="detector-subtitle">{detector.subtitle}</p>
                <div className="project-meta">
                  <span>{detector.status === false ? 'Скрыто' : 'Опубликовано'}</span>
                  <span>Порядок: {detector.sort_order ?? 0}</span>
                </div>
                <div className="detector-actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(detector)}>
                    Изменить
                  </button>
                  <button className="btn btn-secondary" onClick={() => handleToggleVisibility(detector)}>
                    {isVisibleByEntity('detectors', detector) ? 'Скрыть' : 'Восстановить'}
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(detector.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetectorForm;
