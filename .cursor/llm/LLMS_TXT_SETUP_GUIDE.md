# Инструкция по настройке генерации llms.txt файлов

## Обзор

Данная инструкция описывает, как настроить автоматическую генерацию LLM-дружественных файлов (llms.txt) в проекте на базе Astro + Starlight. Система генерирует структурированные текстовые файлы из документации, следуя [стандарту llms.txt](https://llmstxt.org/).

## Архитектура решения

Система состоит из двух основных компонентов:

1. **Плагин `starlight-llms-txt`** — генерирует llms.txt файлы из контента документации
2. **Кастомная интеграция `fixLlmsEncoding`** — исправляет кодировку сгенерированных файлов (добавляет UTF-8 BOM)

## Шаг 1: Установка зависимостей

Добавьте необходимый пакет в `package.json`:

```json
{
  "devDependencies": {
    "starlight-llms-txt": "0.6.0"
  }
}
```

Установите зависимости:

```bash
pnpm install
# или
npm install
```

## Шаг 2: Создание интеграции для исправления кодировки

Создайте файл `src/integrations/fixLlmsEncoding.ts`:

```typescript
import type { AstroIntegration } from 'astro';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default function fixLlmsEncoding(): AstroIntegration {
  return {
    name: 'fix-llms-encoding',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distPath = dir.pathname;
        const llmsFiles = [
          'llms-full.txt',
          'llms-coding.txt',
          'llms-devflow.txt',
          'llms.txt',
          'llms-small.txt',
          '_llms-txt/llms-coding.txt',
          '_llms-txt/llms-devflow.txt',
        ];

        console.log(`[fix-llms-encoding] Checking files in ${distPath}`);
        
        for (const fileName of llmsFiles) {
          const filePath = join(distPath, fileName);
          try {
            if (!existsSync(filePath)) {
              continue;
            }
            
            // Read file as UTF-8
            const content = readFileSync(filePath, 'utf-8');
            
            // Normalize line endings and ensure UTF-8 encoding
            // Add BOM for explicit UTF-8 marking
            const normalizedContent = content
              .replace(/^\uFEFF/, '') // Remove BOM if present
              .replace(/\r\n/g, '\n') // Normalize line endings
              .replace(/\r/g, '\n');
            
            // Add BOM and write file back with explicit UTF-8 encoding
            const contentWithBom = '\uFEFF' + normalizedContent;
            writeFileSync(filePath, contentWithBom, { encoding: 'utf8' });
            
            console.log(`✅ Fixed encoding for ${fileName}`);
          } catch (error) {
            // File might not exist, which is fine
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
              console.warn(`⚠️  Could not fix encoding for ${fileName}:`, error);
            }
          }
        }
      },
    },
  };
}
```

**Назначение интеграции:**
- Нормализует окончания строк (CRLF → LF)
- Добавляет UTF-8 BOM для явной маркировки кодировки
- Обрабатывает все сгенерированные llms.txt файлы после сборки

## Шаг 3: Настройка плагина в astro.config

В файле `astro.config.mjs` (или `astro.config.ts`) добавьте:

### 3.1. Импорты

```javascript
import starlightLlmsTxt from "starlight-llms-txt";
import fixLlmsEncoding from "./src/integrations/fixLlmsEncoding.js";
```

### 3.2. Подключение интеграции

Добавьте `fixLlmsEncoding()` в массив `integrations`:

```javascript
export default defineConfig({
  // ... другие настройки
  integrations: [
    // ... другие интеграции
    fixLlmsEncoding(),
    starlight({
      // ... настройки starlight
    }),
  ],
});
```

### 3.3. Настройка плагина starlight-llms-txt

В конфигурации `starlight` добавьте плагин в массив `plugins`:

```javascript
starlight({
  title: "Название вашего проекта",
  // ... другие настройки starlight
  plugins: [
    starlightLlmsTxt({
      projectName: "Название вашего проекта",
      
      // Исключить определенные пути из генерации
      // Полезно для страниц с React компонентами или интерактивным контентом
      exclude: ["design/**", "examples/**"],
      
      // Использовать сырой контент вместо рендеринга
      // Предотвращает попытки рендерить React компоненты в текстовый файл
      rawContent: true,
      
      // Кастомные наборы файлов для специализированных llms.txt файлов
      customSets: [
        {
          // Метка для файла (будет использована в имени: llms-{label}.txt)
          label: "llms-coding",
          // Пути к документации, которые должны войти в этот набор
          paths: [
            "global/code-style/**",
            "global/i18n/**",
            "global/metrics/**",
            "global/routing/**",
            "global/adaptive/**",
          ],
        },
        {
          label: "llms-devflow",
          paths: [
            "global/development-flow/**",
            "global/git-flow/**",
            "global/ci-cd/**",
            "global/gitlab-structure/**",
          ],
        },
      ],
    }),
  ],
}),
```

## Шаг 4: Структура контента

Плагин автоматически сканирует контент из директории `src/content/docs/` (или другую, указанную в конфигурации Starlight).

### Рекомендуемая структура:

```
src/content/docs/
├── global/              # Глобальная документация
│   ├── code-style/     # Стандарты кода
│   ├── i18n/           # Интернационализация
│   ├── metrics/        # Метрики
│   ├── routing/        # Роутинг
│   ├── adaptive/       # Адаптивность
│   ├── development-flow/  # Процессы разработки
│   ├── git-flow/      # Git workflow
│   ├── ci-cd/          # CI/CD
│   └── gitlab-structure/ # Структура GitLab
└── design/             # Документация дизайна (может быть исключена)
    └── ...
```

**Важно:** Пути в `customSets.paths` должны соответствовать структуре вашей документации относительно корня `src/content/docs/`.

## Шаг 5: Генерация файлов

После настройки файлы будут автоматически генерироваться при сборке:

```bash
pnpm build
```

### Генерируемые файлы

После сборки в директории `dist/` будут созданы следующие файлы:

- `llms.txt` — полный индекс всей документации
- `llms-full.txt` — полная версия документации
- `llms-small.txt` — сокращенная версия
- `llms-coding.txt` — специализированный файл для coding-агентов (если настроен customSet)
- `llms-devflow.txt` — руководство по процессам разработки (если настроен customSet)
- `_llms-txt/llms-coding.txt` — альтернативное расположение для customSet
- `_llms-txt/llms-devflow.txt` — альтернативное расположение для customSet

## Конфигурация опций плагина

### Основные опции `starlightLlmsTxt`:

| Опция | Тип | Описание | По умолчанию |
|-------|-----|-----------|--------------|
| `projectName` | `string` | Название проекта, используется в заголовке llms.txt | Обязательно |
| `exclude` | `string[]` | Массив glob-паттернов для исключения страниц | `[]` |
| `rawContent` | `boolean` | Использовать сырой контент вместо рендеринга | `false` |
| `customSets` | `CustomSet[]` | Массив кастомных наборов файлов | `[]` |

### Структура `CustomSet`:

```typescript
type CustomSet = {
  label: string;      // Метка для имени файла (llms-{label}.txt)
  paths: string[];     // Массив glob-паттернов путей к документации
};
```

## Примеры использования

### Пример 1: Минимальная настройка

```javascript
starlightLlmsTxt({
  projectName: "Моя документация",
}),
```

Генерирует только базовые файлы: `llms.txt`, `llms-full.txt`, `llms-small.txt`.

### Пример 2: С исключениями

```javascript
starlightLlmsTxt({
  projectName: "Моя документация",
  exclude: ["examples/**", "playground/**"],
  rawContent: true,
}),
```

Исключает страницы из директорий `examples` и `playground`, использует сырой контент.

### Пример 3: С кастомными наборами

```javascript
starlightLlmsTxt({
  projectName: "Моя документация",
  exclude: ["design/**"],
  rawContent: true,
  customSets: [
    {
      label: "api",
      paths: ["api/**", "reference/**"],
    },
    {
      label: "guides",
      paths: ["guides/**", "tutorials/**"],
    },
  ],
}),
```

Создает дополнительные файлы: `llms-api.txt` и `llms-guides.txt`.

## Отладка

### Проверка генерации файлов

1. Запустите сборку:
   ```bash
   pnpm build
   ```

2. Проверьте наличие файлов в `dist/`:
   ```bash
   ls -la dist/*.txt
   ls -la dist/_llms-txt/
   ```

3. Проверьте логи сборки на наличие сообщений:
   ```
   [fix-llms-encoding] Checking files in /path/to/dist
   ✅ Fixed encoding for llms.txt
   ✅ Fixed encoding for llms-coding.txt
   ```

### Частые проблемы

**Проблема:** Файлы не генерируются

**Решение:**
- Убедитесь, что плагин добавлен в `starlight.plugins`
- Проверьте, что в `src/content/docs/` есть контент
- Проверьте, что пути в `customSets.paths` корректны

**Проблема:** Файлы пустые или содержат только заголовки

**Решение:**
- Проверьте, что страницы не исключены через `exclude`
- Убедитесь, что пути в `customSets.paths` соответствуют реальной структуре
- Попробуйте установить `rawContent: true`

**Проблема:** Проблемы с кодировкой (кракозябры)

**Решение:**
- Убедитесь, что интеграция `fixLlmsEncoding` подключена
- Проверьте, что исходные файлы документации в UTF-8

## Интеграция с CI/CD

Файлы llms.txt можно автоматически публиковать после сборки. Пример для GitLab CI:

```yaml
build:
  script:
    - pnpm build
  artifacts:
    paths:
      - dist/*.txt
      - dist/_llms-txt/
    expire_in: 1 week
```

## Дополнительные ресурсы

- [Стандарт llms.txt](https://llmstxt.org/)
- [Документация starlight-llms-txt](https://github.com/HiDeoo/starlight-llms-txt) (если доступна)
- [Документация Astro Starlight](https://starlight.astro.build/)

## Чеклист внедрения

- [ ] Установлен пакет `starlight-llms-txt`
- [ ] Создан файл `src/integrations/fixLlmsEncoding.ts`
- [ ] Интеграция `fixLlmsEncoding` добавлена в `astro.config`
- [ ] Плагин `starlightLlmsTxt` добавлен в `starlight.plugins`
- [ ] Настроен `projectName`
- [ ] Настроены `exclude` пути (если нужно)
- [ ] Настроены `customSets` (если нужно)
- [ ] Проверена генерация файлов после `pnpm build`
- [ ] Проверена кодировка сгенерированных файлов
