# Tier'ы сложности компонентов

**Область действия:** все компонентные пакеты в `packages/*`. Правило определяет минимальный набор артефактов по сложности компонента.

## Классификация

| Tier | Критерии | Примеры | Stories | E2E блоков | Visual snaps | Docs |
|------|----------|---------|---------|------------|--------------|------|
| **XS** | 0–1 интерактивных состояния, 1–2 props axes, без композиции | `avatar`, `counter`, `loader/Sun` | 3–5 | rendering + a11y | static matrix + responsive | 1 `index.mdx` |
| **S** | до 3 props axes, 1 интеракция, без полиморфизма | `badge`, `chip`, `tag` | 5–8 | + states + args | + hover/focus | 1 `index.mdx` |
| **M** | полиморфизм (`as`), 3–5 осей, loading/disabled, иконки, слоты | **`button`** | 8–13 | + interaction + polymorphism | + pressed + responsive | 1 `index.mdx` |
| **L** | составной (субкомпоненты), shared context, keyboard nav | `tabs`, `tooltip`, `popover` | 12–20 | + keyboard nav, focus trap, context | + open/closed/placement | `index.mdx` + `<sub>.mdx` |
| **XL** | stateful (sort/filter/select/paginate), виртуализация, drag-drop | `table`, `select`, `combobox`, `datepicker` | 20+ (scenario-driven) | scenario-driven, возможно MSW | before/after interactions | `index.mdx` + `<sub>.mdx` + patterns |

## Как определить tier

1. **Сколько публичных компонентов?** 1 → XS/S/M. 2+ → L/XL.
2. **Есть ли внутреннее состояние (sort/filter/select)?** Нет → XS/S/M. Да → XL.
3. **Есть ли полиморфизм (`as`) или несколько слотов (`icon`, `counter`, …)?** Нет → XS/S. Да → M+.
4. **Keyboard navigation / focus trap / ARIA роли?** Да → L+.
5. **Асинхронные данные (network / MSW)?** Да → XL.

## Tier → что создавать (короткий чек-лист)

### XS (Avatar-like)
- stories: Playground + 2–3 use-cases + VisualMatrix
- E2E: rendering + a11y + dimensions (если важны)
- visual: static per use-case + responsive
- docs: 1 MDX + demo + Storybook/Figma embed

### S (Badge-like)
- stories XS + state-story (Disabled/Loading/Empty)
- E2E: + URL args + states
- visual: + hover/focus на Primary

### M (Button-like)
- stories S + полиморфизм + counter/icon sets + ClickTest/KeyboardTest
- E2E: + interaction + polymorphism + dimensions (Figma parity)
- visual: + hover/focus/pressed + hover-per-view
- docs: Do/Don't table обязательна

### L (Tabs-like)
- stories M + субкомпоненты (TabBar/TabContent/Tab) отдельными файлами
- E2E: + keyboard navigation (Arrow keys, Home/End) + focus trap + ARIA-роли
- visual: + open/closed + placement (top/bottom/left/right)
- docs: корневой `index.mdx` + `docs/<sub>.mdx` для каждого субкомпонента

### XL (Table-like)
- stories: scenario-driven (`SortableByName`, `FilteredByCategory`, `PaginatedPage2`)
- E2E: scenario tests + MSW-mock данных + keyboard shortcuts (j/k, Arrow-nav)
- visual: before/after каждой ключевой интеракции
- docs: корневой + субкомпоненты + `patterns/<name>-patterns.mdx`

## Анти-правила

- **Не** генерируй декартовы матрицы для L/XL. VisualMatrix для XL — только ключевая выборка (max ~3×N × M).
- **Не** добавляй story-per-axis-combination — этот путь ведёт к сотням стор. Группируй через `StoryTable` в VisualMatrix.
- **Не** опускай play-функции у test-stories — даже однострочный `toBeVisible()` лучше, чем пустая story.
- **Не** downgrade-ай tier ради упрощения. Если компонент реально сложный — весь чек-лист обязателен.

## Связанные правила

- [reference-package-anatomy.md](./reference-package-anatomy.md) — общая структура пакета.
- [stories-standard.md](./stories-standard.md) — формат stories.
- [e2e-testing-standard.md](./e2e-testing-standard.md) — блоки E2E по tier.
- [visual-regression-standard.md](./visual-regression-standard.md) — набор visual snapshots по tier.
- [docs-structure.md](./docs-structure.md) — структура MDX по tier.
