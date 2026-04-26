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

3. **Role-based каркас (для tier M+)**:
   - `# <Name>` + lead-параграф.
   - `## Демо` + `<<Name>Demo client:load />` — интерактивный Canvas.
   - `## Когда использовать` — плюсы/минусы, когда **не** нужен.
   - `## Для дизайнеров` (H2)
     - `### Appearance` / `### View` / `### Size` — таблицы + `<Example>` под каждой.
     - `### Do / Don't` — минимум 4 пары ✅/❌.
     - `### Figma` — `<FigmaEmbed node={FIGMA_<NAME>} />`.
     - `### Смотри также` — ссылки на `/patterns/*`.
   - `## Для разработчиков` (H2)
     - `### Установка` — pnpm add + import.
     - `### Примеры использования` — **минимум 3** `<Example>` блока (см. ниже).
     - `### Живой сценарий` (опционально) — `<<Name>FormScenario client:load />` + код.
     - `### Полиморфизм` / `### States` / `### Иконки и counter` — по tier'у.
     - `### Props` — `<PropsTable data={<name>Doc.<Name>} />`.
     - `### Storybook` — `<StorybookEmbed storyId='components-<name>--playground' />`.
   - `## Доступность` — ARIA, клавиатура, focus, контраст.

   Тier XS/S могут иметь плоскую структуру без H2 «Для дизайнеров/разработчиков». Tier M+ — всегда role-based.

4. **Example блоки** — минимум 3, типичный набор 5–6.

   Для примеров с **иконками или React-JSX в пропсах** — вынести в `demos/examples/<Name>.tsx` и импортировать компонент + `?raw`-источник:

   ```mdx
   import { Destructive } from '../demos/examples/Destructive'
   import DestructiveSrc from '../demos/examples/Destructive.tsx?raw'

   <Example title='Деструктив' code={DestructiveSrc}>
     <Destructive client:load />
   </Example>
   ```

   Для **простых** примеров (без JSX-в-props) — инлайн с auto-extract от remark-плагина:

   ```mdx
   <Example title='Размеры'>
     <Button size='s' label='Small' />
     <Button size='m' label='Medium' />
   </Example>
   ```

   Покрытие: главное+вторичное, деструктив (critical), icon-only (toolbar), polymorphism (`as="a"`), loading, counter/badge.

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

   Вставляем в MDX через `client:load`.

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
