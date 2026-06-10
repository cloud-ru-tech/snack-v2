# Flex

`@ds/uikit-product-flex` — Контейнер для flex-раскладки: направление, выравнивание, перенос и отступы между детьми.

Контейнер для flex-раскладки. Управляет направлением, выравниванием, переносом и отступами между детьми через пропсы — без ручных `display: flex` и `gap` в разметке потребителя.

## Когда использовать

- Нужно расположить несколько элементов в ряд или столбец с предсказуемым отступом между ними.
- Требуется выравнивание группы по главной (`justify`) или поперечной (`align`) оси.
- Элементы должны переноситься на новую строку при нехватке места (`wrap`).

Когда **не** нужен:

- Двумерная сетка с явными строками и колонками:
  - используйте CSS Grid.
- Единичный элемент без соседей — обёртка-flex ничего не даёт.

## Анатомия

### Direction (default `row`)

Направление главной оси (проп `direction`). Тип — `Extract` валидных значений `flex-direction`:

- `row` / `row-reverse` — строка (и в обратном порядке).
- `column` / `column-reverse` — столбец (и в обратном порядке).

### Justify

Выравнивание по главной оси (`justify-content`). Тип — `Extract` из `CSSProperties['justifyContent']`:

- `flex-start` / `center` / `flex-end` — к началу / центру / концу.
- `space-between` / `space-around` / `space-evenly` / `stretch` — распределение свободного пространства.

### Align

Выравнивание по поперечной оси (`align-items`). Тип — `Extract` из `CSSProperties['alignItems']`:

- `flex-start` / `center` / `flex-end` — к началу / центру / концу.
- `self-start` / `self-end` — по краю с учётом `align-self`.
- `baseline` — по базовой линии текста.
- `stretch` — растянуть детей по поперечной оси.

### Align content

Выравнивание строк многострочного flex (`align-content`, проп `alignContent`, работает при `wrap`).
Тип — `Extract` из `CSSProperties['alignContent']`: `flex-start` / `center` / `flex-end` /
`space-between` / `space-around` / `space-evenly` / `stretch` / `baseline`.

### Wrap (default `nowrap`)

Перенос детей (`flex-wrap`). Принимает `boolean` (`true` → `wrap`) либо явное значение:

- `nowrap` — без переноса.
- `wrap` — перенос на новую строку.
- `wrap-reverse` — перенос в обратном порядке.

### Gap (default нет)

Отступ между детьми. Пропсы `gap` (CSS `gap`), `columnGap` (`column-gap`) и `rowGap`
(`row-gap`) принимают **только** токен модульной шкалы (m = модуль 8px, привязан к
dimension-токенам DS). Произвольные числа/строки не поддерживаются.

Модульная шкала:

- `025m` — 2px
- `050m` — 4px
- `1m` — 8px
- `2m` — 16px
- `3m` — 24px
- `4m` — 32px
- `5m` — 40px
- `6m` — 48px
- `7m` — 56px
- `8m` — 64px
- `9m` — 72px
- `10m` — 80px

Токены резолвятся через `data-*` + SCSS в CSS-переменные `--sn-primitive-dimension-*` (тема, override через CSS), без инлайн-стилей.

### Overflow

Поведение переполнения по осям (`overflow` / `overflowX` / `overflowY`). Тип — `Extract` из
`CSSProperties['overflow']`:

- `visible` — контент выходит за границы (по умолчанию).
- `hidden` / `clip` — обрезается.
- `scroll` — всегда со скроллом.
- `auto` — скролл при переполнении.

### Size (width / height / flex)

`width`, `height` и `flex` используют один тип `Size`:

- keyword `ElementSize` — `max-content` / `min-content` / `fit-content` / `auto` / `inherit` / `initial` / `unset`. Резолвится через `data-*` + SCSS.
- число — интерпретируется как px для `width`/`height` (`width={200}`), как `flex-grow` для `flex` (`flex={1}`). Инлайн-стилем.
- CSS-строку — `'50%'`, `'12rem'`, для `flex` — shorthand `'1 1 auto'`. Инлайн-стилем.

`fullWidth` — shorthand для `width: 100%`.

## Установка

```bash
pnpm add @ds/uikit-product-flex
```

```ts
import { Flex } from '@ds/uikit-product-flex'
import '@ds/uikit-product-flex/style.css'
```

## Примеры использования

### Тулбар

Главная и вторичные действия по краям, выравнивание по центру.

```tsx
import { Button } from '@ds/button';
import { Flex } from '@ds/uikit-product-flex';

export function Toolbar() {
  return (
    <Flex justify='space-between' align='center' gap='2m' fullWidth>
      <Button label='Назад' view='outline' appearance='neutral' />
      <Flex gap='1m'>
        <Button label='Отмена' view='outline' appearance='neutral' />
        <Button label='Сохранить' />
      </Flex>
    </Flex>
  );
}
```

### Вертикальный стек

direction='column' + gap для колонки одинаковой ширины.

```tsx
import { Button } from '@ds/button';
import { Flex } from '@ds/uikit-product-flex';

export function Stack() {
  return (
    <Flex direction='column' gap='1m' width={220}>
      <Button label='Первый' fullWidth />
      <Button label='Второй' fullWidth view='outline' appearance='neutral' />
      <Button label='Третий' fullWidth view='outline' appearance='neutral' />
    </Flex>
  );
}
```

### Перенос

wrap + gap в узком контейнере фиксированной ширины.

```tsx
import { Flex } from '@ds/uikit-product-flex';

const items = ['React', 'TypeScript', 'SCSS', 'Vite', 'Storybook', 'Playwright'];

const chipStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 12px',
  borderRadius: 16,
  background: 'var(--sn-theme-color-neutral-background1Level)',
  boxShadow: 'inset 0 0 0 1px var(--sn-theme-color-available-borderColor)',
} as const;

export function WrapTags() {
  return (
    <Flex wrap gap='1m' width={240}>
      {items.map(item => (
        <span key={item} style={chipStyle}>
          {item}
        </span>
      ))}
    </Flex>
  );
}
```

## Props

**FlexProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"baseline"` \| `"center"` \| `"flex-end"` \| `"flex-start"` \| `"self-end"` \| `"self-start"` \| `"stretch"` | — | Выравнивание по поперечной оси (`align-items`). |
| `alignContent` | `"baseline"` \| `"center"` \| `"flex-end"` \| `"flex-start"` \| `"space-around"` \| `"space-between"` \| `"space-evenly"` \| `"stretch"` | — | Выравнивание строк многострочного flex (`align-content`, работает при `wrap`). |
| `as` | `T` | — | Элемент или компонент для рендера. По умолчанию `div`. |
| `children` | `ReactNode` | — | Содержимое контейнера. |
| `className` | `string` | — | Дополнительный класс. |
| `columnGap` | `"025m"` \| `"050m"` \| `"10m"` \| `"1m"` \| `"2m"` \| `"3m"` \| `"4m"` \| `"5m"` \| `"6m"` \| `"7m"` \| `"8m"` \| `"9m"` | — | Отступ между колонками (CSS `column-gap`). Только токен модульной шкалы (см. `gap`). |
| `data-test-id` | `string` | — | Стабильный идентификатор для e2e/tests. |
| `direction` | `"column"` \| `"column-reverse"` \| `"row"` \| `"row-reverse"` | — | Направление главной оси (`flex-direction`). По умолчанию `row`. |
| `flex` | `Size` | — | Значение CSS-свойства `flex`. Keyword (`ElementSize` — `auto` / `max-content` / … → <br/> через `data-*`), число (`flex-grow`) или shorthand-строка (`'1 1 auto'`). |
| `fullWidth` | `boolean` | `false` | Растянуть контейнер на всю ширину родителя (`width: 100%`). |
| `gap` | `"025m"` \| `"050m"` \| `"10m"` \| `"1m"` \| `"2m"` \| `"3m"` \| `"4m"` \| `"5m"` \| `"6m"` \| `"7m"` \| `"8m"` \| `"9m"` | — | Отступ между детьми (CSS `gap`). Только токен модульной шкалы (привязан к <br/> dimension-токенам DS). <br/> <pre> <br/> 025m - 2px <br/> 050m - 4px <br/> 1m - 8px <br/> 2m - 16px <br/> 3m - 24px <br/> 4m - 32px <br/> 5m - 40px <br/> 6m - 48px <br/> 7m - 56px <br/> 8m - 64px <br/> 9m - 72px <br/> 10m - 80px <br/> </pre> |
| `height` | `Size` | — | Высота контейнера. Keyword (`ElementSize`), число (px) или CSS-строка (`'50%'`). |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`. |
| `justify` | `"center"` \| `"flex-end"` \| `"flex-start"` \| `"space-around"` \| `"space-between"` \| `"space-evenly"` \| `"stretch"` | — | Выравнивание по главной оси (`justify-content`). |
| `overflow` | `"auto"` \| `"clip"` \| `"hidden"` \| `"scroll"` \| `"visible"` | — | Переполнение по обеим осям (`overflow`). |
| `overflowX` | `"auto"` \| `"clip"` \| `"hidden"` \| `"scroll"` \| `"visible"` | — | Переполнение по горизонтали (`overflow-x`). |
| `overflowY` | `"auto"` \| `"clip"` \| `"hidden"` \| `"scroll"` \| `"visible"` | — | Переполнение по вертикали (`overflow-y`). |
| `rowGap` | `"025m"` \| `"050m"` \| `"10m"` \| `"1m"` \| `"2m"` \| `"3m"` \| `"4m"` \| `"5m"` \| `"6m"` \| `"7m"` \| `"8m"` \| `"9m"` | — | Отступ между строками (CSS `row-gap`). Только токен модульной шкалы (см. `gap`). |
| `style` | `CSSProperties` | — | Инлайн-стили, домешиваются последними и перекрывают `width`/`height`/`flex`. |
| `width` | `Size` | — | Ширина контейнера. Keyword (`ElementSize`), число (px) или CSS-строка (`'50%'`). |
| `wrap` | `Wrap` | — | Перенос детей (`flex-wrap`). `true` → `wrap`, `false` → `nowrap`, <br/> либо явное значение `nowrap` \| `wrap` \| `wrap-reverse`. |

#### Related types

- `Align` = `"baseline"` \| `"center"` \| `"flex-end"` \| `"flex-start"` \| `"self-end"` \| `"self-start"` \| `"stretch"`

- `AlignContent` = `"baseline"` \| `"center"` \| `"flex-end"` \| `"flex-start"` \| `"space-around"` \| `"space-between"` \| `"space-evenly"` \| `"stretch"`

- `Direction` = `"column"` \| `"column-reverse"` \| `"row"` \| `"row-reverse"`

- `GapToken` = `"025m"` \| `"050m"` \| `"10m"` \| `"1m"` \| `"2m"` \| `"3m"` \| `"4m"` \| `"5m"` \| `"6m"` \| `"7m"` \| `"8m"` \| `"9m"`

- `Justify` = `"center"` \| `"flex-end"` \| `"flex-start"` \| `"space-around"` \| `"space-between"` \| `"space-evenly"` \| `"stretch"`

- `Overflow` = `"auto"` \| `"clip"` \| `"hidden"` \| `"scroll"` \| `"visible"`

- `PolymorphicRef` = `ComponentPropsWithRef<T>["ref"]`

- `Size` = `number | (string & {}) | ElementSize`

- `Wrap` = `"nowrap"` \| `"wrap"` \| `"wrap-reverse"`

## Do / Don't

- ✅ Задавайте отступы через `gap` (токен модульной шкалы) — единый ритм с дизайн-системой.
- ❌ Не вставляйте distance-обёртки или `margin` между детьми вручную.
- ✅ Для произвольной ширины/высоты используйте `width` / `height` (число, keyword `ElementSize` или CSS-строка).
- ❌ Не оборачивайте `Flex` в дополнительный `div` со своим `display: flex` ради выравнивания.
- ✅ Берите `Flex` для одномерной раскладки (ряд или столбец).
- ❌ Не стройте на `Flex` двумерные сетки — это задача CSS Grid.
- ✅ Полиморфизм через `as` (`as='nav'`, `as='ul'`) — семантический тег без потери раскладки.
- ❌ Не дублируйте `Flex` ради смены тега — передайте `as`.
