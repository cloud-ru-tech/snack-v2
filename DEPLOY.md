# Деплой на GitLab Pages

Проект автоматически деплоится на GitLab Pages при пуше в ветки `main`, `master` или `develop`.

## Структура деплоя

- **Документация (Astro)** — доступна на корневом пути `/`
- **Storybook** — доступен по пути `/storybook/`

## Как это работает

1. **Сборка** — CI/CD пайплайн собирает оба проекта параллельно:
   - Документация собирается в `apps/docs/dist/`
   - Storybook собирается в `storybook-static/`

2. **Деплой** — на этапе `pages`:
   - Содержимое `apps/docs/dist/` копируется в `public/` (корень сайта)
   - Содержимое `storybook-static/` копируется в `public/storybook/`

3. **Результат**:
   - `https://your-group.gitlab.io/your-project/` — документация
   - `https://your-group.gitlab.io/your-project/storybook/` — Storybook

## Настройка GitLab Pages

1. Убедитесь, что в настройках проекта включен GitLab Pages
2. Пайплайн автоматически задеплоит сайт после успешной сборки
3. URL будет доступен в Settings → Pages

## Локальная проверка

Для проверки локально можно собрать и посмотреть структуру:

```bash
# Собрать все
pnpm run build:all

# Проверить структуру
ls -la apps/docs/dist/      # Документация
ls -la storybook-static/    # Storybook
```

## Переменные окружения

- `CI` — автоматически устанавливается GitLab CI
- `CI_PAGES_URL` — URL GitLab Pages (используется Astro для генерации sitemap)
- `PUBLIC_SITE_URL` — можно задать вручную для кастомного домена
- `BASE_PATH` — базовый путь для деплоя на подпути (например, `/snack-v2/` для `https://example.com/snack-v2/`)

### Деплой на подпути домена

Если приложение разворачивается не в корне домена, а на подпути (например, `https://frontend.cp.sbercloud.tech/snack-v2/`), нужно установить переменную `BASE_PATH`:

```bash
# В CI/CD переменных GitLab или в команде сборки
export BASE_PATH=/snack-v2/
pnpm run build

# Или через docker build
docker build --build-arg BASE_PATH=/snack-v2/ .
```

**Важно:**
- Путь должен начинаться и заканчиваться слешем: `/snack-v2/`
- Все редиректы и ссылки будут автоматически использовать этот базовый путь
- Без установки `BASE_PATH` приложение работает в корне домена (`/`)

#### Пример с Docker и nginx

```bash
# 1. Сборка приложения с базовым путем
BASE_PATH=/snack-v2/ pnpm run build

# 2. Сборка Docker образа
docker build -t design-system:snack-v2 .

# 3. Запуск контейнера
docker run -p 8080:80 design-system:snack-v2
```

При развертывании на Kubernetes с Ingress, убедитесь что:
- В CI/CD установлена переменная `BASE_PATH` соответствующая пути в Ingress
- Nginx проксирует запросы с правильным base path
- В приложении будут работать редиректы: `https://example.com/snack-v2/` → `https://example.com/snack-v2/en/`

## Troubleshooting

### Storybook не открывается по /storybook/

Проверьте, что в `.storybook/main.ts` установлен `base: '/storybook/'` при сборке в CI.

### Документация не работает

Убедитесь, что `base: '/'` установлен в `apps/docs/astro.config.mjs`.

### Пайплайн падает

- Проверьте версии Node.js и pnpm в `.gitlab-ci.yml`
- Убедитесь, что все зависимости установлены корректно
- Проверьте логи сборки в GitLab CI/CD
