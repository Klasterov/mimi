import React from 'react';
import CrudTable from './CrudTable';

function DetectorsTab() {
  return (
    <CrudTable
      entity="detectors"
      fields={['slug', 'title', 'subtitle', 'icon', 'image', 'bg', 'is_wide', 'created_at', 'updated_at']}
      title="Управление детекторами"
      icon="DT"
    />
  );
}

export default DetectorsTab;
