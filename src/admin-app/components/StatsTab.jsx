import React, { useEffect, useState } from 'react';
import { statsAPI } from '../api';

function StatsTab() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await statsAPI.getStats(fromDate, toDate);
      setStats(response.data);
    } catch (err) {
      setError('Не удалось загрузить статистику.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleFilter = () => {
    fetchStats();
  };

  return (
    <div className="stats-tab">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Аналитика</span>
          <h2>Статистика заявок</h2>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="stats-filters">
        <div className="filter-group">
          <label>От даты:</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div className="filter-group">
          <label>До даты:</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <button onClick={handleFilter} className="btn-filter" disabled={loading}>
          {loading ? 'Загрузка...' : 'Применить фильтр'}
        </button>
      </div>

      {loading ? (
        <div className="loading">Загружаем статистику...</div>
      ) : stats ? (
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Всего лидов</div>
          </div>

          <div className="stats-section">
            <h3>По типам форм</h3>
            <div className="chart-table">
              {stats.byFormType.length === 0 ? (
                <p className="no-data">Данных пока нет</p>
              ) : (
                <table>
                  <tbody>
                    {stats.byFormType.map((item) => (
                      <tr key={item.form_type}>
                        <td className="label">{item.form_type || 'Не указано'}</td>
                        <td className="value">{item.count}</td>
                        <td className="barcontainer">
                          <div
                            className="bar"
                            style={{
                              width: `${stats.total > 0 ? (item.count / stats.total) * 100 : 0}%`,
                            }}
                          ></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="stats-section">
            <h3>По согласию</h3>
            <div className="consent-stats">
              {stats.byConsent.length === 0 ? (
                <p className="no-data">Данных пока нет</p>
              ) : (
                stats.byConsent.map((item) => (
                  <div key={String(item.consent)} className="consent-stat">
                    <div className={`badge ${item.consent ? 'consent-yes' : 'consent-no'}`}>
                      {item.consent ? 'Согласие получено' : 'Без согласия'}
                    </div>
                    <div className="consent-count">{item.count}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="stats-section full-width">
            <h3>Динамика по дням за последние 30 дней</h3>
            <div className="daily-chart">
              {stats.daily.length === 0 ? (
                <p className="no-data">Данных пока нет</p>
              ) : (
                <table className="daily-table">
                  <thead>
                    <tr>
                      <th>Дата</th>
                      <th>Количество</th>
                      <th>График</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.daily.map((item) => {
                      const maxCount = Math.max(...stats.daily.map((d) => d.count));
                      return (
                        <tr key={item.date}>
                          <td>{item.date}</td>
                          <td className="text-right">{item.count}</td>
                          <td className="chart-cell">
                            <div
                              className="bar-chart"
                              style={{
                                width: `${maxCount > 0 ? (item.count / maxCount) * 100 : 0}%`,
                              }}
                            ></div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default StatsTab;
