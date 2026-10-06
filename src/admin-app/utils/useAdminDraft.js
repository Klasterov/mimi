import { useCallback, useRef, useState } from 'react';
import { readAdminStorage, writeAdminStorage } from './adminStorage';

export function useAdminDraft(entity, createFormData) {
  const name = `draft:${entity}`;
  const [state, setState] = useState(() => {
    const saved = readAdminStorage(name);
    const valid = saved?.showForm === true && saved.formData && typeof saved.formData === 'object' && !Array.isArray(saved.formData);
    return {
      formData: valid ? { ...createFormData(), ...saved.formData } : createFormData(),
      editingId: valid ? saved.editingId ?? null : null,
      showForm: Boolean(valid),
      restored: Boolean(valid),
      draftError: '',
    };
  });
  const current = useRef(state);

  const update = useCallback((field, value) => {
    const previous = current.current;
    const next = { ...previous, [field]: typeof value === 'function' ? value(previous[field]) : value };
    if (!next.showForm) next.restored = false;
    // Persist in the input event, so an immediate reload keeps the latest edit.
    try {
      writeAdminStorage(name, next.showForm ? {
        formData: next.formData,
        editingId: next.editingId,
        showForm: true,
      } : null);
      next.draftError = '';
    } catch {
      next.draftError = 'Черновик не сохранён: хранилище браузера недоступно или заполнено. Сохраните изменения кнопкой в форме.';
    }
    current.current = next;
    setState(next);
  }, [name]);

  return {
    ...state,
    setFormData: useCallback((value) => update('formData', value), [update]),
    setEditingId: useCallback((value) => update('editingId', value), [update]),
    setShowForm: useCallback((value) => update('showForm', value), [update]),
  };
}
