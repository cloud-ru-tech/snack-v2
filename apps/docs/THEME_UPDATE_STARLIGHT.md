# ✅ Обновление: Синхронизация с темой Starlight

## Что добавлено

Теперь при переключении темы Design System **автоматически меняется тема Starlight**! Это означает что весь интерфейс документации меняется одновременно.

## Результат

### До обновления ❌
```
Переключаем тему → меняется только контент
├─ Toolbar остается светлым/темным
├─ Sidebar остается светлым/темным  
└─ Контент меняется на sn-dark ✅
```

### После обновления ✅
```
Переключаем тему → меняется ВСЁ!
├─ Toolbar темный/светлый ✅
├─ Sidebar темный/светлый ✅
└─ Контент sn-dark/light ✅
```

## Что синхронизируется

| Система | Элемент | Изменение |
|---------|---------|-----------|
| **Starlight** | `<html data-theme>` | `light` → `dark` |
| **Starlight** | `<html class>` | `theme-light` → `theme-dark` |
| **Starlight** | `localStorage['starlight-theme']` | `'light'` → `'dark'` |
| **Design System** | `<body class>` | `sn-light` → `sn-dark` |
| **Design System** | `<body data-theme>` | `'light'` → `'dark'` |
| **Design System** | `localStorage['sn-theme']` | `'light'` → `'dark'` |

## Как работает

### 1. Прямая синхронизация (Design System → Starlight)

```typescript
// Пользователь переключает тему
window.snThemeManager.setTheme('dark');

// Автоматически:
// 1. ✅ Меняется наша тема (sn-dark на body)
// 2. ✅ Меняется тема Starlight (data-theme="dark" на html)
// 3. ✅ Сохраняется в оба localStorage ключа
// 4. ✅ Весь интерфейс становится темным
```

### 2. Обратная синхронизация (Starlight → Design System)

```typescript
// Если где-то осталась кнопка переключения Starlight
// или тема меняется программно

// MutationObserver отслеживает изменения data-theme на html
// И автоматически обновляет Design System тему
```

### 3. Загрузка при инициализации

```typescript
// При загрузке проверяется в порядке приоритета:
1. localStorage['sn-theme']        // Наша тема
2. localStorage['starlight-theme'] // Тема Starlight
3. <html data-theme>               // Текущая в DOM
4. 'light'                         // По умолчанию
```

## Изменения в коде

### Обновлен `theme-manager.ts`

Добавлены 3 новых метода:

#### 1. `syncStarlightTheme()` - Синхронизация с Starlight
```typescript
private syncStarlightTheme(): void {
  // Устанавливает data-theme на <html>
  // Сохраняет в localStorage['starlight-theme']
  // Обновляет CSS классы theme-light/dark на <html>
}
```

#### 2. `loadThemeFromStorage()` - Умная загрузка темы
```typescript
private loadThemeFromStorage(): Theme {
  // Проверяет все источники темы
  // Возвращает первую найденную
}
```

#### 3. `observeStarlightThemeChanges()` - Отслеживание изменений
```typescript
private observeStarlightThemeChanges(): void {
  // MutationObserver за data-theme на <html>
  // Автоматически синхронизирует обратно
}
```

## Как проверить

### 1. Запустите dev сервер
```bash
cd apps/docs
npm run dev
```

### 2. Откройте браузер
```
http://localhost:4321
```

### 3. Переключите тему

Используйте ThemeSelect в toolbar (справа вверху):
- Выберите "🌙 Темная"
- **Весь интерфейс** должен стать темным!

### 4. Проверьте в консоли

```javascript
// Проверьте синхронизацию
console.log({
  // Design System
  snTheme: window.snThemeManager.getTheme(),
  bodyClass: document.body.classList.contains('sn-dark'),
  
  // Starlight
  htmlTheme: document.documentElement.getAttribute('data-theme'),
  htmlClass: document.documentElement.classList.contains('theme-dark'),
  
  // localStorage
  snStorage: localStorage.getItem('sn-theme'),
  starlightStorage: localStorage.getItem('starlight-theme'),
});

// Все значения должны быть 'dark' / true!
```

### 5. Проверьте визуально

При переключении на темную тему должны поменяться:
- ✅ Цвет toolbar (верх)
- ✅ Цвет sidebar (слева)
- ✅ Цвет контента (центр)
- ✅ Цвета кнопок и ссылок
- ✅ Цвета code blocks

## Преимущества

### 1. Полная визуальная согласованность
Весь интерфейс меняется одновременно - нет диссонанса между частями страницы

### 2. Двусторонняя синхронизация
Работает в обе стороны - можно менять тему откуда угодно

### 3. Умная загрузка
При старте использует тему из любого доступного источника

### 4. Автоматическое отслеживание
MutationObserver ловит любые изменения темы

### 5. Совместимость
Работает с любыми способами изменения темы:
- Наш ThemeSelect
- Встроенный переключатель Starlight
- Программное изменение
- Изменение через DevTools

## Документация

Создан новый файл с детальным описанием:
📄 **THEME_STARLIGHT_SYNC.md** - полная документация синхронизации

Включает:
- Технические детали
- Примеры кода
- План тестирования
- Troubleshooting
- Best practices

## Troubleshooting

### Тема не синхронизируется?

```javascript
// Проверьте инициализацию
console.log(window.snThemeManager);

// Принудительно примените
window.snThemeManager.setTheme('dark');
```

### Меняется только часть интерфейса?

```javascript
// Проверьте оба элемента
console.log(document.documentElement.getAttribute('data-theme')); // html
console.log(document.body.className); // body
```

### После перезагрузки сбрасывается?

```javascript
// Проверьте localStorage
console.log(localStorage.getItem('sn-theme'));
console.log(localStorage.getItem('starlight-theme'));

// Очистите и попробуйте снова
localStorage.clear();
window.snThemeManager.setTheme('dark');
```

## Итог

✅ **Готово к использованию!**

Теперь при переключении темы:
- Меняется **весь интерфейс** документации
- Сохраняется в **оба** localStorage ключа
- Работает **двусторонняя** синхронизация
- Поддерживается **автоматическое** отслеживание

**Просто переключите тему и наслаждайтесь согласованным интерфейсом!** 🎨

---

**Версия**: 1.1.0  
**Дата**: 14 января 2026  
**Изменения**: Добавлена синхронизация с Starlight
