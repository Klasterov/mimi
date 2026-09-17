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
        { key: 'image_url', label: 'Изображение', type: 'image' },
        { key: 'sort_order', label: 'Порядок вывода', type: 'number' },
        {
          key: 'status',
          label: 'Статус публикации',
          type: 'select',
          options: [
            { value: 'published', label: 'Опубликовано' },
            { value: 'draft', label: 'Скрыто' },
            { value: 'archived', label: 'Архив' },
          ],
        },
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
