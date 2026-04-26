# Skill: component-docs

**Триггеры:** «написать docs», «страница пакета», «обновить MDX», «добавить Storybook/Figma embed».

Скилл генерирует `docs/index.mdx` + `demos/<Name>Demo.tsx` по шаблону из [docs-structure.md](../rules/docs-structure.md).

## Ввод

- Путь к пакету `packages/<name>`.
- Имя компонента + основные оси API (читается из `constants.ts`).
- (опционально) `FIGMA_<NAME>` — должна быть в `apps/docs/src/lib/figma.ts`.

## Шаги

1. **Frontmatter**:
   ```yaml
   ---
   title: <Name>
   package: '@ds/<pkg>'
   description: <одно предложение>
   order: <число>
   ---
   ```

2. **Импорты**:
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

3. **Плоский каркас H2**:

   Структура — плоский список H2. Порядок задаёт `apps/docs/src/config/docSections.mjs` (см. [docs-structure.md](../rules/docs-structure.md)); в MDX секции можно писать в любом порядке, плагин `remarkSectionOrder` их рассортирует (матчинг по тексту заголовка).

   Типовой набор H2 для tier M+:

   - `# <Name>` + lead-параграф.
   - `## Демо` — `<<Name>Demo client:visible />`.
   - `## Когда использовать` — плюсы/минусы, когда **не** нужен.
   - `## Анатомия` — H3 на каждую визуальную ось из `constants.ts` (`### Appearance`, `### View`, `### Size`, `### Variant`, …): короткая семантика + таблица значений + опционально inline `<Example>` с вариантами.
   - `## Установка` — `pnpm add` + импорт.
   - `## Примеры использования` — **минимум 3** `<Example>` блока.
   - `## Props` — `<PropsTable data={<name>Doc.<Name>} />`.
   - `## Storybook` — `<StorybookEmbed storyId='components-<name>--playground' />` (без `client:*`).
   - `## Figma` — `<FigmaEmbed node={FIGMA_<NAME>} />`.
   - `## Смотри также` — опционально, ссылки на `/patterns/*`.

   Локальные кастомные H2 (напр. `## Selection mode`) — произвольный текст, не совпадающий с каноном, остаётся на месте.

   **Hydration-директивы**: сайт — SPA (`<ClientRouter />`), каждый `client:*` = ре-гидрация на каждом переходе. Для интерактивных демок (`<*Demo />`, `<*Scenario />`, примеры в `<Example>`) используй **`client:visible`**. Для `<StorybookEmbed>` / `<FigmaEmbed>` / `<PropsTable>` — **без директив** (они SSR-ятся). `client:load` в MDX не применяется.

   Tier XS/S — допустим минимум из `demo` + `when` + `examples` + `props` + `storybook`.

4. **Example блоки** — минимум 3, типичный набор 5–6.

   **Содержимое каждого `<Example>` — в отдельном файле** `packages/<pkg>/demos/examples/<Name>.tsx` (один named PascalCase-экспорт, импорт из `@ds/<pkg>`). Инлайн-JSX внутри `<Example>` запрещён: Astro+MDX не гидрирует React-детей `<Example>`, интерактив молча перестаёт работать. Несколько корневых элементов оборачивай в `<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>` — это единственный допустимый инлайн-`style` в demo-файлах.

   ```mdx
   import { Destructive } from '../demos/examples/Destructive'
   import DestructiveSrc from '../demos/examples/Destructive.tsx?raw'

   <Example title='Деструктив' code={DestructiveSrc}>
     <Destructive client:visible />
   </Example>
   ```

   Покрытие — по осям API компонента: по одному примеру на ключевую ось, icon-slots, polymorphism (`as`), состояния (loading/disabled).

5. **Живой сценарий** (tier M+, опционально):

   ```tsx
   // packages/<pkg>/demos/<Name>FormScenario.tsx
   import { <Name> } from '@ds/<pkg>'
   import { useState } from 'react'

   export function <Name>FormScenario() {
     // useState с idle → submitting → success
     // реальный flow на loading + disabled
   }
   ```

   Вставляем в MDX через `client:visible`.

6. **Demo** — `demos/<Name>Demo.tsx`:
   ```tsx
   import { <Name> } from '@ds/<pkg>'
   import <pkg>Doc from '../docs/props.json'
   import { Canvas } from '~docs/components/Canvas'

   export function <Name>Demo() {
     return (
       <Canvas
         component={<Name>}
         componentName='<Name>'
         componentDoc={<pkg>Doc.<Name>}
         defaultProps={{ /* ... */ }}
         controls={{ /* манипулируем ключевыми пропсами */ }}
         excludeProps={['icon', 'as', 'innerRef', 'className', 'children']}
       />
     )
   }
   ```

7. **Генерация README**:
   ```bash
   pnpm gen:props     # docs/props.json
   pnpm gen:readme    # README.md
   ```

8. **Верификация**:
   ```bash
   pnpm dev:docs
   # Открыть /components/<name> — все секции на месте, Storybook и Figma iframe работают
   # В правом TOC — 4–5 пунктов (не 15+)
   ```

## Для L/XL пакетов

- Корневой `index.mdx` — обзор пакета, ссылки на субкомпоненты.
- Отдельный `docs/<sub>.mdx` для каждого публичного субкомпонента.
- Patterns-страница в `apps/docs/src/content/patterns/<name>-patterns.mdx` для XL.

## Что **не** делает

- Не добавляет Figma-узел. Если `FIGMA_<NAME>` отсутствует — возвращает предупреждение и просит пользователя запустить [figma-component-import](./figma-component-import.md).
- Не правит frontmatter существующего MDX без явной команды.

## Связанное

- [docs-structure.md](../rules/docs-structure.md)
- [figma-integration.md](../rules/figma-integration.md)
