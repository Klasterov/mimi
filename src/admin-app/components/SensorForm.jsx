import React, { useEffect, useState } from 'react';
import api from '../api';

const createInitialFormData = () => ({
  slug: '',
  name: '',
  type: '',
  subtitle: '',
  description: '',
  icon: '',
  image: '',
  bg: 'bg-white',
  linkHover: '',
  isWide: false,
  status: true,
  sensorExample: {
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

function SensorForm() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState(createInitialFormData);

  useEffect(() => {
    fetchSensors();
  }, []);

  const fetchSensors = async () => {
    setLoading(true);
    try {
      const response = await api.get('/sensors');
      setSensors(response.data.data || []);
    } catch (err) {
      setError('Не удалось загрузить датчики.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (sensor) => {
    setFormData({
      slug: sensor.slug || '',
      name: sensor.name || '',
      type: sensor.type || '',
      subtitle: sensor.subtitle || '',
      description: sensor.description || '',
      icon: sensor.icon || '',
      image: sensor.image || '',
      bg: sensor.bg || 'bg-white',
      linkHover: sensor.link_hover || '',
      isWide: sensor.is_wide || false,
      status: sensor.status !== undefined ? sensor.status : true,
      sensorExample: sensor.sensor_example || {},
      hero: sensor.hero || {},
      info: sensor.info || { sections: [] },
    });
    setEditingId(sensor.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить этот датчик?')) return;
    setError('');
    setSuccess('');
    try {
      await api.delete(`/sensors/${id}`);
      setSuccess('Датчик успешно удалён.');
      fetchSensors();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.error || err.message || 'Не удалось удалить датчик.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = {
        slug: formData.slug,
        name: formData.name,
        type: formData.type,
        subtitle: formData.subtitle,
        description: formData.description,
        icon: formData.icon,
        image: formData.image,
        bg: formData.bg,
        link_hover: formData.linkHover,
        is_wide: formData.isWide,
        status: formData.status,
        sensor_example: formData.sensorExample,
        hero: formData.hero,
        info: formData.info,
      };

      if (editingId) {
        await api.put(`/sensors/${editingId}`, payload);
        setSuccess('Датчик успешно обновлён.');
      } else {
        await api.post('/sensors', payload);
        setSuccess('Датчик успешно создан.');
      }

      setShowForm(false);
      setEditingId(null);
      setFormData(createInitialFormData());
      fetchSensors();
    } catch (err) {
      console.error('Save error:', err);
      setError(err.response?.data?.error || err.message || 'Не удалось сохранить датчик.');
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

  if (loading) return <div className="sensor-form-container">Загрузка...</div>;

  return (
    <div className="sensor-form-container">
      <div className="sensor-header">
        <h2>Управление датчиками</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingId(null);
            setFormData(createInitialFormData());
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Отмена' : '+ Добавить датчик'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <form className="sensor-form" onSubmit={handleSubmit}>
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
                  placeholder="smoke_detector"
                />
              </div>
              <div>
                <label>Название *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Датчик дыма"
                />
              </div>
              <div>
                <label>Тип *</label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                  placeholder="дым, температура, влажность"
                />
              </div>
              <div>
                <label>Подзаголовок</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Короткое описание"
                />
              </div>
              <div className="full-width">
                <label>Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Подробное описание..."
                />
              </div>
              <div>
                <label>URL иконки</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="/images/icons/smoke.svg"
                />
              </div>
              <div>
                <label>URL изображения</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/sensors/smoke.png"
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
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                  />
                  Активен
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Пример датчика</h3>
            <div className="form-grid">
              <div>
                <label>Заголовок</label>
                <input
                  type="text"
                  value={formData.sensorExample?.title || ''}
                  onChange={(e) => updateNestedField('sensorExample.title', e.target.value)}
                  placeholder="GS2"
                />
              </div>
              <div>
                <label>Текст</label>
                <textarea
                  value={formData.sensorExample?.text || ''}
                  onChange={(e) => updateNestedField('sensorExample.text', e.target.value)}
                  rows={3}
                  placeholder="Описание..."
                />
              </div>
              <div>
                <label>Изображение</label>
                <input
                  type="text"
                  value={formData.sensorExample?.image || ''}
                  onChange={(e) => updateNestedField('sensorExample.image', e.target.value)}
                  placeholder="/images/example.png"
                />
              </div>
              <div>
                <label>Ширина изображения</label>
                <input
                  type="number"
                  value={formData.sensorExample?.imageWidth || 400}
                  onChange={(e) =>
                    updateNestedField('sensorExample.imageWidth', parseInt(e.target.value, 10))
                  }
                />
              </div>
              <div>
                <label>Высота изображения</label>
                <input
                  type="number"
                  value={formData.sensorExample?.imageHeight || 400}
                  onChange={(e) =>
                    updateNestedField('sensorExample.imageHeight', parseInt(e.target.value, 10))
                  }
                />
              </div>
              <div>
                <label>Тема</label>
                <select
                  value={formData.sensorExample?.theme || 'light'}
                  onChange={(e) => updateNestedField('sensorExample.theme', e.target.value)}
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
                  placeholder="Заголовок датчика"
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
                  placeholder="/images/hero.png"
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
                  placeholder="max-md:self-start"
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
                  placeholder="max-lg:max-w-100"
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
              {editingId ? 'Сохранить датчик' : 'Создать датчик'}
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

      <div className="sensors-list">
        <h3>Все датчики ({sensors.length})</h3>
        {sensors.length === 0 ? (
          <p>Датчиков пока нет</p>
        ) : (
          <div className="sensors-table">
            {sensors.map((sensor) => (
              <div key={sensor.id} className="sensor-card">
                <div className="sensor-card-header">
                  <h4>{sensor.name}</h4>
                  <span className="sensor-type">{sensor.type}</span>
                </div>
                <p className="sensor-subtitle">{sensor.subtitle || sensor.description}</p>
                <div className="sensor-meta">
                  <span className={`status ${sensor.status ? 'active' : 'inactive'}`}>
                    {sensor.status ? 'Активен' : 'Скрыт'}
                  </span>
                </div>
                <div className="sensor-actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(sensor)}>
                    Изменить
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(sensor.id)}>
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

export default SensorForm;
