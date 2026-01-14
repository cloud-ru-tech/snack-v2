# Theme System - Quick Start

## 🚀 Быстрый старт

### 1. Переключатель уже работает!

Откройте любую страницу документации - переключатель темы уже доступен в левом sidebar (верхняя часть).

### 2. Основные возможности

```typescript
// Доступ к глобальному менеджеру
const manager = window.snThemeManager;

// Переключение темы
manager.setTheme('dark');    // или 'light'
manager.setBrand('brandB');  // или 'brandA'
manager.setPlatform('mobile'); // или 'desktop'

// Получение текущих значений
const theme = manager.getTheme();       // 'light' | 'dark'
const brand = manager.getBrand();       // 'brandA' | 'brandB'
const platform = manager.getPlatform(); // 'desktop' | 'mobile'
```

### 3. Добавить переключатель на кастомную страницу

```astro
---
import ThemeSwitcher from '@/components/ThemeSwitcher.astro';
---

<ThemeSwitcher />
```

### 4. Применяемые CSS классы

После переключения темы автоматически обновляются классы на `<body>`:

```html
<!-- Светлая тема -->
<body class="sn-primitive sn-figmaStyles sn-conmonents sn-light sn-brandA sn-desktop">

<!-- Темная тема -->
<body class="sn-primitive sn-figmaStyles sn-conmonents sn-dark sn-brandA sn-desktop">
```

### 5. Синхронизация со Storybook

При встраивании Storybook компонентов используйте `StorybookIframe`:

```astro
---
import StorybookIframe from '@/components/StorybookIframe.astro';
---

<StorybookIframe storyId="components-button--primary" height="400px" />
```

Тема автоматически синхронизируется между документацией и iframe.

## 📚 Дополнительная информация

- **Полная документация**: `THEME_SYSTEM.md`
- **Детали реализации**: `THEME_INTEGRATION_SUMMARY.md`
- **Демо страница**: `/theme-demo`

## 🐛 Debug

```typescript
// Проверить текущее состояние
console.log({
  theme: window.snThemeManager.getTheme(),
  bodyClasses: Array.from(document.body.classList),
  localStorage: localStorage.getItem('sn-theme')
});
```

## ✨ Автоматические возможности

- ✅ Сохранение в localStorage
- ✅ Синхронизация между страницами
- ✅ Синхронизация с Storybook iframe
- ✅ Сохранение при перезагрузке
- ✅ События для подписчиков
- ✅ Data-атрибуты на body
