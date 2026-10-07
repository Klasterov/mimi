import React, { useId, useRef, useState } from 'react';
import { browserImageUrl } from '../../lib/browser-image-url';

function isImageFile(file) {
  return file.type.startsWith('image/') || /\.(jpe?g|png|webp|gif|svg|avif|heic|heif)$/i.test(file.name);
}

function preventFileDrop(event) {
  if (!Array.from(event.dataTransfer.types || []).includes('Files') && !event.dataTransfer.files.length) return;
  event.preventDefault();
  event.stopPropagation();
  event.dataTransfer.dropEffect = 'none';
}

export function ImageFilesInput({ onUpload, multiple = false, disabled = false, busy = false, label = 'Загрузить изображение', className = '', heading, hint, controlsFirst = false, children }) {
  const inputId = useId();
  const inputRef = useRef(null);
  const locked = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  const upload = async (files) => {
    if (disabled || locked.current || !files.length) return;
    setError('');
    if (files.some((file) => !isImageFile(file))) {
      setError('Выберите файлы изображений.');
      return;
    }
    if (!multiple && files.length > 1) {
      setError('Для этого поля выберите одно изображение.');
      return;
    }
    locked.current = true;
    try {
      await onUpload(multiple ? files : files[0]);
    } catch (err) {
      setError(err.message || 'Не удалось загрузить изображение.');
    } finally {
      locked.current = false;
    }
  };

  const handleDragOver = (event) => {
    if (!Array.from(event.dataTransfer.types).includes('Files')) return;
    if (event.target?.closest?.('[data-image-url]')) {
      preventFileDrop(event);
      setDragging(false);
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = disabled ? 'none' : 'copy';
    if (!disabled) setDragging(true);
  };

  const handleDrop = (event) => {
    if (!event.dataTransfer.files.length) return;
    if (event.target?.closest?.('[data-image-url]')) {
      preventFileDrop(event);
      setDragging(false);
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    void upload(Array.from(event.dataTransfer.files));
  };

  return (
    <div
      className={`admin-image-field ${className} ${dragging ? 'is-dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragOverCapture={multiple ? handleDragOver : undefined}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false);
      }}
      onDrop={handleDrop}
      onDropCapture={multiple ? handleDrop : undefined}
    >
      {heading && <h3>{heading}</h3>}
      {!controlsFirst && children}
      <input ref={inputRef} id={inputId} className="admin-image-file-input" type="file" accept="image/*,.heic,.heif" multiple={multiple} disabled={disabled}
        onChange={(event) => {
          const files = Array.from(event.target.files || []);
          event.target.value = '';
          void upload(files);
        }} />
      <button type="button" className="btn btn-secondary" disabled={disabled} onClick={() => inputRef.current?.click()}>{label}</button>
      <p className="field-help admin-image-drop-hint">{hint || (multiple ? 'Перетащите фотографии в эту область или выберите несколько файлов.' : 'Перетащите изображение в эту область или нажмите кнопку загрузки.')}</p>
      {busy && <p className="field-help" role="status">Загрузка изображения...</p>}
      {error && <p className="error-message" role="alert">{error}</p>}
      {controlsFirst && children}
    </div>
  );
}

export default function ImageField({ value = '', onChange, onUpload, disabled = false, busy = false, placeholder = 'URL изображения', label = 'Изображение' }) {
  const urlId = useId();
  return (
    <div className="admin-image-control">
      <label htmlFor={urlId}>Ссылка на изображение</label>
      <input id={urlId} data-image-url type="text" aria-label={label} value={value} disabled={disabled}
        onDragOver={preventFileDrop} onDrop={preventFileDrop}
        onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      <p className="field-help">Вставьте URL — изображение появится автоматически.</p>
      <ImageFilesInput onUpload={onUpload} disabled={disabled} busy={busy} label={value ? 'Заменить изображение' : 'Загрузить изображение'}>
        {value && (
          <div className="admin-image-preview-wrap">
            <img src={browserImageUrl(value)} alt={label} className="admin-image-preview" draggable={false} />
            <div className="admin-image-actions">
              <button type="button" className="btn btn-danger btn-small" disabled={disabled} onClick={() => onChange('')}>Удалить изображение</button>
              <a href={browserImageUrl(value)} target="_blank" rel="noopener noreferrer">Открыть изображение</a>
            </div>
          </div>
        )}
      </ImageFilesInput>
    </div>
  );
}
