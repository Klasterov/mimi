import React, { useEffect, useState } from 'react';
import {
  createDetector,
  deleteDetector,
  getDetectors,
  updateDetector,
} from '../api/detectors';

const createInitialFormData = () => ({
  slug: '',
  title: '',
  subtitle: '',
  icon: '',
  image: '',
  bg: '',
  linkHover: '',
  isWide: false,
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
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState(createInitialFormData);

  useEffect(() => {
    fetchDetectors();
  }, []);

  const fetchDetectors = async () => {
    setLoading(true);
    try {
      const data = await getDetectors();
      setDetectors(data);
    } catch (err) {
      setError('Не удалось загрузить детекторы.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (detector) => {
    setFormData(detector);
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
              </div>
              <div>
                <label>URL изображения</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/detector-page/cols/1.png"
                />
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
        <h3>Все детекторы ({detectors.length})</h3>
        {detectors.length === 0 ? (
          <p>Детекторов пока нет</p>
        ) : (
          <div className="detectors-table">
            {detectors.map((detector) => (
              <div key={detector.id} className="detector-card">
                <div className="detector-card-header">
                  <h4>{detector.title}</h4>
                  <span className="detector-slug">{detector.slug}</span>
                </div>
                <p className="detector-subtitle">{detector.subtitle}</p>
                <div className="detector-actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(detector)}>
                    Изменить
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
