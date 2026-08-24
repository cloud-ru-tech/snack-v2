# Header

`@ds/uikit-product-header` — Продуктовая шапка консоли — HeaderLayout, MainMenu, UserMenu, Logo, PathBreadcrumbs и PlatformLogo.

## Установка

```bash
pnpm add @ds/uikit-product-header
```

```ts
import { HeaderLayout, MainMenu, UserMenu } from '@ds/uikit-product-header';
import '@ds/uikit-product-header/style.css';
```

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

`MainMenu` — drawer с каталогом сервисов: сегменты, fuzzy-поиск, избранное, DnD групп и карточек. На desktop — resizable drawer, на mobile — fullscreen.

### Когда использовать

- Навигация по каталогу облачных сервисов из шапки консоли.
- Сценарии с избранным, недавними сервисами и настройками отображения карточек.

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

### Props

**MainMenuProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeSegmentId` | `string` | — | Активный сегмент правой панели (значение SegmentControl, см. {@link MainMenuSegment.id}). <br/> Не передано — неуправляемое состояние (дефолт — первый сегмент с видимыми карточками). |
| `defaultWidth` | `number` | — | Ширина дровера, с которой открывается меню (desktop only) |
| `disabled` | `boolean` | — |  |
| `draggerTooltip` | `string` | — | Текст подсказки для драггера (desktop only) |
| `favorite` | `FavoriteProps` | — |  |
| `leftTop` | `ReactNode` | — |  |
| `loading` | `boolean` | — | Флаг загрузки данных |
| `logo` | `ReactNode` | — |  |
| `onActiveSegmentChange` | `((segmentId: string) => void)` | — | Колбэк смены активного сегмента правой панели. |
| `onSegmentExpandedChange` | `((segmentId: string, expandedGroupIds: string[]) => void)` | — | Колбэк при изменении набора раскрытых групп сегмента <br/> (без id синтетической группы избранного). |
| `onSegmentOrderChange` | `((segmentId: string, orderedGroupIds: string[]) => void)` | — | Колбэк после DnD групп в сегменте (без id синтетической группы избранного). |
| `onWidthChangeEnd` | `((width: number) => void)` | — | Вызывается при окончании изменения ширины дровера (desktop only) |
| `open` | `boolean` | — |  |
| `platformGroups` | `LinksGroup` | — | Платформенные группы (например «Облачные продукты», «Другие продукты»). <br/> Без поиска в сетке карточек **не отображаются**. <br/> С поиском: попадают в результаты при совпадении; порядок — <br/> после совпадений из сегментов без `pinBottomOnSearch`, перед сегментами с `pinBottomOnSearch`. <br/> Обычно `favoritesEnabled: false`; карточки могут быть без `icon` (Avatar по `label`). |
| `preferences` | `MainMenuPreferencesProps` | — | Настройки меню (модалка по кнопке в тулбаре): описания карточек, цвета групп. <br/> Не передано — кнопка настроек в тулбаре не отображается. |
| `rightTop` | `ReactNode` | — |  |
| `search` | `SearchProps` | — |  |
| `segmentPrefs` | `MainMenuSegmentPrefs` | — | Пользовательские prefs сегментов (порядок / раскрытие групп). <br/> Нет записи для сегмента или omit `order` / `expanded` → uncontrolled для этого поля. |
| `segments` | `MainMenuSegment` | — | Сегменты правой панели (сетка карточек) — только каталог. <br/> При поиске: совпадения из сегментов без `pinBottomOnSearch` → `platformGroups` → сегменты с `pinBottomOnSearch`. <br/> Если один и тот же {@link InnerLink.id} совпал сразу в нескольких сегментах — остаётся только <br/> первое по этому приоритету вхождение, остальные (и опустевшие после этого группы) не показываются. <br/> При `segments.length > 1` показывается SegmentControl (скрывается во время поиска). <br/> Порядок и раскрытие групп — через `segmentPrefs` и колбэки ниже. |
| `setOpen` | `((open: boolean) => void)` | — |  |
| `settingItems` | `BaseItemWithoutNonGroup` \| `CommonGroupItem` \| `ListProps` \| `ScrollProps` | — | Пункты левой колонки (desktop) / нижней части списка (mobile). <br/> Плоский список `List` (`BaseItem` и при необходимости `type: 'group'` с `divider` для разделителей). <br/> Не связан с сегментами правой панели и не меняется при сортировке групп в сегментах. |

##### Related types

**EmptyStateProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isFavoritesSegment` | `boolean` | — |  |
| `isMobile` | `boolean \| undefined` | — |  |

**LinksGroup**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aliases` | `string[] \| undefined` | — | Синонимы заголовка группы для fuzzy-поиска. |
| `blockColor` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | — | Цвет блока группы. |
| `favoritesEnabled` | `boolean \| undefined` | — | Разрешено ли добавление карточек группы в избранное. |
| `hidden` | `boolean \| undefined` | — |  |
| `highlight` | `boolean \| undefined` | — | Визуальное выделение группы |
| `id` | `string` | — | Уникальный идентификатор группы (якорь скролла, поиск по id). |
| `items` | `InnerLink` | — | Карточки сервисов или ссылок внутри группы. |
| `label` | `LinksGroupTitle` \| `TitleClickable` \| `TitleStatic` | — | Заголовок группы в сетке карточек и в боковой навигации. |
| `onClick` | `((e?: MouseEvent<HTMLElement>) => void) \| undefined` | — |  |

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
| `items` | `BaseItemWithoutNonGroup` \| `CommonGroupItem` \| `ListProps` \| `ScrollProps` | — |  |
| `onClick` | `(() => void)` | — |  |
| `onLogout` | `(() => void)` | — |  |
| `open` | `boolean` | — |  |
| `profile` | `UserProfileProps` | `{}` |  |
| `setOpen` | `((open: boolean) => void)` | — |  |
| `settingItems` | `BaseItemProps` | — |  |
| `theme` | `ThemeProps` | — |  |
| `triggerTooltip` | `string` | — |  |

##### Related types

**EmptyStateProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isFavoritesSegment` | `boolean` | — |  |
| `isMobile` | `boolean \| undefined` | — |  |

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
