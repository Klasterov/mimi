const { readFile } = require('fs/promises');
const path = require('path');

const API_BASE_URL =
	process.env.API_BASE_URL?.trim().replace(/\/+$/, '') ||
	'https://mimi-back-73qq.onrender.com';

const ADMIN_USERNAME = process.env.ADMIN_DEFAULT_USERNAME?.trim() || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD?.trim() || 'admin12345';
const API_AUTH_HEADER_NAME = process.env.API_AUTH_HEADER_NAME?.trim() || 'Authorization';
const API_AUTH_SCHEME = process.env.API_AUTH_SCHEME?.trim() || 'Bearer';
const STATIC_AUTH_TOKEN = process.env.API_AUTH_TOKEN?.trim() || '';
const ARTICLES_FILE = path.join(process.cwd(), 'storage', 'admin', 'articles.json');

async function loadArticles() {
	try {
		const fileContents = await readFile(ARTICLES_FILE, 'utf8');
		const parsed = JSON.parse(fileContents);

		if (!Array.isArray(parsed)) {
			return [];
		}

		return parsed;
	} catch (error) {
		if (error && typeof error === 'object' && 'code' in error && error.code !== 'ENOENT') {
			const message = error instanceof Error ? error.message : String(error);
			console.error('Failed to read articles file:', message);
		}

		return [];
	}
}

async function fetchAdminToken() {
	if (STATIC_AUTH_TOKEN) {
		return STATIC_AUTH_TOKEN;
	}

	const response = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: ADMIN_USERNAME,
			password: ADMIN_PASSWORD,
		}),
	});

	const data = await response.json().catch(() => null);

	if (!response.ok) {
		const message = data?.error || `Login failed with status ${response.status}`;
		throw new Error(message);
	}

	const token = data?.token;

	if (typeof token !== 'string' || !token.trim()) {
		throw new Error('Login response did not include an API token.');
	}

	return token.trim();
}

async function syncArticles() {
	console.log('Starting article sync...');

	const articles = await loadArticles();

	if (articles.length === 0) {
		console.log('No articles to sync.');
		return;
	}

	try {
		const token = await fetchAdminToken();
		let successCount = 0;
		let failureCount = 0;

		console.log(`Adding ${articles.length} article(s)...`);
		for (const article of articles) {
			try {
				const response = await fetch(`${API_BASE_URL}/api/admin/articles`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						[API_AUTH_HEADER_NAME]: `${API_AUTH_SCHEME} ${token}`,
					},
					body: JSON.stringify(article),
				});

				const data = await response.json().catch(() => null);

				if (response.ok) {
					successCount += 1;
					console.log(`[OK] Added: ${article.title || article.slug || 'article'}`);
				} else {
					failureCount += 1;
					console.error(`[ERR] Failed to add "${article.title || article.slug || 'article'}":`, data);
				}
			} catch (err) {
				failureCount += 1;
				const message = err instanceof Error ? err.message : String(err);
				console.error(`[ERR] Error adding "${article.title || article.slug || 'article'}":`, message);
			}
		}

		console.log(`Sync completed. Added ${successCount} of ${articles.length} articles.`);

		if (failureCount > 0) {
			process.exitCode = 1;
			console.error(`Sync finished with ${failureCount} failed article(s).`);
		}
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error('Sync failed:', message);
		process.exitCode = 1;
	}
}

syncArticles();
