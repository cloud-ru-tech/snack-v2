# Icons

`@ds/icons` — Наборы интерфейсных иконок React и компонент Sprite для SVG-спрайтов.

Пакет экспортирует сгенерированные компоненты `*SVG`, сгруппированные по семи подпутям, вспомогательный [`Sprite`](#sprite) для подключения спрайтов интерфейсных групп и фабрику [`createThemedIcon`](#свои-тематические-иконки) для собственных иконок, переключающихся по теме.

## Установка

```bash
pnpm add @ds/icons
```

Корневой `@ds/icons` не экспортирует ни одной иконки — только тип `ISvgIconProps` и фабрику `createThemedIcon`. Каждая иконка импортируется исключительно через свой подпуть; так символ достижим ровно из одного места, и IDE предлагает единственный, канонический вариант автоимпорта, а не выбор между корнем и подпутём.

```ts
import { ISvgIconProps, createThemedIcon } from '@ds/icons'
import { SearchSVG } from '@ds/icons/interface/system'
import { RussiaSVG } from '@ds/icons/flags'
import { CloudLogo } from '@ds/icons/logos'
```

Подробности и полный каталог иконок по каждой группе — на её отдельной странице (см. «Группы» выше).

## Примеры использования

### Размер

Проп size задаёт сторону иконки в px; интерфейсные иконки квадратные.

```tsx
import { CheckSVG, PlusSVG, SearchSVG, TrashSVG } from '@ds/icons/interface/system';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <SearchSVG size={16} aria-label='Поиск 16' />
      <CheckSVG size={20} aria-label='Готово 20' />
      <PlusSVG size={24} aria-label='Добавить 24' />
      <TrashSVG size={32} aria-label='Удалить 32' />
    </div>
  );
}
```

### Цвет

Интерфейсные иконки наследуют color родителя через currentColor.

```tsx
import { TrashSVG } from '@ds/icons/interface/system';

import styles from './Color.module.scss';

export function Color() {
  return (
    <div className={styles.row}>
      <span className={styles.main}>
        <TrashSVG size={24} aria-label='Основной цвет' />
      </span>
      <span className={styles.accent}>
        <TrashSVG size={24} aria-label='Акцентный цвет' />
      </span>
      <span className={styles.critical}>
        <TrashSVG size={24} aria-label='Критический цвет' />
      </span>
    </div>
  );
}
```

### Флаг

Флаги и другие многоцветные наборы сохраняют исходные цвета SVG.

```tsx
import { RussiaSVG } from '@ds/icons/flags';

export function Flag() {
  return <RussiaSVG size={32} aria-label='Флаг России' />;
}
```

### Логотип с переключением темы

Логотипы из группы logos сами выбирают Light/Dark исполнение по активной теме.

```tsx
import { CloudLogo } from '@ds/icons/logos';

// Логотип сам переключает Light/Dark исполнение по активной теме DS —
// отдельного пропа не требуется, достаточно быть внутри провайдера темы.
export function ThemedLogo() {
  return <CloudLogo size={40} aria-label='Cloud.ru' />;
}
```

## Props

Отдельные иконки (`SearchSVG` и др.) используют тип `ISvgIconProps` (`className`, `size`, атрибуты SVG) — см. `packages/icons/src/types.ts`. Props компонентов `Sprite` / `SpriteIcon` / `SpriteFromUrl` — на странице **Sprite**.

## Группы

- ****System**** — системный интерфейсный набор: базовые действия, навигация, состояния. Наследует цвет через `currentColor`.
- ****Product**** — продуктовые сущности и действия (файлы, таблицы, соцсети, MKP/LKP). Наследует цвет через `currentColor`.
- ****Web**** — веб-тематика: облачная инфраструктура, HR-портал, AI, страницы решений. Наследует цвет через `currentColor`.
- ****Flags**** — флаги стран, цвет сохраняется как в исходном SVG.
- ****Logos**** — логотипы брендов и сервисов, переключаются между Light/Dark темой автоматически.
- ****Services**** — иконки облачных сервисов. Наследует цвет через `currentColor`.
- ****Extensions**** — иконки расширений файлов. Наследует цвет через `currentColor`.

## Свои тематические иконки

Если нужен свой логотип (например, бренд компании) в светлом и тёмном исполнении, собери его фабрикой `createThemedIcon` из корня пакета. Она принимает два готовых SVG и возвращает компонент, который сам переключает вариант по активной теме DS и ведёт себя как штатная иконка — проп `size`, сохранение соотношения сторон, `data-test-id`.

| Поле | Тип | Назначение |
|------|-----|------------|
| `testId` | `string` | Суффикс `data-test-id` (итог — `icon${testId}-light` / `icon${testId}-dark`). |
| `light` / `dark` | `{ nativeWidth, nativeHeight, children, rootFill? }` | Два исполнения. `children` — содержимое корневого `<svg>` (без обёртки `<svg>`), `nativeWidth`/`nativeHeight` — собственные размеры исходника, `rootFill` — `fill` корня (по умолчанию `none`). |
| `defaultSize` | `number` | Дефолт пропа `size` (по умолчанию `24`). |

### createThemedIcon

Свой логотип в двух исполнениях, переключается по теме.

```tsx
import { createThemedIcon } from '@ds/icons';

// Свой логотип в двух исполнениях. createThemedIcon собирает из них компонент,
// который сам выбирает вариант по активной теме DS и ведёт себя как штатная иконка
// (проп size, сохранение соотношения сторон, data-test-id).
const AcmeLogo = createThemedIcon({
  testId: 'acme-logo',
  light: {
    nativeWidth: 24,
    nativeHeight: 24,
    children: (
      <>
        <rect width={24} height={24} rx={6} fill='#1A1A1A' />
        <path d='M7 16 12 7l5 9z' fill='#FFFFFF' />
      </>
    ),
  },
  dark: {
    nativeWidth: 24,
    nativeHeight: 24,
    children: (
      <>
        <rect width={24} height={24} rx={6} fill='#FFFFFF' />
        <path d='M7 16 12 7l5 9z' fill='#1A1A1A' />
      </>
    ),
  },
});

export function CustomThemedIcon() {
  return <AcmeLogo size={48} aria-label='Логотип Acme' />;
}
```

## Sprite

Иконки `interface/system`, `interface/product`, `interface/web`, `services` и `extensions` рендерятся через SVG-спрайт: спрайт монтируется в документ один раз (в корне приложения), а каждая иконка ссылается на его символ через `<use href="#...">`. Пока символа в DOM нет — спрайт не смонтирован или не успел загрузиться, — иконка рендерит собственный инлайн-fallback и переключается на `<use>` автоматически; отсутствие спрайта — штатный режим без ошибок и предупреждений.

Подключение (`Sprite` / `SpriteFromUrl` / `SpriteIcon`), модель fallback-first и сценарии для Next.js, root-приложения и микрофронтов — на отдельной странице **Sprite**.

## Sprite

Подключение SVG-спрайта иконок — Sprite и SpriteFromUrl, модель fallback-first, сценарии для Next.js, root-приложения и микрофронтов.

Иконки групп `interface/system`, `interface/product`, `interface/web`, `services` и `extensions` рендерятся через SVG-спрайт: спрайт монтируется в документ один раз, а каждая иконка ссылается на его символ через `<use href="#...">`. Так повторяющиеся иконки не дублируют свои `<path>` в DOM.

Группы `flags` и `logos` спрайта не имеют — это обычные inline-SVG-компоненты. Причина: спрайт полагается на наследование `currentColor` через `<use>`, а эти группы сохраняют исходные цвета SVG.

### Props

#### Sprite

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | — |  |
| `data-test-id` | `string` | — |  |

#### SpriteFromUrl

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | URL файла спрайта (обычно из manifest.json, созданного npx @ds/icons copy-sprites) |
| `data-test-id` | `string` | — |  |

#### SpriteIcon

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `symbolId` | `string` | — | id символа спрайта, на который ссылается <use href="#...">; каталог валидных id — SPRITE_SYMBOL_IDS / sprite.symbols.json |
| `fallback` | `ReactNode` | — | Что рендерить внутри <svg>, пока символа нет в DOM (спрайт не смонтирован или id неизвестен) |
| `testId` | `string` | — | Суффикс data-test-id (итоговый атрибут — icon${testId}); переопределяется явным data-test-id |
| `size` | `number` | — | Размер иконки в px (по умолчанию 24) |
| `data-test-id` | `string` | — |  |
### Модель рендера — fallback-first

Каждая sprite-иконка самодостаточна и не требует, чтобы спрайт был смонтирован:

- **SSR и первый клиентский рендер** — всегда инлайн-SVG-fallback (содержимое зашито в компонент). Иконка видна сразу: до гидрации, до загрузки спрайта, без мигания.
- **После маунта** иконка проверяет наличие своего символа в DOM. Символ есть — переключается на `<use>`. Символа нет — подписывается на событие «спрайт смонтирован» и переключается по факту его вставки (актуально для `SpriteFromUrl`, который загружает спрайт асинхронно).
- **Спрайт так и не появился** — иконка остаётся на инлайн-fallback. Это штатный режим: без ошибок и предупреждений в консоли, визуально неотличимо от спрайтового рендера.

Событие передаётся через `document`, а не через состояние модуля — поэтому переключение работает и при нескольких копиях `@ds/icons` в бандле (cjs+esm, разные версии в микрофронтах).

Отличить режимы в DevTools: у fallback-иконки внутри `<svg>` лежит `<g>` с path, у спрайтовой — `<use href="#snack-uikit-…">`.

### `Sprite` — контент в бандле

`Sprite` печатает содержимое спрайта прямо в разметку. Подходит для SPA без SSR и небольших приложений:

```tsx
import { Sprite, SpriteSystemSVG } from '@ds/icons/sprite'
import { SearchSVG } from '@ds/icons/interface/system'

export function App() {
  return (
    <>
      {/* Подключается один раз в корне приложения */}
      <Sprite content={SpriteSystemSVG} />

      {/* Иконка сама ссылается на символ через <use href='#...'> */}
      <SearchSVG size={24} />
    </>
  )
}
```

Доступные спрайты (все — из `@ds/icons/sprite`): `SpriteSystemSVG` (он же `SpriteSVG`), `SpriteWebSVG`, `SpriteProductSVG`, `SpriteServicesSVG`, `SpriteExtensionsSVG`. Подключайте только те наборы, иконки из которых реально используются.

### `SpriteFromUrl` — кэшируемый спрайт для SSR

`Sprite` на SSR отдаёт содержимое спрайта в HTML на каждый запрос заново — браузер не может закэшировать его отдельно от страницы. Для приложений, которые сами хостят статику (Next.js, root-приложение), есть `SpriteFromUrl`: он загружает спрайт как обычный статический файл через `fetch` после гидрации, вставляет в текущий документ (сохраняя наследование `currentColor` — в отличие от `<use href="external.svg#id">`, которое ломает его в части браузеров) и опирается на HTTP-кэш браузера при повторных заходах. Пока спрайт грузится, иконки показывают инлайн-fallback — визуальной просадки нет.

1. Скопировать файлы спрайтов в статическую директорию приложения на этапе сборки:

   ```bash
   npx @ds/icons copy-sprites --out public/sprites --base-url /sprites
   ```

   Команда кладёт файлы с content-хэшем в имени (`sprite.system.<hash>.symbol.svg`) — их можно отдавать с `Cache-Control: public, max-age=31536000, immutable` — и манифест `public/sprites/manifest.json` с сопоставлением `{ system: '/sprites/sprite.system.<hash>.symbol.svg', … }`.

2. Подключить по URL из манифеста:

   ```tsx
   import { SpriteFromUrl } from '@ds/icons/sprite'
   import manifest from '../../public/sprites/manifest.json'

   export function App() {
     return (
       <>
         <SpriteFromUrl src={manifest.system} />
         {/* … остальной рендер */}
       </>
     )
   }
   ```

### Сценарии подключения

#### Next.js-приложение

Sprite-иконки — client-компоненты, но в SSR-HTML попадает инлайн-fallback, поэтому иконки видны до гидрации. Спрайт монтируется один раз в корневом layout (client-часть) — обычно `SpriteFromUrl` по шагам выше. После гидрации иконки переключаются на `<use>` самостоятельно.

#### Root-приложение (контейнер микрофронтов)

Контейнер монтирует спрайт один раз у себя в корне. Дочерним микрофронтам этого достаточно: событие «спрайт смонтирован» идёт через общий `document`, поэтому иконки из микрофронтов переключаются на `<use>` даже при собственных копиях `@ds/icons` в их бандлах. Владелец контейнера отвечает за монтирование и актуальность спрайта.

#### Микрофронт (не точка входа)

Ничего подключать не нужно — только импортировать иконки:

- контейнер уже смонтировал спрайт — иконки микрофронта переключатся на `<use>` сами;
- микрофронт запущен standalone (локальная разработка, тесты) — иконки остаются на инлайн-fallback, без ошибок и предупреждений.

Собственный `Sprite`/`SpriteFromUrl` внутри такого микрофронта не монтируется и `npx @ds/icons copy-sprites` не запускается — иначе документ получает дубликат символов, которые контейнер уже держит в общем DOM.

#### Расхождение версий контейнера и микрофронта

Спрайт контейнера собран из его версии `@ds/icons`; микрофронт может использовать более новую:

- иконка, которой нет в спрайте контейнера, — её символ не найдётся, иконка остаётся на собственном инлайн-fallback с корректным глифом;
- иконка перерисована (тот же `symbolId`, другой глиф) — `<use>` покажет глиф из спрайта контейнера, то есть старый. Лечится обновлением спрайта в контейнере.

### Динамическая иконка по id — `SpriteIcon`

Для сценариев, где id иконки известен только в рантайме (например, выбран в CMS и приходит из API), есть компонент `SpriteIcon` — рендерит `<use href="#symbolId">` на символ смонтированного спрайта, ничего не добавляя в бандл:

```tsx
import { SpriteIcon } from '@ds/icons/sprite'

<SpriteIcon symbolId={card.iconId} size={24} />
```

- `symbolId` — обычный проп: значение меняется — компонент перерисовывается, фабрик и мемоизации у потребителя нет.
- Пока символа нет в DOM (спрайт не смонтирован, id неизвестен спрайту) — рендерится `fallback` (ReactNode: скелетон, дефолтная иконка), по умолчанию пустой `<svg>` правильного размера: лейаут не прыгает.
- В отличие от статических `*SVG`-компонентов, инлайн-fallback с глифом здесь невозможен — глиф известен только спрайту, поэтому для основного пути рендера спрайт обязан быть смонтирован.

Статические `*SVG`-компоненты пакета построены на этом же компоненте (через фабрику `createSpriteIcon`) — поведение единое.

#### Каталог id — манифест символов

Список валидных `symbolId` генерируется вместе со спрайтами и доступен в двух формах:

- **`SPRITE_SYMBOL_IDS`** из `@ds/icons/sprite` — типизированная константа `{ system: [...], product: [...], … }` с типами `SpriteGroupId` / `SpriteSymbolId`. Для валидации и автокомплита id в коде.
- **`sprite.symbols.json`** — JSON рядом со спрайт-файлами; `npx @ds/icons copy-sprites` копирует его в статическую директорию вместе со спрайтами и `manifest.json`. Для внешнего тулинга — например, пикера иконок в CMS: каталог всегда синхронен с фактическим содержимым спрайтов.

Схема id: `snack-uikit-<group>-<kebab-name>` (`snack-uikit-product-accept`). Неизвестный/протухший id безопасен — иконка остаётся на `fallback`.
