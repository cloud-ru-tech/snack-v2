# Docs MDX — структура страницы пакета

**Область действия:** `packages/*/docs/*.mdx`. Правило действует всегда.

## Frontmatter

```yaml
---
title: <Name>
package: '@ds/<pkg>'
description: <одно предложение — что это и для чего>
order: <число, порядок в сайдбаре>
---
```

Поля `title`, `package`, `description`, `order` обязательны. Без `description` генератор README-а пишет пустую lead-строку.

## Плоский каркас + конфиг порядка

Страница пакета — **плоский список H2-секций**, каждая из которых попадает в TOC справа и кликается. Ролевой группировки (`## Для дизайнеров` / `## Для разработчиков`) больше нет.

Канонический набор и **порядок** секций задан в одном месте — [`apps/docs/src/config/docSections.mjs`](../../apps/docs/src/config/docSections.mjs). Чтобы поменять порядок блоков во всей документации, достаточно переставить элементы в `DOC_SECTIONS`. Remark-плагин `remarkSectionOrder` (`apps/docs/src/plugins/remark-section-order.mjs`) на билде режет MDX по H2 и сортирует секции согласно конфигу.

### Идентификация секций

Плагин матчит секцию по **тексту** H2 против колонки `title` в `DOC_SECTIONS`. MDX-синтаксис `{#id}` не поддерживается (парсер MDX интерпретирует `{` как начало JSX-выражения и падает), поэтому id зашит в конфиге и связан с конкретным заголовком.

Канонические заголовки (см. `DOC_SECTIONS`):

| id | Заголовок |
|----|-----------|
| `demo` | Демо |
| `when` | Когда использовать |
| `anatomy` | Анатомия |
| `install` | Установка |
| `examples` | Примеры использования |
| `props` | Props |
| `storybook` | Storybook |
| `figma` | Figma |
| `see-also` | Смотри также |

Заголовок должен совпадать буквально (регистр не важен). Синонимы/альясы для исторических названий добавляются в `TEXT_TO_ID` в `remark-section-order.mjs`. Если компоненту нужен раздел вне канона (`## Selection mode`, `## Controlled vs uncontrolled`) — просто пишем произвольный H2. Такие секции остаются на месте, где их написал автор, и попадают в TOC как есть.

### Рекомендуемый каркас

```mdx
# <Name>

<lead-параграф>

## Демо
## Когда использовать
## Анатомия
### Appearance           # H3 внутри Анатомии — визуальные оси API
### View
### Size
### Variant
## Установка
## Примеры использования
## Props
## Storybook
## Figma
## Смотри также          # опционально
```

Канонические блоки рендерер переставит в порядок `DOC_SECTIONS` (матчинг по тексту заголовка). Произвольные H2 без совпадения с канонами остаются там, где их написал автор.

### H3-якоря для примеров

Каждый `<Example title="…">` получает невидимый H3-якорь — в правом TOC они показываются вложенным списком под `## Примеры использования`. На странице заголовок остаётся внутри `<figcaption>` Example'а — визуально дубликата нет. TOC показывает H2 + вложенные H3; кликая H3, попадаешь к конкретному примеру.

### Анатомия — визуальные оси компонента

Внутри `## Анатомия` описываются публичные визуальные пропсы (Appearance, View, Size, Variant, Shape, Orientation, Mode, Placement, …) — всё, что отражает `constants.ts` компонента. Каждая ось — отдельный H3 с короткой семантикой и таблицей значений; при необходимости под H3 ставим маленький `<Example>` с 2–4 вариантами этой оси в ряд (демо, как и везде, из `demos/examples/<Name>.tsx`). Не дублируем интерактивное демо из `## Примеры использования` — Анатомия про **смысл** значений, Примеры про живые сценарии.

Минимум — H3 на каждую ось из `constants.ts`. Если ось одна (`size`) — блок может быть коротким, но всё равно существует.

Tier XS/S: обычно достаточно `demo` + `when` + `examples` + `props` + `storybook`. Tier M+: добавляются `do-dont`, `figma`, `states`, остальное по api.

## `## Демо` — только для презентационных компонентов

Секция `## Демо` с интерактивным `<Canvas>`-плейграундом (`demos/<Name>Demo.tsx` поверх `~docs/components/Canvas`) уместна **только** для props-driven компонентов без центральных колбеков и состояния. Условия — все одновременно:

- API сводится к сериализуемым пропсам (`size`, `appearance`, `view`, `disabled`, `label`, …) — Canvas умеет крутить ровно их.
- Колбеков нет либо они не определяют смысл компонента (`onClick` у `Button` ОК, потому что нажатие очевидно; `onChange` у `Slider` — не ОК, без живого сценария ползунок «не двигается»).
- Нет внутреннего состояния, которое нужно показать (open/close у Modal/Drawer/Popover/Dropdown, current page у Pagination, controlled value у Search/Toggles/Tabs).

Если эти условия не выполняются — **секцию `## Демо` не заводи вообще** и не создавай `demos/<Name>Demo.tsx`. Живая демонстрация поведения уезжает в `## Примеры использования` через `<Example>` + файлы `demos/examples/<Name>.tsx`. Canvas в таких пакетах либо рендерил статику (дублируя VisualMatrix), либо требовал state-адаптера, который ни о чём пользователю не говорит.

Каноничный список «Canvas остаётся / убирается»:

- **Canvas остаётся**: `avatar`, `block`, `counter`, `divider`, `skeleton`, `loader`, `status`, `tag`, `promo-tag`, `truncate-string`, `typography`, `progress-bar`, `info-block`, `breadcrumbs`, `timeline`, `button`, `link`, `icons`, `alert`, `hot-spot`.
- **Canvas НЕ заводим**: `accordion`, `carousel`, `drawer`, `modal`, `popover`, `dropdown`, `pagination`, `rating`, `slider`, `search`, `stepper`, `tabs`, `toggles` (всё семейство), `dropzone`. У них `## Демо` отсутствует, всю интерактивность несёт `## Примеры использования`.

## Компоненты-обёртки

Импорты (когда Canvas-демо уместно — иначе строки `import { <Name>Demo } …` и блок `## Демо` опускаем):

```mdx
import { <Name> } from '@ds/<pkg>'
import { <Name>Demo } from '../demos/<Name>Demo'
import { Example } from '~docs/components/Example'
import { PropsTable } from '~docs/components/PropsTable'
import { StorybookEmbed } from '~docs/components/StorybookEmbed'
import { FigmaEmbed } from '~docs/components/FigmaEmbed'
import { FIGMA_<NAME> } from '~docs/lib/figma'
import <name>Doc from './props.json'
```

`<PropsTable>` рендерится SSR. Related-типы (unions / aliases / interfaces), на которые ссылаются пропсы, выводятся под основной таблицей и попадают в правый TOC как H3-якоря — плагин `remark-props-table-headings` на билде читает `./props.json` и инжектит скрытые H3-заголовки по именам related-типов.

### `<Example>` — preview + code

Отображает живой компонент (children) + форматированный код + кнопку Copy.

**Правило без исключений:** содержимое каждого `<Example>` живёт в отдельном файле `packages/<pkg>/demos/examples/<Name>.tsx`, а в MDX рендерится через `client:visible`-островок с `?raw`-источником. Инлайн-JSX внутри `<Example>` запрещён:

- Astro+MDX не гидрирует React-детей `<Example>` — любой интерактив (Dropdown, Popover, Tooltip, Modal, компонент со state) перестаёт работать.
- `<Component icon={<Svg />} />` внутри MDX компилится в `astro:jsx`-обёртку для `<Svg />`, и React падает на рендере.
- Разделение «инлайн для простых, файл для сложных» ведёт к несогласованности: сегодня пример простой, завтра в него добавят handler, и он молча сломается.

```mdx
import { Destructive } from '../demos/examples/Destructive'
import DestructiveSrc from '../demos/examples/Destructive.tsx?raw'

<Example
  title='Деструктивное действие'
  description='Critical + иконка'
  code={DestructiveSrc}
>
  <Destructive client:visible />
</Example>
```

Файл демки:

- Один именованный PascalCase-экспорт на файл, импорт компонента из `@ds/<pkg>` (не из `../../src/...`).
- Несколько корневых элементов оборачиваются в `<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>` — единственное допустимое место для инлайн-`style` в demo-файлах (gap-обёртка самого примера).
- Один корневой элемент — без обёртки.
- Файл целиком показывается в docs через `?raw`, вместе с `import`-строками. Читатель копирует и запускает.
- **Пример обязан быть живым.** Если у компонента есть `onChange` / `onClick` / `onPageChange` / `onFilesUpload` и т.п., который определяет смысл — пиши либо uncontrolled (`defaultValue`, `defaultChecked`), либо controlled с локальным `useState`. **`onChange={() => {}}` (no-op-колбек) запрещён** — это «мёртвый» пример, который скрывает поведение и хуже Canvas-а.

Минимум **3** `<Example>` блока на пакет, типичный набор — 5–6: один на ключевую ось, один на icon-slots, один на polymorphism, один на состояния.

### Структура `demos/examples/`

Для tier M+ компонентов:

```
packages/<pkg>/demos/examples/
├── Actions.tsx       # пара главное+вторичное
├── Destructive.tsx   # critical с иконкой
├── IconOnly.tsx      # icon-only
├── LinkButton.tsx    # polymorphism as='a'
├── CounterBadge.tsx  # counter/badge composition
└── Loading.tsx       # loading state
```

Каждый файл — один публичный именованный экспорт (PascalCase), рендерит один React-компонент. Файл показывается в docs целиком (через `?raw`), включая imports — читатель может скопировать и запустить.

### Живой сценарий (опционально)

Для демонстрации реальных сценариев с состоянием (loading/submitting/success) — отдельный компонент `demos/<Name>Scenario.tsx` с `useState`, встраиваемый через `client:visible`:

```mdx
<<Name>FormScenario client:visible />
```

В том же блоке показываем код сценария в ```tsx блоке — читатель видит и живое поведение, и источник.

### `<StorybookEmbed>`
- Iframe к локальному storybook (`http://localhost:6006`) или `PUBLIC_STORYBOOK_URL` в проде.
- Sandbox: `allow-scripts allow-same-origin allow-popups`.
- `height` обычно 360–480.
- **Без `client:*`** — чистый iframe, React-гидрация не нужна. Рендерится SSR.

### `<FigmaEmbed>`
- Встраивает `embed.figma.com/design/<fileKey>/<fileName>?node-id=<id>&embed-host=ds-docs`.
- Узлы пакетов живут в `apps/docs/src/lib/figma.ts` как именованные константы (`FIGMA_BUTTON`, `FIGMA_AVATAR`, ...).
- Если узла ещё нет — не рендерь пустой iframe: либо закомментируй секцию, либо временно выведи простую ссылку.
- **Без `client:*`** — чистый iframe, React-гидрация не нужна. Рендерится SSR.

## Hydration-директивы — какую выбрать

Сайт работает как SPA через `<ClientRouter />` (Astro view transitions). На каждом переходе по пакетам `<main>` заменяется, поэтому любая директива `client:*` в MDX означает ре-гидрацию React-островка на каждой навигации.

| Компонент | Директива |
|-----------|-----------|
| `<*Demo />`, `<*Scenario />`, любые интерактивные примеры из `demos/` | **`client:visible`** (гидрируется, когда попадает во вьюпорт) |
| `<StorybookEmbed />`, `<FigmaEmbed />` | **без директивы** (SSR, iframe без JS) |
| `<PropsTable />`, статические таблицы/текст | **без директивы** (SSR) |

**Не используй `client:load` в MDX** — он гидрирует сразу при загрузке страницы, даже если демка в самом низу. Для всех интерактивных демок по умолчанию `client:visible`. `client:only='react'` — только если компонент реально не работает на SSR (последний вариант, требует обоснования).

## Do / Don't — формат

Парные пункты ✅/❌, не пункты списка «good practices» общим списком:

```markdown
- ✅ Один `primary` на экран.
- ❌ Два `primary` рядом.
```

Минимум 4 пары. Они попадают в автогенерированный README.

## Пакеты уровня L/XL

- Корневой `index.mdx` — лендинг пакета: обзор, основные сценарии, ссылки на субкомпоненты.
- Файлы `docs/<sub>.mdx` — один на каждый публичный субкомпонент (`docs/tab.mdx`, `docs/tab-bar.mdx`).
- Каждый субкомпонент получает свою Storybook-секцию, но Figma-embed общий (или отдельный на сложный субкомпонент).

## Что запрещено

- Менять порядок секций в MDX, ожидая, что он сохранится — порядок определяется `DOC_SECTIONS`. Хотите глобально поменять — правьте `apps/docs/src/config/docSections.mjs`.
- Писать канонический заголовок с опечаткой/переводом — секция не заматчится с конфигом и останется в исходной позиции MDX.
- Возвращать ролевые обёртки `## Для дизайнеров` / `## Для разработчиков` — структура плоская.
- Использовать `## API` вместо `## Props` — сырой список пропсов идёт в автогенерированную `<PropsTable>` из `props.json`.
- Писать текст без `client:visible` у интерактивных компонентов — иначе Astro рендерит их статикой.
- Писать инлайн-JSX внутри `<Example>...</Example>`. Любое содержимое `<Example>` — отдельный файл `demos/examples/<Name>.tsx` + `?raw` + `client:visible`.
- Заводить `## Демо` с Canvas-плейграундом (`<*Demo client:visible />`) у компонентов с центральными колбеками или состоянием (Modal, Drawer, Popover, Dropdown, Pagination, Search, Slider, Rating, Tabs, Toggles, Dropzone, …). У них `## Демо` отсутствует, живое поведение демонстрируется в `## Примеры использования`.
- Писать «мёртвые» примеры с `onChange={() => {}}` / `onClick={() => {}}` no-op-колбеком, когда колбек определяет поведение. Используй uncontrolled (`defaultValue`) либо `useState` controlled.
- Добавлять `README.md` руками. Используй `pnpm gen:readme`.

## Связанные правила

- [reference-package-anatomy.md](./reference-package-anatomy.md) — откуда берутся `demos/`, `docs/`, `README.md`.
- [figma-integration.md](./figma-integration.md) — как добавить пакет в `figma.ts`.
- [complexity-tiers.md](./complexity-tiers.md) — какие MDX-файлы нужны для L/XL.
