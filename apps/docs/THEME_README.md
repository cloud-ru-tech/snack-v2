# 🎨 Theme System для Astro документации

## Что было сделано

Реализована полноценная система управления темой для документации с поддержкой:

- ✅ **Переключение темы**: `sn-light` / `sn-dark`
- ✅ **Переключение бренда**: `sn-brandA` / `sn-brandB`
- ✅ **Переключение платформы**: `sn-desktop` / `sn-mobile`
- ✅ **Сохранение в localStorage**: настройки сохраняются между сессиями
- ✅ **Синхронизация**: между страницами и Storybook iframe
- ✅ **API и события**: для программного управления и подписки

## 🚀 Быстрый старт

### 1. Запустите dev сервер

```bash
cd apps/docs
npm run dev
```

### 2. Откройте браузер

Переключатель темы уже доступен в левом sidebar (вверху, иконка 🎨)

### 3. Используйте API

```typescript
// В консоли браузера или в скриптах
window.snThemeManager.setTheme('dark');
window.snThemeManager.setBrand('brandB');
window.snThemeManager.setPlatform('mobile');
```

## 📁 Структура файлов

### Новые файлы

```
apps/docs/
├── src/
│   ├── scripts/
│   │   └── theme-manager.ts              # ⭐ Глобальный менеджер темы
│   ├── components/
│   │   ├── ThemeSwitcher.astro           # Полный переключатель
│   │   ├── ThemeSwitcherSidebar.astro    # Компактный для sidebar
│   │   └── Sidebar.astro                 # Кастомный sidebar
│   ├── pages/
│   │   └── theme-demo.astro              # Демо страница
│   └── content/docs/guides/
│       └── theme-system.mdx              # Документация
├── THEME_SYSTEM.md                       # 📚 Полная документация
├── THEME_INTEGRATION_SUMMARY.md          # 📋 Детали реализации
├── THEME_QUICK_START.md                  # 🚀 Быстрый старт
├── THEME_VERIFICATION.md                 # 🧪 План тестирования
└── THEME_README.md                       # 📖 Этот файл
```

### Обновленные файлы

```
apps/docs/
├── src/
│   ├── components/
│   │   ├── DesignSystemHead.astro        # ✏️ Подключает theme-manager
│   │   ├── DesignSystemContent.astro     # ✏️ Убраны hardcoded классы
│   │   ├── PageFrame.astro               # ✏️ Убраны hardcoded классы
│   │   └── StorybookIframe.astro         # ✏️ Синхронизация темы
│   └── layouts/
│       └── BaseLayout.astro              # ✏️ Подключает theme-manager
├── astro.config.mjs                      # ✏️ Обновлены компоненты
└── ...

.storybook/
└── preview.tsx                           # ✏️ Синхронизация с темой
```

## 🎯 Ключевые возможности

### 1. Глобальный Theme Manager

```typescript
// Доступен через window
const manager = window.snThemeManager;

// API
manager.getTheme(); // 'light' | 'dark'
manager.setTheme('dark');
manager.getBrand(); // 'brandA' | 'brandB'
manager.setBrand('brandB');
manager.getPlatform(); // 'desktop' | 'mobile'
manager.setPlatform('mobile');
```

### 2. Автоматические CSS классы

```html
<!-- Классы применяются автоматически к <body> -->
<body
  class="sn-primitive sn-figmaStyles sn-conmonents sn-dark sn-brandB sn-mobile"
  data-theme="dark"
  data-brand="brandB"
  data-platform="mobile"
></body>
```

### 3. События для подписки

```typescript
window.addEventListener('themeChange', (e: CustomEvent) => {
  console.log('Новая тема:', e.detail.value);
});
```

### 4. Синхронизация с Storybook

```astro
---
import StorybookIframe from '@/components/StorybookIframe.astro';
---

<!-- Тема автоматически синхронизируется -->
<StorybookIframe storyId="components-button--primary" />
```

## 📚 Документация

| Файл                             | Описание                        | Для кого         |
| -------------------------------- | ------------------------------- | ---------------- |
| **THEME_QUICK_START.md**         | Быстрый старт, основные команды | Все              |
| **THEME_SYSTEM.md**              | Полная документация системы     | Разработчики     |
| **THEME_INTEGRATION_SUMMARY.md** | Детали реализации и архитектура | Архитекторы      |
| **THEME_VERIFICATION.md**        | План тестирования               | QA, Разработчики |
| **theme-system.mdx**             | Документация в guides           | Пользователи     |

## 🧪 Тестирование

### Базовая проверка

```bash
# 1. Запустите сервер
npm run dev

# 2. Откройте браузер на http://localhost:4321

# 3. Откройте консоль и выполните:
```

```javascript
// Проверка доступности
console.log(window.snThemeManager); // должен быть объект

// Проверка работы
window.snThemeManager.setTheme('dark');
console.log(document.body.classList.contains('sn-dark')); // true

// Проверка сохранения
console.log(localStorage.getItem('sn-theme')); // 'dark'
```

### Полный checklist

См. **THEME_VERIFICATION.md** для детального плана тестирования.

## 🔧 Использование

### В Astro компонентах

```astro
---
import ThemeSwitcher from '@/components/ThemeSwitcher.astro';
---

<div class="my-page">
  <h1>Моя страница</h1>
  <ThemeSwitcher />
</div>
```

### В скриптах

```astro
<script>
  import { getThemeManager } from '@/scripts/theme-manager';

  const manager = getThemeManager();
  manager.setTheme('dark');
</script>
```

### Программно

```typescript
// Где угодно в клиентском коде
window.snThemeManager.setTheme('dark');
```

## 🎨 CSS интеграция

### Использование классов

```css
/* Стили применяются автоматически через классы body */
.sn-light .my-component {
  background: white;
}

.sn-dark .my-component {
  background: #1a1a1a;
}
```

### Использование data-атрибутов

```css
/* Альтернативный подход через data-атрибуты */
body[data-theme='dark'] .my-component {
  background: #1a1a1a;
}

body[data-platform='mobile'] .my-component {
  padding: 8px;
}
```

### Использование CSS переменных

```css
/* Рекомендуемый подход - используйте CSS переменные */
.my-component {
  background: var(--sn-theme-color-neutral-background);
  color: var(--sn-theme-color-text-primary);
}
```

## 🔄 Миграция

### До

```astro
<!-- ❌ Старый подход с hardcoded классами -->
<script is:inline>
  document.body.classList.add('sn-light', 'sn-brandA', 'sn-desktop');
</script>
```

### После

```astro
<!-- ✅ Новый подход с Theme Manager -->
<script>
  import { getThemeManager } from '@/scripts/theme-manager';
  const manager = getThemeManager();
  // Классы применяются автоматически
</script>
```

## 🐛 Troubleshooting

### Theme Manager не найден

```javascript
// Проверьте что он доступен
if (!window.snThemeManager) {
  console.error('Theme Manager не инициализирован');
}
```

### Классы не применяются

```javascript
// Принудительно примените классы
window.snThemeManager.applyClasses();
```

### localStorage не работает

```javascript
// Очистите и попробуйте снова
localStorage.clear();
location.reload();
```

Подробнее см. **THEME_VERIFICATION.md** раздел Troubleshooting.

## 📊 Архитектура

```
┌─────────────────────────────────────┐
│      Theme Manager (Singleton)      │
│  - State management                 │
│  - localStorage persistence         │
│  - CSS class application            │
│  - Event dispatching                │
│  - iframe synchronization           │
└────────┬───────────────┬────────────┘
         │               │
    ┌────▼─────┐    ┌───▼──────┐
    │ UI Layer │    │ API Layer│
    └──────────┘    └──────────┘
         │               │
    Components      Events/Methods
```

## 🎯 Best Practices

1. **Используйте CSS переменные** вместо прямых значений
2. **Не hardcode классы темы** - используйте Theme Manager
3. **Подписывайтесь на события** для реакции на изменения
4. **Тестируйте оба бренда** при разработке компонентов
5. **Проверяйте mobile версию** для адаптивности

## 🚦 Статус

- ✅ **Реализация**: Завершена
- ✅ **Документация**: Завершена
- ⏳ **Тестирование**: Требуется проверка
- ⏳ **Production**: Готово к деплою

## 📞 Поддержка

При возникновении проблем:

1. Проверьте **THEME_VERIFICATION.md** - Troubleshooting
2. Откройте **theme-demo.astro** для примеров
3. Проверьте console на ошибки
4. Убедитесь что `window.snThemeManager` доступен

## 🔮 Будущие улучшения

- [ ] Автоматическая тема по системным настройкам (`prefers-color-scheme`)
- [ ] Анимация переходов темы
- [ ] Синхронизация между табами браузера
- [ ] Presets для быстрого переключения
- [ ] Кнопка-иконка для быстрого переключения light/dark
- [ ] История изменений темы
- [ ] Восстановление темы из URL параметров

## 📄 Лицензия

Часть проекта Storybook Design System.

---

**Версия**: 1.0.0  
**Дата**: 2026-01-14  
**Автор**: Design System Team
