# Layout

`@ds/uikit-product-layout` — Блоки-состояния продуктового экрана — заглушка пустого состояния EmptyBlock и экран ограниченного доступа NoAccess.

Пакет `@ds/uikit-product-layout` — блоки-состояния продуктового экрана поверх `@ds/info-block` и `@ds/block`:

- `EmptyBlock` — заглушка пустого состояния (иконка, заголовок, описание, опциональный слот действий).
- `NoAccess` — экран ограниченного доступа с локализованным сообщением и lock-иконкой.

## Когда использовать

- `EmptyBlock`:
  - список, таблица или экран без данных;
  - нужна подсказка-действие («создать», «импортировать») через слот `footer`.
- `NoAccess`:
  - у пользователя нет прав на контент;
  - текст сообщения берётся из локали и не задаётся вручную.

## Анатомия

Оба компонента строятся на `@ds/block` + `@ds/info-block`: нейтральная подложка, иконка, заголовок, описание. У `EmptyBlock` опционален слот `footer`; у `NoAccess` — опциональный `serviceName` над блоком и локализованный текст.

## Установка

```bash
pnpm add @ds/uikit-product-layout
```

```ts
import { EmptyBlock, NoAccess } from '@ds/uikit-product-layout';
import '@ds/uikit-product-layout/style.css';
```

`NoAccess` берёт текст из `@ds/locale` — оберните приложение в `LocaleProvider`.

## Примеры использования

### EmptyBlock со слотом действий

```tsx
import { ButtonGroup } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { EmptyBlock } from '@ds/uikit-product-layout';

export function EmptyBlockWithFooter() {
  return (
    <EmptyBlock
      icon={{ icon: PlaceholderSVG }}
      title='Нет данных'
      content='Создайте первую запись, чтобы начать работу'
      footer={<ButtonGroup primaryAction={{ label: 'Создать' }} secondaryAction={{ label: 'Импортировать' }} />}
    />
  );
}
```

### NoAccess с названием сервиса

```tsx
import { LocaleProvider } from '@ds/locale';
import { NoAccess } from '@ds/uikit-product-layout';

export function NoAccessBasic() {
  return (
    <LocaleProvider lang='ru-RU'>
      <NoAccess serviceName='Название сервиса' />
    </LocaleProvider>
  );
}
```

## Props

### EmptyBlock

**EmptyBlockProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"horizontal"` \| `"vertical"` | — | Выравнивание иконки и текста |
| `className` | `string` | — | Дополнительный класс |
| `content` | `ReactNode` | — | Описание под заголовком |
| `data-test-id` | `string` | — |  |
| `footer` | `ReactNode` | — | Слот действий под текстом (например, `ButtonGroup`) |
| `icon` | `IconPredefinedProps` | — | Иконка |
| `layoutPresets` | `EmptyBlockLayoutDefaults` \| `LayoutPresets` | — | Override mobile-дефолтов адаптива для этого инстанса (deep-merge поверх `EMPTY_BLOCK_LAYOUT_PRESETS`). <br/> Escape-hatch: обычно не нужен — DS-пресет применяется автоматически по `AdaptiveProvider`. |
| `title` | `string` | — | Заголовок |

#### Related types

**EmptyBlockLayoutDefaults**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"horizontal"` \| `"vertical"` | — | Выравнивание иконки и текста |

### NoAccess

**NoAccessProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Дополнительный класс |
| `data-test-id` | `string` | — |  |
| `serviceName` | `string` | — | Заголовок над блоком (например, название сервиса) |

## Адаптивность

Оба компонента читают раскладку из контекста **`@ds/adaptive`** — отдельного пропа `layoutType` нет. Поставьте один `<AdaptiveProvider>` в корне приложения — mobile-поведение применяется автоматически.

> **Desktop-first.** Верстайте под desktop; override нужен только как escape-hatch.

### EmptyBlock

`EmptyBlock` — компонент класса preset-defaults: DOM один, по раскладке меняется дефолт `align` в `InfoBlock`.

| Проп    | desktop      | mobile     |
| ------- | ------------ | ---------- |
| `align` | `horizontal` | `vertical` |

Источник mobile-дефолтов — экспортируемая константа `EMPTY_BLOCK_LAYOUT_PRESETS`.

```tsx
import { EmptyBlock } from '@ds/uikit-product-layout'

// Явный проп — задаёт DESKTOP-значение; mobile остаётся vertical
<EmptyBlock align='horizontal' title='…' content='…' />

// Изменить mobile — только через layoutPresets
<EmptyBlock layoutPresets={{ mobile: { align: 'horizontal' } }} title='…' content='…' />
```

### NoAccess

На mobile контейнер сужается (`max-width: 360px`); на desktop — широкий (`max-width: 1200px`). Отдельных адаптивных пропов нет — поведение полностью определяется раскладкой из `AdaptiveProvider`.

Подробнее о модели раскладки — в **`@ds/adaptive`**.
