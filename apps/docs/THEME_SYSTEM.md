# Система управления темой

## Обзор

Система управления темой для документации обеспечивает:
- Переключение между светлой и темной темой (`sn-light` / `sn-dark`)
- Переключение между брендами (`sn-brandA` / `sn-brandB`)
- Переключение между платформами (`sn-desktop` / `sn-mobile`)
- Синхронизацию темы между страницами документации и Storybook iframe
- Сохранение настроек в localStorage

## Архитектура

### Компоненты

1. **Theme Manager** (`src/scripts/theme-manager.ts`)
   - Глобальный singleton для управления темой
   - Применяет CSS классы к `<body>`
   - Сохраняет настройки в localStorage
   - Синхронизирует изменения с iframe
   - Генерирует события для подписчиков

2. **ThemeSwitcher** (`src/components/ThemeSwitcher.astro`)
   - UI компонент для переключения темы
   - Интерактивные select элементы
   - Автоматическая синхронизация с Theme Manager

3. **StorybookIframe** (`src/components/StorybookIframe.astro`)
   - Встраивает Storybook истории
   - Синхронизирует тему с родительским окном
   - Передает настройки через postMessage API

4. **Storybook Preview** (`.storybook/preview.tsx`)
   - Принимает сообщения о смене темы
   - Синхронизирует StoryWrapper с темой документации

## Использование

### Базовая интеграция

Theme Manager автоматически инициализируется при подключении в любом из компонентов:

```astro
---
// В любом layout или странице
import '../scripts/theme-manager';
---
```

Или через импорт в компонентах:

```astro
<script>
  import { getThemeManager } from '../scripts/theme-manager';
  const manager = getThemeManager();
</script>
```

### Добавление переключателя темы

```astro
---
import ThemeSwitcher from '@/components/ThemeSwitcher.astro';
---

<ThemeSwitcher />
```

### Программное управление темой

```typescript
// Доступ к глобальному менеджеру
const manager = window.snThemeManager;

// Получить текущие значения
const theme = manager.getTheme(); // 'light' | 'dark'
const brand = manager.getBrand(); // 'brandA' | 'brandB'
const platform = manager.getPlatform(); // 'desktop' | 'mobile'

// Установить новые значения
manager.setTheme('dark');
manager.setBrand('brandB');
manager.setPlatform('mobile');
```

### Подписка на изменения

```typescript
// Слушать изменения темы
window.addEventListener('themeChange', (event: CustomEvent) => {
  console.log('Новая тема:', event.detail.value);
});

// Слушать изменения бренда
window.addEventListener('brandChange', (event: CustomEvent) => {
  console.log('Новый бренд:', event.detail.value);
});

// Слушать изменения платформы
window.addEventListener('platformChange', (event: CustomEvent) => {
  console.log('Новая платформа:', event.detail.value);
});
```

## CSS классы

### Применяемые классы

При инициализации Theme Manager применяет следующие классы к `<body>`:

```html
<!-- Базовые классы (всегда присутствуют) -->
<body class="sn-primitive sn-figmaStyles sn-conmonents">

<!-- + Динамические классы (меняются при переключении) -->
<body class="... sn-light sn-brandA sn-desktop">
<body class="... sn-dark sn-brandB sn-mobile">
```

### Data атрибуты

Также доступны data-атрибуты для использования в CSS селекторах:

```html
<body 
  data-theme="dark" 
  data-brand="brandB" 
  data-platform="mobile"
>
```

Пример использования в CSS:

```css
/* Стили для темной темы */
body[data-theme="dark"] {
  --custom-bg: #1a1a1a;
}

/* Стили для мобильной платформы */
body[data-platform="mobile"] {
  --spacing: 8px;
}
```

## Синхронизация с Storybook

### Как это работает

1. **Документация → Storybook**:
   - Когда пользователь меняет тему в документации
   - Theme Manager отправляет `postMessage` всем iframe
   - Storybook Preview получает сообщение и обновляет состояние

2. **Storybook → Документация** (опционально):
   - При загрузке Storybook отправляет `theme-sync-request`
   - Документация отвечает текущими настройками
   - Storybook синхронизируется с темой документации

### Формат сообщений

```typescript
// Синхронизация темы (документация → Storybook)
{
  type: 'theme-sync',
  theme: 'light' | 'dark',
  brand: 'brandA' | 'brandB',
  platform: 'desktop' | 'mobile'
}

// Запрос текущей темы (Storybook → документация)
{
  type: 'theme-sync-request'
}
```

## Интеграция со Starlight

### Кастомные компоненты

Theme Manager интегрирован через кастомные компоненты Starlight:

1. **DesignSystemHead.astro** - подключает theme-manager в `<head>`
2. **PageFrame.astro** - обертка для всех страниц
3. **DesignSystemContent.astro** - контент страниц с классами дизайн-системы

### Кастомные страницы

Для кастомных страниц используйте `BaseLayout`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import ThemeSwitcher from '@/components/ThemeSwitcher.astro';
---

<BaseLayout>
  <ThemeSwitcher />
  
  <div class="content">
    <!-- Ваш контент -->
  </div>
</BaseLayout>
```

## Тестирование

### Проверка синхронизации

1. Откройте страницу с `ThemeSwitcher`
2. Откройте страницу с `StorybookIframe`
3. Переключите тему - iframe должен обновиться
4. Перезагрузите страницу - настройки должны сохраниться

### Debug

Для отладки используйте console:

```typescript
// Проверить текущее состояние
console.log({
  theme: window.snThemeManager.getTheme(),
  brand: window.snThemeManager.getBrand(),
  platform: window.snThemeManager.getPlatform(),
});

// Проверить классы body
console.log(Array.from(document.body.classList));

// Проверить localStorage
console.log({
  theme: localStorage.getItem('sn-theme'),
  brand: localStorage.getItem('sn-brand'),
  platform: localStorage.getItem('sn-platform'),
});
```

## Best Practices

1. **Используйте CSS переменные** вместо прямых значений цветов
2. **Тестируйте оба бренда** при разработке компонентов
3. **Проверяйте mobile версию** для адаптивных компонентов
4. **Не hardcode классы темы** - используйте Theme Manager
5. **Подписывайтесь на события** если нужна реакция на изменения

## Troubleshooting

### Тема не применяется

- Убедитесь что `theme-manager.ts` импортирован
- Проверьте что `window.snThemeManager` доступен
- Проверьте классы `<body>` через DevTools

### Iframe не синхронизируется

- Убедитесь что iframe имеет класс `storybook-iframe`
- Проверьте что Storybook Preview обновлен
- Проверьте консоль на ошибки CORS

### localStorage не работает

- Проверьте настройки браузера (incognito mode может блокировать)
- Убедитесь что домен одинаковый для всех страниц
- Очистите localStorage и попробуйте снова

## Миграция с старой системы

Старая система использовала hardcoded inline скрипты:

```html
<!-- Старый подход ❌ -->
<script>
  document.body.classList.add('sn-light', 'sn-brandA', 'sn-desktop');
</script>
```

Новая система использует Theme Manager:

```astro
<!-- Новый подход ✅ -->
<script>
  import { getThemeManager } from '@/scripts/theme-manager';
  const manager = getThemeManager();
</script>
```

Удалите все inline скрипты и используйте централизованный Theme Manager.
