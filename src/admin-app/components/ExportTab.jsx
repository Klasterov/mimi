import React, { useState } from 'react';
import { exportAPI } from '../api';

function ExportTab() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleExport = async (format) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const blob =
        format === 'csv'
          ? await exportAPI.exportCSV(fromDate, toDate)
          : await exportAPI.exportJSON(fromDate, toDate);

      const url = window.URL.createObjectURL(blob.data || blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `leads.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSuccess(`Данные успешно выгружены в формате ${format.toUpperCase()}.`);
    } catch (err) {
      setError('Не удалось выгрузить данные.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="export-tab">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Экспорт</span>
          <h2>Выгрузка данных</h2>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="export-card">
        <h3>Период выгрузки</h3>
        <p className="export-description">
          Оставьте даты пустыми, чтобы выгрузить все данные, или выберите нужный диапазон.
        </p>

        <div className="export-filters">
          <div className="filter-group">
            <label htmlFor="from-date">От даты:</label>
            <input
              type="date"
              id="from-date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="to-date">До даты:</label>
            <input
              type="date"
              id="to-date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="export-buttons">
          <button
            className="btn-export csv"
            onClick={() => handleExport('csv')}
            disabled={loading}
          >
            {loading ? 'Выгружаем...' : 'Экспорт в CSV'}
          </button>
          <button
            className="btn-export json"
            onClick={() => handleExport('json')}
            disabled={loading}
          >
            {loading ? 'Выгружаем...' : 'Экспорт в JSON'}
          </button>
        </div>

        <div className="export-info">
          <h4>Что попадёт в выгрузку:</h4>
          <ul>
            <li>
              <strong>CSV:</strong> удобно открывать в Excel, Google Sheets и других табличных
              редакторах.
            </li>
            <li>
              <strong>JSON:</strong> подходит для интеграций, архивирования и работы с данными в
              коде.
            </li>
            <li>
              В каждой выгрузке есть ID, имя, телефон, комментарий, статус согласия, URL
              страницы, тип формы и дата отправки.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ExportTab;
