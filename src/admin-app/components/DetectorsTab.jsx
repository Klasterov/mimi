import React, { useEffect, useState } from 'react';
import CrudTable from './CrudTable';

function DetectorsTab() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <CrudTable
      entity="detectors"
      fields={['slug', 'title', 'subtitle', 'icon', 'image', 'bg', 'is_wide', 'created_at', 'updated_at']}
      title="Управление детекторами"
      icon={isLoading ? '...' : 'DT'}
    />
  );
}

export default DetectorsTab;
