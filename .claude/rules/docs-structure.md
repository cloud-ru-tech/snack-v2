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

## Role-based группировка

Страница пакета разбита на **3–5 крупных H2-секций** с ролевой группировкой. TOC справа показывает только H2 — поэтому не дробите страницу на 15+ H2. Внутри каждой секции — H3 подразделы.

Рекомендуемый каркас:

```mdx
# <Name>

<lead-параграф>

## Демо                   # H2 — интерактивный Canvas

## Когда использовать     # H2 — сценарии + когда НЕ использовать

## Для дизайнеров         # H2 — про внешний вид и семантику
### Appearance / View / Size / Variant    # H3 — таблицы + Example блоки
### Do / Don't             # H3 — парные ✅/❌
### Figma                  # H3 — <FigmaEmbed>
### Смотри также           # H3 — ссылки на паттерны

## Для разработчиков       # H2 — всё про интеграцию
### Установка              # H3
### Примеры использования  # H3 — минимум 3 <Example> блока
### Живой сценарий         # H3 — опциональный интерактивный client:load
### Полиморфизм            # H3 — если есть `as`
### States                 # H3 — loading/disabled/error/empty
### Иконки и counter       # H3 — если применимо
### Props                  # H3 — <PropsTable>
### Storybook              # H3 — <StorybookEmbed>

## Доступность             # H2 — ARIA, клавиатура, focus, контраст (общий для всех ролей)
```

Этот каркас сводит TOC к 4–5 пунктам и делит страницу на понятные аудитории: дизайнер → «Для дизайнеров», разработчик → «Для разработчиков». Tier XS компоненты могут иметь более плоскую структуру; tier M+ — всегда по каркасу выше.

## Компоненты-обёртки

Импорты:

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

### `<Example>` — preview + code

Отображает живой компонент (children) + форматированный код + кнопку Copy.

**Важное ограничение Astro+MDX:** нельзя писать `<Button icon={<Svg />} />` прямо в MDX — MDX компилит `<Svg />` в `astro:jsx`-обёртку, и Button (React) упадёт на рендере. Поэтому каждый пример с иконками / нестандартными React-пропсами живёт в отдельном файле `demos/examples/<Name>.tsx`, а в MDX импортируется как компонент + `?raw`-источник:

```mdx
import { Destructive } from '../demos/examples/Destructive'
import DestructiveSrc from '../demos/examples/Destructive.tsx?raw'

<Example
  title='Деструктивное действие'
  description='Critical + иконка'
  code={DestructiveSrc}
>
  <Destructive client:load />
</Example>
```

Для простых примеров без нестандартных React-пропсов (`<Button label='...' />`) допустимо писать JSX прямо внутри `<Example>` — код автоматически извлекается remark-плагином `remarkExampleCode` из raw-MDX.

```mdx
<Example title='Три размера в ряд'>
  <Button size='s' label='Small' />
  <Button size='m' label='Medium' />
  <Button size='l' label='Large' />
</Example>
```

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

Для демонстрации реальных сценариев с состоянием (loading/submitting/success) — отдельный компонент `demos/<Name>Scenario.tsx` с `useState`, встраиваемый через `client:load`:

```mdx
<<Name>FormScenario client:load />
```

В том же блоке показываем код сценария в ```tsx блоке — читатель видит и живое поведение, и источник.

### `<StorybookEmbed>`
- Iframe к локальному storybook (`http://localhost:6006`) или `PUBLIC_STORYBOOK_URL` в проде.
- Sandbox: `allow-scripts allow-same-origin allow-popups`.
- `height` обычно 360–480.

### `<FigmaEmbed>`
- Встраивает `embed.figma.com/design/<fileKey>/<fileName>?node-id=<id>&embed-host=ds-docs`.
- Узлы пакетов живут в `apps/docs/src/lib/figma.ts` как именованные константы (`FIGMA_BUTTON`, `FIGMA_AVATAR`, ...).
- Если узла ещё нет — не рендерь пустой iframe: либо закомментируй секцию, либо временно выведи простую ссылку.

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

- Менять порядок секций.
- Использовать `## API` вместо разбивки по осям (Appearance / View / Size). Сырой список пропсов идёт в автогенерированную `### Props`-таблицу из `props.json`.
- Писать текст без `client:load` у интерактивных компонентов — иначе Astro рендерит их статикой.
- Добавлять `README.md` руками. Используй `pnpm gen:readme`.

## Связанные правила

- [reference-package-anatomy.md](./reference-package-anatomy.md) — откуда берутся `demos/`, `docs/`, `README.md`.
- [figma-integration.md](./figma-integration.md) — как добавить пакет в `figma.ts`.
- [complexity-tiers.md](./complexity-tiers.md) — какие MDX-файлы нужны для L/XL.
