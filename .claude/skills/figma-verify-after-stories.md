# Skill: figma-verify-after-stories

**Триггеры:** «сверь со Figma», «проверь соответствие макету», после создания stories нового пакета или после крупных правок `styles.module.scss`. Обязательный финальный проход перед PR любого компонентного пакета.

Скилл делает отдельный пасс: берёт итоговый рендер компонента (stories + Storybook) и сверяет его со скриншотами Figma-узлов пиксель-в-пиксель и семантически (ARIA, состояния, focus, state-layer, acrylic).

## Когда вызывать

- После завершения `component-story-set` (stories готовы, компонент рендерится в Storybook).
- После портирования legacy-компонента в новый пакет (drop-in миграции).
- При правке `styles.module.scss`, затрагивающей слои (state-layer, material, focusedFrame).
- Перед обновлением visual baselines.

Запускать **отдельным проходом** — не смешивать с имплементацией. Цель — найти расхождения, а не дописывать функциональность.

## Ввод

- Список Figma URL / nodeId, относящихся к компоненту. Минимум 1, обычно 2–5 (master + варианты + state master + example).
- Путь к пакету `packages/<pkg>`.

## Шаги

### 1. Собрать узлы

Для каждого Figma URL:
- Извлечь `fileKey` и `nodeId`.
- Записать roles: `master`, `state-master`, `variants`, `example`.

### 2. Для каждого узла — `get_metadata`

`mcp__figma-remote-mcp__get_metadata` c `fileKey` + `nodeId`. Собрать:

- **DOM-структуру** узла (children frame names).
- **Служебные слои**: `stateLayer/<group>/<role>`, `focusedFrame/...`, `material/<appearance><Level>`.
- **Variants** и их axes.
- **Размеры** (width × height) — для parity-тестов.

### 3. Маппинг служебных слоёв на код

По `.claude/rules/figma-to-code.md`:

| Figma слой | Код-эквивалент |
|------------|----------------|
| `stateLayer/regular/background` | `<span className={styles.stateLayer} data-state='regularBackground' aria-hidden />` + `@include m.has-state-layer-as-child(stateLayer)` в SCSS корня |
| `stateLayer/regular/border` | Тот же паттерн, `data-state='regularBorder'` |
| `stateLayer/activated/...` | `data-state='activatedBackground'` / `'activatedBorder'` |
| `stateLayer/onColor/...` | `data-state='onColorBackground'` |
| `stateLayer/onAccent/...` | `data-state='onAccentBackground'` |
| `focusedFrame/...` (hidden) | **НЕ DOM**, `:focus-visible { outline: ... }` на интерактивном корне |
| `material/<appearance><Level>` | `<span className={styles.acrylic} data-acrylic-appearance data-acrylic-level aria-hidden />` + `m.with-material('acrylic', #{acrylic})` |

### 4. Сверка — чек-лист по каждому узлу

Для каждого узла вывести таблицу «Figma → Code → Status»:

- [ ] **Интерактивный корень** с state-layer имеет `position: relative` в SCSS
- [ ] Дочерний слой `.stateLayer` существует в JSX с корректным `data-state`
- [ ] В SCSS применён `@include m.has-state-layer-as-child(stateLayer)` на корне
- [ ] `focusedFrame/...` в макете → `:focus-visible` в SCSS, **не** DOM-нода
- [ ] `material/...` → `.acrylic` слой + миксин `with-material`
- [ ] Числовые размеры (width × height) узла соответствуют CSS (`height` в SCSS), toleran ce ±1 px — если нет, дописать E2E `dimensions.spec.ts`
- [ ] Все variants покрыты в `VisualMatrix.stories.tsx` (через `StoryTable`)
- [ ] Все variants покрыты в `Playground.argTypes`
- [ ] Все variants имеют эквивалент в `constants.ts` (`as const`) и типы в `types.ts` (`ValueOf`)
- [ ] Figma variant typos (напр. `iconAfrer`) — в `constants.ts` каноническое имя + комментарий `// Figma variant: <typo>`
- [ ] Цвета-токены из узла присутствуют в SCSS как `base.sn-theme-color-*`, а не hex/rgba

### 5. Визуальная сверка (скриншот vs story)

Для **каждого** ключевого state/variant:

1. `mcp__figma-remote-mcp__get_screenshot` на nodeId → сохранить PNG.
2. Запустить Storybook (`pnpm dev:storybook`), снять скриншот соответствующей story через Playwright или вручную.
3. Сравнить попиксельно (diff). Расхождения классифицировать:
   - **Критические**: отсутствующий слой (state-layer, focus outline), неверный цвет-токен, неверные размеры.
   - **Средние**: неверные spacing/padding, typography.
   - **Низкие**: тени, радиусы, hover-анимации.

Если расхождений >3 критических — story **не готова**, вернуться к styles.module.scss.

### 6. Отчёт

Сформировать markdown-отчёт `packages/<pkg>/docs/figma-parity.md` (опционально, для сложных компонентов):

```md
# Figma parity report: <pkg>

## Узлы
- <role>: <nodeId> — <описание>

## Расхождения
### Критические
- [ ] <описание + как исправить>

### Средние
- [ ] ...

### Низкие
- [ ] ...

## Покрытие variants
| Figma variant | constants.ts | VisualMatrix | Status |
|---------------|--------------|--------------|--------|

## Служебные слои
| Figma | JSX | SCSS | Status |
|-------|-----|------|--------|
| stateLayer/regular/border | `<span .stateLayer data-state="regularBorder">` | `@include m.has-state-layer-as-child(stateLayer)` | ✅ |
```

## Типовые находки (и как фиксить)

| Находка | Фикс |
|---------|------|
| В Figma есть `stateLayer/...`, а в JSX — просто `:hover { background: ... }` | Добавить `<span .stateLayer data-state='...' aria-hidden />` + `@include m.has-state-layer-as-child(...)` |
| В Figma есть `focusedFrame/...`, а в JSX — `<div className={styles.focusFrame}>` | Удалить DOM-ноду, перенести в SCSS `&:focus-visible { outline: ... }` |
| Фиксированный `height` в Figma (24/32/40), в SCSS нет | Добавить в SCSS + тест `dimensions.spec.ts` |
| `material/acrylicPrimary1` в Figma, в коде не применён | Добавить `<span .acrylic data-acrylic-appearance='primary' data-acrylic-level='1'>` + `m.with-material` |
| Hex-цвет в SCSS вместо токена | Заменить на `base.$sn-theme-color-<path>` (через `get_variable_defs` узнать правильный путь) |
| Variant в Figma, которого нет в VisualMatrix | Добавить строку/колонку в `StoryTable` |
| Typo в Figma variant name | В коде каноническое имя + комментарий `// Figma variant: <typo>` в `constants.ts` |

## Запреты

- Не пропускать этот скилл, если в Figma узле есть `stateLayer/...` или `material/...` — даже если «визуально похоже».
- Не вмешивать в этот проход новые фичи или рефакторинги. Только сверка и минимальные правки.
- Не коммитить отчёт `figma-parity.md` без даты и ссылок на конкретные Figma nodeId.
- Не обновлять visual baselines до того, как этот скилл пройден.

## Выход

- Список расхождений по категориям.
- Применённые правки (diff) + коммит `chore(<pkg>): figma parity pass`.
- Обновлённый `VisualMatrix.stories.tsx`, если Found коверadge-gap.
- (опционально) `packages/<pkg>/docs/figma-parity.md` для сложных компонентов.

## Связанные правила

- `.claude/rules/figma-to-code.md`
- `.claude/rules/figma-integration.md`
- `.claude/rules/visual-regression-standard.md`
- `.claude/rules/stories-standard.md` (VisualMatrix)
- `.claude/rules/component-api-surface.md` (связь API ↔ VisualMatrix)

Эталонный проход: `@ds/stepper` v1 — узел `7596:24975` (state-layer/regular/border + focusedFrame/regular/outsideOffset) найден **после** создания stories, добавлен слой `.stateLayer` + mixin в `DesktopStep`.
