export function adminStorageKey(name) {
  const owner = localStorage.getItem('adminId') || localStorage.getItem('adminUsername') || 'session';
  return `mimi-admin:${owner}:${name}:v1`;
}

export function readAdminStorage(name) {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(localStorage.getItem(adminStorageKey(name)) || 'null');
  } catch {
    return null;
  }
}

export function writeAdminStorage(name, value) {
  const key = adminStorageKey(name);
  if (value === null) localStorage.removeItem(key);
  else localStorage.setItem(key, JSON.stringify(value));
}
