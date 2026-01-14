# Проблема с SCSS модулями @sbercloud/figma-variables

## Описание проблемы

При сборке проекта возникают ошибки связанные с отсутствующими SCSS модулями в пакете `@sbercloud/figma-variables`:

```
Error: Can't find stylesheet to import.
@use '@sbercloud/figma-variables/build/scss/thememode/light.module' as light;
```

```
Error: Can't find stylesheet to import.
@use '@sbercloud/figma-variables/build/scss/adaptivemode/desktop.module' as adaptive;
```

## Причина

В текущей версии пакета `@sbercloud/figma-variables@0.0.1-beta.13` в директории `build/scss/` отсутствуют модули:
- `thememode/light.module.scss`
- `thememode/dark.module.scss`
- `adaptivemode/desktop.module.scss`
- `adaptivemode/mobile.module.scss`

Эти модули используются в SCSS файлах компонентов, но не включены в пакет.

## Решение для Astro

### 1. Использование CSS токенов (текущее решение)

В Storybook используется файл `tokens.css`, который содержит все необходимые CSS-переменные.

**Подключено в `apps/docs/src/styles/global.css`:**

```css
@import '@sbercloud/figma-variables/build/css/tokens.css';
```

Файл `tokens.css` включает все токены:
- Primitive colors
- Thememode (light/dark)
- Adaptivemode (desktop/mobile)
- Brandmode (brandA/brandB)
- Все компонентные токены

### 2. Для компонентов

Компоненты должны использовать CSS-переменные напрямую или через SCSS функции `simple-var` и `composite-var` из `@sbercloud/figma-variables/build/scss/styles/styles.module`.

## Структура пакета

### CSS файлы (работают):
```
build/css/
├── tokens.css          ✅ Все токены (используется в Storybook)
├── thememode/
│   ├── light.css      ✅
│   └── dark.css       ✅
├── adaptivemode/
│   ├── desktop.css    ✅
│   └── mobile.css     ✅
├── brandmode/
│   ├── brandA.css     ✅
│   └── brandB.css     ✅
└── components/...     ✅
```

### SCSS файлы (частично):
```
build/scss/
├── styles/
│   └── styles.module  ✅ Функции simple-var, composite-var
├── components/        ✅ Компонентные токены
├── thememode/         ❌ Отсутствует
└── adaptivemode/      ❌ Отсутствует
```

## Как работает в Storybook

**Файл `.storybook/preview.tsx`:**

```typescript
import '@sbercloud/figma-variables/build/css/tokens.css';

// Все остальные импорты закомментированы:
// import '@sbercloud/figma-variables/build/css/thememode/light.css';
// import '@sbercloud/figma-variables/build/css/adaptivemode/desktop.css';
```

Классы применяются динамически:
```typescript
className={cn(
  'sn-primitive',
  'sn-figmaStyles',
  'sn-conmonents',
  `sn-${platform}`,  // sn-desktop или sn-mobile
  `sn-${theme}`,     // sn-light или sn-dark
  `sn-${brand}`      // sn-brandA или sn-brandB
)}
```

## Рекомендации

### Вариант 1: Использовать только CSS (текущий)

Использовать `tokens.css` и управлять темами через классы на body:

```html
<body class="sn-primitive sn-figmaStyles sn-desktop sn-light sn-brandA">
```

### Вариант 2: Обновить пакет

Запросить у команды пакета добавление SCSS модулей для thememode и adaptivemode в следующей версии.

### Вариант 3: Рефакторинг компонентов

Переписать компоненты для использования CSS-переменных напрямую вместо SCSS импортов:

**Было (не работает):**
```scss
@use '@sbercloud/figma-variables/build/scss/thememode/light.module' as light;
border-color: light.$sn-color-neutral-background1-level;
```

**Стало (работает):**
```scss
border-color: var(--sn-color-neutral-background1-level);
```

## Текущий статус

- ✅ `tokens.css` подключен в `apps/docs/src/styles/global.css`
- ✅ Классы дизайн-системы применяются через script в `astro.config.mjs`
- ⚠️ SCSS импорты в компонентах требуют рефакторинга или обновления пакета
- ⚠️ Сборка Astro docs пока не работает из-за SCSS импортов в компонентах

## Файлы с проблемными импортами

Компоненты, использующие отсутствующие SCSS модули:

```
packages/button/src/ButtonElevated/styles.module.scss
packages/button/src/ButtonFilled/styles.module.scss
packages/button/src/ButtonFunction/styles.module.scss
packages/button/src/ButtonOutline/styles.module.scss
packages/button/src/ButtonSimple/styles.module.scss
packages/button/src/ButtonTonal/styles.module.scss
packages/counter/src/styles.module.scss
packages/status/src/Status/styles.module.scss
packages/status/src/StatusIndicator/styles.module.scss
```

Все эти файлы импортируют:
```scss
@use '@sbercloud/figma-variables/build/scss/thememode/light.module' as light;
@use '@sbercloud/figma-variables/build/scss/adaptivemode/desktop.module' as adaptive;
```
