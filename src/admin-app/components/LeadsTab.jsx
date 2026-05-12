import React, { useEffect, useState } from 'react';
import { leadsAPI } from '../api';

function LeadsTab() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchLeads = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const response = await leadsAPI.getLeads(page, 20, search, status);
      setLeads(response.data.leads);
      setPagination(response.data.pagination);
      setCurrentPage(page);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Не удалось загрузить лиды';
      setError(`Ошибка: ${errorMsg}`);
      console.error('Leads API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(1);
  }, [search, status]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (lead) => {
    setEditingId(lead.id);
    setEditData({ ...lead });
  };

  const handleSave = async (id) => {
    try {
      await leadsAPI.updateLead(id, editData);
      setEditingId(null);
      fetchLeads(currentPage);
      alert('Лид успешно обновлён.');
    } catch (err) {
      setError('Не удалось обновить лид.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить этот лид?')) {
      try {
        await leadsAPI.deleteLead(id);
        fetchLeads(currentPage);
        alert('Лид успешно удалён.');
      } catch (err) {
        setError('Не удалось удалить лид.');
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="leads-tab">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Лиды</span>
          <h2>Список заявок</h2>
        </div>
        <div className="section-chip">{pagination.total ?? leads.length} всего</div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="leads-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Поиск по имени или телефону..."
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select value={status} onChange={handleStatusFilter} className="status-select">
            <option value="">Все статусы</option>
            <option value="true">Согласие получено</option>
            <option value="false">Без согласия</option>
          </select>
        </div>

        <div className="pagination-info">
          Страница {pagination.page || 1} из {pagination.pages || 1} ({pagination.total || 0}{' '}
          всего)
        </div>
      </div>

      {loading ? (
        <div className="loading">Загружаем лиды...</div>
      ) : leads.length === 0 ? (
        <div className="no-data">Лиды пока не найдены.</div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Имя</th>
                  <th>Телефон</th>
                  <th>Комментарий</th>
                  <th>Согласие</th>
                  <th>URL страницы</th>
                  <th>Тип формы</th>
                  <th>Дата</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className={editingId === lead.id ? 'editing' : ''}>
                    <td>{lead.id}</td>
                    <td>
                      {editingId === lead.id ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        />
                      ) : (
                        lead.name
                      )}
                    </td>
                    <td>
                      {editingId === lead.id ? (
                        <input
                          type="text"
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        />
                      ) : (
                        lead.phone
                      )}
                    </td>
                    <td>
                      {editingId === lead.id ? (
                        <input
                          type="text"
                          value={editData.comment || ''}
                          onChange={(e) => setEditData({ ...editData, comment: e.target.value })}
                          className="comment-input"
                        />
                      ) : (
                        <span className="comment-text">{lead.comment || '-'}</span>
                      )}
                    </td>
                    <td>
                      {editingId === lead.id ? (
                        <select
                          value={editData.consent ? 'true' : 'false'}
                          onChange={(e) =>
                            setEditData({ ...editData, consent: e.target.value === 'true' })
                          }
                        >
                          <option value="true">Да</option>
                          <option value="false">Нет</option>
                        </select>
                      ) : (
                        <span className={lead.consent ? 'consent-yes' : 'consent-no'}>
                          {lead.consent ? 'Да' : 'Нет'}
                        </span>
                      )}
                    </td>
                    <td className="url-cell">
                      {editingId === lead.id ? (
                        <input
                          type="text"
                          value={editData.page_url}
                          onChange={(e) => setEditData({ ...editData, page_url: e.target.value })}
                          className="url-input"
                        />
                      ) : (
                        <a href={lead.page_url} target="_blank" rel="noopener noreferrer">
                          {lead.page_url.substring(0, 30)}...
                        </a>
                      )}
                    </td>
                    <td>
                      {editingId === lead.id ? (
                        <input
                          type="text"
                          value={editData.form_type || ''}
                          onChange={(e) =>
                            setEditData({ ...editData, form_type: e.target.value })
                          }
                        />
                      ) : (
                        lead.form_type || '-'
                      )}
                    </td>
                    <td>{new Date(lead.submitted_at).toLocaleDateString('ru-RU')}</td>
                    <td className="actions-cell">
                      {editingId === lead.id ? (
                        <>
                          <button className="btn-save" onClick={() => handleSave(lead.id)}>
                            Сохранить
                          </button>
                          <button className="btn-cancel" onClick={handleCancel}>
                            Отмена
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="btn-edit" onClick={() => handleEdit(lead)}>
                            Изменить
                          </button>
                          <button className="btn-delete" onClick={() => handleDelete(lead.id)}>
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
              onClick={() => fetchLeads(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="btn-pagination"
            >
              Назад
            </button>

            {Array.from({ length: pagination.pages }, (_, i) => i + 1)
              .slice(Math.max(0, currentPage - 2), Math.min(pagination.pages, currentPage + 2))
              .map((page) => (
                <button
                  key={page}
                  onClick={() => fetchLeads(page)}
                  className={`btn-pagination ${page === currentPage ? 'active' : ''}`}
                  disabled={loading}
                >
                  {page}
                </button>
              ))}

            <button
              onClick={() => fetchLeads(currentPage + 1)}
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

export default LeadsTab;
