# Настройка BASE_PATH для деплоя на подпути

## Проблема

При развертывании приложения на подпути домена (например, `https://frontend.cp.sbercloud.tech/snack-v2/`) редиректы и ссылки использовали абсолютные пути от корня домена, что приводило к неправильным редиректам:

❌ **Было:** `https://frontend.cp.sbercloud.tech/en/`  
✅ **Стало:** `https://frontend.cp.sbercloud.tech/snack-v2/en/`

## Решение

Добавлена поддержка переменной окружения `BASE_PATH`, которая позволяет указать базовый путь для приложения.

## Использование

### Локальная разработка (корень домена)

```bash
# По умолчанию приложение работает в корне домена
pnpm run dev
# Доступно на: http://localhost:4321/
```

### Деплой на подпути (по умолчанию)

```bash
# По умолчанию сборка использует BASE_PATH=/snack-v2/
pnpm run build:docs
# или из корня проекта
pnpm run build

# Для кастомного базового пути
BASE_PATH=/custom-path/ pnpm run build:docs
```

### Деплой в корне домена

```bash
# Используйте build:root для сборки без base path
pnpm --filter @design-system/docs build:root
# или из корня проекта
pnpm run build:docs:root
```

### Docker деплой

```bash
# 1. Соберите приложение с базовым путем
BASE_PATH=/snack-v2/ pnpm run build

# 2. Создайте Docker образ
docker build -t design-system:snack-v2 .

# 3. Запустите контейнер
docker run -p 8080:80 design-system:snack-v2

# Приложение будет доступно на: http://localhost:8080/snack-v2/
```

### GitLab CI/CD

В `.gitlab-ci.yml` добавьте переменную окружения:

```yaml
variables:
  BASE_PATH: /snack-v2/

build:docs:
  script:
    - pnpm run build:docs
```

Или в настройках проекта GitLab:
- Settings → CI/CD → Variables
- Добавьте переменную `BASE_PATH` со значением `/snack-v2/`

## Важные моменты

1. **Формат пути:**
   - Путь должен начинаться с `/`: `/snack-v2/`
   - Путь должен заканчиваться на `/`: `/snack-v2/`
   - Правильно: `/snack-v2/`, `/my-app/`, `/v2/`
   - Неправильно: `snack-v2/`, `/snack-v2`, `snack-v2`

2. **Редиректы:**
   - Все редиректы автоматически используют базовый путь
   - `index.astro` редиректит на `{BASE_PATH}en/`
   - Внутренние ссылки генерируются с учетом base path

3. **Без BASE_PATH:**
   - Если переменная не установлена, используется `/` (корень домена)
   - Приложение работает как обычно в корне

## Измененные файлы

### `apps/docs/astro.config.mjs`

```javascript
// Было
base: '/', // Docs are served from root

// Стало
base: process.env.BASE_PATH || '/',
```

### `apps/docs/src/pages/index.astro`

```astro
// Было
<meta http-equiv="refresh" content="0; url=/en/" />

// Стало
const base = import.meta.env.BASE_URL;
const targetUrl = `${base}en/`;
<meta http-equiv="refresh" content={`0; url=${targetUrl}`} />
```

### `apps/docs/src/components/astro/DocsNavigation.astro`

```astro
// Добавлен helper для генерации путей
const withBase = (path: string) => {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${normalizedBase}${normalizedPath}`;
};

// Использование
const slug = withBase(`${currentLang}/components/${packageName}/`);
```

### `apps/docs/src/components/astro/LlmLink.astro`

```astro
// Было
const llmUrl = `/_llms-txt/components/llm-${component}.txt`;

// Стало
const base = import.meta.env.BASE_URL;
const llmPath = `_llms-txt/components/llm-${component}.txt`;
const llmUrl = base.endsWith('/') ? `${base}${llmPath}` : `${base}/${llmPath}`;
```

## Тестирование

### Проверка локально с base path

```bash
# Соберите с base path
BASE_PATH=/snack-v2/ pnpm run build:docs

# Запустите preview
pnpm --filter @design-system/docs preview --base /snack-v2/

# Откройте в браузере: http://localhost:4321/snack-v2/
```

### Ожидаемое поведение

1. ✅ Открыв `http://localhost:4321/snack-v2/`, происходит редирект на `http://localhost:4321/snack-v2/en/`
2. ✅ Все внутренние ссылки работают с правильным base path
3. ✅ Навигация по компонентам и guides работает корректно
4. ✅ LLM.txt ссылки генерируются с base path

## Примеры

### Пример 1: Корень домена (по умолчанию)

```bash
pnpm run build:docs
# BASE_URL = "/"
# Редирект: / → /en/
```

### Пример 2: Подпуть /snack-v2/

```bash
BASE_PATH=/snack-v2/ pnpm run build:docs
# BASE_URL = "/snack-v2/"
# Редирект: /snack-v2/ → /snack-v2/en/
```

### Пример 3: Несколько уровней вложенности

```bash
BASE_PATH=/apps/design-system/ pnpm run build:docs
# BASE_URL = "/apps/design-system/"
# Редирект: /apps/design-system/ → /apps/design-system/en/
```

## Поддержка в других частях приложения

- ✅ Astro документация (apps/docs)
- ⚠️ Storybook - требует отдельной настройки base в `.storybook/main.ts`
- ⚠️ Nginx - убедитесь, что nginx правильно проксирует запросы
