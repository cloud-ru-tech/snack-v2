# Astro Documentation - Architecture

## Структура проекта

```
astro/
├── src/
│   ├── components/
│   │   ├── astro/           # Astro компоненты
│   │   └── mdx/             # React компоненты для MDX (уже используют CSS модули)
│   ├── scripts/             # TypeScript скрипты для клиентской логики
│   │   ├── theme-switcher.ts
│   │   ├── theme-select-toolbar.ts
│   │   ├── version-switcher.ts
│   │   ├── storybook-iframe-sync.ts
│   │   ├── llm-link-copy.ts
│   │   └── theme-manager.ts
│   ├── styles/
│   │   ├── _variables.scss   # Общие переменные + импорт из figma-variables
│   │   ├── components/        # SCSS модули для компонентов
│   │   │   ├── _theme-switcher.module.scss
│   │   │   ├── _theme-select.module.scss
│   │   │   ├── _version-switcher.module.scss
│   │   │   ├── _storybook-iframe.module.scss
│   │   │   ├── _llm-link.module.scss
│   │   │   ├── _llms-links.module.scss
│   │   │   └── _changelog.module.scss
│   │   ├── global.css         # Глобальные стили и шрифты
│   │   └── starlight-overrides.css
│   ├── content/              # MDX контент
│   ├── layouts/              # Layout компоненты
│   └── pages/                # Страницы
```

## Принципы организации

### 1. Модульные SCSS стили

Все компоненты используют SCSS модули вместо инлайн стилей:

```astro
---
import styles from '../../styles/components/_component-name.module.scss';
---

<div class={styles['component-class']}>
  <!-- ... -->
</div>
```

**Преимущества:**
- ✅ Переиспользование стилей
- ✅ Использование SCSS переменных и миксинов
- ✅ Изоляция стилей (CSS Modules)
- ✅ Легче рефакторить и поддерживать
- ✅ Типизация классов

### 2. Design Tokens из figma-variables

Все переменные импортируются из `@sbercloud/figma-variables`:

```scss
// astro/src/styles/_variables.scss
@use '@sbercloud/figma-variables/build/scss/styles/styles.module.scss' as *;

// Теперь доступны все миксины и функции:
// - simple-var($map, $keys...)
// - composite-var($map, $keys...)
// - outline-var($map, $keys...)
```

**Доступные CSS переменные:**
- `--sn-theme-color-*` - цвета темы
- `--sn-theme-spacing-*` - отступы
- `--sl-color-*` - цвета Starlight

### 3. Вынесенные скрипты

Клиентская логика вынесена в отдельные TypeScript файлы:

```astro
<script>
  import '../../scripts/theme-switcher';
</script>
```

**Преимущества:**
- ✅ Переиспользование между компонентами
- ✅ Типизация
- ✅ Легче тестировать
- ✅ Auto-init с поддержкой SPA навигации Astro

## Использование переменных

### В SCSS модулях

```scss
@use '../variables' as *;

.my-component {
  padding: $spacing-md;
  border-radius: $radius-md;
  font-size: $font-size-sm;
  transition: all $transition-base;
  
  // Используем design tokens через CSS переменные
  background: var(--sn-theme-color-neutral-background1-level);
  color: var(--sn-theme-color-text-primary);
}
```

### Доступные SCSS переменные

```scss
// Spacing
$spacing-xs: 0.25rem;  // 4px
$spacing-sm: 0.5rem;   // 8px
$spacing-md: 1rem;     // 16px
$spacing-lg: 1.5rem;   // 24px
$spacing-xl: 2rem;     // 32px

// Border radius
$radius-sm: 0.25rem;   // 4px
$radius-md: 0.5rem;    // 8px
$radius-lg: 0.75rem;   // 12px

// Typography
$font-size-xs: 0.75rem;   // 12px
$font-size-sm: 0.875rem;  // 14px
$font-size-md: 1rem;      // 16px
$font-size-lg: 1.125rem;  // 18px

// Transitions
$transition-fast: 0.15s ease;
$transition-base: 0.2s ease;
$transition-slow: 0.3s ease;

// Breakpoints
$breakpoint-mobile: 640px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
```

## Создание нового компонента

### 1. Создайте SCSS модуль

```scss
// astro/src/styles/components/_my-component.module.scss
@use '../variables' as *;

.my-component {
  padding: $spacing-md;
  background: var(--sn-theme-color-neutral-background1-level);
  border-radius: $radius-md;
  
  &__title {
    font-size: $font-size-lg;
    color: var(--sn-theme-color-text-primary);
  }
  
  @media (max-width: $breakpoint-mobile) {
    padding: $spacing-sm;
  }
}
```

### 2. Создайте компонент

```astro
---
import styles from '../../styles/components/_my-component.module.scss';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div class={styles['my-component']}>
  <h2 class={styles['my-component__title']}>{title}</h2>
</div>
```

### 3. (Опционально) Создайте скрипт

```typescript
// astro/src/scripts/my-component.ts
export function initMyComponent(): void {
  // ... логика
}

// Auto-init
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMyComponent);
  } else {
    initMyComponent();
  }

  // Поддержка SPA навигации Astro
  document.addEventListener('astro:page-load', initMyComponent);
}
```

```astro
<script>
  import '../../scripts/my-component';
</script>
```

## Best Practices

### ❌ Не делать

```astro
<!-- Инлайн стили -->
<div style="padding: 1rem; background: #fff;">
  ...
</div>

<!-- Инлайн скрипты -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    // ... много кода
  });
</script>

<!-- <style> блоки -->
<style>
  .component {
    padding: 1rem;
  }
</style>
```

### ✅ Делать

```astro
---
import styles from '../../styles/components/_component.module.scss';
---

<div class={styles['component']}>
  ...
</div>

<script>
  import '../../scripts/component';
</script>
```

## Theme Support

Компоненты поддерживают темы через CSS переменные:

```scss
.my-component {
  background: var(--sn-theme-color-neutral-background1-level);
  
  // Theme-specific styles
  :global(.sn-light) & {
    border-color: rgba(0, 0, 0, 0.12);
  }

  :global(.sn-dark) & {
    border-color: rgba(255, 255, 255, 0.1);
  }
}
```

## Адаптивность

Используйте SCSS переменные для breakpoints:

```scss
@use '../variables' as *;

.my-component {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;

  @media (max-width: $breakpoint-tablet) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: $breakpoint-mobile) {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }
}
```
