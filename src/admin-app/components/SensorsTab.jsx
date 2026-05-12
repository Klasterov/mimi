import React from 'react';
import CrudTable from './CrudTable';

function SensorsTab() {
  return (
    <CrudTable
      entity="sensors"
      fields={['name', 'type', 'description', 'image_url', 'status', 'created_at', 'updated_at']}
      title="Управление датчиками"
      icon="D"
    />
  );
}

export default SensorsTab;
