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

## Troubleshooting

### Storybook не открывается по /storybook/

Проверьте, что в `.storybook/main.ts` установлен `base: '/storybook/'` при сборке в CI.

### Документация не работает

Убедитесь, что `base: '/'` установлен в `apps/docs/astro.config.mjs`.

### Пайплайн падает

- Проверьте версии Node.js и pnpm в `.gitlab-ci.yml`
- Убедитесь, что все зависимости установлены корректно
- Проверьте логи сборки в GitLab CI/CD
