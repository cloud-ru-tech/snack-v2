# Header

`@ds/uikit-product-header` — Продуктовая шапка консоли — HeaderLayout, MainMenu, UserMenu, Logo, PathBreadcrumbs и PlatformLogo.

`@ds/uikit-product-header` — новая продуктовая шапка консоли на Snack V2: layout, главное меню с сегментами и избранным, меню пользователя, логотип и хлебные крошки.

## Когда использовать

- Новая навигация консоли с сегментами сервисов, избранным и настройками отображения карточек.
- Полная замена header на Snack V2 без legacy-контрактов Figma `headerOld` / `navigationOldDrawer`.
- Поэтапная миграция: `MenuMobile` (bottom sheet) подключается к legacy **`MainMenu`** через `customMobileMenu`.

Когда **не** нужен:

- Обратная совместимость со старым drawer и API `serviceGroups` / `LinksGroup`:
  - используйте **`@ds/uikit-product-header-legacy`**.

## Установка

```bash
pnpm add @ds/uikit-product-header
```

```ts
import { HeaderLayout, MainMenu, MenuMobile, UserMenu } from '@ds/uikit-product-header';
import '@ds/uikit-product-header/style.css';
```

## Смотри также

- **`@ds/uikit-product-header-legacy`** — legacy-шапка для параллельного релиза и `customMobileMenu`.
- **`@ds/adaptive`** — `AdaptiveProvider` / `layoutType` для desktop/mobile поверхностей.

## HeaderLayout

Компоновка слотов продуктовой шапки — меню, логотип, селектор, хлебные крошки и тулбар.

`HeaderLayout` — контейнер шапки консоли. Раскладывает переданные слоты по зонам: меню, логотип, селектор проекта, хлебные крошки и правый тулбар.

### Когда использовать

- Сборка верхней панели консоли из готовых блоков (`MainMenu`, `Logo`, `PathBreadcrumbs`, `UserMenu`).
- Единая раскладка шапки на desktop и mobile через `AdaptiveProvider`.

### Примеры использования

#### Полная шапка

Все слоты заполнены.

```tsx
import { HeaderLayout } from '@ds/uikit-product-header';

function Slot({ label }: { label: string }) {
  return <div style={{ padding: '4px 8px', fontSize: 12 }}>{label}</div>;
}

export function Basic() {
  return (
    <HeaderLayout
      menu={<Slot label='Menu' />}
      logo={<Slot label='Logo' />}
      select={<Slot label='Select' />}
      breadcrumbs={<Slot label='Breadcrumbs' />}
      toolbar={<Slot label='Toolbar' />}
      data-test-id='header-layout-basic'
    />
  );
}
```

#### Частичная компоновка

Слоты `select` и `toolbar` опциональны — можно не передавать.

```tsx
import { HeaderLayout } from '@ds/uikit-product-header';

function Slot({ label }: { label: string }) {
  return <div style={{ padding: '4px 8px', fontSize: 12 }}>{label}</div>;
}

export function PartialSlots() {
  return (
    <HeaderLayout
      menu={<Slot label='Menu' />}
      logo={<Slot label='Logo' />}
      breadcrumbs={<Slot label='Breadcrumbs' />}
      data-test-id='header-layout-partial'
    />
  );
}
```

### Props

**HeaderLayoutProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `breadcrumbs` | `ReactNode` | — |  |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `logo` | `ReactNode` | — |  |
| `menu` | `ReactNode` | — |  |
| `select` | `ReactNode` | — |  |
| `toolbar` | `ReactNode` | — |  |

## MainMenu

Главное меню навигации — сегменты сервисов, поиск, избранное и настройки отображения.

`MainMenu` — drawer с каталогом сервисов: сегменты, fuzzy-поиск, избранное, DnD групп и карточек.

- **Desktop** — resizable `@ds/drawer` слева: левая колонка (избранное, настройки), правая — сегменты и сетка карточек.
- **Mobile** — fullscreen bottom sheet (`MobileDrawerCustom`, `position='bottom'`): sticky header с логотипом, scroll-body, поиск и каталог.

Поверхность выбирается через `AdaptiveProvider` (`layoutType`).

### Когда использовать

- Навигация по каталогу облачных сервисов из шапки консоли (новая продуктовая навигация).
- Сценарии с избранным, недавними сервисами и настройками отображения карточек.
- Mobile-меню для микрофронта на legacy **`HeaderLayout`**: `MenuMobile` подключается через `customMobileMenu` у **`@ds/uikit-product-header-legacy` / MainMenu**.

Когда **не** нужен:

- Legacy drawer по Figma `navigationOldDrawer` / `navigationOldDrawerMobile`:
  - используйте **`@ds/uikit-product-header-legacy`**.

### Анатомия

#### Trigger и drawer

- trigger — `HeaderButton` с `MainMenuSVG` и tooltip «Сервисы».
- desktop drawer — resizable `DrawerCustom`, слева; drag-handle для ширины.
- mobile drawer — fullscreen bottom sheet; swipe отключён (`swipeEnabled={false}`).

#### Левая колонка (desktop)

- `leftTop` — слот над избранным (например, селектор платформы).
- `Favorites` — избранные сервисы с DnD (`MainMenuDndContext`).
- `settingItems` — административные пункты (`mapInnerLinksToListItems`).
- `leftBottom` — дополнительный слот внизу колонки.

#### Правая колонка (desktop)

- `rightTop` — баннеры.
- `Search` — fuzzy-поиск по каталогу.
- `segments` — сегменты с `SegmentControl` (если сегментов > 1).
- Сетка карточек `CardServiceSmall` по группам в активном сегменте.

#### Mobile body

- `MenuHeaderBrand` + divider — sticky header с кнопкой закрытия.
- `leftTop`, `Search`, `rightTop`, `Content` — в scroll-body.
- `settingItems` / `leftBottom` — нижняя зона (`MenuBottom`).
- Избранное без drag&drop (desktop-only DnD).

#### open / setOpen

Controlled-открытие drawer. Без `open` состояние держит сам компонент.

### Примеры использования

#### Базовое меню

Один сегмент с группами сервисов. Открывается кнопкой «Меню».

```tsx
import { ViewTileSVG } from '@ds/icons/interface/product';
import { MainMenu } from '@ds/uikit-product-header';

import { SERVICE_GROUPS } from '../../../stories/demoData';

export function Basic() {
  return (
    <MainMenu
      segments={[
        {
          id: 'allServices',
          label: 'Все сервисы',
          icon: <ViewTileSVG size={24} />,
          items: SERVICE_GROUPS.slice(0, 2),
        },
      ]}
      data-test-id='header-main-menu-basic'
    />
  );
}
```

#### С поиском

Controlled `search` фильтрует карточки по fuzzy-совпадению.

```tsx
import { ViewTileSVG } from '@ds/icons/interface/product';
import { MainMenu } from '@ds/uikit-product-header';
import { useState } from 'react';

import { SERVICE_GROUPS } from '../../../stories/demoData';

export function WithSearch() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <MainMenu
      segments={[
        {
          id: 'allServices',
          label: 'Все сервисы',
          icon: <ViewTileSVG size={24} />,
          items: SERVICE_GROUPS.slice(0, 3),
        },
      ]}
      search={{ value: searchValue, onChange: setSearchValue }}
      data-test-id='header-main-menu-search'
    />
  );
}
```

#### С избранным

`favorite.value` и `favorite.onChange` управляют списком избранных сервисов.

```tsx
import { ViewTileSVG } from '@ds/icons/interface/product';
import { MainMenu } from '@ds/uikit-product-header';
import { useState } from 'react';

import { SERVICE_GROUPS } from '../../../stories/demoData';

export function WithFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['inference']);

  return (
    <MainMenu
      segments={[
        {
          id: 'allServices',
          label: 'Все сервисы',
          icon: <ViewTileSVG size={24} />,
          items: SERVICE_GROUPS.slice(0, 2),
        },
      ]}
      favorite={{
        value: favoriteIds,
        onChange: productId => (addingValue: boolean) => {
          setFavoriteIds(prev => (addingValue ? [...prev, productId] : prev.filter(id => id !== productId)));
        },
      }}
      data-test-id='header-main-menu-favorites'
    />
  );
}
```

#### Интеграция с legacy MainMenu

```tsx
import { useState } from 'react';
import { MainMenu as LegacyMainMenu } from '@ds/uikit-product-header-legacy';
import { MenuMobile } from '@ds/uikit-product-header';

function LocalMainMenu() {
  const [open, setOpen] = useState(false);

  return (
    <LegacyMainMenu
      open={open}
      setOpen={setOpen}
      serviceGroups={legacyGroups}
      customMobileMenu={
        <MenuMobile
          open={open}
          setOpen={setOpen}
          segments={headerSegments}
        />
      }
    />
  );
}
```

### Props

**MainMenuProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeSegmentId` | `string` | — | Активный сегмент правой панели (значение SegmentControl, см. {@link MainMenuSegment.id}). <br/> Не передано — неуправляемое состояние (дефолт — первый сегмент с видимыми карточками). |
| `defaultWidth` | `number` | — | Ширина дровера, с которой открывается меню (desktop only) |
| `disabled` | `boolean` | — |  |
| `draggerTooltip` | `string` | — | Текст подсказки для драггера (desktop only) |
| `favorite` | `FavoriteProps` | — |  |
| `leftBottom` | `ReactNode` | — |  |
| `leftTop` | `ReactNode` | — |  |
| `loading` | `boolean` | — | Флаг загрузки данных |
| `logo` | `ReactNode` | — |  |
| `onActiveSegmentChange` | `((segmentId: string) => void)` | — | Колбэк смены активного сегмента правой панели. |
| `onSegmentExpandedChange` | `((segmentId: string, expandedGroupIds: string[]) => void)` | — | Колбэк при изменении набора раскрытых групп сегмента <br/> (без id синтетической группы избранного). |
| `onSegmentOrderChange` | `((segmentId: string, orderedGroupIds: string[]) => void)` | — | Колбэк после DnD групп в сегменте (без id синтетической группы избранного). |
| `onSegmentServiceClick` | `((service: InnerLink, e?: MouseEvent<HTMLElement, MouseEvent>) => void)` | — | Колбэк клика по карточке сервиса в сегменте. |
| `onWidthChangeEnd` | `((width: number) => void)` | — | Вызывается при окончании изменения ширины дровера (desktop only) |
| `open` | `boolean` | — |  |
| `platformGroups` | `LinksGroup` | — | Платформенные группы (например «Облачные продукты», «Другие продукты»). <br/> Без поиска в сетке карточек **не отображаются**. <br/> С поиском: попадают в результаты при совпадении; порядок — <br/> после совпадений из сегментов без `pinBottomOnSearch`, перед сегментами с `pinBottomOnSearch`. <br/> Обычно `favoritesEnabled: false`; карточки могут быть без `icon` (Avatar по `label`). |
| `preferences` | `MainMenuPreferencesProps` | — | Настройки меню (модалка по кнопке в тулбаре): описания карточек, цвета групп. <br/> Не передано — кнопка настроек в тулбаре не отображается. |
| `rightTop` | `ReactNode` | — | Слот над тулбаром правой колонки (например, баннеры) |
| `search` | `SearchProps` | — |  |
| `searchGroups` | `LinksGroup` | — | Результаты поиска (уже смерженные); в обычном режиме не используются. |
| `segmentPrefs` | `MainMenuSegmentPrefs` | — | Пользовательские prefs сегментов (порядок / раскрытие групп). <br/> Нет записи для сегмента или omit `order` / `expanded` → uncontrolled для этого поля. |
| `segments` | `MainMenuSegment` | — | Сегменты правой панели (сетка карточек) — только каталог. <br/> При поиске: совпадения из сегментов без `pinBottomOnSearch` → `platformGroups` → сегменты с `pinBottomOnSearch`. <br/> Если один и тот же {@link InnerLink.id} совпал сразу в нескольких сегментах — остаётся только <br/> первое по этому приоритету вхождение, остальные (и опустевшие после этого группы) не показываются. <br/> При `segments.length > 1` показывается SegmentControl (скрывается во время поиска). <br/> Порядок и раскрытие групп — через `segmentPrefs` и колбэки ниже. |
| `setOpen` | `((open: boolean) => void)` | — |  |
| `settingItems` | `InnerLink` \| `MainMenuSettingsItem` | — | Пункты левой колонки (desktop) / нижней части списка (mobile). <br/> Плоский список (`dividerBefore` для разделителей). <br/> Не связан с сегментами правой панели и не меняется при сортировке групп в сегментах. |

##### Related types

**FavoriteProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `BaseItemProps` | — | Действия для списка сервисов |
| `loading` | `boolean \| undefined` | — | Флаг загрузки данных |
| `onChange` | `(productId: string) => (addingValue: boolean, position?: number) => void` | — | Колбэк переключения избранного для карточки сервиса. <br/> `position` передаётся при добавлении через drag из сетки сервисов — индекс, <br/> на который должна встать карточка среди избранного (см. <br/> {@link <br/> FavoriteProps.onOrderChange <br/> } <br/> ). <br/> При переключении избранного кликом не передаётся. |
| `onFavoriteServiceClick` | `((serviceId: string, event?: MouseEvent<HTMLElement>) => void) \| undefined` | — | Колбэк клика по карточке сервиса в сегменте «Избранное» |
| `onOrderChange` | `((orderedIds: string[]) => void) \| undefined` | — | Колбэк вызывается после перетаскивания карточек внутри избранного с новым порядком id. <br/> Добавление новой карточки через drag из сетки сервисов идёт через <br/> {@link <br/> FavoriteProps.onChange <br/> } <br/> с `position` — этот колбэк для такого добавления не вызывается. |
| `onRecentServiceClick` | `((serviceId: string, event?: MouseEvent<HTMLElement>) => void) \| undefined` | — | Колбэк клика по карточке сервиса в сегменте «Недавнее» |
| `onSegmentChange` | `((segment: FavoritesSegment) => void) \| undefined` | — | Колбэк смены сегмента панели избранного. |
| `recentServices` | `string[] \| undefined` | — | Список id недавно открытых сервисов |
| `segment` | `"favorites"` \| `"recent"` | — | Активный сегмент («Избранное» / «Недавнее») в панели избранного. <br/> Не передано — неуправляемое состояние (дефолт `'favorites'`). |
| `value` | `string[]` | — | Список id избранных сервисов |

- `FavoritesSegment` = `"favorites"` \| `"recent"`

**InnerLink**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aliases` | `string[]` | — | Синонимы для fuzzy-поиска. |
| `badge` | `CardServiceLightProps` \| `PromoTagPredefinedBaseProps` | — |  |
| `description` | `string \| undefined` | — | Краткое описание сервиса — отображается при включённом переключателе «Описание». |
| `disabled` | `boolean \| undefined` | — |  |
| `expandableEnabled` | `boolean \| undefined` | — | Разрешено ли раскрытие карточки. default=false - Запрещено |
| `favoritesEnabled` | `boolean \| undefined` | — | Разрешено ли добавление карточки в избранное. default=true - разрешено |
| `hidden` | `boolean \| undefined` | — |  |
| `href` | `string \| undefined` | — |  |
| `icon` | `JSXElementConstructor<{ size?: number; className?: string; }> \| undefined` | — | Иконка карточки. |
| `id` | `string` | — | Уникальный идентификатор карточки (также используется в избранном и при поиске). <br/> Один и тот же сервис может быть представлен в разных сегментах с разной <br/> детализацией (простая карточка в общем каталоге и раскрытая с вложенными <br/> сервисами версия в другом сегменте) — в этом случае обеим версиям задаётся <br/> общий `id`. При поиске из совпадений с одинаковым `id` в разных сегментах <br/> остаётся только первое по приоритету сегментов (см. <br/> {@link <br/> MainMenuProps.segments <br/> } <br/> ). |
| `items` | `InnerLink` | — | Вложенные сервисы подкатегории. <br/> При наличии карточка раскрывается аккордеоном: в свёрнутом виде — обычная карточка <br/> с кнопкой раскрытия, в развёрнутом — заголовок <br/> {@link <br/> TitleClickable <br/> } <br/> и сетка вложенных сервисов. |
| `label` | `string` | — | Заголовок карточки. |
| `onClick` | `(e?: MouseEvent<HTMLElement>) => void` | — |  |

**LinksGroup**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aliases` | `string[] \| undefined` | — | Синонимы заголовка группы для fuzzy-поиска. |
| `blockColor` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Цвет блока группы. |
| `favoritesEnabled` | `boolean \| undefined` | — | Разрешено ли добавление карточек группы в избранное. |
| `hidden` | `boolean \| undefined` | — |  |
| `highlight` | `boolean \| undefined` | — | Визуальное выделение группы |
| `icon` | `JSXElementConstructor<{ size?: number; className?: string; }> \| undefined` | — |  |
| `id` | `string` | — | Уникальный идентификатор группы (якорь скролла, поиск по id). |
| `items` | `InnerLink` | — | Карточки сервисов или ссылок внутри группы. |
| `label` | `LinksGroupTitle` \| `TitleClickable` \| `TitleStatic` | — | Заголовок группы в сетке карточек и в боковой навигации. |
| `onClick` | `((e?: MouseEvent<HTMLElement>) => void) \| undefined` | — |  |

- `LinksGroupBlockColor` = `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"`

- `LinksGroupTitle` = `TitleStatic | TitleClickable`

**MainMenuPreferencesProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onOpenChange` | `((open: boolean) => void) \| undefined` | — | Колбэк открытия/закрытия модалки. |
| `open` | `boolean \| undefined` | — | Открыта ли модалка настроек. <br/> Не передано — состояние открытия неуправляемое (модалка сама переключает себя по клику на кнопку). |
| `showDescription` | `MainMenuToggleProps` | — | Показывать описания сервисов в карточках. |
| `showGroupsColors` | `MainMenuToggleProps` | — | Отображать цвета блоков групп ( <br/> {@link <br/> LinksGroup.blockColor <br/> } <br/> ). <br/> `value: false` скрывает цвета всех групп независимо от заданного `blockColor`. |

**MainMenuSegment**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Иконка сегмента в SegmentControl; без неё — только `label`. |
| `id` | `string` | — | Уникальный идентификатор сегмента (значение SegmentControl). |
| `items` | `LinksGroup` | — | Группы карточек сегмента (каталог). |
| `label` | `string` | — | Подпись сегмента в SegmentControl. |
| `pinBottomOnSearch` | `boolean \| undefined` | — | Группы сегмента в выдаче поиска — после совпадений из обычных сегментов и `platformGroups`. |

**MainMenuSegmentPrefs**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `expanded` | `string[] \| undefined` | — | Id раскрытых групп. Если не передан — uncontrolled (по умолчанию все раскрыты). |
| `id` | `string` | — | Id сегмента из <br/> {@link <br/> MainMenuSegment.id <br/> } <br/> . |
| `order` | `string[] \| undefined` | — | Порядок id групп. Если не передан — uncontrolled для этого сегмента <br/> (дефолт = порядок `items`; новые группы добавляются в конец). |

**MainMenuSettingsItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `divider` | `"after"` \| `"before"` | — |  |
| `hidden` | `boolean \| undefined` | — |  |
| `href` | `string \| undefined` | — |  |
| `icon` | `JSXElementConstructor<{ size?: number; className?: string; }> \| undefined` | — | Иконка карточки. |
| `id` | `string` | — | Уникальный идентификатор карточки (также используется в избранном и при поиске). <br/> Один и тот же сервис может быть представлен в разных сегментах с разной <br/> детализацией (простая карточка в общем каталоге и раскрытая с вложенными <br/> сервисами версия в другом сегменте) — в этом случае обеим версиям задаётся <br/> общий `id`. При поиске из совпадений с одинаковым `id` в разных сегментах <br/> остаётся только первое по приоритету сегментов (см. <br/> {@link <br/> MainMenuProps.segments <br/> } <br/> ). |
| `label` | `string` | — | Заголовок карточки. |
| `onClick` | `(e?: MouseEvent<HTMLElement>) => void` | — |  |

**MainMenuToggleProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onChange` | `(value: boolean) => void` | — |  |
| `value` | `boolean` | — |  |

**SearchProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onBlur` | `FocusEventHandler<HTMLInputElement> \| undefined` | — | Колбек обработки потери фокуса |
| `onChange` | `(value: string) => void` | — |  |
| `onFocus` | `FocusEventHandler<HTMLInputElement> \| undefined` | — | Колбек обработки получения фокуса |
| `onSearchNoResult` | `((value: string) => void) \| undefined` | — |  |
| `value` | `string` | — |  |

**TitleClickable**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string \| undefined` | — |  |
| `onClick` | `((e?: MouseEvent<HTMLElement>) => void) \| undefined` | — |  |
| `text` | `string` | — |  |

**TitleStatic**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `undefined` | — |  |
| `onClick` | `undefined` | — |  |
| `text` | `string` | — |  |

### Смотри также

- **`@ds/uikit-product-header-legacy` / MainMenu** — legacy drawer и проп `customMobileMenu`.
- **`@ds/uikit-product-card-predefined`** — карточки сервисов в сетке.
### MenuMobile

`MenuMobile` экспортируется из `@ds/uikit-product-header` отдельно от `MainMenu` — тот же API (`MainMenuProps`), но без кнопки-триггера. Используется:

- внутри `MainMenu` на mobile-поверхности;
- в legacy-интеграции: `customMobileMenu` у `@ds/uikit-product-header-legacy` / `MainMenu`.

```ts
import { MainMenu, MenuMobile } from '@ds/uikit-product-header';
```

**MainMenuProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeSegmentId` | `string` | — | Активный сегмент правой панели (значение SegmentControl, см. {@link MainMenuSegment.id}). <br/> Не передано — неуправляемое состояние (дефолт — первый сегмент с видимыми карточками). |
| `defaultWidth` | `number` | — | Ширина дровера, с которой открывается меню (desktop only) |
| `disabled` | `boolean` | — |  |
| `draggerTooltip` | `string` | — | Текст подсказки для драггера (desktop only) |
| `favorite` | `FavoriteProps` | — |  |
| `leftBottom` | `ReactNode` | — |  |
| `leftTop` | `ReactNode` | — |  |
| `loading` | `boolean` | — | Флаг загрузки данных |
| `logo` | `ReactNode` | — |  |
| `onActiveSegmentChange` | `((segmentId: string) => void)` | — | Колбэк смены активного сегмента правой панели. |
| `onSegmentExpandedChange` | `((segmentId: string, expandedGroupIds: string[]) => void)` | — | Колбэк при изменении набора раскрытых групп сегмента <br/> (без id синтетической группы избранного). |
| `onSegmentOrderChange` | `((segmentId: string, orderedGroupIds: string[]) => void)` | — | Колбэк после DnD групп в сегменте (без id синтетической группы избранного). |
| `onSegmentServiceClick` | `((service: InnerLink, e?: MouseEvent<HTMLElement, MouseEvent>) => void)` | — | Колбэк клика по карточке сервиса в сегменте. |
| `onWidthChangeEnd` | `((width: number) => void)` | — | Вызывается при окончании изменения ширины дровера (desktop only) |
| `open` | `boolean` | — |  |
| `platformGroups` | `LinksGroup` | — | Платформенные группы (например «Облачные продукты», «Другие продукты»). <br/> Без поиска в сетке карточек **не отображаются**. <br/> С поиском: попадают в результаты при совпадении; порядок — <br/> после совпадений из сегментов без `pinBottomOnSearch`, перед сегментами с `pinBottomOnSearch`. <br/> Обычно `favoritesEnabled: false`; карточки могут быть без `icon` (Avatar по `label`). |
| `preferences` | `MainMenuPreferencesProps` | — | Настройки меню (модалка по кнопке в тулбаре): описания карточек, цвета групп. <br/> Не передано — кнопка настроек в тулбаре не отображается. |
| `rightTop` | `ReactNode` | — | Слот над тулбаром правой колонки (например, баннеры) |
| `search` | `SearchProps` | — |  |
| `searchGroups` | `LinksGroup` | — | Результаты поиска (уже смерженные); в обычном режиме не используются. |
| `segmentPrefs` | `MainMenuSegmentPrefs` | — | Пользовательские prefs сегментов (порядок / раскрытие групп). <br/> Нет записи для сегмента или omit `order` / `expanded` → uncontrolled для этого поля. |
| `segments` | `MainMenuSegment` | — | Сегменты правой панели (сетка карточек) — только каталог. <br/> При поиске: совпадения из сегментов без `pinBottomOnSearch` → `platformGroups` → сегменты с `pinBottomOnSearch`. <br/> Если один и тот же {@link InnerLink.id} совпал сразу в нескольких сегментах — остаётся только <br/> первое по этому приоритету вхождение, остальные (и опустевшие после этого группы) не показываются. <br/> При `segments.length > 1` показывается SegmentControl (скрывается во время поиска). <br/> Порядок и раскрытие групп — через `segmentPrefs` и колбэки ниже. |
| `setOpen` | `((open: boolean) => void)` | — |  |
| `settingItems` | `InnerLink` \| `MainMenuSettingsItem` | — | Пункты левой колонки (desktop) / нижней части списка (mobile). <br/> Плоский список (`dividerBefore` для разделителей). <br/> Не связан с сегментами правой панели и не меняется при сортировке групп в сегментах. |

##### Related types

**FavoriteProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `BaseItemProps` | — | Действия для списка сервисов |
| `loading` | `boolean \| undefined` | — | Флаг загрузки данных |
| `onChange` | `(productId: string) => (addingValue: boolean, position?: number) => void` | — | Колбэк переключения избранного для карточки сервиса. <br/> `position` передаётся при добавлении через drag из сетки сервисов — индекс, <br/> на который должна встать карточка среди избранного (см. <br/> {@link <br/> FavoriteProps.onOrderChange <br/> } <br/> ). <br/> При переключении избранного кликом не передаётся. |
| `onFavoriteServiceClick` | `((serviceId: string, event?: MouseEvent<HTMLElement>) => void) \| undefined` | — | Колбэк клика по карточке сервиса в сегменте «Избранное» |
| `onOrderChange` | `((orderedIds: string[]) => void) \| undefined` | — | Колбэк вызывается после перетаскивания карточек внутри избранного с новым порядком id. <br/> Добавление новой карточки через drag из сетки сервисов идёт через <br/> {@link <br/> FavoriteProps.onChange <br/> } <br/> с `position` — этот колбэк для такого добавления не вызывается. |
| `onRecentServiceClick` | `((serviceId: string, event?: MouseEvent<HTMLElement>) => void) \| undefined` | — | Колбэк клика по карточке сервиса в сегменте «Недавнее» |
| `onSegmentChange` | `((segment: FavoritesSegment) => void) \| undefined` | — | Колбэк смены сегмента панели избранного. |
| `recentServices` | `string[] \| undefined` | — | Список id недавно открытых сервисов |
| `segment` | `"favorites"` \| `"recent"` | — | Активный сегмент («Избранное» / «Недавнее») в панели избранного. <br/> Не передано — неуправляемое состояние (дефолт `'favorites'`). |
| `value` | `string[]` | — | Список id избранных сервисов |

- `FavoritesSegment` = `"favorites"` \| `"recent"`

**InnerLink**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aliases` | `string[]` | — | Синонимы для fuzzy-поиска. |
| `badge` | `CardServiceLightProps` \| `PromoTagPredefinedBaseProps` | — |  |
| `description` | `string \| undefined` | — | Краткое описание сервиса — отображается при включённом переключателе «Описание». |
| `disabled` | `boolean \| undefined` | — |  |
| `expandableEnabled` | `boolean \| undefined` | — | Разрешено ли раскрытие карточки. default=false - Запрещено |
| `favoritesEnabled` | `boolean \| undefined` | — | Разрешено ли добавление карточки в избранное. default=true - разрешено |
| `hidden` | `boolean \| undefined` | — |  |
| `href` | `string \| undefined` | — |  |
| `icon` | `JSXElementConstructor<{ size?: number; className?: string; }> \| undefined` | — | Иконка карточки. |
| `id` | `string` | — | Уникальный идентификатор карточки (также используется в избранном и при поиске). <br/> Один и тот же сервис может быть представлен в разных сегментах с разной <br/> детализацией (простая карточка в общем каталоге и раскрытая с вложенными <br/> сервисами версия в другом сегменте) — в этом случае обеим версиям задаётся <br/> общий `id`. При поиске из совпадений с одинаковым `id` в разных сегментах <br/> остаётся только первое по приоритету сегментов (см. <br/> {@link <br/> MainMenuProps.segments <br/> } <br/> ). |
| `items` | `InnerLink` | — | Вложенные сервисы подкатегории. <br/> При наличии карточка раскрывается аккордеоном: в свёрнутом виде — обычная карточка <br/> с кнопкой раскрытия, в развёрнутом — заголовок <br/> {@link <br/> TitleClickable <br/> } <br/> и сетка вложенных сервисов. |
| `label` | `string` | — | Заголовок карточки. |
| `onClick` | `(e?: MouseEvent<HTMLElement>) => void` | — |  |

**LinksGroup**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aliases` | `string[] \| undefined` | — | Синонимы заголовка группы для fuzzy-поиска. |
| `blockColor` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Цвет блока группы. |
| `favoritesEnabled` | `boolean \| undefined` | — | Разрешено ли добавление карточек группы в избранное. |
| `hidden` | `boolean \| undefined` | — |  |
| `highlight` | `boolean \| undefined` | — | Визуальное выделение группы |
| `icon` | `JSXElementConstructor<{ size?: number; className?: string; }> \| undefined` | — |  |
| `id` | `string` | — | Уникальный идентификатор группы (якорь скролла, поиск по id). |
| `items` | `InnerLink` | — | Карточки сервисов или ссылок внутри группы. |
| `label` | `LinksGroupTitle` \| `TitleClickable` \| `TitleStatic` | — | Заголовок группы в сетке карточек и в боковой навигации. |
| `onClick` | `((e?: MouseEvent<HTMLElement>) => void) \| undefined` | — |  |

- `LinksGroupBlockColor` = `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"`

- `LinksGroupTitle` = `TitleStatic | TitleClickable`

**MainMenuPreferencesProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onOpenChange` | `((open: boolean) => void) \| undefined` | — | Колбэк открытия/закрытия модалки. |
| `open` | `boolean \| undefined` | — | Открыта ли модалка настроек. <br/> Не передано — состояние открытия неуправляемое (модалка сама переключает себя по клику на кнопку). |
| `showDescription` | `MainMenuToggleProps` | — | Показывать описания сервисов в карточках. |
| `showGroupsColors` | `MainMenuToggleProps` | — | Отображать цвета блоков групп ( <br/> {@link <br/> LinksGroup.blockColor <br/> } <br/> ). <br/> `value: false` скрывает цвета всех групп независимо от заданного `blockColor`. |

**MainMenuSegment**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Иконка сегмента в SegmentControl; без неё — только `label`. |
| `id` | `string` | — | Уникальный идентификатор сегмента (значение SegmentControl). |
| `items` | `LinksGroup` | — | Группы карточек сегмента (каталог). |
| `label` | `string` | — | Подпись сегмента в SegmentControl. |
| `pinBottomOnSearch` | `boolean \| undefined` | — | Группы сегмента в выдаче поиска — после совпадений из обычных сегментов и `platformGroups`. |

**MainMenuSegmentPrefs**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `expanded` | `string[] \| undefined` | — | Id раскрытых групп. Если не передан — uncontrolled (по умолчанию все раскрыты). |
| `id` | `string` | — | Id сегмента из <br/> {@link <br/> MainMenuSegment.id <br/> } <br/> . |
| `order` | `string[] \| undefined` | — | Порядок id групп. Если не передан — uncontrolled для этого сегмента <br/> (дефолт = порядок `items`; новые группы добавляются в конец). |

**MainMenuSettingsItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `divider` | `"after"` \| `"before"` | — |  |
| `hidden` | `boolean \| undefined` | — |  |
| `href` | `string \| undefined` | — |  |
| `icon` | `JSXElementConstructor<{ size?: number; className?: string; }> \| undefined` | — | Иконка карточки. |
| `id` | `string` | — | Уникальный идентификатор карточки (также используется в избранном и при поиске). <br/> Один и тот же сервис может быть представлен в разных сегментах с разной <br/> детализацией (простая карточка в общем каталоге и раскрытая с вложенными <br/> сервисами версия в другом сегменте) — в этом случае обеим версиям задаётся <br/> общий `id`. При поиске из совпадений с одинаковым `id` в разных сегментах <br/> остаётся только первое по приоритету сегментов (см. <br/> {@link <br/> MainMenuProps.segments <br/> } <br/> ). |
| `label` | `string` | — | Заголовок карточки. |
| `onClick` | `(e?: MouseEvent<HTMLElement>) => void` | — |  |

**MainMenuToggleProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onChange` | `(value: boolean) => void` | — |  |
| `value` | `boolean` | — |  |

**SearchProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onBlur` | `FocusEventHandler<HTMLInputElement> \| undefined` | — | Колбек обработки потери фокуса |
| `onChange` | `(value: string) => void` | — |  |
| `onFocus` | `FocusEventHandler<HTMLInputElement> \| undefined` | — | Колбек обработки получения фокуса |
| `onSearchNoResult` | `((value: string) => void) \| undefined` | — |  |
| `value` | `string` | — |  |

**TitleClickable**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string \| undefined` | — |  |
| `onClick` | `((e?: MouseEvent<HTMLElement>) => void) \| undefined` | — |  |
| `text` | `string` | — |  |

**TitleStatic**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `undefined` | — |  |
| `onClick` | `undefined` | — |  |
| `text` | `string` | — |  |

### Адаптивность

| Проп / поведение | Desktop | Mobile |
| --- | --- | --- |
| Drawer | Resizable слева | Fullscreen bottom sheet |
| `favorite` DnD | Да | Нет |
| `segments` / `SegmentControl` | Да | Да (скрывается при поиске) |
| `preferences` | Модалка настроек в тулбаре | То же |

## UserMenu

Меню пользователя — профиль, переключатель темы, пункты настроек и выход.

`UserMenu` — dropdown с профилем пользователя, переключателем темы, дополнительными пунктами и кнопкой выхода.

### Когда использовать

- Блок аккаунта в правой части шапки консоли.
- Переключение light / dark / system темы из интерфейса.

### Примеры использования

#### Базовое меню

Профиль, тема, пункты настроек и actions. Открывается по клику на аватар.

```tsx
import { UserMenu } from '@ds/uikit-product-header';

import { SETTING_ITEMS } from '../../../stories/demoData';

export function Basic() {
  return (
    <UserMenu
      profile={{ fullName: 'Ivan Petrov', email: 'ipetrov@cloud.ru', inviteCount: 1 }}
      theme={{ value: 'light' }}
      settingItems={SETTING_ITEMS}
      items={[{ content: { label: 'Option 1' } }, { content: { label: 'Option 2' } }]}
      data-test-id='header-user-menu-basic'
    />
  );
}
```

#### Controlled тема

`theme.value` и `theme.onChange` синхронизируют выбор темы с приложением.

```tsx
import { UserMenu } from '@ds/uikit-product-header';
import { useState } from 'react';

import { SETTING_ITEMS } from '../../../stories/demoData';

export function ControlledTheme() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  return (
    <UserMenu
      profile={{ fullName: 'Ivan Petrov', email: 'ipetrov@cloud.ru' }}
      theme={{ value: theme, onChange: setTheme }}
      settingItems={SETTING_ITEMS}
      data-test-id='header-user-menu-theme'
    />
  );
}
```

### Props

**UserMenuProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BaseItemWithoutNonGroup` \| `CommonGroupItem` \| `DroplistProps` \| `ScrollProps` | — |  |
| `onClick` | `(() => void)` | — |  |
| `onLogout` | `(() => void)` | — |  |
| `open` | `boolean` | — |  |
| `profile` | `UserProfileProps` | `{}` |  |
| `setOpen` | `((open: boolean) => void)` | — |  |
| `settingItems` | `BaseItemProps` | — |  |
| `theme` | `ThemeProps` | — |  |
| `triggerTooltip` | `string` | — |  |

##### Related types

- `ThemeMode` = `"dark"` \| `"light"` \| `"system"`

**ThemeProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onChange` | `((themeMode: ThemeMode) => void) \| undefined` | — |  |
| `value` | `"dark"` \| `"light"` \| `"system"` | — |  |

**UserProfileProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `email` | `string \| undefined` | — |  |
| `fullName` | `string \| undefined` | — |  |
| `inviteCount` | `number \| undefined` | — |  |
| `itemWrapRender` | `((node: ReactNode) => ReactNode) \| undefined` | — |  |
| `onClick` | `((e: MouseEvent<HTMLElement>) => void) \| undefined` | — |  |

## Logo

Логотип продукта в шапке — дефолтная иконка, кастомное изображение и badge режима окружения.

`Logo` — ссылка на главную с иконкой Cloud или кастомным изображением. Поддерживает badge режима окружения (`develop`, `stage`, `hybrid`).

### Когда использовать

- Слот `logo` в `HeaderLayout`.
- Отображение режима стенда рядом с логотипом.

### Примеры использования

#### Базовый логотип

Дефолтная иконка с tooltip при наведении.

```tsx
import { Logo } from '@ds/uikit-product-header';

export function Basic() {
  return <Logo href='/' tooltip={{ tip: 'На главную' }} data-test-id='header-logo-basic' />;
}
```

#### Режимы окружения

Проп `mode` добавляет promo-tag с подписью стенда.

```tsx
import { Logo } from '@ds/uikit-product-header';

export function WithMode() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Logo href='/' mode='develop' data-test-id='header-logo-develop' />
      <Logo href='/' mode='stage' data-test-id='header-logo-stage' />
      <Logo href='/' mode='hybrid' data-test-id='header-logo-hybrid' />
    </div>
  );
}
```

### Props

**LogoProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `href` | `string` | — |  |
| `loading` | `boolean` | — |  |
| `mode` | `"develop"` \| `"hybrid"` \| `"prod"` \| `"stage"` | — |  |
| `onClick` | `MouseEventHandler<HTMLAnchorElement>` | — |  |
| `path` | `string` | — |  |
| `tooltip` | `TooltipProps` | — |  |

##### Related types

- `HeaderLogoMode` = `"develop"` \| `"hybrid"` \| `"prod"` \| `"stage"`

## PathBreadcrumbs

Хлебные крошки пути в шапке — обёртка над Breadcrumbs с продуктовыми отступами.

`PathBreadcrumbs` — продуктовая обёртка `@ds/breadcrumbs` для слота `breadcrumbs` в `HeaderLayout`.

### Когда использовать

- Отображение пути навигации в центральной зоне шапки.
- Длинные цепочки разделов с автоматическим truncate.

### Примеры использования

#### Короткий путь

```tsx
import { PathBreadcrumbs } from '@ds/uikit-product-header';

const items = [
  { id: '1', label: 'Главная', href: '#' },
  { id: '2', label: 'Проект', href: '#' },
  { id: '3', label: 'Сервис' },
];

export function Basic() {
  return <PathBreadcrumbs items={items} />;
}
```

### Props

**PathBreadcrumbsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isMobile` | `boolean` | — |  |
| `items` | `BreadcrumbsProps` \| `Item` | — |  |
