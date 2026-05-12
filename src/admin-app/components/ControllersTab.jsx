import React from 'react';
import CrudTable from './CrudTable';

function ControllersTab() {
  return (
    <CrudTable
      entity="equipment"
      fields={[
        { key: 'cap', label: 'Название', type: 'text' },
        { key: 'model', label: 'Модель', type: 'text' },
        { key: 'descr', label: 'Описание', type: 'textarea' },
        { key: 'full_description', label: 'Полное описание', type: 'textarea' },
        { key: 'image', label: 'Изображение', type: 'text' },
        { key: 'specifications', label: 'Характеристики', type: 'json' },
        { key: 'steps', label: 'Шаги', type: 'json' },
        { key: 'status', label: 'Статус', type: 'checkbox' },
      ]}
      title="Управление оборудованием (контроллеры)"
      icon="⚙"
    />
  );
}

export default ControllersTab;
