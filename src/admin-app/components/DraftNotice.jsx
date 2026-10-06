import React from 'react';

export default function DraftNotice({ restored, error }) {
  return error ? <p className="error-message" role="alert">{error}</p> : (
    <p className="field-help" role="status">
      {restored ? 'Черновик восстановлен. ' : ''}
      Изменения автоматически сохраняются в этом браузере. После сохранения или отмены черновик удаляется.
    </p>
  );
}
