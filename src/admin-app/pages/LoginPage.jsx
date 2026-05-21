import React, { useState } from 'react';
import { authAPI } from '../api';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(username, password);

      if (response.data?.token) {
        localStorage.setItem('adminToken', response.data.token);
      }

      if (response.data?.adminId) {
        localStorage.setItem('adminId', String(response.data.adminId));
      }

      if (response.data?.admin) {
        localStorage.setItem('adminUsername', response.data.admin.username);
        localStorage.setItem('adminId', response.data.admin.id);
      } else {
        localStorage.setItem('adminUsername', username);
      }

      onLoginSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Не удалось войти. Проверьте логин и пароль.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-glow login-glow-one"></div>
      <div className="login-glow login-glow-two"></div>

      <div className="login-layout">
        <section className="login-showcase">
          <span className="login-badge">Mimismart Control Center</span>
          <h1>Админ-панель Mimismart</h1>
          <p className="login-lead">
            Управляйте лидами, проектами, статьями и каталогом устройств в одном рабочем
            пространстве.
          </p>

          <div className="showcase-grid">
            <div className="showcase-card">
              <strong>Лиды и обращения</strong>
              <span>Просмотр, фильтрация, экспорт и контроль всех входящих заявок.</span>
            </div>
            <div className="showcase-card">
              <strong>Контент и каталог</strong>
              <span>Редактирование проектов, статей, датчиков, контроллеров и детекторов.</span>
            </div>
            <div className="showcase-card">
              <strong>Аналитика</strong>
              <span>Статистика по формам, согласию и ежедневной динамике заявок.</span>
            </div>
          </div>
        </section>

        <div className="login-container">
          <div className="login-card">
            <h2>Вход в систему</h2>
            <p className="login-card-copy">
              Введите данные администратора, чтобы открыть панель управления. Создание новых
              администраторов доступно внутри самой панели.
            </p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Логин</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Введите логин"
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                {loading ? 'Подождите...' : 'Войти'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
