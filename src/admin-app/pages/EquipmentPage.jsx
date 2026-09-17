import React, { useEffect, useMemo, useState } from 'react';
import { uploadAPI } from '../api';
import '../components/CRUDForm.css';
import { toggleOrderedVisibility } from '../utils/orderedVisibility';

const DEFAULT_TYPES = [
  { id: 'controller', label: 'Контроллеры' },
  { id: 'panel', label: 'Панели' },
  { id: 'module', label: 'Модули' },
  { id: 'server', label: 'Серверы' },
  { id: 'other', label: 'Другое' },
];

const EMPTY_FORM = {
  cap: '',
  type: '',
  model: '',
  descr: '',
  full_description: '',
  image: '',
  specifications: [],
  steps: [],
  status: true,
  sort_order: '',
};

const isEquipmentVisible = (item) => {
  if (typeof item.status === 'boolean') return item.status;
  if (typeof item.status === 'number') return item.status !== 0;
  if (typeof item.status === 'string') {
    return !['hidden', 'draft', 'archived', 'inactive', 'disabled', 'deleted', 'false', '0']
      .includes(item.status.trim().toLowerCase());
  }
  return true;
};

const getSortOrder = (item) => {
  const value = Number(item.sort_order);
  return Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER;
};

function EquipmentPage() {
  const [equipmentList, setEquipmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('published');
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [uploadingField, setUploadingField] = useState('');

  const token = localStorage.getItem('adminToken') || localStorage.getItem('authToken');

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/equipment?limit=500', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Не удалось загрузить оборудование');

      const data = await response.json();
      setEquipmentList(Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const typeOptions = useMemo(() => {
    const existingTypes = equipmentList
      .map((item) => (typeof item.type === 'string' ? item.type.trim() : ''))
      .filter(Boolean);

    const uniqueTypes = [...new Set(existingTypes)];
    const defaultIds = new Set(DEFAULT_TYPES.map((item) => item.id));
    const dynamicTypes = uniqueTypes
      .filter((type) => !defaultIds.has(type))
      .map((type) => ({ id: type, label: type }));

    return [...DEFAULT_TYPES, ...dynamicTypes];
  }, [equipmentList]);

  const visibleEquipment = useMemo(() => {
    return equipmentList
      .filter((item) => selectedType === 'all' || (item.type || '').trim() === selectedType)
      .filter((item) => visibilityFilter === 'published' ? isEquipmentVisible(item) : !isEquipmentVisible(item))
      .sort((a, b) => getSortOrder(a) - getSortOrder(b));
  }, [equipmentList, selectedType, visibilityFilter]);

  const visibilityCounts = useMemo(() => ({
    published: equipmentList.filter((item) => (
      (selectedType === 'all' || (item.type || '').trim() === selectedType) && isEquipmentVisible(item)
    )).length,
    hidden: equipmentList.filter((item) => (
      (selectedType === 'all' || (item.type || '').trim() === selectedType) && !isEquipmentVisible(item)
    )).length,
  }), [equipmentList, selectedType]);

  const resetForm = (nextType = selectedType) => {
    setFormData({
      ...EMPTY_FORM,
      type: nextType !== 'all' ? nextType : '',
    });
  };

  const handleEdit = (item) => {
    setFormData({
      cap: item.cap || '',
      type: item.type || '',
      model: item.model || '',
      descr: item.descr || '',
      full_description: item.full_description || '',
      image: item.image || '',
      specifications: Array.isArray(item.specifications) ? item.specifications : [],
      steps: Array.isArray(item.steps) ? item.steps : [],
      status: isEquipmentVisible(item),
      sort_order: item.sort_order ?? '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleCreate = () => {
    resetForm();
    setEditingId(null);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        type: formData.type.trim(),
        sort_order: formData.sort_order === '' ? undefined : Number(formData.sort_order),
      };

      const url = `/api/admin/equipment${editingId ? `/${editingId}` : ''}`;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Не удалось ${editingId ? 'обновить' : 'создать'} оборудование`);

      setShowForm(false);
      setEditingId(null);
      fetchEquipment();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleImageUpload = async (field, file) => {
    if (!file) return;

    setUploadingField(field);
    setError(null);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);
      uploadFormData.append('folder', 'equipment');

      const response = await uploadAPI.uploadImage(uploadFormData);
      const imageUrl = response.data?.file?.url || response.data?.url || response.data?.imageUrl || '';

      if (!imageUrl) {
        throw new Error('Сервер не вернул ссылку на изображение');
      }

      setFormData((prev) => ({ ...prev, [field]: imageUrl }));
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || err.message || 'Не удалось загрузить изображение.');
    } finally {
      setUploadingField('');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить запись?')) return;

    try {
      const response = await fetch(`/api/admin/equipment/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Не удалось удалить оборудование');
      await fetchEquipment();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleVisibility = async (item) => {
    try {
      setError(null);
      await toggleOrderedVisibility({
        entity: 'equipment',
        item,
        items: equipmentList,
        update: async (id, payload) => {
          const response = await fetch(`/api/admin/equipment/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          });
          if (!response.ok) throw new Error('Не удалось обновить видимость записи');
        },
      });

      await fetchEquipment();
    } catch (err) {
      setError(err.message);
      await fetchEquipment();
    }
  };

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...(prev.specifications || []), { name: '', unit: '', value: '' }],
    }));
  };

  const updateSpecification = (index, field, value) => {
    const specs = [...(formData.specifications || [])];
    specs[index] = { ...specs[index], [field]: value };
    setFormData({ ...formData, specifications: specs });
  };

  const removeSpecification = (index) => {
    setFormData({
      ...formData,
      specifications: (formData.specifications || []).filter((_, i) => i !== index),
    });
  };

  const addStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [...(prev.steps || []), { title: '', content: '' }],
    }));
  };

  const updateStep = (index, field, value) => {
    const steps = [...(formData.steps || [])];
    steps[index] = { ...steps[index], [field]: value };
    setFormData({ ...formData, steps });
  };

  const removeStep = (index) => {
    setFormData({
      ...formData,
      steps: (formData.steps || []).filter((_, i) => i !== index),
    });
  };

  if (isLoading) return <div className="p-8">Загрузка...</div>;

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <h1>Управление оборудованием</h1>
          <p style={{ marginTop: '8px', color: '#667085' }}>
            Можно вести оборудование по отдельным типам и добавлять записи сразу в выбранную категорию.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          {selectedType === 'all' ? '+ Добавить оборудование' : `+ Добавить в "${selectedType}"`}
        </button>
      </div>

      <div className="crud-filters" style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <button
          type="button"
          className={`btn ${selectedType === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedType('all')}
        >
          Все типы
        </button>
        {typeOptions.map((type) => (
          <button
            key={type.id}
            type="button"
            className={`btn ${selectedType === type.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedType(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="crud-filters" style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <button
          type="button"
          className={`btn ${visibilityFilter === 'published' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setVisibilityFilter('published')}
        >
          Опубликованные ({visibilityCounts.published})
        </button>
        <button
          type="button"
          className={`btn ${visibilityFilter === 'hidden' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setVisibilityFilter('hidden')}
        >
          Скрытые ({visibilityCounts.hidden})
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {showForm && (
        <div className="crud-form-container">
          <div className="crud-form">
            <h2>{editingId ? 'Редактирование оборудования' : 'Добавление оборудования'}</h2>

            <div className="form-group">
              <label>Тип оборудования *</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="Например: controller, panel, module"
              />
            </div>

            <div className="form-group">
              <label>Название (cap) *</label>
              <input
                type="text"
                value={formData.cap}
                onChange={(e) => setFormData({ ...formData, cap: e.target.value })}
                placeholder="Например: CUARM5M"
              />
            </div>

            <div className="form-group">
              <label>Модель</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Краткое описание *</label>
              <textarea
                value={formData.descr}
                onChange={(e) => setFormData({ ...formData, descr: e.target.value })}
                rows="2"
                placeholder="Краткое описание для списка"
              />
            </div>

            <div className="form-group">
              <label>Полное описание</label>
              <textarea
                value={formData.full_description}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                rows="4"
                placeholder="Подробное описание для карточки"
              />
            </div>

            <div className="form-group">
              <label>Изображение</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/images/products/1.png"
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

            {formData.image && (
              <div className="form-group">
                <img src={formData.image} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
              </div>
            )}

            <div className="form-group">
              <label>Порядок вывода</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Видимость на сайте</label>
              <select
                value={formData.status ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
              >
                <option value="true">Показывать</option>
                <option value="false">Скрыть</option>
              </select>
            </div>

            <div className="form-section">
              <h3>Характеристики</h3>
              {(formData.specifications || []).map((spec, idx) => (
                <div key={idx} className="form-array-item">
                  <input
                    type="text"
                    placeholder="Название параметра"
                    value={spec.name}
                    onChange={(e) => updateSpecification(idx, 'name', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Единица измерения"
                    value={spec.unit}
                    onChange={(e) => updateSpecification(idx, 'unit', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Значение"
                    value={spec.value}
                    onChange={(e) => updateSpecification(idx, 'value', e.target.value)}
                  />
                  <button className="btn btn-danger" onClick={() => removeSpecification(idx)}>
                    Удалить
                  </button>
                </div>
              ))}
              <button className="btn btn-secondary" onClick={addSpecification}>
                + Добавить характеристику
              </button>
            </div>

            <div className="form-section">
              <h3>Шаги / процесс</h3>
              {(formData.steps || []).map((step, idx) => (
                <div key={idx} className="form-array-item">
                  <input
                    type="text"
                    placeholder="Заголовок шага"
                    value={step.title}
                    onChange={(e) => updateStep(idx, 'title', e.target.value)}
                  />
                  <textarea
                    placeholder="Описание шага"
                    value={step.content}
                    onChange={(e) => updateStep(idx, 'content', e.target.value)}
                    rows="2"
                  />
                  <button className="btn btn-danger" onClick={() => removeStep(idx)}>
                    Удалить
                  </button>
                </div>
              ))}
              <button className="btn btn-secondary" onClick={addStep}>
                + Добавить шаг
              </button>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSave}>
                Сохранить
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="crud-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Порядок</th>
              <th>Статус</th>
              <th>Тип</th>
              <th>Название</th>
              <th>Модель</th>
              <th>Описание</th>
              <th>Изображение</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {visibleEquipment.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.sort_order ?? '-'}</td>
                <td>{isEquipmentVisible(item) ? 'Опубликовано' : 'Скрыто'}</td>
                <td>{item.type || '-'}</td>
                <td>{item.cap}</td>
                <td>{item.model || '-'}</td>
                <td className="text-truncate" style={{ maxWidth: '200px' }}>
                  {item.descr}
                </td>
                <td>
                  {item.image && <img src={item.image} alt={item.cap} style={{ maxHeight: '50px' }} />}
                </td>
                <td className="actions">
                  <button className="btn btn-sm btn-info" onClick={() => handleEdit(item)}>
                    Изменить
                  </button>
                  <button className="btn btn-sm btn-secondary" onClick={() => handleToggleVisibility(item)}>
                    {isEquipmentVisible(item) ? 'Скрыть' : 'Восстановить'}
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            {visibleEquipment.length === 0 && (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '24px' }}>
                  {visibilityFilter === 'hidden' ? 'Скрытых записей нет' : 'Опубликованных записей нет'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EquipmentPage;
