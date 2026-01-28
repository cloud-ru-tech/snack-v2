# Настройка генерации llms.txt для apps/docs

## Выполненные шаги

### 1. ✅ Установлен пакет starlight-llms-txt@0.6.0

Пакет добавлен в devDependencies проекта `@design-system/docs`.

### 2. ✅ Создана интеграция fixLlmsEncoding

**Файл:** `apps/docs/src/integrations/fixLlmsEncoding.ts`

Интеграция исправляет кодировку сгенерированных llms.txt файлов:
- Нормализует окончания строк (CRLF → LF)
- Добавляет UTF-8 BOM для явной маркировки кодировки
- Обрабатывает файлы после сборки в хуке `astro:build:done`

### 3. ✅ Обновлена конфигурация Astro

**Файл:** `apps/docs/astro.config.mjs`

Добавлены:
- Импорт плагина `starlightLlmsTxt`
- Импорт интеграции `fixLlmsEncoding`
- Интеграция `fixLlmsEncoding()` в массив `integrations`
- Плагин в конфигурацию Starlight:

```javascript
plugins: [
  starlightLlmsTxt({
    projectName: 'Design System',
    rawContent: true,
    customSets: [
      {
        label: 'components',
        paths: ['components/**'],
      },
      {
        label: 'guides',
        paths: ['guides/**'],
      },
    ],
  }),
]
```

## Генерируемые файлы

После успешной сборки (`pnpm build`) в директории `dist/` будут созданы:

- `llms.txt` — полный индекс документации
- `llms-full.txt` — полная версия документации
- `llms-small.txt` — сокращенная версия
- `llms-components.txt` — документация по компонентам
- `llms-guides.txt` — руководства и гайды
- `_llms-txt/llms-components.txt` — альтернативное расположение
- `_llms-txt/llms-guides.txt` — альтернативное расположение

## Текущее состояние

Настройка выполнена согласно инструкциям из:
- `.cursor/llm/LLMS_TXT_SETUP_GUIDE.md`
- `.cursor/llm/LLMS_TXT_AI_PROMPT.md`
- `.cursor/llm/LLMS_TXT_IMPLEMENTATION.md`
- `.cursor/llm/LLMS_TXT_QUICK_START.md`

### Проблема со сборкой

**Важно:** Сборка проекта не завершается из-за отсутствующих SCSS модулей в пакете `@sbercloud/figma-variables`:
- `build/scss/thememode/light.module` 
- `build/scss/adaptivemode/desktop.module`

Эти модули используются в компонентах button, counter и status, но отсутствуют в установленной версии пакета.

**Это не связано с настройкой llms.txt** — проект не собирается и без наших изменений.

### Решение

Для успешной сборки и тестирования генерации llms.txt файлов необходимо:

1. **Вариант 1:** Обновить `@sbercloud/figma-variables` до версии, содержащей эти модули
2. **Вариант 2:** Закомментировать использование отсутствующих переменных в SCSS файлах компонентов
3. **Вариант 3:** Создать заглушки для отсутствующих модулей (временно созданы в `node_modules`, но требуется больше переменных)

## Проверка настройки

После решения проблемы с SCSS:

```bash
# Сборка проекта
pnpm --filter @design-system/docs build

# Проверка созданных файлов
ls -la apps/docs/dist/*.txt
ls -la apps/docs/dist/_llms-txt/

# В логах должны появиться сообщения:
# [fix-llms-encoding] Checking files in /path/to/dist
# ✅ Fixed encoding for llms.txt
# ✅ Fixed encoding for llms-components.txt
# ✅ Fixed encoding for llms-guides.txt
```

## Файлы изменены

1. `apps/docs/package.json` — добавлен `starlight-llms-txt@0.6.0`
2. `apps/docs/src/integrations/fixLlmsEncoding.ts` — создан новый файл
3. `apps/docs/astro.config.mjs` — добавлены импорты и конфигурация
4. `apps/docs/src/components/LlmsLinks.astro` — создан компонент со ссылками на llms.txt файлы
5. `apps/docs/src/content/docs/index.mdx` — добавлен компонент LlmsLinks на главную страницу
6. `pnpm-lock.yaml` — обновлен

## Доступ к файлам

На главной странице документации добавлена красиво оформленная секция "LLM-оптимизированная документация" со ссылками на все сгенерированные llms.txt файлы для быстрого доступа.

## Дополнительная информация

Структура документации адаптирована под текущую организацию контента:
- **components/** — документация всех React компонентов (button, avatar, counter, status)
- **guides/** — руководства и гайды по использованию

CustomSets настроены для создания специализированных llms.txt файлов:
- `llms-components.txt` — для вопросов о компонентах
- `llms-guides.txt` — для вопросов о гайдах и best practices
