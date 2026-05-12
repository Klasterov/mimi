import React, { useState } from 'react';
import { authAPI } from '../api';

function AdminsTab() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await authAPI.register(username, password);
      const createdUsername = response.data?.admin?.username || username;

      setSuccess(`Администратор "${createdUsername}" успешно создан.`);
      setUsername('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Не удалось создать администратора.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admins-tab">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Администраторы</span>
          <h2>Создание нового доступа</h2>
        </div>
        <div className="section-chip">Новая учетная запись</div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="admins-layout">
        <div className="admins-card admins-card-info">
          <h3>Что здесь можно сделать</h3>
          <p>
            Эта вкладка нужна только для добавления новых администраторов уже после входа в
            панель. Экран логина остается без регистрации.
          </p>

          <div className="admins-notes">
            <div className="admins-note">
              <strong>1. Создайте логин</strong>
              <span>Используйте понятное имя для нового администратора.</span>
            </div>
            <div className="admins-note">
              <strong>2. Задайте пароль</strong>
              <span>Минимум 6 символов, лучше сразу надежный пароль.</span>
            </div>
            <div className="admins-note">
              <strong>3. Передайте доступ</strong>
              <span>После создания новый админ сможет входить через /admin.</span>
            </div>
          </div>
        </div>

        <div className="admins-card admins-card-form">
          <h3>Новый администратор</h3>
          <p className="admins-description">
            Заполните поля и нажмите кнопку создания. Пользователь появится в системе сразу.
          </p>

          <form className="admins-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="admin-username">Логин</label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Введите логин"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="admin-password">Пароль</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Введите пароль"
                disabled={loading}
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading || !username || !password}
            >
              {loading ? 'Создаем...' : 'Создать администратора'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminsTab;
