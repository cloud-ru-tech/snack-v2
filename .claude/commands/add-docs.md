---
description: Сгенерить `docs/index.mdx` + demos для пакета `packages/<pkg>` (role-based структура)
argument-hint: <pkg-name-or-path>
---

Сгенерить MDX-документацию + demos для компонентного пакета `@ds/*`. Тонкая обёртка над skill'ом [component-docs](../skills/component-docs.md).

## Входные аргументы

Пользователь передал: `$ARGUMENTS`

- **`<pkg>`** (обязательно) — имя пакета (`button`) или путь (`packages/button` / абсолютный). Нормализуй к `packages/<pkg>`.
- Если `$ARGUMENTS` пуст — остановись и одним сообщением попроси указать пакет. Формат: `/add-docs <pkg-name>` или `/add-docs packages/<pkg-name>`. Ничего не делай, пока не ответят.
- Если `packages/<pkg>/package.json` отсутствует — сообщи и предложи `pnpm add-package` (сам не запускай).

## Research перед работой

1. `packages/<pkg>/src/` — публичный API, оси, состояния, полиморфизм, slot'ы.
2. `packages/<pkg>/docs/` — что уже есть (`index.mdx`, `props.json`). Не перезатирать существующий frontmatter без явной команды.
3. `packages/<pkg>/demos/` — существующие demo-компоненты и `demos/examples/`.
4. `apps/docs/src/lib/figma.ts` — есть ли `FIGMA_<NAME>` для этого пакета. Если нет и Figma URL не дан — секцию `### Figma` закомментировать/пропустить, упомянуть в summary.
5. Tier по `.claude/rules/complexity-tiers.md` (определяет: плоская структура XS/S vs role-based H2 для M+; для L/XL — отдельные `docs/<sub>.mdx`).

## Делегирование skill'у

Следуй шагам [component-docs](../skills/component-docs.md):

1. **Frontmatter**: `title`, `package`, `description` (одно предложение — генератор README читает), `order`.
2. **Импорты**: `<Name>`, `<Name>Demo`, `Example`, `PropsTable`, `StorybookEmbed`, `FigmaEmbed`, `FIGMA_<NAME>`, `<name>Doc` из `./props.json`.
3. **Role-based каркас (tier M+)**: `## Демо`, `## Когда использовать`, `## Для дизайнеров` (Appearance/View/Size + Do/Don't + Figma + Смотри также), `## Для разработчиков` (Установка / Примеры / Живой сценарий? / Полиморфизм? / States / Иконки+counter? / Props / Storybook), `## Доступность`. TOC — 4–5 H2.
4. **Примеры** (`<Example>`): минимум 3, типично 5–6.
   - Примеры с иконками / JSX-в-props — **обязательно** в `demos/examples/<Name>.tsx` + `?raw`-источник (MDX+Astro несовместим с inline JSX-props для React-компонентов).
   - Простые примеры (`<Button size='s' label='...' />`) — инлайн в `<Example>`.
5. **Demo** — `demos/<Name>Demo.tsx` с `<Canvas>` из `~docs/components/Canvas`, `componentDoc` из `../docs/props.json`.
6. **Do/Don't** — минимум 4 пары ✅/❌ (попадают в автогенерируемый README).
7. **L/XL**: корневой `docs/index.mdx` + отдельный `docs/<sub>.mdx` на каждый публичный субкомпонент; для XL — `apps/docs/src/content/patterns/<name>-patterns.mdx`.

## Запреты

- Не писать `README.md` руками — генерируется `pnpm gen:readme`.
- Не использовать `parameters.docs.description.*` / `autodocs` — описания живут в MDX, не в story.
- Не менять порядок секций role-based каркаса.
- Не встраивать пустой `<FigmaEmbed>` без `FIGMA_<NAME>` — временно закомментировать или убрать секцию.
- Не писать интерактивный компонент без `client:load` (иначе Astro отрендерит статикой).

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

Короткое summary (3–5 строк): tier, список созданных/обновлённых файлов (`docs/index.mdx`, `demos/<Name>Demo.tsx`, `demos/examples/*.tsx`), статус Figma-embed (есть/закомментирован), что запустить для проверки.
