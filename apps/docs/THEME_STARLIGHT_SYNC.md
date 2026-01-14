# Синхронизация с темой Starlight

## Обзор

Theme Manager теперь полностью синхронизирован с встроенной системой тем Starlight. Это означает:

1. **При переключении нашей темы** → меняется тема Starlight
2. **При переключении темы Starlight** → меняется наша тема
3. **Сохранение в localStorage** работает для обеих систем
4. **Визуальная согласованность** - весь интерфейс меняется одновременно

## Как это работает

### 1. Синхронизация при переключении нашей темы

```typescript
// Пользователь переключает тему через наш ThemeSelect
window.snThemeManager.setTheme('dark');

// Theme Manager автоматически:
// 1. Устанавливает data-theme="dark" на <html>
// 2. Сохраняет в localStorage['starlight-theme'] = 'dark'
// 3. Добавляет класс theme-dark на <html>
// 4. Применяет sn-dark на <body>
```

### 2. Обратная синхронизация от Starlight

```typescript
// Если пользователь использует встроенный переключатель Starlight
// (если он еще где-то остался)

// MutationObserver отслеживает изменения data-theme на <html>
// И автоматически обновляет нашу тему
```

### 3. Загрузка темы при инициализации

При загрузке страницы Theme Manager проверяет в следующем порядке:

```typescript
1. localStorage['sn-theme']         // Наша тема
2. localStorage['starlight-theme']  // Тема Starlight
3. data-theme на <html>             // Текущая тема в DOM
4. 'light'                          // Default значение
```

## Технические детали

### Что синхронизируется

| Элемент | Атрибут/Свойство | Значение |
|---------|------------------|----------|
| `<html>` | `data-theme` | `'light'` или `'dark'` |
| `<html>` | `class` | `theme-light` или `theme-dark` |
| `<body>` | `class` | `sn-light` или `sn-dark` |
| `<body>` | `data-theme` | `'light'` или `'dark'` |
| localStorage | `'starlight-theme'` | `'light'` или `'dark'` |
| localStorage | `'sn-theme'` | `'light'` или `'dark'` |

### Код синхронизации

```typescript
// В theme-manager.ts
private syncStarlightTheme(): void {
  const htmlElement = document.documentElement;
  
  // Устанавливаем data-theme на html (Starlight)
  htmlElement.setAttribute('data-theme', this.theme);
  
  // Сохраняем в localStorage для Starlight
  localStorage.setItem('starlight-theme', this.theme);
  
  // Обновляем CSS классы
  htmlElement.classList.remove('theme-light', 'theme-dark');
  htmlElement.classList.add(`theme-${this.theme}`);
}
```

### MutationObserver для обратной синхронизации

```typescript
// Отслеживаем изменения от Starlight
private observeStarlightThemeChanges(): void {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        const newTheme = document.documentElement.getAttribute('data-theme');
        if (newTheme !== this.theme) {
          // Обновляем нашу тему
          this.theme = newTheme;
          // Применяем изменения...
        }
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
}
```

## Преимущества

### 1. Полная визуальная согласованность
```
┌─────────────────────────────────────────┐
│  Toolbar (Starlight styles) - Dark     │ ✅
├─────────────────────────────────────────┤
│  Sidebar (Starlight styles) - Dark     │ ✅
├─────────────────────────────────────────┤
│  Content (Design System) - sn-dark     │ ✅
└─────────────────────────────────────────┘
```

### 2. Работает со всеми переключателями
- ✅ Наш ThemeSelect в toolbar
- ✅ Встроенный переключатель Starlight (если есть)
- ✅ Программное изменение через API
- ✅ Изменение через DevTools

### 3. Сохранение состояния
```javascript
// Оба ключа синхронизированы
localStorage.getItem('sn-theme');         // 'dark'
localStorage.getItem('starlight-theme');  // 'dark'

// При перезагрузке тема восстанавливается из любого источника
```

## Примеры использования

### Проверка синхронизации

```javascript
// В консоли браузера
console.log({
  // Наша система
  snTheme: window.snThemeManager.getTheme(),
  snLocalStorage: localStorage.getItem('sn-theme'),
  bodyClass: document.body.classList.contains('sn-dark'),
  
  // Starlight система
  htmlDataTheme: document.documentElement.getAttribute('data-theme'),
  starlightLocalStorage: localStorage.getItem('starlight-theme'),
  htmlClass: document.documentElement.classList.contains('theme-dark'),
});

// Все значения должны совпадать!
```

### Переключение темы

```javascript
// Способ 1: Через наш API
window.snThemeManager.setTheme('dark');

// Способ 2: Программное изменение Starlight
document.documentElement.setAttribute('data-theme', 'dark');
// Автоматически синхронизируется!

// Способ 3: Через localStorage
localStorage.setItem('starlight-theme', 'dark');
location.reload(); // Применится при загрузке
```

## Тестирование

### 1. Проверка прямой синхронизации

```javascript
// 1. Установите светлую тему
window.snThemeManager.setTheme('light');

// 2. Проверьте что Starlight тоже светлая
console.assert(
  document.documentElement.getAttribute('data-theme') === 'light',
  'Starlight theme should be light'
);

// 3. Установите темную тему
window.snThemeManager.setTheme('dark');

// 4. Проверьте что Starlight тоже темная
console.assert(
  document.documentElement.getAttribute('data-theme') === 'dark',
  'Starlight theme should be dark'
);
```

### 2. Проверка обратной синхронизации

```javascript
// 1. Установите тему через Starlight
document.documentElement.setAttribute('data-theme', 'dark');

// 2. Подождите немного (MutationObserver асинхронный)
setTimeout(() => {
  // 3. Проверьте что наша тема тоже обновилась
  console.assert(
    window.snThemeManager.getTheme() === 'dark',
    'Our theme should be dark'
  );
  
  console.assert(
    document.body.classList.contains('sn-dark'),
    'Body should have sn-dark class'
  );
}, 100);
```

### 3. Проверка localStorage

```javascript
// 1. Очистите все
localStorage.clear();

// 2. Установите тему
window.snThemeManager.setTheme('dark');

// 3. Проверьте оба ключа
console.assert(
  localStorage.getItem('sn-theme') === 'dark',
  'sn-theme should be dark'
);

console.assert(
  localStorage.getItem('starlight-theme') === 'dark',
  'starlight-theme should be dark'
);

// 4. Перезагрузите страницу
location.reload();

// 5. Проверьте что тема восстановилась
console.assert(
  window.snThemeManager.getTheme() === 'dark',
  'Theme should persist after reload'
);
```

## Troubleshooting

### Проблема: Темы не синхронизируются

**Решение:**
```javascript
// 1. Проверьте что Theme Manager инициализирован
console.log(window.snThemeManager);

// 2. Проверьте текущее состояние
console.log({
  theme: window.snThemeManager.getTheme(),
  htmlTheme: document.documentElement.getAttribute('data-theme'),
  bodyClasses: Array.from(document.body.classList),
});

// 3. Принудительно примените тему
window.snThemeManager.setTheme('dark');
```

### Проблема: Тема меняется только частично

**Причина:** Возможно конфликт CSS или порядок загрузки стилей

**Решение:**
```javascript
// Проверьте порядок классов
console.log({
  html: document.documentElement.className,
  body: document.body.className,
});

// Убедитесь что оба элемента имеют нужные классы
// html: "theme-dark ..."
// body: "sn-dark sn-brandA sn-desktop ..."
```

### Проблема: MutationObserver не работает

**Причина:** Старый браузер или ошибка инициализации

**Решение:**
```javascript
// Проверьте поддержку
console.log('MutationObserver supported:', typeof MutationObserver !== 'undefined');

// Принудительно синхронизируйте
window.snThemeManager.setTheme(
  document.documentElement.getAttribute('data-theme')
);
```

## Best Practices

1. **Используйте наш API** для программного изменения темы
   ```javascript
   // ✅ Хорошо
   window.snThemeManager.setTheme('dark');
   
   // ⚠️ Работает, но не рекомендуется
   document.documentElement.setAttribute('data-theme', 'dark');
   ```

2. **Не отключайте MutationObserver** если не уверены
   - Он обеспечивает двустороннюю синхронизацию

3. **Проверяйте обе системы** при отладке
   ```javascript
   // Всегда смотрите на оба элемента
   console.log(document.documentElement.getAttribute('data-theme')); // Starlight
   console.log(document.body.classList); // Design System
   ```

## Итог

Теперь система тем полностью интегрирована с Starlight:
- ✅ Визуальная согласованность всего интерфейса
- ✅ Двусторонняя синхронизация
- ✅ Сохранение в localStorage для обеих систем
- ✅ Автоматическое отслеживание изменений
- ✅ Работает из коробки без дополнительной настройки

**Результат**: При переключении темы меняется **весь интерфейс** документации - от toolbar до контента! 🎨
