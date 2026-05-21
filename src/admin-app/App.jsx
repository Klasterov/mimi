"use client";

import React, { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('authToken');

      if (token) {
        setIsLoggedIn(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/admin/session', { credentials: 'include' });
        const data = await response.json();
        
        if (data?.authenticated && data?.admin) {
          localStorage.setItem('adminUsername', data.admin.username);
          localStorage.setItem('adminId', data.admin.id);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error('Ошибка при проверке сессии:', err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }
    
    checkSession();
  }, []);

  if (loading) {
    return <div className="loading">Загружаем панель управления...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminUsername');

    fetch('/api/admin/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).finally(() => {
      setIsLoggedIn(false);
    });
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return isLoggedIn ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <LoginPage onLoginSuccess={handleLoginSuccess} />
  );
}

export default App;
