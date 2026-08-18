# Figma variables

`@ds/figma-variables` — Figma design tokens (CSS custom properties, SCSS modules, TS) для дизайн-системы.

Пакет содержит только генерируемые артефакты: значения токенов экспортируются из Figma в `tokens/`, собираются style-dictionary и попадают в `build/`. JS-логики в нём нет — компоненты подключают SCSS-модули напрямую, приложение один раз импортирует runtime-слой с CSS-переменными.

## Установка

```bash
pnpm add @ds/figma-variables
```

## Состав

- `build/css/tokens.css` — runtime-слой: объявляет `:root { --sn-*: … }`
- `build/scss/styles/styles.module.scss` — общие токены темы и примитивы
- `build/scss/components/<name>.module.scss` — токены анатомии конкретного компонента
- `build/ts/styles.js`, `build/ts/styles.d.ts` — те же токены как TS-объект

## Использование

Runtime-слой подключается один раз в точке входа приложения. Без него значения `var(--sn-*)` пустые:

```ts
import '@ds/figma-variables/build/css/tokens.css'
```

Стили компонентов ссылаются на токены через SCSS-модули:

```scss
@use '@ds/figma-variables/build/scss/styles/styles.module' as base;

.root {
  outline: base.$sn-primitive-strokeWeight-strokeSemiBold solid base.$sn-theme-color-available-complementary;
}
```

Токены анатомии отдельного компонента лежат в `components/`:

```scss
@use '@ds/figma-variables/build/scss/components/table.module' as table;
```

## Регенерация

Собранный `build/` закоммичен, поэтому после клонирования всё работает сразу. Пересобирать нужно при изменении `tokens/`:

```bash
pnpm --filter @ds/figma-variables run build:tokens
```

Результат коммитится вместе с изменениями в `tokens/`.
