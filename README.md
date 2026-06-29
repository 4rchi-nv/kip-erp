# KIP Engineering ERP

Корпоративная ERP-система для [KIP Engineering](https://kip.tm) — инженерно-автоматизационной компании из Туркменистана. Построена на **Next.js 16** (App Router) с премиальным MUI UI.

## Стек

- **Next.js 16** + React 19 + TypeScript
- **MUI 9** + MUI X Data Grid (Community)
- **Effector** — session, sidebar
- **TanStack Query** — готовность к API
- **react-hook-form** + **zod** — формы
- **FSD** — `app` / `views` / `widgets` / `features` / `entities` / `shared`

## Требования

- Node.js 20+
- npm 10+

## Запуск

```bash
# Установка зависимостей
npm install

# Dev-сервер (http://localhost:3000)
npm run dev

# Production-сборка
npm run build

# Запуск production-сборки
npm run start

# Линт (Biome)
npm run lint

# Форматирование
npm run format
```

## Переменные окружения

Скопируйте `.env.example` в `.env.local` и при необходимости измените значения:

```bash
cp .env.example .env.local
```

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_API_MODE` | Режим данных: `mock` (по умолчанию) или `api` |
| `NEXT_PUBLIC_API_URL` | Base URL backend API (используется в режиме `api`) |

### Режимы API

**Mock mode** (`NEXT_PUBLIC_API_MODE=mock`) — данные берутся из `src/shared/mock`. Backend не нужен; удобно для разработки UI и демо.

**API mode** (`NEXT_PUBLIC_API_MODE=api`) — запросы идут на реальный backend по `NEXT_PUBLIC_API_URL` через `apiClient` и `withDataSource`.

Переключение: измените `NEXT_PUBLIC_API_MODE` в `.env.local` и перезапустите dev-сервер (`npm run dev`). В коде используйте `isMockMode()` и `apiMode` из `shared/config` — не обращайтесь к `process.env` напрямую.

## Маршруты

| Путь | Описание |
|------|----------|
| `/` | Редирект на `/dashboard` |
| `/auth` | Вход (mock: `*@kip.tm` + пароль `password`) |
| `/dashboard` | Панель управления |
| `/projects` | Проекты |
| `/finance` | Финансы |
| `/warehouse` | Склад |
| `/hr` | Сотрудники |
| `/certificates` | Сертификаты |
| `/reports` | Отчёты |
| `/service` | Сервис |
| `/equipment` | Оборудование |
| `/users` | Пользователи (RBAC) |

## Структура

```
src/
  app/          # Next.js App Router (тонкие page.tsx)
  views/        # Композиция страниц (FSD)
  widgets/      # Крупные UI-блоки (таблицы, навигация)
  features/     # Бизнес-фичи (формы, хуки)
  entities/     # Доменные сущности (api, model, ui)
  shared/       # UI-kit, theme, api, config, mock, types
  shared/mock/  # In-memory mock database (единственный источник mock data)
```

## Демо-вход

| Роль | Email | Пароль |
|------|-------|--------|
| Admin | `admin@kip.tm` | `password` |
| Director | `director@kip.tm` | `password` |
| Accountant | `accountant@kip.tm` | `password` |
| HR Manager | `hr@kip.tm` | `password` |
| Warehouse | `warehouse@kip.tm` | `password` |
| Engineer | `engineer@kip.tm` | `password` |

На странице `/auth` доступны кнопки быстрого входа (Admin, Director, Accountant).

## Migration summary

Проект мигрирован с **Rsbuild + React Router + Mantine** на **Next.js App Router + MUI**.

| Было | Стало |
|------|-------|
| Rsbuild | `next dev` / `next build` |
| React Router | Next.js App Router (`src/app`) |
| Mantine + mantine-react-table | MUI 9 + MUI X Data Grid (Community) |
| `import.meta.env` | `shared/config` (zod) |
| `src/pages` (FSD) | `src/views` (избежание конфликта с Pages Router) |
| Хардкод user | Effector session + RBAC (`useCan` / `<Can>`) |
| Прямые mock в UI | `entities/*/api` + `withDataSource` (mock/api) |

Удалено: Mantine, React Router runtime, Rsbuild `dist/`, legacy HOC-провайдеры, `compose-function`.
