import React from 'react';
import CrudTable from './CrudTable';

function ArticlesTab() {
  return (
    <CrudTable
      entity="articles"
      fields={[
        'title',
        'content',
        'author',
        'category',
        'image_url',
        'status',
        'published_at',
        'created_at',
        'updated_at',
      ]}
      title="Управление статьями"
      icon="S"
    />
  );
}

export default ArticlesTab;
