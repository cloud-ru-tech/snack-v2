# SectionBasic

`@ds/site-section` — Базовая секция сайта — заголовок, вкладки, фильтры, произвольный контент и футер с пагинацией и кнопкой «Показать еще».

Базовая секция страницы сайта. Задаёт фоны, отступы и вертикальный ритм, собирает типовые блоки по данным: заголовок, вкладки, фильтры и футер. Содержимое между фильтрами и футером передаётся через `children`.

## Когда использовать

- Типовой блок лендинга или каталога: заголовок, контент, «Показать еще».
- Список с переключением вкладками и фильтрацией по полям.

Когда **не** нужен:

- Вёрстка внутри приложения консоли:
  - используйте компоненты `@ds/uikit-product-*`.

## Анатомия

У секции два фона:

- внешний — во всю ширину экрана;
- блок — по ширине `container`, по центру внешнего фона. В блоке лежит всё содержимое.

Блоки содержимого сверху вниз, каждый рендерится только при наличии данных:

- Заголовок — `SectionTitle` из `@ds/site-section-title`, тип `descriptionRight`: `description` справа от `title` на desktop и под ним на tablet/mobile. Строки могут содержать HTML-разметку (рендерятся через `@ds/site-rich-text`, который очищает HTML от XSS).
- Вкладки — `tabBarItems`, рендерятся как `TabsSegmented` из `@ds/site-tabs-segmented`. Выбор:
  - без `tabBarValue` хранится внутри секции, изначально — `defaultTabBarValue` или первая доступная вкладка;
  - с `tabBarValue` + `onTabBarChange` управляется снаружи, например из параметра URL `?tab=ai`.
- Фильтры — `filterItems`, поля `FieldSelect` размера `l`. Делят ширину поровну и переносятся на новую строку.
- Контент — `children`.
- Футер — `pagination` и `moreButton`. Текст кнопки по умолчанию — «Показать еще» из локали пакета.

### Container (обязательный)

Временная настройка на период редизайна: задаётся явно в каждом месте использования.

- `new` — целевой вид: блок до 1824 px, отступы меньше.
- `old` — визуальная совместимость со страницами до редизайна: блок до 1408 px (контент 1216 px), отступы как в прежней секции.

### Фоны

У секции два слоя, у каждого своя тема и заливка:

- `background` — внешний слой во всю ширину экрана (Figma `sectionBackground`):
  - `theme` — тема слоя. Не задана — тема страницы.
  - `fill` — заливка из `SECTION_BACKGROUND_FILL` (default `neutralBackground`).
- `containerBackground` — блок по ширине `container`, в нём всё содержимое (Figma `contentWrapper` + `bgLocal`):
  - `theme` — тема блока и содержимого. Не задана — тема внешнего слоя.
  - `type` — вид заливки (default `bg`).

`theme` принимает те же оси, что `ChildThemeProvider` из `@ds/theme` (`colorScheme`, `brand` и другие), поэтому блок может быть тёмным на светлом фоне и наоборот.

Заливка блока по `type`:

- `bg` — подложка из `SECTION_BACKGROUND_FILL`, поле `fill` (default `neutralBackground`).
- `image` — картинка во весь блок, поле `src`. Картинка декоративная и кадрируется по размеру блока.
- `accent` — акцентный цвет бренда.

Значения `SECTION_BACKGROUND_FILL`:

- `neutralBackground` — нейтральный фон страницы.
- `neutralBackground1Level` — светлая нейтральная подложка.
- `primaryBackground`, `redBackground`, `orangeBackground`, `yellowBackground`, `greenBackground`, `blueBackground`, `violetBackground`, `pinkBackground` — цветные подложки.
- `transparent`, `decorTransparent` — прозрачные подложки.

### Тег заголовка (default `h2`)

`titleTag` — `h1`, `h2`, `h3` или `h4`.

## Установка

```bash
pnpm add @ds/site-section
```

```ts
import { SectionBasic } from '@ds/site-section'
```

## Примеры использования

### Заголовок и контент

title, description и children

```tsx
import { SectionBasic } from '@ds/site-section';

export function TitleAndContent() {
  return (
    <SectionBasic container='new' title='Облачные сервисы' description='Инфраструктура, данные и AI в одном облаке.'>
      <p>Произвольный контент секции: карточки, сетка, карусель.</p>
    </SectionBasic>
  );
}
```

### Вкладки и фильтры

tabBarItems и filterItems

```tsx
import { SectionBasic } from '@ds/site-section';
import { useState } from 'react';

const TABS = [
  { value: 'infrastructure', label: 'Создание инфраструктуры' },
  { value: 'data', label: 'Данные' },
  { value: 'ai', label: 'Искусственный интеллект' },
];

const ITEMS = [
  { id: 'all', content: { label: 'Все' } },
  { id: 'popular', content: { label: 'Популярные' } },
  { id: 'new', content: { label: 'Новые' } },
];

export function TabsAndFilters() {
  const [category, setCategory] = useState('all');

  return (
    <SectionBasic
      container='new'
      title='Каталог'
      tabBarItems={TABS}
      filterItems={[
        {
          id: 'category',
          label: 'Категория',
          items: ITEMS,
          value: category,
          onChange: value => setCategory(String(value ?? 'all')),
        },
      ]}
    >
      <p>Выбрана категория: {category}</p>
    </SectionBasic>
  );
}
```

### Вкладка из URL

tabBarValue и onTabBarChange

```tsx
import { SectionBasic } from '@ds/site-section';
import { useState } from 'react';

const TABS = [
  { value: 'infrastructure', label: 'Создание инфраструктуры' },
  { value: 'data', label: 'Данные' },
  { value: 'ai', label: 'Искусственный интеллект' },
];

export function ControlledTabs() {
  // На странице начальное значение берётся из параметра URL, например `/catalog?tab=ai`.
  const [tab, setTab] = useState('ai');

  return (
    <SectionBasic container='new' title='Каталог' tabBarItems={TABS} tabBarValue={tab} onTabBarChange={setTab}>
      <p>Выбрана вкладка: {tab}</p>
    </SectionBasic>
  );
}
```

### Футер

pagination и moreButton

```tsx
import { SectionBasic } from '@ds/site-section';
import { useState } from 'react';

export function Footer() {
  const [page, setPage] = useState(1);
  const [shown, setShown] = useState(3);

  return (
    <SectionBasic
      container='new'
      title='Новости'
      pagination={{ total: 5, page, onChange: setPage }}
      moreButton={{ onClick: () => setShown(count => count + 3) }}
    >
      <p>
        Страница {page}, показано новостей: {shown}
      </p>
    </SectionBasic>
  );
}
```

### Тёмный блок на светлом фоне

background.theme и containerBackground.theme

```tsx
import { SectionBasic } from '@ds/site-section';

export function ContainerTheme() {
  return (
    <SectionBasic
      container='new'
      background={{ theme: { colorScheme: 'light' } }}
      containerBackground={{ type: 'bg', theme: { colorScheme: 'dark' } }}
      title='Облачные сервисы'
      description='Блок по ширине container тёмный, внешний фон остаётся светлым.'
      tabBarItems={[
        { value: 'infrastructure', label: 'Инфраструктура' },
        { value: 'data', label: 'Данные' },
      ]}
    >
      <p>Контент секции</p>
    </SectionBasic>
  );
}
```

### Акцентный блок

containerBackground={{ type: 'accent' }}

```tsx
import { SectionBasic } from '@ds/site-section';

export function AccentContainer() {
  return (
    <SectionBasic
      container='new'
      containerBackground={{ type: 'accent' }}
      title='Облачные сервисы'
      description='Блок по ширине container залит акцентным цветом бренда.'
    >
      <p>Контент секции</p>
    </SectionBasic>
  );
}
```

### Заливки слоёв

background.fill и containerBackground.fill

```tsx
import { SectionBasic } from '@ds/site-section';

export function BackgroundFill() {
  return (
    <SectionBasic
      container='new'
      background={{ fill: 'blueBackground' }}
      containerBackground={{ type: 'bg', fill: 'neutralBackground1Level' }}
      title='Облачные сервисы'
      description='Голубой внешний фон и светлая подложка блока.'
    >
      <p>Контент секции</p>
    </SectionBasic>
  );
}
```

### Совместимость со страницами до редизайна

container='old'

```tsx
import { SectionBasic } from '@ds/site-section';

export function OldContainer() {
  return (
    <SectionBasic container='old' title='Облачные сервисы' description='Отступы и ширина страниц до редизайна.'>
      <p>Контент секции</p>
    </SectionBasic>
  );
}
```

## Props

**SectionBasicProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `SectionBackground` | — | Внешний слой фона во всю ширину экрана (Figma `sectionBackground`): тема и заливка. |
| `children` | `ReactNode` | — | Содержимое секции между фильтрами и футером. |
| `className` | `string` | — | CSS-класс корня. |
| `container` | `"new"` \| `"old"` | — | Ширина и отступы секции: `new` — целевой вид, `old` — совместимость со страницами до редизайна. <br/> Временная настройка на период редизайна, задаётся явно. |
| `containerBackground` | `SectionContainerBackground` | `{ type: SECTION_CONTAINER_BACKGROUND_TYPE.Bg }` | Блок по ширине `container` (Figma `contentWrapper` + `bgLocal`): тема блока и всего содержимого и заливка — <br/> подложка, картинка или акцентный цвет. Тема не задана — тема внешнего слоя. |
| `data-test-id` | `string` | — |  |
| `defaultTabBarValue` | `string` | — | Изначально выбранная вкладка (uncontrolled). |
| `description` | `string` | — | Описание. Строка может содержать HTML-разметку. |
| `filterItems` | `CustomOptionProps` \| `DroplistListProps` \| `DroplistMobileSlots` \| `EmptyState` \| `FieldSelectDecoratorProps` \| `FieldSelectProps` \| `PublicListContextType` \| `ScrollProps` \| `SelectionState` | — | Поля-фильтры под вкладками. Рендерятся как `FieldSelect` размера `l`. |
| `id` | `string` | — | HTML-атрибут `id` секции — якорь для навигации по странице. |
| `moreButton` | `SectionMoreButton` | — | Кнопка «Показать еще» в футере. |
| `onTabBarChange` | `((value: string) => void)` | — | Колбэк выбора вкладки: значение `value` выбранного элемента `tabBarItems`. |
| `pagination` | `PaginationProps` | — | Пагинация в футере. |
| `tabBarItems` | `TabsSegmentedItem` | — | Вкладки под заголовком. Без `tabBarValue` / `defaultTabBarValue` изначально выбрана первая доступная. |
| `tabBarValue` | `string` | — | Выбранная вкладка (controlled), например из параметра URL `?tab=ai`. |
| `title` | `string` | — | Заголовок. Строка может содержать строчную HTML-разметку (`a`, `strong`, `em`, `br`). |
| `titleTag` | `"h1"` \| `"h2"` \| `"h3"` \| `"h4"` | — | Тег заголовка. |

#### Related types

**SectionBackground**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fill` | `"blueBackground"` \| `"decorTransparent"` \| `"greenBackground"` \| `"neutralBackground"` \| `"neutralBackground1Level"` \| `"orangeBackground"` \| `"pinkBackground"` \| `"primaryBackground"` \| `"redBackground"` \| `"transparent"` \| `"violetBackground"` \| `"yellowBackground"` | — | Заливка. По умолчанию `neutralBackground`. |
| `theme` | `ThemeAppearance` | — | Тема слоя. Не задана — тема страницы. |

- `SectionBackgroundFill` = `"blueBackground"` \| `"decorTransparent"` \| `"greenBackground"` \| `"neutralBackground"` \| `"neutralBackground1Level"` \| `"orangeBackground"` \| `"pinkBackground"` \| `"primaryBackground"` \| `"redBackground"` \| `"transparent"` \| `"violetBackground"` \| `"yellowBackground"`

- `SectionContainer` = `"new"` \| `"old"`

- `SectionContainerBackground` = `SectionContainerFill & { theme?: Partial<ThemeAppearance>; }`

**SectionMoreButton**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string \| undefined` | — | Тестовый id кнопки. По умолчанию — `TEST_IDS.moreButton`. |
| `href` | `string \| undefined` | — | Ссылка. Если задана, кнопка рендерится как `<a>`. |
| `label` | `string \| undefined` | — | Текст кнопки. По умолчанию — «Показать еще» из локали пакета. |
| `onClick` | `((event: MouseEvent<HTMLElement>) => void) \| undefined` | — | Колбэк клика. |

## Адаптивность

Раскладка читается из `AdaptiveProvider` (`@ds/adaptive`), пропа `layoutType` нет.

Отступы по раскладке и `container` (внешние — вокруг блока, внутренние — внутри блока, по вертикали / по горизонтали):

| Раскладка | `new`: внешние / внутренние | `old`: внешние / внутренние | Шаг между блоками |
|---|---|---|---|
| `desktop`, `desktopSmall` | 24 / 16 и 48 / 32 | 0 / 16 и 56 / 96 | 40 |
| `tablet` | 16 / 8 и 24 / 16 | 0 / 16 и 40 / 24 | 32 |
| `mobile` | 16 / 0 и 24 / 16 | 0 / 0 и 32 / 16 | 24 |

Вкладки на desktop — размер `l`, на tablet и mobile — `m`. Типографика заголовка — в документации `@ds/site-section-title`.
