# Решение проблемы с @sbercloud/figma-variables в Astro

## Проблема

При сборке Astro docs возникает ошибка:

```
Error: Can't find stylesheet to import.
@use '@sbercloud/figma-variables/build/scss/thememode/light.module' as light;
```

## Причина

Компоненты импортируют SCSS модули, которые отсутствуют в пакете `@sbercloud/figma-variables@0.0.1-beta.13`:

- `build/scss/thememode/light.module.scss` ❌
- `build/scss/adaptivemode/desktop.module.scss` ❌

## ✅ Что УЖЕ сделано

### 1. Подключен tokens.css в Astro

**Файл:** `apps/docs/src/styles/global.css`

```css
@import '@sbercloud/figma-variables/build/css/tokens.css';
```

Этот файл содержит ВСЕ необходимые CSS-переменные:

- Primitive colors
- Thememode (light/dark)
- Adaptivemode (desktop/mobile)
- Brandmode (brandA/brandB)
- Все компонентные токены

### 2. Классы применяются автоматически

**Файл:** `apps/docs/astro.config.mjs`

```javascript
head: [
  {
    tag: 'script',
    content: `(function(){...b.classList.add('sn-primitive','sn-figmaStyles','sn-conmonents','sn-desktop','sn-light','sn-brandA');...})();`,
  },
];
```

## ⚠️ Что осталось сделать

Для полной работоспособности нужно выбрать одно из решений:

### Вариант 1: Переписать SCSS компонентов (рекомендуется)

Заменить SCSS импорты на использование CSS-переменных напрямую.

**Было:**

```scss
@use '@sbercloud/figma-variables/build/scss/thememode/light.module' as light;

.button {
  border-color: base.simple-var(light.$sn-theme-color, 'neutral', 'decor');
}
```

**Стало:**

```scss
.button {
  border-color: var(--sn-theme-color-neutral-decor);
}
```

**Файлы для изменения:**

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

### Вариант 2: Создать заглушки (временное решение)

Создать файлы-заглушки с минимальными переменными:

**Файл:** `packages/_shims/scss/thememode/light.module.scss`

```scss
// Shim для отсутствующего модуля
$sn-theme-color: (
  'available': (
    'complementary': #000,
  ),
  'neutral': (
    'decor': #666,
    'accent': #666,
    'background1-level': #fff,
  ),
  'primary': (
    'decor': #000,
    'accent': #000,
  ), // ... остальные цвета
) !default;

$sn-theme-color-neutral-text: #000 !default;
$sn-theme-color-neutral-background1-level: #fff !default;
```

**Файл:** `packages/_shims/scss/adaptivemode/desktop.module.scss`

```scss
// Shim для отсутствующего модуля
$sn-adaptive: (
  'counters': (
    'round-corner': (
      'xs': 4px,
      's': 4px,
    ),
    'stroke-weigth': (
      'xs': 1px,
      's': 1px,
    ),
    'spacing-container': (
      'xs': 4px,
      's': 6px,
    ),
  ),
) !default;
```

Затем обновить импорты в компонентах или настроить alias в Vite.

### Вариант 3: Запросить обновление пакета

Обратиться к команде `@sbercloud/figma-variables` с запросом добавить отсутствующие SCSS модули в пакет.

## Как это работает в Storybook

В Storybook используется только CSS:

**Файл:** `.storybook/preview.tsx`

```typescript
import '@sbercloud/figma-variables/build/css/tokens.css';
// Все SCSS импорты закомментированы
```

Storybook НЕ импортирует SCSS модули в компонентах во время dev/build режима, он работает только с скомпилированными CSS модулями компонентов.

## Проверка доступных файлов

### ✅ CSS (все работает):

```bash
ls node_modules/@sbercloud/figma-variables/build/css/
# tokens.css ✅
# thememode/light.css ✅
# adaptivemode/desktop.css ✅
```

### ❌ SCSS (частично):

```bash
ls node_modules/@sbercloud/figma-variables/build/scss/
# styles/styles.module ✅
# components/* ✅
# thememode/ ❌ НЕТ
# adaptivemode/ ❌ НЕТ
```

## Рекомендация

**Используйте Вариант 1** - переписать компоненты на CSS-переменные:

### Преимущества:

- ✅ Нет зависимости от отсутствующих SCSS модулей
- ✅ Проще поддержка (меньше абстракций)
- ✅ Работает и в Storybook, и в Astro
- ✅ Напрямую использует tokens.css
- ✅ Меньше слоев абстракции

### Недостатки:

- ⚠️ Требует времени на рефакторинг
- ⚠️ Нужно найти соответствие между SCSS переменными и CSS-переменными

## Следующие шаги

1. Изучить структуру tokens.css для понимания имен CSS-переменных
2. Начать рефакторинг с одного компонента (например, Status)
3. Создать паттерн для остальных компонентов
4. Обновить все компоненты
5. Проверить сборку Astro и Storybook

## Полезные команды

```bash
# Просмотр доступных CSS-переменных
head -100 node_modules/@sbercloud/figma-variables/build/css/tokens.css

# Поиск использований light.$ в компонентах
rg "light\.\$" packages/

# Поиск использований adaptive.$ в компонентах
rg "adaptive\.\$" packages/

# Тестовая сборка Astro
pnpm --filter @design-system/docs build
```

## Дополнительная информация

- [Документация пакета](node_modules/@sbercloud/figma-variables/README.md)
- [Детальное описание проблемы](./SCSS_MODULES_ISSUE.md)
