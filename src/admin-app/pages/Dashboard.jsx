import React, { useState } from 'react';
import LeadsTab from '../components/LeadsTab';
import StatsTab from '../components/StatsTab';
import ExportTab from '../components/ExportTab';
import SensorForm from '../components/SensorForm';
import EquipmentPage from './EquipmentPage';
import ProjectsTab from '../components/ProjectsTab';
import ArticleForm from '../components/ArticleForm';
import DetectorForm from '../components/DetectorForm';
import AdminsTab from '../components/AdminsTab';

const TABS = [
  { id: 'leads', label: 'Лиды', hint: 'Заявки и обращения' },
  { id: 'sensors', label: 'Датчики', hint: 'Каталог устройств' },
  { id: 'controllers', label: 'Контроллеры', hint: 'Управление моделями' },
  { id: 'projects', label: 'Проекты', hint: 'Портфолио и кейсы' },
  { id: 'articles', label: 'Статьи', hint: 'Контент и публикации' },
  { id: 'detectors', label: 'Детекторы', hint: 'Карточки и секции' },
  { id: 'admins', label: 'Администраторы', hint: 'Создание доступа' },
  { id: 'stats', label: 'Статистика', hint: 'Сводка по лидам' },
  { id: 'export', label: 'Экспорт', hint: 'Выгрузка данных' },
];

function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('leads');
  const currentTab = TABS.find((tab) => tab.id === activeTab);

  return (
    <div className="dashboard">
      <div className="dashboard-aura dashboard-aura-one"></div>
      <div className="dashboard-aura dashboard-aura-two"></div>

      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-copy">
            <span className="dashboard-badge">Панель управления</span>
            <h1>Mimismart</h1>
            <p>Лиды, каталог, контент и аналитика в одном интерфейсе.</p>
          </div>
          <div className="header-actions">
            <div className="status-pill">Сессия активна</div>
            <button className="logout-button" onClick={onLogout}>
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <nav className="tabs-nav">
          <div className="tabs-nav-title">
            <span>Разделы</span>
            <strong>{currentTab?.label}</strong>
          </div>

          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="tab-copy">
                <strong>{tab.label}</strong>
                <small>{tab.hint}</small>
              </span>
            </button>
          ))}
        </nav>

        <div className="tabs-content">
          {activeTab === 'leads' && <LeadsTab />}
          {activeTab === 'sensors' && <SensorForm />}
          {activeTab === 'controllers' && <EquipmentPage />}
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'articles' && <ArticleForm />}
          {activeTab === 'detectors' && <DetectorForm />}
          {activeTab === 'admins' && <AdminsTab />}
          {activeTab === 'stats' && <StatsTab />}
          {activeTab === 'export' && <ExportTab />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
