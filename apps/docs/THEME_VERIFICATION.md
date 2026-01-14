# Theme System - Verification Guide

## 📋 Checklist изменений

### ✅ Созданные файлы

- [x] `src/scripts/theme-manager.ts` - Глобальный менеджер темы
- [x] `src/components/ThemeSwitcher.astro` - Полный переключатель
- [x] `src/components/ThemeSwitcherSidebar.astro` - Компактный переключатель для sidebar
- [x] `src/components/Sidebar.astro` - Кастомный sidebar с переключателем
- [x] `src/components/ThemeSwitcherExample.mdx` - Примеры использования
- [x] `src/pages/theme-demo.astro` - Демо страница
- [x] `src/content/docs/guides/theme-system.mdx` - Документация в guides
- [x] `THEME_SYSTEM.md` - Полная документация
- [x] `THEME_INTEGRATION_SUMMARY.md` - Summary интеграции
- [x] `THEME_QUICK_START.md` - Быстрый старт
- [x] `THEME_VERIFICATION.md` - Этот файл

### ✅ Обновленные файлы

- [x] `src/components/DesignSystemHead.astro` - Подключает theme-manager
- [x] `src/components/DesignSystemContent.astro` - Убраны hardcoded классы
- [x] `src/components/PageFrame.astro` - Убраны hardcoded классы
- [x] `src/components/StorybookIframe.astro` - Синхронизация темы
- [x] `src/layouts/BaseLayout.astro` - Подключает theme-manager
- [x] `astro.config.mjs` - Обновлены компоненты и удален inline скрипт
- [x] `../../.storybook/preview.tsx` - Синхронизация с темой

## 🧪 План тестирования

### 1. Проверка базовой функциональности

```bash
# Запустите dev сервер
cd apps/docs
npm run dev
```

#### Шаги:

1. **Откройте браузер** на `http://localhost:4321`
2. **Проверьте sidebar** - должен быть виден переключатель темы (иконка 🎨)
3. **Откройте details** переключателя
4. **Переключите тему** на темную
5. **Проверьте изменения**:
   - Фон должен стать темным
   - Цвета текста должны измениться
   - В DevTools классы `<body>` должны содержать `sn-dark`

#### Ожидаемые классы:

```html
<!-- Светлая тема -->
<body class="sn-primitive sn-figmaStyles sn-conmonents sn-light sn-brandA sn-desktop"
      data-theme="light" data-brand="brandA" data-platform="desktop">

<!-- Темная тема -->
<body class="sn-primitive sn-figmaStyles sn-conmonents sn-dark sn-brandA sn-desktop"
      data-theme="dark" data-brand="brandA" data-platform="desktop">
```

### 2. Проверка localStorage

#### В консоли браузера:

```javascript
// После переключения темы на темную
console.log(localStorage.getItem('sn-theme')); // должно быть 'dark'
console.log(localStorage.getItem('sn-brand')); // должно быть 'brandA'
console.log(localStorage.getItem('sn-platform')); // должно быть 'desktop'

// Перезагрузите страницу - настройки должны сохраниться
location.reload();

// После перезагрузки проверьте снова
console.log(window.snThemeManager.getTheme()); // должно быть 'dark'
```

### 3. Проверка синхронизации между страницами

1. Откройте главную страницу
2. Установите темную тему
3. Перейдите на другую страницу (например, `/theme-demo`)
4. Тема должна остаться темной

### 4. Проверка Theme Manager API

#### В консоли браузера:

```javascript
// Проверка доступности
console.log(window.snThemeManager); // должен быть объект

// Получение значений
console.log(window.snThemeManager.getTheme());     // 'light' | 'dark'
console.log(window.snThemeManager.getBrand());     // 'brandA' | 'brandB'
console.log(window.snThemeManager.getPlatform());  // 'desktop' | 'mobile'

// Установка значений
window.snThemeManager.setTheme('dark');
window.snThemeManager.setBrand('brandB');
window.snThemeManager.setPlatform('mobile');

// Проверка классов
console.log(Array.from(document.body.classList));
// Должно содержать: ['sn-primitive', 'sn-figmaStyles', 'sn-conmonents', 'sn-dark', 'sn-brandB', 'sn-mobile']
```

### 5. Проверка событий

#### В консоли браузера:

```javascript
// Подписка на события
window.addEventListener('themeChange', (e) => {
  console.log('Тема изменена:', e.detail.value);
});

window.addEventListener('brandChange', (e) => {
  console.log('Бренд изменен:', e.detail.value);
});

window.addEventListener('platformChange', (e) => {
  console.log('Платформа изменена:', e.detail.value);
});

// Теперь переключите тему через UI - должны появиться логи
```

### 6. Проверка демо страницы

1. Откройте `/theme-demo`
2. Проверьте что:
   - Переключатель отображается
   - При переключении темы обновляются:
     - Цвета кнопок
     - Цвет фона карточки
     - Раздел "Текущие настройки"

### 7. Проверка Storybook синхронизации

#### Если у вас есть страница с StorybookIframe:

1. Откройте страницу с встроенным Storybook компонентом
2. Переключите тему на темную
3. Проверьте что iframe Storybook также переключился на темную тему

#### Проверка в консоли:

```javascript
// В родительском окне (документация)
window.snThemeManager.setTheme('dark');

// В iframe должен прийти postMessage
// Проверьте в DevTools -> Network -> WS (WebSocket) или console
```

### 8. Проверка в production build

```bash
# Сборка
npm run build

# Предпросмотр
npm run preview
```

1. Откройте preview URL
2. Проверьте все пункты выше
3. Убедитесь что нет ошибок в консоли

## 🐛 Troubleshooting

### Проблема: Theme Manager не инициализируется

**Симптомы:**
- `window.snThemeManager` is `undefined`
- Классы не применяются к body

**Решение:**
1. Откройте DevTools -> Console
2. Проверьте наличие ошибок JavaScript
3. Убедитесь что `theme-manager.ts` загружается:
   ```javascript
   // В консоли
   import('/src/scripts/theme-manager.ts').then(m => console.log(m));
   ```
4. Проверьте что DesignSystemHead.astro подключен в layout

### Проблема: Классы не применяются

**Симптомы:**
- Theme Manager работает
- localStorage обновляется
- Но классы на body не меняются

**Решение:**
1. Проверьте в DevTools что `applyClasses()` вызывается:
   ```javascript
   window.snThemeManager.applyClasses();
   ```
2. Проверьте что нет других скриптов, которые перезаписывают классы body
3. Убедитесь что нет конфликтов с другими системами тем

### Проблема: localStorage не сохраняется

**Симптомы:**
- После перезагрузки тема сбрасывается
- localStorage.getItem('sn-theme') возвращает null

**Решение:**
1. Проверьте настройки браузера (cookies/localStorage должны быть разрешены)
2. Проверьте что не используется incognito/private режим
3. Очистите localStorage и попробуйте снова:
   ```javascript
   localStorage.clear();
   location.reload();
   ```

### Проблема: Storybook не синхронизируется

**Симптомы:**
- Тема меняется в документации
- Но iframe Storybook не обновляется

**Решение:**
1. Проверьте что iframe имеет класс `storybook-iframe`
2. Проверьте консоль на CORS ошибки
3. Убедитесь что Storybook preview.tsx обновлен:
   ```javascript
   // В iframe Storybook console
   window.addEventListener('message', (e) => console.log(e.data));
   ```
4. Проверьте что postMessage отправляется:
   ```javascript
   // В родительском окне
   window.snThemeManager.setTheme('dark');
   // Должно отправить postMessage всем iframe
   ```

### Проблема: CSS переменные не работают

**Симптомы:**
- Классы применяются
- Но цвета не меняются

**Решение:**
1. Проверьте что подключены CSS файлы figma-variables:
   ```astro
   // В DesignSystemContent.astro должны быть импорты:
   import '@sbercloud/figma-variables/build/css/thememode/light.css';
   import '@sbercloud/figma-variables/build/css/thememode/dark.css';
   ```
2. Проверьте в DevTools -> Elements -> Computed что переменные определены
3. Проверьте порядок подключения CSS (тема должна быть после base)

## ✅ Критерии успешной интеграции

### Must Have

- [x] Theme Manager доступен через `window.snThemeManager`
- [x] Переключатель виден в sidebar
- [x] Смена темы обновляет классы body
- [x] Настройки сохраняются в localStorage
- [x] Перезагрузка страницы сохраняет тему
- [x] Навигация между страницами сохраняет тему

### Should Have

- [x] Data-атрибуты на body (data-theme, data-brand, data-platform)
- [x] Custom события (themeChange, brandChange, platformChange)
- [x] Синхронизация с Storybook iframe (если есть)
- [x] Демо страница работает корректно

### Nice to Have

- [ ] Автоматическая тема по системным настройкам
- [ ] Анимация переходов темы
- [ ] Синхронизация между табами браузера
- [ ] Presets для быстрого переключения

## 📊 Метрики качества

### Performance

- Theme Manager должен инициализироваться < 50ms
- Переключение темы должно быть мгновенным (< 16ms)
- Без layout shifts при загрузке

### Accessibility

- Переключатель должен быть доступен с клавиатуры
- Select элементы должны иметь правильные aria-labels
- Контраст цветов должен соответствовать WCAG AA

### Developer Experience

- Простой API (`window.snThemeManager.setTheme('dark')`)
- TypeScript типизация
- События для подписчиков
- Хорошая документация

## 🎉 Финальная проверка

Выполните все шаги и убедитесь что:

```javascript
// 1. Theme Manager доступен
✅ typeof window.snThemeManager === 'object'

// 2. Все методы работают
✅ window.snThemeManager.getTheme() // возвращает 'light' или 'dark'
✅ window.snThemeManager.setTheme('dark') // меняет тему
✅ window.snThemeManager.getBrand() // возвращает 'brandA' или 'brandB'
✅ window.snThemeManager.setPlatform('mobile') // меняет платформу

// 3. Классы применяются
✅ document.body.classList.contains('sn-primitive')
✅ document.body.classList.contains('sn-figmaStyles')
✅ document.body.classList.contains('sn-conmonents')
✅ document.body.classList.contains('sn-light') || document.body.classList.contains('sn-dark')

// 4. localStorage работает
✅ localStorage.getItem('sn-theme') !== null
✅ localStorage.getItem('sn-brand') !== null
✅ localStorage.getItem('sn-platform') !== null

// 5. События работают
let themeChanged = false;
window.addEventListener('themeChange', () => themeChanged = true);
window.snThemeManager.setTheme('dark');
✅ themeChanged === true
```

## 📝 Отчет о проверке

После проверки заполните:

**Дата проверки:** _________________

**Браузер:** _________________

**ОС:** _________________

### Результаты:

- [ ] Все тесты пройдены успешно
- [ ] Найдены проблемы (описать ниже)

**Описание проблем:**
```
_____________________________________________
_____________________________________________
_____________________________________________
```

**Дополнительные заметки:**
```
_____________________________________________
_____________________________________________
_____________________________________________
```
