const RETRY_STATUSES = new Set([408, 429, 500, 502, 503, 504]);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Upload sequentially to limit memory use and pressure on image storage.
export async function uploadGallery(files, { upload, onUploaded, onProgress, delay = wait }) {
  const failures = [];
  let uploaded = 0;
  onProgress?.({ completed: 0, total: files.length, uploaded });
  for (const [index, file] of files.entries()) {
    try {
      let result;
      for (let attempt = 0; ; attempt += 1) {
        try {
          result = await upload(file);
          break;
        } catch (err) {
          const retryable = RETRY_STATUSES.has(err.response?.status) || err instanceof TypeError;
          if (!retryable || attempt >= 2) throw err;
          await delay(500 * (attempt + 1));
        }
      }
      onUploaded(result, file);
      uploaded += 1;
    } catch (err) {
      failures.push({ name: file.name, message: err.message || 'Ошибка загрузки' });
    }
    onProgress?.({ completed: index + 1, total: files.length, uploaded });
  }
  return { uploaded, failures };
}
