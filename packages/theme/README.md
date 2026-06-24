# Theme

`@ds/theme` — Провайдер оформления — оси (цветовая схема, бренд, плотность, акрил) живут в контексте, полный набор sn-* классов эмитится на DOM-границе.

`@ds/theme` управляет оформлением дизайн-системы. **Оси оформления живут в React-контексте, а полный набор CSS-классов `sn-*` эмитится на DOM-границу.** `RootThemeProvider` ставится один раз в корне и держит оси (`colorScheme`, `brand`, `brandRole`, `density`, `acrylic`), эмитя из них полный набор `sn-*` на `rootRef` (обычно `<html>`). Локальные переопределения в поддереве делает `ChildThemeProvider`, а компонент, фиксирующий ось у себя, — хук `useThemeClassnames`.

Полное руководство по модели и подключению — в паттерне [Оформление — тема, бренд, плотность](/patterns/theme).

## Когда использовать

- Хост-приложение задаёт оформление в корне: `RootThemeProvider value={{ colorScheme, brand, density }}` (или `store` для multi-root / MFE через `getGlobalThemeStore().store`).
- Цветовая схема light/dark берётся из `useColorScheme` (cookie + `prefers-color-scheme` + кросс-таб) и передаётся в `value.colorScheme`.
- Часть дерева должна иметь другой бренд / плотность / схему — `ChildThemeProvider` сливает partial-переопределение с ближайшим контекстом.
- Компонент локально фиксирует ось (мобильная обёртка с `density: 'comfort'`) — `useThemeClassnames({ density })` подмешивает текущие colorScheme/brand из контекста.

> Полный набор `sn-*` обязателен на каждой границе: классы токенов не переопределяются по одной оси через CSS-каскад. Никогда не ставьте одиночный `sn-comfort` руками — для этого есть провайдеры и хук. Старый `ThemeProvider` / `useThemeConfig` (произвольные темы по `themeMap`) — отдельный legacy-механизм, не путать с `RootThemeProvider`.

## Установка

```bash
pnpm add @ds/theme
```

```tsx
import {
  RootThemeProvider,
  ChildThemeProvider,
  useThemeClassnames,
  useColorScheme,
  getGlobalThemeStore,
} from '@ds/theme'
```

## Примеры использования

### Бренд для поддерева

`ChildThemeProvider` сливает ось `brand` с ближайшим контекстом и реэмитит полный набор `sn-*` на своей границе.

```tsx
import { Block } from '@ds/block';
import { Button } from '@ds/button';
import { Counter } from '@ds/counter';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { BRAND, Brand, ChildThemeProvider } from '@ds/theme';
import { Flex } from '@ds/uikit-product-flex';
import { useState } from 'react';

const BRAND_ITEMS = Object.values(BRAND).map(value => ({ value, label: value }));

export function BrandSwitch() {
  const [brand, setBrand] = useState<Brand>(BRAND.A);

  return (
    <Flex direction='column' gap='2m' align='flex-start'>
      <SegmentControl items={BRAND_ITEMS} value={brand} onChange={value => setBrand(value as Brand)} />

      {/* ChildThemeProvider сливает ось `brand` с ближайшим контекстом и реэмитит полный набор
          sn-* на своей границе — акцентные цвета компонентов ниже меняются вслед за брендом. */}
      <ChildThemeProvider value={{ brand }}>
        <Block>
          <Flex gap='2m' align='center' wrap>
            <Button appearance='primary' label='Действие' />
            <Tag appearance='primary' label='Бренд' />
            <Counter value={8} appearance='primary' />
          </Flex>
        </Block>
      </ChildThemeProvider>
    </Flex>
  );
}
```

### Переключение цветовой схемы

Поддерево рендерится в выбранной схеме (`sn-light` / `sn-dark`). В приложении схема — источник истины `useColorScheme`.

```tsx
import { Block } from '@ds/block';
import { Button } from '@ds/button';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { ChildThemeProvider, COLOR_SCHEME, ColorScheme } from '@ds/theme';
import { Flex } from '@ds/uikit-product-flex';
import { useState } from 'react';

const SCHEME_ITEMS = [
  { value: COLOR_SCHEME.Light, label: 'Светлая' },
  { value: COLOR_SCHEME.Dark, label: 'Тёмная' },
];

export function ColorSchemeToggle() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(COLOR_SCHEME.Light);

  return (
    <Flex direction='column' gap='2m' align='flex-start'>
      <SegmentControl
        items={SCHEME_ITEMS}
        value={colorScheme}
        onChange={value => setColorScheme(value as ColorScheme)}
      />

      {/* В приложении colorScheme — источник истины `useColorScheme` (cookie + prefers-color-scheme),
          а корень держит RootThemeProvider. Здесь ChildThemeProvider переключает схему для поддерева:
          материал-подложка Block и компоненты на ней перекрашиваются вслед за схемой. */}
      <ChildThemeProvider value={{ colorScheme }}>
        <Block>
          <Flex gap='2m' align='center' wrap>
            <Button appearance='primary' label='Действие' />
            <Button appearance='neutral' view='outline' label='Отмена' />
            <Tag appearance='blue' label='Метка' />
          </Flex>
        </Block>
      </ChildThemeProvider>
    </Flex>
  );
}
```

### Локальная плотность

Компонент фиксирует `density` через `useThemeClassnames({ density })` — хук подмешивает текущие colorScheme/brand из контекста.

```tsx
import { Button } from '@ds/button';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { DENSITY, Density, useThemeClassnames } from '@ds/theme';
import { Flex } from '@ds/uikit-product-flex';
import { useState } from 'react';

const DENSITY_ITEMS = Object.values(DENSITY).map(value => ({ value, label: value }));

function DensitySurface({ density }: { density: Density }) {
  // useThemeClassnames({ density }) подмешивает текущие colorScheme/brand из контекста и навешивает
  // ПОЛНЫЙ набор sn-* (а не одиночный sn-comfort) — внутренние отступы компонентов меняются вслед
  // за плотностью, а тёмная тема при этом не ломается.
  const className = useThemeClassnames({ density });

  return (
    <div className={className}>
      <Flex gap='2m' align='center' wrap>
        <Button appearance='primary' label='Кнопка' />
        <Button appearance='neutral' view='outline' label='Ещё' />
        <Tag appearance='primary' label='Тег' />
      </Flex>
    </div>
  );
}

export function LocalDensity() {
  const [density, setDensity] = useState<Density>(DENSITY.Compact);

  return (
    <Flex direction='column' gap='2m' align='flex-start'>
      <SegmentControl items={DENSITY_ITEMS} value={density} onChange={value => setDensity(value as Density)} />
      <DensitySurface density={density} />
    </Flex>
  );
}
```

## Props

### RootThemeProvider

**RootThemeProviderProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | Дополнительный класс на wrapper-`<div>` (паддинги/фон). Только в wrapper-режиме (без `rootRef`). |
| `rootRef` | `RefObject<HTMLElement \| null>` | — | Внешний элемент для полного набора `sn-*` (обычно `<html>`/`<body>`). Если не задан — провайдер <br/> оборачивает children в `<div>` с этим набором. |
| `store` | `ThemeAppearanceStore` | — | Внешний реактивный стор оформления (`getGlobalThemeStore().store`). Если задан — приоритетнее <br/> `value`; подписанные провайдеры обновляются при смене темы без перерендера провайдера. Так один <br/> глобальный стор охватывает все микрофронты. Сеттер для shell — `getGlobalThemeStore().setAppearance`. |
| `value` | `ThemeAppearance` | — | Оформление приложения. Используется в static-режиме (один React-корень: SSR — одно значение на <br/> запрос, либо CSR с собственным state, напр. `colorScheme` из `useColorScheme`). Для multi-root <br/> (single-spa) — см. `store`. |

#### Related types

- `Brand` = `"brandA"` \| `"brandB"` \| `"brandC"`

- `BrandRole` = `"alter"` \| `"alter2"` \| `"alter3"` \| `"alter4"` \| `"main"`

- `ColorScheme` = `"dark"` \| `"light"`

- `Density` = `"comfort"` \| `"compact"` \| `"spacious"`

**ThemeAppearance**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `acrylic` | `boolean \| undefined` | — | Акрил (blur-материал) — `sn-yes` при `true`, иначе `sn-no`. |
| `brand` | `"brandA"` \| `"brandB"` \| `"brandC"` | — | Бренд — `sn-brandA` … |
| `brandRole` | `"alter"` \| `"alter2"` \| `"alter3"` \| `"alter4"` \| `"main"` | — | Роль бренда (палитра) — `sn-main` … |
| `colorScheme` | `"dark"` \| `"light"` | — | Цветовая схема — `sn-light` / `sn-dark`. |
| `density` | `"comfort"` \| `"compact"` \| `"spacious"` | — | Плотность — `sn-comfort` / `sn-compact` / `sn-spacious`. |

**ThemeAppearanceStore**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `getServerSnapshot` | `(() => ThemeAppearanceContextValue) \| undefined` | — | Значение для SSR/гидрации. Если не задан — используется `getSnapshot`. |
| `getSnapshot` | `() => ThemeAppearanceContextValue` | — | Текущее значение. Обязан возвращать стабильную (по `Object.is`) ссылку, пока значение не менялось. |
| `subscribe` | `(onStoreChange: () => void) => () => void` | — | Подписка на изменения; возвращает функцию отписки. |

### ChildThemeProvider

**ChildThemeProviderProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | Дополнительный класс на wrapper-`<div>` (паддинги/фон). Только в wrapper-режиме (без `rootRef`). |
| `rootRef` | `RefObject<HTMLElement \| null>` | — | Внешний элемент для полного слитого набора `sn-*`. Если не задан — провайдер оборачивает <br/> children в `<div>` с этим набором. |
| `value` | `ThemeAppearance` | — | Оси, переопределяемые в поддереве. Остальные наследуются от ближайшего родителя (слияние). |

#### Related types

- `Brand` = `"brandA"` \| `"brandB"` \| `"brandC"`

- `BrandRole` = `"alter"` \| `"alter2"` \| `"alter3"` \| `"alter4"` \| `"main"`

- `ColorScheme` = `"dark"` \| `"light"`

- `Density` = `"comfort"` \| `"compact"` \| `"spacious"`

**ThemeAppearance**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `acrylic` | `boolean \| undefined` | — | Акрил (blur-материал) — `sn-yes` при `true`, иначе `sn-no`. |
| `brand` | `"brandA"` \| `"brandB"` \| `"brandC"` | — | Бренд — `sn-brandA` … |
| `brandRole` | `"alter"` \| `"alter2"` \| `"alter3"` \| `"alter4"` \| `"main"` | — | Роль бренда (палитра) — `sn-main` … |
| `colorScheme` | `"dark"` \| `"light"` | — | Цветовая схема — `sn-light` / `sn-dark`. |
| `density` | `"comfort"` \| `"compact"` \| `"spacious"` | — | Плотность — `sn-comfort` / `sn-compact` / `sn-spacious`. |

## Смотри также

- [Оформление — тема, бренд, плотность](/patterns/theme) — полная модель подключения темы.
- **Adaptive** — раскладка `layoutType` (источник `density` в приложении).
- **Locale** — рантайм локализации.
- **PortalContext** — корневой DOM-узел для порталов.
