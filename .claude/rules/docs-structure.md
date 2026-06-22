# Docs MDX — структура страницы пакета

**Область действия:** `packages/*/docs/*.mdx`.

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

## Доменная группировка пакетов

Главная и сайдбар группируют пакеты по **префиксу имени** через единый конфиг доменов в `apps/docs/src/config`. Каждому домену задаётся `id`, человекочитаемый лейбл, префикс и короткое описание; первое попадание префикса в порядке списка выигрывает, остальные пакеты падают в дефолтный домен.

Порядок записей в конфиге задаёт порядок секций на главной и групп в сайдбаре. Описание домена показывается абзацем под заголовком соответствующей секции на главной и внутри тултипа рядом с заголовком группы в сайдбаре. Пакеты ничего о доменах не знают: классификация целиком вытекает из их префикса, никаких пометок во frontmatter MDX не требуется. Чтобы завести новый домен — добавить запись в конфиг и согласованно использовать префикс при создании пакетов.

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

### Дефолты — в заголовок H3

Дефолтное значение оси выносится в сам H3, чтобы читатель видел его сразу в TOC и не искал в теле:

```mdx
### Size (default `m`)
### Width (default `auto`)
### Outline (default `false`)
```

Не пиши «Дефолт — `m`» отдельным предложением в конце абзаца — это шум, который теряется при беглом чтении и дублирует `<PropsTable>`.

### Перечисления значений — bullet-списком, не «или»-строкой

Любое перечисление значений оси, слотов или альтернатив рендерится списком, а не одной строкой через «/» / «или» / «,». Каждое значение — отдельный пункт с короткой семантикой; общая «когда уместно» идёт отдельным абзацем под списком.

```mdx
<!-- ❌ Плохо — одна строка, глаз цепляется -->
`auto` (по контенту, дефолт) или `full` (растягивает контейнер на всю ширину родителя). `full` уместен в формах.

Каждый элемент `items[i]` собирается из `label`, `icon` (с `iconPosition: 'before' | 'after'`) и `counter`.

<!-- ✅ Хорошо — список, пункт = значение/слот -->
- `auto` — ширина по контенту.
- `full` — растягивает контейнер на всю ширину родителя, сегменты делят ширину поровну. Уместен в формах.

Каждый элемент `items[i]` собирается из:

- `label` — текст сегмента.
- `icon` — иконка с `iconPosition: 'before' | 'after'`.
- `counter` — счётчик после `label`.
```

То же правило — в `## Когда использовать` / «Когда **не** нужен»: если в пункте есть «— используйте X / или Y», разворачивай вложенным списком, не сшивай в одну строку через «—».

```mdx
<!-- ❌ Плохо -->
- Вариантов больше 5 — используйте `Tabs` или `Select`.

<!-- ✅ Хорошо -->
- Вариантов больше 5:
  - используйте `Tabs` или `Select`.
```

Tier XS/S: обычно достаточно `demo` + `when` + `examples` + `props` + `storybook`. Tier M+: добавляются `do-dont`, `figma`, `states`, остальное по api.

## `## Демо` — только для презентационных компонентов

Секция `## Демо` с интерактивным `<Canvas>`-плейграундом (`demos/<Name>Demo.tsx` поверх `#docs/components/Canvas`) уместна **только** для props-driven компонентов без центральных колбеков и состояния. Условия — все одновременно:

- API сводится к сериализуемым пропсам (`size`, `appearance`, `view`, `disabled`, `label`, …) — Canvas умеет крутить ровно их.
- Колбеков нет либо они не определяют смысл компонента (`onClick` у `Button` ОК, потому что нажатие очевидно; `onChange` у `Slider` — не ОК, без живого сценария ползунок «не двигается»).
- Нет внутреннего состояния, которое нужно показать (open/close у Modal/Drawer/Popover/Dropdown, current page у Pagination, controlled value у Search/Toggles/Tabs).

Если эти условия не выполняются — **секцию `## Демо` не заводи вообще** и не создавай `demos/<Name>Demo.tsx`. Живая демонстрация поведения уезжает в `## Примеры использования` через `<Example>` + файлы `demos/examples/<Name>.tsx`. Canvas в таких пакетах либо рендерил статику (дублируя VisualMatrix), либо требовал state-адаптера, который ни о чём пользователю не говорит.

Каноничный список «Canvas остаётся / убирается»:

- **Canvas остаётся**: `avatar`, `block`, `counter`, `divider`, `skeleton`, `loader`, `status`, `tag`, `promo-tag`, `truncate-string`, `typography`, `progress-bar`, `info-block`, `breadcrumbs`, `timeline`, `button`, `link`, `icons`, `alert`, `hot-spot`.
- **Canvas НЕ заводим**: `accordion`, `carousel`, `drawer`, `modal`, `popover`, `dropdown`, `pagination`, `rating`, `slider`, `search`, `stepper`, `tabs`, `toggles` (всё семейство), `dropzone`. У них `## Демо` отсутствует, всю интерактивность несёт `## Примеры использования`.

**`defaultProps` Canvas-демо — тот же контракт, что `args` Playground-а** (см. [stories-standard.md](./stories-standard.md)). Смежные/парные пропсы (`content` + `valueToCopy`, `label` + `secondaryLabel`, …) заполняй обоими дефолтами с разными значениями — иначе пользователь не увидит, чем второй проп отличается от первого, и фича выглядит как мусорный контрол. То же для `controls` Canvas-а: для enum-пропа всегда `type: 'select', options: […]`, не `text`.

## Компоненты-обёртки

Импорты (когда Canvas-демо уместно — иначе строки `import { <Name>Demo } …` и блок `## Демо` опускаем):

```mdx
import { <Name> } from '@ds/<pkg>'
import { <Name>Demo } from '../demos/<Name>Demo'
import { Example } from '#docs/components/Example'
import { PropsTable } from '#docs/components/PropsTable'
import { StorybookEmbed } from '#docs/components/StorybookEmbed'
import { FigmaEmbed } from '#docs/components/FigmaEmbed'
import { figmaNode } from '#docs/lib/figma'
import <name>Doc from './props.json'
```

`props.json` — это **map по имени компонента** (`{ "<ComponentName>": ComponentDoc, … }`), поэтому в `<PropsTable>` передаётся **конкретный компонент по ключу**, а не весь файл:

```mdx
import <name>Doc from './props.json'

<PropsTable data={<name>Doc.<ComponentName>} />
```

- Проп называется `data` (тип `ComponentDoc`), **не** `props` / `componentDoc` / `doc`.
- Индексируй по имени компонента: `buttonDoc.Button`, `togglesDoc.Checkbox`, `listDoc.ItemContent`. Передать весь `<name>Doc` без `.<ComponentName>` — ошибка (это map, а не `ComponentDoc`).
- Опционально `include={['propA', 'propB']}` — показать только перечисленные пропсы.

`<PropsTable>` рендерится SSR. Related-типы (unions / aliases / interfaces), на которые ссылаются пропсы, выводятся под основной таблицей и попадают в правый TOC как H3-якоря — плагин `remark-props-table-headings` на билде читает `./props.json` и инжектит скрытые H3-заголовки по именам related-типов.

**`<PropsTable data={<name>Doc.<Component>} />` с несуществующим ключом — жёсткий краш билда.** Если `<Component>` нет в `props.json` (компонент удалён/переименован, либо `props.json` не перегенерён), `<name>Doc.<Component>` === `undefined`, и SSR падает с `TypeError: Cannot read properties of undefined (reading 'props')` — рушится **весь** `build:docs`. В отличие от `<FigmaEmbed node={figmaNode(...)} />`, который при отсутствии узла безопасно рендерит `null`, пропущенный ключ `PropsTable` краш**ит**. При удалении/переименовании публичного компонента **обязательно**: (1) убери его секцию `### <Component>` + `<PropsTable>` из MDX, (2) перегенери `pnpm gen:props`. Проверяй рендер через `pnpm build:docs:fast` — `build:storybook` эту ошибку **не ловит** (Vite не SSR-рендерит docs-страницы).

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

Файл демо:

- Один именованный PascalCase-экспорт на файл, импорт компонента из `@ds/<pkg>` (не из `../../src/...`).
- Несколько корневых элементов оборачиваются в `<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>` — единственное допустимое место для инлайн-`style` в demo-файлах (gap-обёртка самого примера).
- Один корневой элемент — без обёртки.
- Файл целиком показывается в docs через `?raw`, вместе с `import`-строками. Читатель копирует и запускает.
- **Пример обязан быть живым.** Если у компонента есть `onChange` / `onClick` / `onPageChange` / `onFilesUpload` и т.п., который определяет смысл — пиши либо uncontrolled (`defaultValue`, `defaultChecked`), либо controlled с локальным `useState`. **`onChange={() => {}}` (no-op-колбек) запрещён** — это «мёртвый» пример, который скрывает поведение и хуже Canvas-а.
- **Portals → `PortalContextProvider`**. Если демо использует компонент с порталом (`Tooltip`, `QuestionTooltip`, `Popover`, `Dropdown`, `Modal`, `Drawer`, любой `disabledToggleTip`/`tip`-проп) — оборачивай в `<PortalContextProvider>` из `@ds/portal-context` прямо в файле демо. Каждый Astro `client:visible` — это независимый React-island со своим контекстом; глобальный провайдер из layout не доезжает, и портальный контент рендерится в `null`-root → тултип не видно, popover не открывается. Импорт-строка попадает в `?raw`-листинг демо, и это нормально — читатель видит, что для портал-компонентов провайдер обязателен.

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

```mdx
<StorybookEmbed storyId='components-<pkg>--playground' height={420} />
```

- Проп называется `storyId` (строка), **не** `id` / `story` / `kind`. Значение — актуальный story id (kebab-case от `title` + экспорт, см. [stories-standard.md](./stories-standard.md) «Title — nesting»); сверяй с `http://localhost:6006/index.json`.
- `height?: number` (опц.) — обычно 360–480. `args?` (опц.) — URL-args для стартового состояния.
- Iframe к локальному storybook (`http://localhost:6006`) или `PUBLIC_STORYBOOK_URL` в проде. Sandbox: `allow-scripts allow-same-origin allow-popups`.
- **Без `client:*`** — чистый iframe, React-гидрация не нужна. Рендерится SSR.

### `<FigmaEmbed>`
- Встраивает `embed.figma.com/design/<fileKey>/<fileName>?node-id=<id>&embed-host=ds-docs`.
- Узлы пакетов живут в `apps/docs/src/lib/figma.ts` в map'е `FIGMA_NODES` по имени пакета — см. [figma-integration.md](./figma-integration.md).
- Достаются через хелпер `figmaNode(pkg, sub?)`. Проп называется `node` (тип `FigmaNodeRef | undefined`), **не** `fileKey` / `nodeId` / отдельная константа `FIGMA_<PKG>` (таких нет — все узлы в map'е `FIGMA_NODES`). Использование:
  ```mdx
  <FigmaEmbed node={figmaNode('button')} />
  <FigmaEmbed node={figmaNode('toggles', 'checkbox')} />
  ```
- Если узла нет в `FIGMA_NODES` — `figmaNode(...)` вернёт `undefined`, `<FigmaEmbed>` отрендерит `null`. Безопасно оставлять секцию.
- **Без `client:*`** — чистый iframe, React-гидрация не нужна. Рендерится SSR.

## Hydration-директивы — какую выбрать

Сайт работает как SPA через `<ClientRouter />` (Astro view transitions). На каждом переходе по пакетам `<main>` заменяется, поэтому любая директива `client:*` в MDX означает ре-гидрацию React-островка на каждой навигации.

| Компонент | Директива |
|-----------|-----------|
| `<*Demo />`, `<*Scenario />`, любые интерактивные примеры из `demos/` | **`client:visible`** (гидрируется, когда попадает во вьюпорт) |
| `<StorybookEmbed />`, `<FigmaEmbed />` | **без директивы** (SSR, iframe без JS) |
| `<PropsTable />`, статические таблицы/текст | **без директивы** (SSR) |

**Не используй `client:load` в MDX** — он гидрирует сразу при загрузке страницы, даже если демо в самом низу. Для всех интерактивных демок по умолчанию `client:visible`. `client:only='react'` — только если компонент реально не работает на SSR (последний вариант, требует обоснования).

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
