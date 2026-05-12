import React, { useEffect, useState } from 'react';
import api, { uploadAPI } from '../api';
import {
  getEntityLabel,
  getFieldLabel,
  translateArticleCategory,
  translateStatus,
} from '../utils/adminUi';

function CrudTable({ entity, fields, title, icon }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newData, setNewData] = useState({});
  const [uploadingField, setUploadingField] = useState('');

  const normalizedFields = fields.map((field) =>
    typeof field === 'string'
      ? { key: field, label: getFieldLabel(field), type: 'text' }
      : { key: field.key, label: field.label || getFieldLabel(field.key), type: field.type || 'text' }
  );

  const getDisplayFields = () =>
    normalizedFields.filter(
      (field) => !['created_at', 'updated_at', 'published_at', 'createdAt', 'updatedAt'].includes(field.key)
    );

  const isImageField = (field) => field.type === 'image' || ['image', 'image_url'].includes(field.key);
  const isTextAreaField = (field) =>
    field.type === 'textarea' || ['description', 'content', 'descr', 'full_description'].includes(field.key);
  const isJsonField = (field) => field.type === 'json';
  const isBooleanStatusField = (field) => field.type === 'checkbox' || field.key === 'status';
  const isDateField = (field) => field.type === 'date' || field.key.includes('date');
  const isNumberField = (field) => field.type === 'number' || field.key.includes('budget');

  const normalizeValue = (field, value) => {
    if (value === '') {
      if (isBooleanStatusField(field)) return true;
      if (isJsonField(field)) return [];
      return null;
    }

    if (isJsonField(field)) {
      if (typeof value !== 'string') return value;

      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }

    if (isNumberField(field)) {
      return value === null ? null : Number(value);
    }

    if (isBooleanStatusField(field)) {
      if (typeof value === 'boolean') return value;
      return String(value).toLowerCase() === 'true';
    }

    return value;
  };

  const buildPayload = (source = {}) => {
    const payload = {};

    getDisplayFields().forEach((field) => {
      payload[field.key] = normalizeValue(field, source[field.key] ?? '');
    });

    return payload;
  };

  const buildFormState = (source = {}) => {
    const formState = {};

    getDisplayFields().forEach((field) => {
      const value = source[field.key];
      formState[field.key] =
        isJsonField(field) && value !== undefined && value !== null ? JSON.stringify(value, null, 2) : value ?? '';
    });

    return formState;
  };

  const fetchItems = async (page = 1) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get(`/${entity}`, {
        params: { page, limit: 20, search },
      });
      setItems(response.data.data);
      setPagination(response.data.pagination);
      setCurrentPage(page);
    } catch (err) {
      setError(`Не удалось загрузить раздел "${getEntityLabel(entity)}".`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(1);
  }, [search]);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData(buildFormState(item));
  };

  const setFormFieldValue = (mode, field, value) => {
    const normalized = isJsonField(field) ? value : normalizeValue(field, value);

    if (mode === 'edit') {
      setEditData((prev) => ({ ...prev, [field.key]: normalized }));
      return;
    }

    setNewData((prev) => ({ ...prev, [field.key]: normalized }));
  };

  const handleImageUpload = async (mode, field, file) => {
    if (!file) return;

    setUploadingField(`${mode}:${field.key}`);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', entity);

      const response = await uploadAPI.uploadImage(formData);
      setFormFieldValue(mode, field, response.data.file.url);
    } catch (err) {
      setError(err.response?.data?.error || 'Не удалось загрузить изображение.');
      console.error(err);
    } finally {
      setUploadingField('');
    }
  };

  const handleSave = async (id) => {
    try {
      await api.put(`/${entity}/${id}`, buildPayload(editData));
      setEditingId(null);
      fetchItems(currentPage);
      alert(`Запись "${getEntityLabel(entity, 'singular')}" успешно обновлена.`);
    } catch (err) {
      setError(`Не удалось обновить ${getEntityLabel(entity, 'singular')}.`);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Удалить ${getEntityLabel(entity, 'singular')}?`)) {
      try {
        await api.delete(`/${entity}/${id}`);
        fetchItems(currentPage);
        alert(`Запись "${getEntityLabel(entity, 'singular')}" удалена.`);
      } catch (err) {
        setError(`Не удалось удалить ${getEntityLabel(entity, 'singular')}.`);
        console.error(err);
      }
    }
  };

  const handleAdd = async () => {
    try {
      await api.post(`/${entity}`, buildPayload(newData));
      setIsAdding(false);
      setNewData({});
      fetchItems(1);
      alert(`Запись "${getEntityLabel(entity, 'singular')}" создана.`);
    } catch (err) {
      setError(`Не удалось создать ${getEntityLabel(entity, 'singular')}.`);
      console.error(err);
    }
  };

  const renderImagePreview = (value, alt) => {
    if (!value) return null;

    return (
      <div className="image-preview-wrap">
        <img src={value} alt={alt} className="image-preview" />
        <a href={value} target="_blank" rel="noreferrer" className="image-link">
          Открыть изображение
        </a>
      </div>
    );
  };

  const renderFormField = (mode, field, value) => {
    const uploadKey = `${mode}:${field.key}`;
    const displayValue = value ?? '';
    const label = field.label.toLowerCase();

    if (isImageField(field)) {
      return (
        <>
          <input
            type="text"
            value={displayValue}
            onChange={(e) => setFormFieldValue(mode, field, e.target.value)}
            placeholder="Вставьте URL изображения или загрузите файл"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(mode, field, e.target.files?.[0])}
          />
          {uploadingField === uploadKey && (
            <span className="field-help">Загрузка изображения...</span>
          )}
          {renderImagePreview(displayValue, `${entity} preview`)}
        </>
      );
    }

    if (isJsonField(field)) {
      return (
        <textarea
          value={displayValue}
          onChange={(e) => setFormFieldValue(mode, field, e.target.value)}
          placeholder={`Введите JSON для ${label}`}
          rows={8}
        />
      );
    }

    if (isTextAreaField(field)) {
      return (
        <textarea
          value={displayValue}
          onChange={(e) => setFormFieldValue(mode, field, e.target.value)}
          placeholder={`Введите ${label}`}
          rows={4}
        />
      );
    }

    if (isBooleanStatusField(field)) {
      return (
        <select
          value={String(value ?? true)}
          onChange={(e) => setFormFieldValue(mode, field, e.target.value)}
        >
          <option value="true">Активно</option>
          <option value="false">Скрыто</option>
        </select>
      );
    }

    return (
      <input
        type={isDateField(field) ? 'date' : isNumberField(field) ? 'number' : 'text'}
        value={displayValue}
        onChange={(e) => setFormFieldValue(mode, field, e.target.value)}
        placeholder={`Введите ${label}`}
      />
    );
  };

  const renderCellValue = (field, value) => {
    if (isImageField(field)) {
      return value ? (
        <a href={value} target="_blank" rel="noreferrer" className="table-image-link">
          Открыть
        </a>
      ) : (
        '-'
      );
    }

    if (value === null || value === undefined || value === '') {
      return '-';
    }

    if (field.key === 'status') {
      return translateStatus(value);
    }

    if (field.key === 'category') {
      return translateArticleCategory(value);
    }

    if (isJsonField(field)) {
      if (Array.isArray(value)) {
        return `${value.length} items`;
      }

      return String(value).substring(0, 50);
    }

    return String(value).substring(0, 50);
  };

  return (
    <div className="crud-table">
      <div className="crud-header">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">Справочник</span>
            <h2>
              {icon} {title}
            </h2>
          </div>
        </div>
        <button
          className="btn-add"
          onClick={() => {
            setIsAdding(!isAdding);
            setNewData({});
          }}
        >
          {isAdding ? 'Скрыть форму' : '+ Добавить'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="crud-filters">
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />
      </div>

      {isAdding && (
        <div className="add-form">
          <h3>Новая запись: {getEntityLabel(entity, 'singular')}</h3>
          <div className="form-grid">
            {getDisplayFields().map((field) => (
              <div key={field.key} className="form-group">
                <label>{field.label}</label>
                {renderFormField('create', field, newData[field.key])}
              </div>
            ))}
          </div>
          <div className="form-actions">
            <button className="btn-save" onClick={handleAdd}>
              Создать
            </button>
            <button className="btn-cancel" onClick={() => setIsAdding(false)}>
              Отмена
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">Загрузка раздела "{getEntityLabel(entity)}"...</div>
      ) : items.length === 0 ? (
        <div className="no-data">Записей в разделе "{getEntityLabel(entity)}" пока нет.</div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  {getDisplayFields().map((field) => (
                    <th key={field.key}>{field.label}</th>
                  ))}
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className={editingId === item.id ? 'editing' : ''}>
                    <td>{item.id}</td>
                    {getDisplayFields().map((field) => (
                      <td key={field.key}>
                        {editingId === item.id ? (
                          <div className="cell-edit-wrap">
                            {renderFormField('edit', field, editData[field.key])}
                          </div>
                        ) : (
                          <span>{renderCellValue(field, item[field.key])}</span>
                        )}
                      </td>
                    ))}
                    <td className="actions-cell">
                      {editingId === item.id ? (
                        <>
                          <button className="btn-save" onClick={() => handleSave(item.id)}>
                            Сохранить
                          </button>
                          <button className="btn-cancel" onClick={() => setEditingId(null)}>
                            Отмена
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="btn-edit" onClick={() => handleEdit(item)}>
                            Изменить
                          </button>
                          <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                            Удалить
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-controls">
            <button
              onClick={() => fetchItems(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="btn-pagination"
            >
              Назад
            </button>

            {Array.from({ length: pagination.pages || 0 }, (_, i) => i + 1)
              .slice(Math.max(0, currentPage - 2), Math.min(pagination.pages || 0, currentPage + 2))
              .map((page) => (
                <button
                  key={page}
                  onClick={() => fetchItems(page)}
                  className={`btn-pagination ${page === currentPage ? 'active' : ''}`}
                  disabled={loading}
                >
                  {page}
                </button>
              ))}

            <button
              onClick={() => fetchItems(currentPage + 1)}
              disabled={currentPage === pagination.pages || loading}
              className="btn-pagination"
            >
              Дальше
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CrudTable;
