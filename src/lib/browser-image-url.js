// Older HEIC uploads need a fresh URL to bypass cached, unsupported originals.
export function browserImageUrl(src = '') {
  if (!/\.hei[cf](?=[?#]|$)/i.test(src)) return src;
  if (/[?&]format=jpeg(?:&|#|$)/i.test(src)) return src;
  const [url, fragment] = src.split('#', 2);
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}format=jpeg${fragment === undefined ? '' : `#${fragment}`}`;
}
