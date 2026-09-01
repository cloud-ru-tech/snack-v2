# Header Legacy

`@ds/uikit-product-header-legacy` — Legacy-шапка консоли на Snack V2 — HeaderLayout, Logo, MainMenu (desktop/mobile) и PlatformLogo.

`@ds/uikit-product-header-legacy` — поэтапная миграция legacy-шапки консоли на компоненты Snack V2: контейнер шапки, логотип, главное меню-drawer и иконка платформы.

## Когда использовать

- Нужна обратимо совместимая шапка и меню навигации старого кабинета на стеке `@ds/*`.
- Собирается MainMenu с селектором платформ и категориями сервисов: desktop — двухколоночный drawer; mobile — левый одноколоночный drawer (или новое bottom-sheet-меню через `customMobileMenu`).

Когда **не** нужен пакет:

- Новая продуктовая шапка без legacy-контрактов:
  - используйте **`@ds/uikit-product-header`**.
- Отдельная карточка сервиса вне меню:
  - используйте **`@ds/uikit-product-card-predefined`**.

## Установка

```bash
pnpm add @ds/uikit-product-header-legacy
```

```ts
import {
  HeaderLayout,
  Logo,
  MainMenu,
  PlatformLogo,
  useSearch,
  VARIANT,
  HEADER_LOGO_MODE,
} from '@ds/uikit-product-header-legacy'
```

## Смотри также

- **`MainMenu`** — desktop/mobile drawer, слоты `leftTop` / `search`, интеграция с **`MenuMobile`** через `customMobileMenu`.
- **`@ds/uikit-product-header`** — новая шапка и mobile bottom sheet для поэтапной миграции.
- **`@ds/uikit-product-card-predefined`** — `CardServiceLight` в сетке категорий.
- **`@ds/drawer`** — drawer, на котором собран MainMenu.
- **`@ds/adaptive`** — `AdaptiveProvider` / `layoutType` для поверхности MainMenu.

## HeaderLayout

Контейнер legacy-шапки со слотами menu, logo, select, breadcrumbs и toolbar.

Контейнер legacy-шапки с обратимо совместимыми слотами `menu`, `logo`, `select`, `breadcrumbs` и `toolbar`. При `isMobile` селектор скрывается, хлебные крошки переносятся под основную строку.

### Когда использовать

- Нужна единая раскладка верхней полосы консоли с разделителями между слотами.
- Desktop и mobile отличаются только положением breadcrumbs и видимостью `select`.

Когда **не** нужен:

- Полноценное боковое меню навигации:
  - используйте **`MainMenu`**.

### Анатомия

#### Слоты

- `menu` — триггер главного меню.
- `logo` — брендовый логотип.
- `select` — селектор проекта (скрывается при `isMobile`).
- `breadcrumbs` — хлебные крошки (на mobile — под основной строкой).
- `toolbar` — действия справа.

#### isMobile (default `false`)

- `false` — одна строка: menu + logo + select + breadcrumbs | toolbar.
- `true` — select скрыт, breadcrumbs во второй строке.

### Примеры использования

#### Desktop

Все слоты в одной строке.

```tsx
import { HeaderLayout, Logo } from '@ds/uikit-product-header-legacy';

function Slot({ label }: { label: string }) {
  return <div style={{ padding: '4px 8px', border: '1px dashed #ccc', fontSize: 12 }}>{label}</div>;
}

export function Desktop() {
  return (
    <HeaderLayout
      menu={<Slot label='Menu' />}
      logo={<Logo href='#' />}
      select={<Slot label='Select' />}
      breadcrumbs={<Slot label='Breadcrumbs' />}
      toolbar={<Slot label='Toolbar' />}
    />
  );
}
```

#### Mobile

isMobile скрывает select и переносит breadcrumbs.

```tsx
import { HeaderLayout, Logo } from '@ds/uikit-product-header-legacy';

function Slot({ label }: { label: string }) {
  return <div style={{ padding: '4px 8px', border: '1px dashed #ccc', fontSize: 12 }}>{label}</div>;
}

export function Mobile() {
  return (
    <HeaderLayout
      isMobile
      menu={<Slot label='Menu' />}
      logo={<Logo href='#' />}
      select={<Slot label='Select' />}
      breadcrumbs={<Slot label='Breadcrumbs' />}
      toolbar={<Slot label='Toolbar' />}
    />
  );
}
```

#### Минимальный набор

Только menu, logo и toolbar.

```tsx
import { HeaderLayout, Logo } from '@ds/uikit-product-header-legacy';

function Slot({ label }: { label: string }) {
  return <div style={{ padding: '4px 8px', border: '1px dashed #ccc', fontSize: 12 }}>{label}</div>;
}

export function Minimal() {
  return <HeaderLayout menu={<Slot label='Menu' />} logo={<Logo href='#' />} toolbar={<Slot label='Toolbar' />} />;
}
```

### Props

**HeaderLayoutProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `breadcrumbs` | `ReactNode` | — | Хлебные крошки. |
| `className` | `string` | — | CSS-класс корневого элемента. |
| `data-test-id` | `string` | — |  |
| `isMobile` | `boolean` | `false` | Переносит хлебные крошки под основную строку и скрывает селектор. |
| `logo` | `ReactNode` | — | Логотип платформы. |
| `menu` | `ReactNode` | — | Главное меню. |
| `select` | `ReactNode` | — | Селектор проекта. |
| `toolbar` | `ReactNode` | — | Панель действий в правой части. |

## Logo

Брендовый логотип шапки — Button neutral/simple с CloudLogo по режиму окружения.

Логотип шапки (Figma `buttonSimpleNeutral` + CloudLogo). Оболочка — `@ds/button` (neutral / simple / m).

### Когда использовать

- Слот `logo` в **`HeaderLayout`**.
- Нужен брендовый знак с учётом окружения (`mode`) или кастомной картинки (`path`).

### Анатомия

#### Mode (default `prod`)

- `prod` — `CloudLogo`.
- `develop` — `CloudLogoDev`.
- `stage` — `CloudLogoStage`.
- `hybrid` — `CloudLogoHybrid`.

#### Path и loading

- `path` — кастомное изображение; при ошибке загрузки — fallback на `mode`.
- `loading` — spinner Button.

### Примеры использования

#### Режимы окружения

Все значения HEADER_LOGO_MODE.

```tsx
import { HEADER_LOGO_MODE, Logo } from '@ds/uikit-product-header-legacy';

export function Modes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Logo href='#' mode={HEADER_LOGO_MODE.Prod} />
      <Logo href='#' mode={HEADER_LOGO_MODE.Develop} />
      <Logo href='#' mode={HEADER_LOGO_MODE.Stage} />
      <Logo href='#' mode={HEADER_LOGO_MODE.Hybrid} />
    </div>
  );
}
```

#### Loading

loading показывает spinner.

```tsx
import { Logo } from '@ds/uikit-product-header-legacy';

export function Loading() {
  return <Logo href='#' loading />;
}
```

#### Ссылка

Обязательный href на корневой Button-as-link.

```tsx
import { HEADER_LOGO_MODE, Logo } from '@ds/uikit-product-header-legacy';

export function CustomHref() {
  return <Logo href='https://cloud.ru' mode={HEADER_LOGO_MODE.Prod} />;
}
```

### Props

**LogoProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс корневой кнопки. |
| `data-test-id` | `string` | — |  |
| `href` | `string` | — | Ссылка логотипа. |
| `loading` | `boolean` | `false` | Состояние загрузки (spinner Button). |
| `mode` | `"develop"` \| `"hybrid"` \| `"prod"` \| `"stage"` | — | Окружение: влияет на вариант брендового логотипа (legacy-extension). |
| `onClick` | `MouseEventHandler<HTMLAnchorElement>` | — | Обработчик клика. |
| `path` | `string` | — | URL кастомной картинки логотипа. При ошибке загрузки — fallback на mode/prod. |

##### Related types

- `HeaderLogoMode` = `"develop"` \| `"hybrid"` \| `"prod"` \| `"stage"`

## MainMenu

Legacy MainMenu — кнопка MainMenuSVG и адаптивный drawer навигации (desktop / mobile).

Legacy MainMenu (Figma `navigationOldDrawer` / `navigationOldDrawerMobile`). Кнопка с `MainMenuSVG` открывает drawer навигации.

- **Desktop** — двухколоночный `@ds/drawer` (`DrawerCustom`): левая колонка 256px, divider, правая с поиском и категориями.
- **Mobile** — по умолчанию левый одноколоночный drawer (не BottomSheet): заголовок «Навигация», scroll-body со sticky-поиском. Через `customMobileMenu` можно подставить mobile-меню из **`@ds/uikit-product-header`** (bottom sheet).

Поверхность выбирается через `AdaptiveProvider` (`layoutType`).

### Когда использовать

- Нужно главное меню консоли с селектором платформ, административными пунктами и сеткой сервисов.
- Состав колонок задаётся слотами и данными (`serviceGroups`, `settingItems`, `search`).

Когда **не** нужен:

- Только верхняя полоса без drawer:
  - используйте **`HeaderLayout`**.
- Новая продуктовая навигация без legacy-контрактов:
  - используйте **`@ds/uikit-product-header`**.

### Анатомия

#### Trigger и drawer

- trigger — `@ds/button` neutral / simple / m с `MainMenuSVG`.
- desktop drawer — `@ds/drawer` `DrawerCustom`, слева, ширина по умолчанию 1120px (`data-test-id='header__drawer-menu'`).
- mobile drawer — левый full-height drawer (`navigationOldDrawerMobile`), не BottomSheet; `data-test-id='header__drawer-menu-mobile'`.

#### Левая колонка (desktop)

- `leftTop` — обычно селектор платформ (`PlatformSelector`).
- `settingItems` — административные пункты списка.
- `sidebarBottomSlot` — слот внизу колонки (например, баннер новой навигации).

#### Правая колонка (desktop)

- `rightTop` — баннеры (referral / marketplace).
- `search` — поиск через `useSearch` или свой объект (`NavigationSearch`); закреплён структурно вне Scroll.
- `serviceGroups` — секции категорий сервисов (`ServicesCategory` + `CardServiceLight`).

#### Mobile body

Порядок в scroll-body:

1. `leftTop` — в микрофронте и Figma: два `PlatformSelector` (платформа + проект с `avatarName`).
2. `search` — свёрнутый `NavigationSearch`; при скролле остаётся sticky (`position: sticky`).
3. `rightTop` — баннеры в колонку (`data-mobile` на контейнере).
4. `serviceGroups` — те же категории в сетке из одной колонки (`data-mobile` на `.services`); favorite на карточках всегда виден.
5. `settingItems` — `CardServiceLight` + `Divider` внизу scroll-body.

`sidebarBottomSlot` на mobile **не** рендерится (legacy-поведение).

#### customMobileMenu

Только на mobile: заменяет встроенный legacy `MenuMobile` (левый drawer). Типичный сценарий — микрофронт с legacy `HeaderLayout` и новым mobile-меню из `@ds/uikit-product-header`.

- `MenuMobile` импортируется из `@ds/uikit-product-header`, **не** из `@ds/uikit-product-header-legacy`.
- Передаются те же controlled `open` / `setOpen`, что и в `MainMenu` — иначе кнопка-триггер и drawer разойдутся.
- Данные для `MenuMobile` маппятся на API нового header (`segments`, `settingItems` и т.д.) отдельно от legacy-пропов `MainMenu`.

#### open / setOpen

Controlled-открытие drawer. Без `open` состояние держит сам компонент. В примерах drawer закрыт до клика по trigger.

### Примеры использования

#### Базовый состав

leftTop, баннеры, settingItems и serviceGroups. Drawer открывается по клику на MainMenuSVG.

```tsx
import { MainMenu } from '@ds/uikit-product-header-legacy';
import { useState } from 'react';

import { MarketplaceBanner } from '../../../stories/MainMenu/helperComponents/MarketplaceBanner';
import { NewNavigationBanner } from '../../../stories/MainMenu/helperComponents/NewNavigationBanner';
import { PlatformSelector } from '../../../stories/MainMenu/helperComponents/PlatformSelector';
import { ReferralBanner } from '../../../stories/MainMenu/helperComponents/ReferralBanner';
import {
  ADMINISTRATIVE_SECTION,
  DEFAULT_PLATFORM_OPTION,
  MARKETPLACE_BANNER,
  NEW_NAVIGATION_BANNER,
  PLATFORM_OPTIONS_BY_ID,
  PLATFORM_SELECTOR_ITEMS,
  REFERRAL_BANNER,
  SERVICE_GROUPS,
} from '../../fixtures';

export function Basic() {
  const [open, setOpen] = useState(false);
  const [platformId, setPlatformId] = useState(DEFAULT_PLATFORM_OPTION.id);
  const selected = PLATFORM_OPTIONS_BY_ID[platformId] ?? DEFAULT_PLATFORM_OPTION;

  return (
    <MainMenu
      open={open}
      setOpen={setOpen}
      leftTop={
        <PlatformSelector
          label={selected.label}
          description={selected.description}
          variant={selected.variant}
          items={PLATFORM_SELECTOR_ITEMS}
          value={platformId}
          onChange={id => setPlatformId(String(id))}
        />
      }
      rightTop={
        <>
          <ReferralBanner {...REFERRAL_BANNER} href='#' />
          <MarketplaceBanner {...MARKETPLACE_BANNER} href='#' />
        </>
      }
      settingItems={ADMINISTRATIVE_SECTION}
      serviceGroups={SERVICE_GROUPS}
      sidebarBottomSlot={<NewNavigationBanner {...NEW_NAVIGATION_BANNER} />}
    />
  );
}
```

#### С поиском

search из useSearch. Drawer открывается по клику на MainMenuSVG.

```tsx
import { MainMenu, useSearch } from '@ds/uikit-product-header-legacy';
import { useState } from 'react';

import { MarketplaceBanner } from '../../../stories/MainMenu/helperComponents/MarketplaceBanner';
import { NewNavigationBanner } from '../../../stories/MainMenu/helperComponents/NewNavigationBanner';
import { PlatformSelector } from '../../../stories/MainMenu/helperComponents/PlatformSelector';
import { ReferralBanner } from '../../../stories/MainMenu/helperComponents/ReferralBanner';
import {
  ADMINISTRATIVE_SECTION,
  DEFAULT_PLATFORM_OPTION,
  MARKETPLACE_BANNER,
  NEW_NAVIGATION_BANNER,
  PLATFORM_OPTIONS_BY_ID,
  PLATFORM_SELECTOR_ITEMS,
  REFERRAL_BANNER,
  SERVICE_GROUPS,
} from '../../fixtures';

export function WithSearch() {
  const [open, setOpen] = useState(false);
  const [platformId, setPlatformId] = useState(DEFAULT_PLATFORM_OPTION.id);
  const search = useSearch();
  const selected = PLATFORM_OPTIONS_BY_ID[platformId] ?? DEFAULT_PLATFORM_OPTION;

  return (
    <MainMenu
      open={open}
      setOpen={setOpen}
      leftTop={
        <PlatformSelector
          label={selected.label}
          description={selected.description}
          variant={selected.variant}
          items={PLATFORM_SELECTOR_ITEMS}
          value={platformId}
          onChange={id => setPlatformId(String(id))}
        />
      }
      rightTop={
        <>
          <ReferralBanner {...REFERRAL_BANNER} href='#' />
          <MarketplaceBanner {...MARKETPLACE_BANNER} href='#' />
        </>
      }
      search={search}
      settingItems={ADMINISTRATIVE_SECTION}
      serviceGroups={SERVICE_GROUPS}
      sidebarBottomSlot={<NewNavigationBanner {...NEW_NAVIGATION_BANNER} />}
    />
  );
}
```

#### Mobile-поверхность

AdaptiveProvider layoutType=mobile: два селектора в leftTop (платформа + проект с avatarName), sticky-поиск, баннеры в колонку. sidebarBottomSlot не передаётся — на mobile не рендерится.

```tsx
import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { MainMenu, useSearch } from '@ds/uikit-product-header-legacy';
import { useState } from 'react';

import { MarketplaceBanner } from '../../../stories/MainMenu/helperComponents/MarketplaceBanner';
import { PlatformSelector } from '../../../stories/MainMenu/helperComponents/PlatformSelector';
import { ReferralBanner } from '../../../stories/MainMenu/helperComponents/ReferralBanner';
import {
  ADMINISTRATIVE_SECTION,
  DEFAULT_PLATFORM_OPTION,
  DEFAULT_PROJECT_OPTION,
  MARKETPLACE_BANNER,
  PLATFORM_OPTIONS_BY_ID,
  PLATFORM_SELECTOR_ITEMS,
  PROJECT_DESCRIPTION,
  PROJECT_OPTIONS_BY_ID,
  PROJECT_SELECTOR_ITEMS,
  REFERRAL_BANNER,
  SERVICE_GROUPS,
} from '../../fixtures';

/**
 * Mobile-поверхность MainMenu: `leftTop` — PlatformSelector (платформа) + PlatformSelector (проект с `avatarName`).
 * `sidebarBottomSlot` на mobile не рендерится.
 */
export function MobileSurface() {
  const [open, setOpen] = useState(false);
  const [platformId, setPlatformId] = useState(DEFAULT_PLATFORM_OPTION.id);
  const [projectId, setProjectId] = useState(DEFAULT_PROJECT_OPTION.id);
  const search = useSearch();

  const selectedPlatform = PLATFORM_OPTIONS_BY_ID[platformId] ?? DEFAULT_PLATFORM_OPTION;
  const selectedProject = PROJECT_OPTIONS_BY_ID[projectId] ?? DEFAULT_PROJECT_OPTION;

  return (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
      <MainMenu
        open={open}
        setOpen={setOpen}
        leftTop={
          <>
            <PlatformSelector
              label={selectedPlatform.label}
              description={selectedPlatform.description}
              variant={selectedPlatform.variant}
              items={PLATFORM_SELECTOR_ITEMS}
              value={platformId}
              onChange={id => setPlatformId(String(id))}
            />
            <PlatformSelector
              label={selectedProject.label}
              description={PROJECT_DESCRIPTION}
              avatarName={selectedProject.label}
              items={PROJECT_SELECTOR_ITEMS}
              value={projectId}
              onChange={id => setProjectId(String(id))}
            />
          </>
        }
        rightTop={
          <>
            <ReferralBanner {...REFERRAL_BANNER} href='#' />
            <MarketplaceBanner {...MARKETPLACE_BANNER} href='#' />
          </>
        }
        search={search}
        settingItems={ADMINISTRATIVE_SECTION}
        serviceGroups={SERVICE_GROUPS}
      />
    </AdaptiveProvider>
  );
}
```

#### Новое mobile-меню через `customMobileMenu`

Controlled-состояние drawer общее для trigger и mobile-меню:

```tsx
import { useState } from 'react';
import { MainMenu } from '@ds/uikit-product-header-legacy';
import { MenuMobile } from '@ds/uikit-product-header';

function HeaderMainMenu() {
  const [open, setOpen] = useState(false);

  return (
    <MainMenu
      open={open}
      setOpen={setOpen}
      serviceGroups={legacyServiceGroups}
      /* …остальные legacy-пропы для desktop… */
      customMobileMenu={
        <MenuMobile
          open={open}
          setOpen={setOpen}
          segments={headerSegments}
          /* …пропы API @ds/uikit-product-header… */
        />
      }
    />
  );
}
```

### Props

**WithSupportProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `customMobileMenu` | `ReactNode` | — | Только mobile: заменяет legacy `MenuMobile` (левый drawer). <br/> Например, `MenuMobile` из `@ds/uikit-product-header` (bottom sheet). <br/> Передавайте те же `open` / `setOpen`, что и в `MainMenu` (controlled), иначе триггер и кастомное меню разойдутся. |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — |  |
| `favorite` | `{ value: string[]; onChange: (productId: string) => (addingValue: boolean) => void; }` | — |  |
| `leftTop` | `ReactNode` | — |  |
| `onLinkChange` | `((value: string) => void)` | — |  |
| `open` | `boolean` | — |  |
| `platformGroups` | `LinksGroup[]` | — | Платформенные группы (например «Облачные продукты», «Другие продукты»). <br/> Без поиска в сетке карточек **не отображаются**. <br/> С поиском: попадают в результаты при совпадении; порядок — **после** `serviceGroups`, <br/> **перед** `settingItems`. Обычно `favoritesEnabled: false`. |
| `rightTop` | `ReactNode` | — |  |
| `search` | `SearchProps` | — |  |
| `serviceGroups` | `LinksGroup[]` | — | Основные группы облачных сервисов (инфраструктура, сеть, хранилище и т.п.). <br/> Всегда видны в сетке карточек при пустом поиске; участвуют в избранном и боковой навигации. <br/> При поиске фильтруются вместе с остальными группами и показываются **первыми** в выдаче. |
| `setOpen` | `((open: boolean) => void)` | — |  |
| `settingItems` | `LinksGroup` | — | Административные сервисы (одна группа, например «Административные сервисы»). <br/> Без поиска: пункты в нижней части левой колонки (desktop), не в сетке карточек. <br/> С поиском: группа попадает в результаты только при совпадении; отображается **последней** <br/> (ниже `serviceGroups` и `platformGroups`). Обычно `favoritesEnabled: false`. <br/> Mobile: `CardServiceLight` + `Divider` внизу scroll-body. |
| `sidebarBottomSlot` | `ReactNode` | — | Нижний слот левой колонки sidebar (Figma `bottom > items`). |

### Storybook

WithSampleContent (Figma mobile composition):

### Figma

Desktop (`navigationOldDrawer`):

Mobile (`navigationOldDrawerMobile`):

### Смотри также

- **`@ds/uikit-product-header` / MainMenu** — новое меню и экспорт `MenuMobile` (bottom sheet) для `customMobileMenu`.
- **`@ds/uikit-product-card-predefined`** — `CardServiceLight` в сетке категорий и в `settingItems` на mobile.
### Адаптивность

Desktop-first: раскладку берёт `AdaptiveProvider` в корне приложения / Storybook. Переключение toolbar `layoutType=mobile` показывает mobile-поверхность без смены API.

| Проп | Desktop | Mobile |
|------|---------|--------|
| `customMobileMenu` | — | Заменяет legacy `MenuMobile`; без пропа — левый drawer |
| `sidebarBottomSlot` | Нижний слот левой колонки | Не рендерится |
| `settingItems` | Карточки в левой колонке | `CardServiceLight` + `Divider` внизу scroll-body |
| `leftTop` | Один селектор платформы | Платформа + проект (два `PlatformSelector`) |
| `search` | Вне Scroll, всегда развёрнут | Sticky в scroll-body, сначала свёрнут |
| `rightTop` / `serviceGroups` | Правая колонка | Одноколоночный scroll-body; сетка сервисов — 1 колонка |

Форс конкретной раскладки в Storybook — toolbar-global `layoutType` или вложенный `AdaptiveProvider` / `withLayoutType`.

Целевая композиция mobile (как в Figma) — story **Examples / WithSampleContent**.

## PlatformLogo

Иконка платформы — SVG-бейдж или Avatar с аббревиатурой.

Иконка платформы (Figma `platformSelectorIcons`). Используется в `PlatformSelector` и пунктах Droplist. При `avatarName` рендерится Avatar с инициалами вместо SVG-варианта — для mobile project selector.

### Когда использовать

- Нужна иконка платформы в селекторе или списке.
- Для пунктов Droplist — `compact` (24×24 без padding).

### Анатомия

#### Variant (default `evolution`)

- `evolution` / `advanced` / `vmware` — SVG на accent-бейдже.
- `partner` / `marketplace` — `@ds/avatar` squared («ПК» / «МА»).

#### Compact (default `false`)

- `false` — бейдж 32×32 для trigger.
- `true` — 24×24 для listItem (padding 0, Avatar size `s`).

#### AvatarName

Опциональная строка для Avatar в trigger. При наличии перекрывает `variant`-иконку: рендерится squared Avatar с двумя символами из имени (например «Название проекта 1» → «НА»).

Используется вместе с `PlatformSelector.avatarName` в mobile `leftTop` MainMenu (селектор проекта).

Локализованные имена для `partner` / `marketplace` без `avatarName` берутся из `headerLegacyLocale` (`platformLogo.avatarName.*`).

### Примеры использования

#### Варианты

Все значения VARIANT.

```tsx
import { PlatformLogo, VARIANT } from '@ds/uikit-product-header-legacy';

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {Object.values(VARIANT).map(variant => (
        <PlatformLogo key={variant} variant={variant} />
      ))}
    </div>
  );
}
```

#### Compact

Размер для пунктов Droplist.

```tsx
import { PlatformLogo, VARIANT } from '@ds/uikit-product-header-legacy';

export function Compact() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PlatformLogo variant={VARIANT.Evolution} compact />
      <PlatformLogo variant={VARIANT.Partner} compact />
    </div>
  );
}
```

#### Avatar-варианты

partner и marketplace.

```tsx
import { PlatformLogo, VARIANT } from '@ds/uikit-product-header-legacy';

export function AvatarVariants() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PlatformLogo variant={VARIANT.Partner} />
      <PlatformLogo variant={VARIANT.Marketplace} />
    </div>
  );
}
```

#### avatarName

Произвольное имя для Avatar — как в mobile project selector.

```tsx
import { PlatformLogo } from '@ds/uikit-product-header-legacy';

export function AvatarName() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PlatformLogo avatarName='Название проекта 1' />
      <PlatformLogo avatarName='Staging environment' compact />
    </div>
  );
}
```

### Props

**PlatformLogoProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatarName` | `string` | — | Имя для Avatar в trigger (Figma mobile project selector). <br/> При наличии рендерится Avatar вместо SVG-иконки платформы. |
| `className` | `string` | — | CSS-класс корневого элемента. |
| `compact` | `boolean` | `false` | Компактный размер для пунктов Droplist (Figma listItem icon без padding, 24×24). |
| `data-test-id` | `string` | — |  |
| `variant` | `"advanced"` \| `"evolution"` \| `"marketplace"` \| `"partner"` \| `"vmware"` | `evolution` | Вариант платформы (Figma `platformSelectorIcons` / variant). |

##### Related types

- `Variant` = `"advanced"` \| `"evolution"` \| `"marketplace"` \| `"partner"` \| `"vmware"`
