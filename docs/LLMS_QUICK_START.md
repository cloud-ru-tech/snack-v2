# LLM.txt - Быстрый старт

## ✅ Что исправлено

1. **Установлен пакет `starlight-llms-txt`** - теперь генерируются `llms-components.txt` и `llms-guides.txt`
2. **Создана система генерации компонент-специфичных файлов** - для каждого компонента отдельный `llm-{name}.txt`
3. **Добавлен компонент LlmLink** - красивая ссылка на LLM.txt в документации

## 🚀 Использование

### Для существующего компонента (пример: Avatar)

Уже добавлено в `/packages/avatar/docs/index.mdx`:

```mdx
import LlmLink from '../../../../../components/LlmLink.astro';

<LlmLink component="avatar" />
```

### Для нового компонента

1. Скопируйте `COMPONENT_DOC_TEMPLATE.mdx` в папку `packages/{component}/docs/`
2. Замените все вхождения `component-name` на имя вашего компонента
3. Заполните контент
4. LLM.txt файл сгенерируется автоматически при билде

## 📦 Сборка

```bash
# Development (без генерации LLM.txt)
pnpm dev

# Production (с генерацией всех LLM.txt файлов)
pnpm build
```

## 🔗 Доступ к файлам

После сборки файлы доступны по следующим URL:

**Общие:**
- `/llms.txt` - индекс
- `/llms-components.txt` - все компоненты ✅
- `/llms-guides.txt` - все гайды ✅

**Отдельные компоненты:**
- `/_llms-txt/components/llm-avatar.txt` - Avatar
- `/_llms-txt/components/llm-button.txt` - Button (когда добавите)
- `/_llms-txt/components/index.txt` - индекс всех компонентов

## 📖 Документация

- `COMPONENT_DOC_TEMPLATE.mdx` - шаблон для новых компонентов
- `LLMS_COMPONENT_GENERATION.md` - полное руководство
- `LLMS_CHANGES.md` - список всех изменений
- `README.md` - обновлен с информацией об LLM.txt

## 🎯 Следующие шаги

1. ✅ Avatar уже имеет LlmLink
2. Добавьте LlmLink в документацию других компонентов по мере необходимости
3. Используйте шаблон для всех новых компонентов

## 🔍 Проверка

После `pnpm build` проверьте:

```bash
cd dist

# Основные файлы
ls -lh llms*.txt

# Компонент-специфичные
ls -lh _llms-txt/components/
```

Должно быть:
- ✅ llms-components.txt (~18KB)
- ✅ llms-guides.txt (~26B)
- ✅ _llms-txt/components/llm-avatar.txt (~8KB)
- ✅ _llms-txt/components/index.txt

## ❓ Вопросы?

См. `LLMS_COMPONENT_GENERATION.md` для подробной информации.
