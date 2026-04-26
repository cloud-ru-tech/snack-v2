# Tier'ы сложности компонентов

**Область действия:** все компонентные пакеты в `packages/*`. Правило определяет минимальный набор артефактов по сложности компонента.

## Классификация

| Tier | Критерии | Примеры | Stories | E2E specs | Visual snaps | Docs |
|------|----------|---------|---------|-----------|--------------|------|
| **XS** | 0–1 интерактивных состояния, 1–2 props axes, без композиции | `avatar`, `counter`, `loader/Sun` | Playground + VisualMatrix (2 файла) | rendering + a11y | 1 matrix | 1 `index.mdx` |
| **S**  | до 3 props axes, 1 интеракция, без полиморфизма | `badge`, `chip`, `tag` | Playground + VisualMatrix (+ 0–1 оправданный) | + states (в rendering) | 1 + 2 (hover/focus) = 3 | 1 `index.mdx` |
| **M**  | полиморфизм (`as`), 3–5 осей, loading/disabled, иконки, слоты | **`button`** | Playground + VisualMatrix + (Polymorphic? + ClickTest/KeyboardTest?) = 2–5 | + interaction + keyboard + polymorphism | 3 + 1 (pressed) = 4 | 1 `index.mdx` |
| **L**  | составной (субкомпоненты), shared context, keyboard nav | `tabs`, `tooltip`, `popover` | Playground + VisualMatrix на корень + те же для ключевых субкомпонентов; опц. `Composition` = 4–10 | + keyboard nav, focus trap, ARIA-roles | 4 + 1–2 (open/closed/placement) ≈ 5–6 | `index.mdx` + `<sub>.mdx` |
| **XL** | stateful (sort/filter/select/paginate), виртуализация, drag-drop | `table`, `select`, `combobox`, `datepicker` | Playground + VisualMatrix + scenario-файлы (`SortableByName`, `FilteredByCategory`, `PaginatedPage2`) | scenario-driven (возможно несколько spec'ов) + MSW | Matrix + before/after каждой ключевой интеракции | `index.mdx` + `<sub>.mdx` + patterns |

Счёт stories — **минимум** артефактов; доп. файлы вводятся только по правилам [stories-standard.md](./stories-standard.md) (раздел «Когда заводить дополнительный файл»). Axis-per-file (`Sizes`, `Appearances`, `LoadingState`, …) запрещён на всех tier'ах.

Счёт E2E specs — **список файлов**, не список тестов. Один spec может содержать десятки параметризованных тестов через `gotoStory(playground, args)`.

## Как определить tier

1. **Сколько публичных компонентов?** 1 → XS/S/M. 2+ → L/XL.
2. **Есть ли внутреннее состояние (sort/filter/select)?** Нет → XS/S/M. Да → XL.
3. **Есть ли полиморфизм (`as`) или несколько слотов (`icon`, `counter`, …)?** Нет → XS/S. Да → M+.
4. **Keyboard navigation / focus trap / ARIA роли?** Да → L+.
5. **Асинхронные данные (network / MSW)?** Да → XL.

## Tier → что создавать (короткий чек-лист)

### XS (Avatar-like)
- stories: **Playground + VisualMatrix** (2 файла).
- E2E: `rendering.spec.ts` (render), `a11y.spec.ts`.
- visual: 1 matrix.
- docs: 1 MDX + demo + Storybook/Figma embed.

### S (Badge-like)
- stories: **Playground + VisualMatrix** (+0–1 оправданный, напр. `Polymorphic`).
- E2E: `rendering.spec.ts` с describe-блоком states (disabled/loading/empty), `a11y.spec.ts`.
- visual: + hover + focus (итого 6 снимков).

### M (Button-like)
- stories: **Playground + VisualMatrix + ClickTest/KeyboardTest + Polymorphic** (если `as`).
- E2E: `rendering.spec.ts` (+ props propagation), `interaction.spec.ts`, `keyboard.spec.ts`, `polymorphism.spec.ts` (если `as`), `a11y.spec.ts`.
- visual: + pressed (итого 7 снимков).
- docs: Do/Don't table обязательна.

### L (Tabs-like)
- stories: `Playground` + `VisualMatrix` для каждого ключевого субкомпонента (TabBar/TabContent/Tab), опц. `Composition` для связи.
- E2E: + keyboard navigation (Arrow keys, Home/End) в `keyboard.spec.ts`, + focus trap в `interaction.spec.ts`, ARIA-роли в `rendering.spec.ts`.
- visual: + 1–2 open/closed или placement снимков на ключевом субкомпоненте.
- docs: корневой `index.mdx` + `docs/<sub>.mdx` для каждого субкомпонента.

### XL (Table-like)
- stories: scenario-driven (`SortableByName`, `FilteredByCategory`, `PaginatedPage2`) + Playground + VisualMatrix.
- E2E: scenario-spec'и (`<pkg>.<scenario>.spec.ts`) + MSW-mock данных + keyboard shortcuts.
- visual: before/after каждой ключевой интеракции (не матрица для всех комбинаций).
- docs: корневой + субкомпоненты + `patterns/<name>-patterns.mdx`.

## Анти-правила

- **Не** генерируй декартовы матрицы для L/XL. VisualMatrix для XL — только ключевая выборка (max ~3×N).
- **Не** добавляй story-per-axis / story-per-state (`Sizes`, `Appearances`, `LoadingState`) — это прямой путь к сотням stories. Используй `argTypes` Playground-а + строки/колонки `StoryTable` в VisualMatrix.
- **Не** опускай play-функции у Playground и test-stories — даже однострочный `toBeVisible()` лучше, чем пустая story.
- **Не** downgrade-ай tier ради упрощения. Если компонент реально сложный — весь чек-лист обязателен.
- **Не** заводи отдельные spec'и `url-args.spec.ts` / `states.spec.ts` / `dimensions.spec.ts` — их роль отдана `rendering.spec.ts` и visual regression.

## Связанные правила

- [reference-package-anatomy.md](./reference-package-anatomy.md) — общая структура пакета.
- [stories-standard.md](./stories-standard.md) — формат stories.
- [e2e-testing-standard.md](./e2e-testing-standard.md) — блоки E2E по tier.
- [visual-regression-standard.md](./visual-regression-standard.md) — набор visual snapshots по tier.
- [docs-structure.md](./docs-structure.md) — структура MDX по tier.
