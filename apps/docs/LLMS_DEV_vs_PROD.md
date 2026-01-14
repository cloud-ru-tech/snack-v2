# LLM.txt: Development vs Production

## ⚠️ Важно понимать

**LLM.txt файлы генерируются ТОЛЬКО в production режиме!**

## 🔴 Development режим (`pnpm dev`)

```bash
pnpm dev
# Запускается на http://localhost:4321
```

**В этом режиме:**
- ❌ LLM.txt файлы НЕ генерируются
- ❌ `/llms-components.txt` → 404 ошибка
- ❌ `/llms-guides.txt` → 404 ошибка
- ❌ `/_llms-txt/components/llm-avatar.txt` → 404 ошибка
- ✅ Hot reload для быстрой разработки
- ✅ Работает только сам сайт с документацией

**Использование:** Только для разработки контента документации.

## 🟢 Production режим (`pnpm build` + `pnpm preview`)

```bash
# Сборка
pnpm build

# Preview сервера
pnpm preview
# По умолчанию запускается на http://localhost:4321

# Или на другом порту
pnpm preview --port 4322
```

**В этом режиме:**
- ✅ Все LLM.txt файлы генерируются
- ✅ `/llms-components.txt` → работает
- ✅ `/llms-guides.txt` → работает
- ✅ `/_llms-txt/components/llm-avatar.txt` → работает
- ✅ Полная сборка как в production
- ❌ Нет hot reload (нужно пересобирать при изменениях)

**Использование:** Для проверки финальной сборки и LLM файлов.

## 📋 Workflow

### Разработка документации

```bash
# 1. Работайте в dev режиме
pnpm dev

# 2. Редактируйте MDX файлы
# packages/avatar/docs/index.mdx

# 3. Видите изменения мгновенно
```

### Проверка LLM.txt файлов

```bash
# 1. Соберите проект
pnpm build

# 2. Запустите preview
pnpm preview --port 4322

# 3. Откройте в браузере
# http://localhost:4322/llms-components.txt
# http://localhost:4322/_llms-txt/components/llm-avatar.txt
```

## 🔗 URL-ы для production

После `pnpm build && pnpm preview --port 4322`:

### Основные файлы
- http://localhost:4322/llms.txt
- http://localhost:4322/llms-full.txt
- http://localhost:4322/llms-small.txt
- http://localhost:4322/llms-components.txt ✅
- http://localhost:4322/llms-guides.txt ✅

### Компонент-специфичные
- http://localhost:4322/_llms-txt/components/index.txt
- http://localhost:4322/_llms-txt/components/llm-avatar.txt ✅
- http://localhost:4322/_llms-txt/components/llm-{component}.txt

## 🚀 Production деплой

На production (например, GitLab Pages):

```bash
# В CI/CD
pnpm build

# Деплой dist/ директории
```

Файлы будут доступны по адресам:
- `https://your-site.com/llms-components.txt`
- `https://your-site.com/_llms-txt/components/llm-avatar.txt`

## ❓ Частые вопросы

### Q: Почему в dev режиме 404?
**A:** LLM файлы генерируются только при `pnpm build`. Используйте `pnpm preview` для просмотра.

### Q: Как быстро проверить изменения в LLM файлах?
**A:** Запустите два терминала:
```bash
# Терминал 1: dev для разработки
pnpm dev

# Терминал 2: периодически пересобирайте и проверяйте
pnpm build && pnpm preview --port 4322
```

### Q: Можно ли генерировать LLM файлы в dev режиме?
**A:** Технически можно, но не рекомендуется - это замедлит hot reload. Используйте preview для проверки.

### Q: Где физически хранятся файлы?
**A:** После `pnpm build` в директории `dist/`:
```
dist/
├── llms-components.txt
├── llms-guides.txt
├── llms.txt
├── llms-full.txt
├── llms-small.txt
└── _llms-txt/
    └── components/
        ├── index.txt
        └── llm-avatar.txt
```

## ✅ Быстрая проверка

Сейчас у вас должен быть запущен preview на порту 4322.

**Откройте в браузере:**

1. http://localhost:4322/llms-components.txt - должен показать документацию компонентов
2. http://localhost:4322/_llms-txt/components/llm-avatar.txt - документация Avatar
3. http://localhost:4322/_llms-txt/components/index.txt - индекс всех компонентов

Если видите контент - всё работает! ✨
