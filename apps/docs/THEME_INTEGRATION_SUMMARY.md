# Theme Integration - Summary

## Что было сделано

### 1. Создан Theme Manager (`src/scripts/theme-manager.ts`)

Глобальный менеджер темы с функциональностью:
- ✅ Управление темой (`light` / `dark`)
- ✅ Управление брендом (`brandA` / `brandB`)
- ✅ Управление платформой (`desktop` / `mobile`)
- ✅ Сохранение в localStorage
- ✅ Синхронизация через postMessage API
- ✅ Custom события для подписчиков
- ✅ Автоматическое применение CSS классов к `<body>`

### 2. Обновлены Astro компоненты

#### Изменено:
- **DesignSystemHead.astro** - подключает theme-manager
- **PageFrame.astro** - убраны hardcoded классы
- **BaseLayout.astro** - подключает theme-manager
- **DesignSystemContent.astro** - убраны hardcoded классы
- **StorybookIframe.astro** - добавлена синхронизация темы

#### Создано:
- **ThemeSwitcher.astro** - полноценный переключатель темы
- **ThemeSwitcherSidebar.astro** - компактная версия для sidebar
- **Sidebar.astro** - кастомный sidebar с встроенным переключателем

### 3. Обновлен Storybook Preview

**`.storybook/preview.tsx`**:
- ✅ Добавлен useEffect для синхронизации темы
- ✅ Принимает сообщения от родительского окна
- ✅ Автоматически запрашивает текущую тему при загрузке

### 4. Обновлена конфигурация Astro

**`astro.config.mjs`**:
- ✅ Удален inline скрипт из `head`
- ✅ Добавлены кастомные компоненты в Starlight
- ✅ Sidebar теперь с переключателем темы

### 5. Создана документация

- **THEME_SYSTEM.md** - полная документация системы
- **ThemeSwitcherExample.mdx** - примеры использования
- **theme-demo.astro** - демо страница

## Как это работает

### Архитектура

```
┌─────────────────────────────────────────────┐
│           Astro Documentation               │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │         Theme Manager                │  │
│  │  - Manages theme state               │  │
│  │  - Applies CSS classes to <body>     │  │
│  │  - Saves to localStorage             │  │
│  │  - Dispatches events                 │  │
│  └─────┬────────────────────────────────┘  │
│        │                                    │
│  ┌─────▼──────────────┐  ┌──────────────┐  │
│  │  ThemeSwitcher     │  │  Sidebar     │  │
│  │  (UI Controls)     │  │  Component   │  │
│  └────────────────────┘  └──────────────┘  │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │       StorybookIframe               │   │
│  │  ┌───────────────────────────────┐  │   │
│  │  │   Storybook (in iframe)       │  │   │
│  │  │   - Receives theme messages   │  │   │
│  │  │   - Updates StoryWrapper      │  │   │
│  │  └───────────────────────────────┘  │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### Поток данных

1. **Пользователь меняет тему** в ThemeSwitcher
2. **ThemeSwitcher** вызывает `manager.setTheme('dark')`
3. **Theme Manager**:
   - Применяет класс `sn-dark` к `<body>`
   - Сохраняет в localStorage
   - Отправляет postMessage всем iframe
   - Генерирует событие `themeChange`
4. **Storybook** получает сообщение и обновляет StoryWrapper
5. **Все страницы** синхронизированы

## CSS Классы

### До изменений ❌

```html
<!-- Hardcoded классы -->
<body class="sn-primitive sn-figmaStyles sn-conmonents sn-desktop sn-light sn-brandA">
```

### После изменений ✅

```html
<!-- Динамические классы через Theme Manager -->
<body 
  class="sn-primitive sn-figmaStyles sn-conmonents sn-light sn-brandA sn-desktop"
  data-theme="light"
  data-brand="brandA"
  data-platform="desktop"
>
```

Классы меняются автоматически при переключении темы.

## Использование

### В любой Starlight странице

Переключатель уже доступен в sidebar - просто используйте его!

### На кастомной странице

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import ThemeSwitcher from '@/components/ThemeSwitcher.astro';
---

<BaseLayout>
  <h1>Моя страница</h1>
  <ThemeSwitcher />
</BaseLayout>
```

### Программное управление

```typescript
// В любом скрипте или компоненте
const manager = window.snThemeManager;
manager.setTheme('dark');
manager.setBrand('brandB');
manager.setPlatform('mobile');
```

### Подписка на изменения

```typescript
window.addEventListener('themeChange', (e: CustomEvent) => {
  console.log('Тема изменена:', e.detail.value);
});
```

## Тестирование

### Checklist

- [x] Theme Manager инициализируется автоматически
- [x] Классы применяются к `<body>`
- [x] Настройки сохраняются в localStorage
- [x] Переключатель в sidebar работает
- [x] Storybook iframe синхронизируется
- [x] Перезагрузка страницы сохраняет тему
- [x] Навигация между страницами сохраняет тему

### Как протестировать

1. Откройте любую страницу документации
2. Проверьте наличие переключателя в sidebar
3. Переключите тему на темную
4. Проверьте что классы `<body>` изменились
5. Перезагрузите страницу - тема должна сохраниться
6. Откройте страницу с Storybook iframe
7. Переключите тему - iframe должен обновиться

### Debug

```typescript
// Проверить состояние
console.log({
  theme: window.snThemeManager.getTheme(),
  brand: window.snThemeManager.getBrand(),
  platform: window.snThemeManager.getPlatform(),
  bodyClasses: Array.from(document.body.classList),
  localStorage: {
    theme: localStorage.getItem('sn-theme'),
    brand: localStorage.getItem('sn-brand'),
    platform: localStorage.getItem('sn-platform'),
  }
});
```

## Миграция

### Старая система

```astro
<!-- ❌ Не используйте больше -->
<script is:inline>
  document.body.classList.add('sn-light', 'sn-brandA', 'sn-desktop');
</script>
```

### Новая система

```astro
<!-- ✅ Используйте Theme Manager -->
<script>
  import { getThemeManager } from '@/scripts/theme-manager';
  const manager = getThemeManager();
</script>
```

## Файлы

### Новые файлы

```
apps/docs/
├── src/
│   ├── scripts/
│   │   └── theme-manager.ts          # Глобальный менеджер темы
│   ├── components/
│   │   ├── ThemeSwitcher.astro       # UI переключатель (полный)
│   │   ├── ThemeSwitcherSidebar.astro # UI переключатель (компактный)
│   │   ├── ThemeSwitcherExample.mdx  # Примеры использования
│   │   └── Sidebar.astro             # Кастомный sidebar
│   └── pages/
│       └── theme-demo.astro          # Демо страница
├── THEME_SYSTEM.md                   # Полная документация
└── THEME_INTEGRATION_SUMMARY.md      # Этот файл
```

### Обновленные файлы

```
apps/docs/
├── src/
│   ├── components/
│   │   ├── DesignSystemHead.astro    # Подключает theme-manager
│   │   ├── DesignSystemContent.astro # Убраны hardcoded классы
│   │   ├── PageFrame.astro           # Убраны hardcoded классы
│   │   └── StorybookIframe.astro     # Синхронизация темы
│   └── layouts/
│       └── BaseLayout.astro          # Подключает theme-manager
├── astro.config.mjs                  # Обновлены компоненты
└── ...

.storybook/
└── preview.tsx                       # Синхронизация с темой
```

## Следующие шаги

### Возможные улучшения

1. **Автоматическая тема по системным настройкам**
   ```typescript
   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
   manager.setTheme(prefersDark ? 'dark' : 'light');
   ```

2. **Анимация переходов темы**
   ```css
   body {
     transition: background-color 0.3s, color 0.3s;
   }
   ```

3. **Кнопка переключения темы в навигации**
   - Компактная иконка вместо select
   - Быстрое переключение light/dark

4. **Синхронизация между табами**
   ```typescript
   window.addEventListener('storage', (e) => {
     if (e.key === 'sn-theme') {
       manager.setTheme(e.newValue);
     }
   });
   ```

5. **Presets для разных контекстов**
   ```typescript
   manager.setPreset('mobile-dark-brandB');
   ```

## Поддержка

Если возникли вопросы или проблемы:
1. Проверьте `THEME_SYSTEM.md` для подробной документации
2. Откройте `theme-demo.astro` для примеров
3. Проверьте console на ошибки
4. Убедитесь что `window.snThemeManager` доступен
