---
description: Сгенерировать `docs/index.mdx` + demos для пакета `packages/<pkg>` (плоская структура H2, порядок из docSections.mjs)
argument-hint: <pkg-name-or-path>
---

Сгенерить MDX-документацию + demos для компонентного пакета `@ds/*`. Тонкая обёртка над skill'ом [component-docs](../skills/component-docs.md).

## Входные аргументы

Пользователь передал: `$ARGUMENTS`

- **`<pkg>`** (обязательно) — имя пакета или путь (`packages/<pkg>` / абсолютный). Нормализуй к `packages/<pkg>`.
- Если `$ARGUMENTS` пуст — остановись и одним сообщением попроси указать пакет. Формат: `/add-docs <pkg-name>` или `/add-docs packages/<pkg-name>`. Ничего не делай, пока не ответят.
- Если `packages/<pkg>/package.json` отсутствует — сообщи и предложи `pnpm add-package` (сам не запускай).

## Research перед работой

1. `packages/<pkg>/src/` — публичный API, оси, состояния, полиморфизм, slot'ы.
2. `packages/<pkg>/docs/` — что уже есть (`index.mdx`, `props.json`). Не перезатирать существующий frontmatter без явной команды.
3. `packages/<pkg>/demos/` — существующие demo-компоненты и `demos/examples/`.
4. `apps/docs/src/lib/figma.ts` — есть ли ключ пакета в `FIGMA_NODES`. Если узла нет и Figma URL не дан — секцию `## Figma` не писать, упомянуть в summary.
5. Tier по `.claude/rules/complexity-tiers.md` (определяет: плоская структура XS/S vs role-based H2 для M+; для L/XL — отдельные `docs/<sub>.mdx`).

## Делегирование skill'у

Следуй шагам [component-docs](../skills/component-docs.md):

1. **Frontmatter**: `title`, `package`, `description` (одно предложение — генератор README читает), `order`.
2. **Импорты**: `<Name>`, `<Name>Demo`, `Example`, `PropsTable`, `StorybookEmbed`, `FigmaEmbed`, `figmaNode` (из `#docs/lib/figma`), `<name>Doc` из `./props.json`. В `## Figma`: `<FigmaEmbed node={figmaNode(...)} />` — для субкомпонента передавай вторым аргументом sub-ключ.
3. **Плоский каркас H2** (tier M+): `## Демо`, `## Когда использовать`, `## Анатомия` (с H3 на каждую визуальную ось из `constants.ts`: `### Appearance`, `### View`, `### Size`, `### Variant`, …), `## Установка`, `## Примеры использования`, `## Props`, `## Storybook`, `## Figma`, `## Смотри также` (опц.). Порядок канонических в MDX не важен — `apps/docs/src/config/docSections.mjs` задаёт порядок.
4. **Примеры** (`<Example>`): минимум 3, типично 5–6. Содержимое **каждого** `<Example>` — в отдельном файле `demos/examples/<Name>.tsx` + `?raw`-источник, рендер через `client:visible`. Инлайн-JSX внутри `<Example>` запрещён (Astro+MDX не гидрирует React-детей — интерактив ломается). Несколько корневых элементов — в `<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>`.
5. **Demo** — `demos/<Name>Demo.tsx` с `<Canvas>` из `#docs/components/Canvas`, `componentDoc` из `../docs/props.json`.
6. **L/XL**: корневой `docs/index.mdx` + отдельный `docs/<sub>.mdx` на каждый публичный субкомпонент; для XL — `apps/docs/src/content/patterns/<name>-patterns.mdx`.

## Запреты

- Не писать `README.md` руками — генерируется `pnpm gen:readme`.
- Не использовать `parameters.docs.description.*` / `autodocs` — описания живут в MDX, не в story.
- Не возвращать ролевые H2 (`## Для дизайнеров` / `## Для разработчиков`) — структура плоская. Порядок секций задаётся `apps/docs/src/config/docSections.mjs`, не MDX.
- Не оставлять `## Figma` без узла в `FIGMA_NODES` (`<FigmaEmbed>` отрендерит `null`, секция будет пустая). Узла нет → секцию пропустить.
- Не писать интерактивный компонент без `client:visible` (иначе Astro отрендерит статикой).
- Не использовать `client:load` в MDX — сайт SPA, каждая директива = ре-гидрация на навигации. Интерактив → `client:visible`, `<StorybookEmbed>` / `<FigmaEmbed>` / `<PropsTable>` → без директивы.

## Правила (обязательное чтение)

- [.claude/rules/docs-structure.md](../rules/docs-structure.md)
- [.claude/rules/figma-integration.md](../rules/figma-integration.md)
- [.claude/rules/reference-package-anatomy.md](../rules/reference-package-anatomy.md)
- [.claude/rules/complexity-tiers.md](../rules/complexity-tiers.md)

## Границы

- Не трогай `src/`. Если `docs/props.json` пустой/устарел — предложи запустить `pnpm gen:props` (сам не запускай).
- В конце предложи:
  ```bash
  pnpm gen:props && pnpm gen:readme
  pnpm dev:docs   # проверить рендер /components/<pkg>
  ```
- Ничего не коммить.

## Итог

Короткое summary (3–5 строк): tier, список созданных/обновлённых файлов (`docs/index.mdx`, `demos/<Name>Demo.tsx`, `demos/examples/*.tsx`), статус Figma-embed (есть/пропущен), что запустить для проверки.
