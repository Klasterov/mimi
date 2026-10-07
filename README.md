# MiMiSmart frontend

Next.js 16 + React + TypeScript. Backend Express/PostgreSQL расположен в ../mimi-back.

Установка: `npm ci`. Настройте API_BASE_URL по [.env.example](.env.example). Локально: `npm run dev`. Production: `npm run build`, затем `npm start`.

Обязательные проверки: `npm run lint`, `npm run typecheck`, `npm test`, `npm run e2e`, `npm run build`. Дополнительно `npm run analyze` измеряет FCP, `npm run format` запускает Prettier. Инструкция установки Chromium и изолированного тестового стенда — в документации.

- [Развёртывание, HTTPS и секреты](docs/DEPLOYMENT.md)
- [Отчёт проверки производительности и безопасности](docs/PERFORMANCE_SECURITY_AUDIT.md)
