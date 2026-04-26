# Storybook Components

Переиспользуемые компоненты для конфигурации Storybook.

## Структура

```
components/
├── types.ts                    # Общие типы (Theme, Brand, Platform)
├── StoryWrapper/
│   ├── StoryWrapper.tsx       # Основная обертка для stories
│   ├── styles.module.scss     # Стили компонента
│   └── index.ts
└── index.ts                   # Общий экспорт всех компонентов
```

## Использование Figma Variables

Все компоненты используют SCSS переменные из `@cloud-rufigma-variables` для обеспечения консистентности дизайна.

### Подключение переменных

```scss
@use '@cloud-rufigma-variables/build/scss/styles/styles.module' as base;
```

### Основные категории переменных:

#### Spacing (отступы и промежутки)

```scss
base.$sn-adaptive-spacing-interval-xs    // 2px
base.$sn-adaptive-spacing-interval-s     // 4px
base.$sn-adaptive-spacing-interval-m     // 8px
base.$sn-adaptive-spacing-interval-l     // 16px

base.$sn-adaptive-spacing-control-container-vertical-s     // 4px
base.$sn-adaptive-spacing-control-container-horizontal-s   // 8px
base.$sn-adaptive-spacing-control-container-vertical-m     // 6px
base.$sn-adaptive-spacing-control-container-horizontal-m   // 12px
```

#### Border Radius (скругление углов)

```scss
base.$sn-adaptive-radius-3xs   // 2px
base.$sn-adaptive-radius-2xs   // 4px
base.$sn-adaptive-radius-xs    // 6px (desktop) / 8px (mobile)
base.$sn-adaptive-radius-s     // 8px (desktop) / 16px (mobile)
base.$sn-adaptive-radius-m     // 12px (desktop) / 20px (mobile)
base.$sn-adaptive-radius-l     // 16px (desktop) / 24px (mobile)
```

#### Font (шрифты)

```scss
base.$sn-primitive-font-font-size-11   // 11px
base.$sn-primitive-font-font-size-12   // 12px
base.$sn-primitive-font-font-size-14   // 14px
base.$sn-primitive-font-font-size-16   // 16px
base.$sn-primitive-font-font-size-18   // 18px
```

#### Stroke Weight (толщина линий для border, outline)

```scss
base.$sn-primitive-stroke-weight-stroke-thin        // 0.5px
base.$sn-primitive-stroke-weight-stroke-regular     // 1px
base.$sn-primitive-stroke-weight-stroke-medium      // 1.5px
base.$sn-primitive-stroke-weight-stroke-semi-bold   // 2px
base.$sn-primitive-stroke-weight-stroke-bold        // 3px
```

#### Dimensions (базовые размеры)

```scss
base.$sn-primitive-dimension-0     // 0
base.$sn-primitive-dimension-1     // 1px
base.$sn-primitive-dimension-2     // 2px
base.$sn-primitive-dimension-4     // 4px
base.$sn-primitive-dimension-8     // 8px
base.$sn-primitive-dimension-16    // 16px
base.$sn-primitive-dimension-32    // 32px
// ... и так далее до 104px
```

#### Colors (цвета)

```scss
base.$sn-theme-color-neutral-background
base.$sn-theme-color-neutral-background1-level
base.$sn-theme-color-neutral-text
base.$sn-theme-color-material-state-layer-regular-default-border-color
base.$sn-theme-color-material-state-layer-regular-hovered-border-color
base.$sn-theme-color-material-state-layer-activated-default-border-color
```

## Принципы стилизации

1. **Всегда используй CSS модули** - никаких инлайновых стилей
2. **Используй SCSS переменные из figma-variables** - для консистентности дизайна через `@use`
3. **НЕ используй `var(--sn-*)` напрямую** - только через SCSS переменные `base.$sn-*`
4. **НЕ используй явные px/rem значения** - всегда используй переменные
   - Для border-width: `base.$sn-primitive-stroke-weight-stroke-*`
   - Для размеров: `base.$sn-primitive-dimension-*`
   - Для отступов: `base.$sn-adaptive-spacing-*`
5. **Используй адаптивные переменные** - `base.$sn-adaptive-*` автоматически меняются в зависимости от платформы
6. **Группируй стили логически** - базовые стили, состояния (:hover, :focus)

## Пример создания нового компонента

```tsx
// MyComponent.tsx
import React from 'react';
import styles from './styles.module.scss';

export const MyComponent: React.FC = () => {
  return <div className={styles.container}>Content</div>;
};
```

```scss
// styles.module.scss
@use '@cloud-rufigma-variables/build/scss/styles/styles.module' as base;

.container {
  padding: base.$sn-adaptive-spacing-interval-m;
  border-radius: base.$sn-adaptive-radius-xs;
  border: base.$sn-primitive-stroke-weight-stroke-regular solid
    base.$sn-theme-color-material-state-layer-regular-default-border-color;
  background-color: base.$sn-theme-color-neutral-background;
  font-size: base.$sn-primitive-font-font-size-14;

  &:focus {
    outline: base.$sn-primitive-stroke-weight-stroke-semi-bold solid
      base.$sn-theme-color-material-state-layer-activated-default-border-color;
    outline-offset: base.$sn-primitive-dimension-2;
  }
}
```
