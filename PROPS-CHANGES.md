# PROPS CHANGES — публичный API `@ds/*` относительно старого кита

Что и как поменялось в публичной поверхности пропсов **каждого** пакета `packages/*` относительно
его предшественника из старого дизайн-кита (`@snack-uikit/*` и `@cloud-ru/uikit-product-*`).

В отличие от [BREAKING-CHANGES.md](./BREAKING-CHANGES.md) (там — ренеймы только внутри ветки FF-8680
относительно `master`), здесь baseline — **опубликованные npm-версии старого кита**, поэтому список
шире: помимо канон-ренеймов сюда попадают удалённые/добавленные пропсы, смена сигнатур, перекройка
enum-осей и архитектурные переработки (полиморфизм, адаптивность, схлопывание compound-компонентов).

## Метод

- Для каждого `packages/<pkg>` распакованы исходники старого пакета из публичного npm и сопоставлены
  типы (`types.ts` / `constants.ts` / props компонентов) с текущим `packages/<pkg>/src`.
- Сравнивались **опубликованные версии** (на дату аудита): `@snack-uikit/button@0.19.19`,
  `@snack-uikit/list@0.33.3`, `@snack-uikit/fields@0.57.2`, `@snack-uikit/table@0.39.5`,
  `@cloud-ru/uikit-product-*` актуальных мажоров и т.д. Точная старая версия указана рядом с именем
  пакета не всегда — если поле старого кита отличается от указанного здесь, приоритет у фактического
  типа в исходниках.
- Диффятся только **публичные** пропсы/константы/типы (то, что реэкспортится из корня пакета).
  Внутренние helper-компоненты и `*-private` не диффятся.

## Канон именования (справочно)

Единый словарь ренеймов (провенанс — [.claude/skills/prop-naming.md](.claude/skills/prop-naming.md)):

- подпись контрола `text` / `option` → **`label`**; форма элемента списка — `{ label, value }`.
- основной payload-слот `description` → **`content`**; вторичная аннотация сущности остаётся **`description`**.
- `headline` / `headlineHint` / `subHeadline` → **`title`** / **`slotAfterTitle`** / **`subtitle`**.
- булевы флаги утвердительно: `isLoading` → **`loading`**, `isError` → **`error`**, `isExpandedDefault` → **`defaultExpanded`**.
- «наличие фон/заливка-слоя» → **`background`** (голое, не `hasBackground` / `showBackground` / `decor`).
- `selectionMode` — **`single`** / **`multiple`** (не `multi`); `shape` — **`rounded`** / **`squared`** (не `round`/`square`).
- ось положения — суффикс **`<x>Position`** (`chevronPosition`, `markerPosition`).

## Сквозные (не-канон) сдвиги, встречаются в большинстве пакетов

- **Полиморфизм.** Компоненты со ссылочным поведением (`Button`, `Link`-подобные, `Card`, `Tag.TagLink`,
  `AlertButton`, `TitleClickable`) переведены на `as?` + `innerRef?` + spread `ComponentPropsWithoutRef<T>`.
  Прежние явные `href` / `target` / `onClick` / `type` уходят в intrinsic-пропсы через `as`.
- **Схлопывание вариантов в ось.** Наборы отдельных компонентов заменены одним + enum-проп:
  `ButtonFilled/Outline/…` → `Button` + `view`; `AccordionPrimary/Secondary` → `Accordion` + уровни;
  `ButtonPromo*` и т.п.
- **Адаптивность (`@ds/adaptive`).** Портальные и layout-компоненты (`Modal`, `Drawer`, `Dropdown`,
  `Calendar*Dropdown`, `Toaster`, продуктовые виджеты) стали адаптивными: mobile-поверхность —
  `@ds/bottom-sheet`. Легаси-проп `layoutType` и парные `WithLayoutType` / `@cloud-ru/uikit-product-mobile-*`
  пакеты убраны — раскладка идёт через `AdaptiveProvider` (контекст), не пропом. Часть mobile-only /
  desktop-only пропов помечены в JSDoc; настройка mobile-дефолтов — через `layoutPresets`.
- **enum → `as const` + `ValueOf`.** Многие оси, раньше жившие строковыми литералами в типах или как
  TS-`enum`, вынесены в публичные `as const`-объекты + `ValueOf`-типы. Иногда сопровождается ренеймом
  самой константы (`SIZE` → `PAGINATION_SIZE` / `PROGRESS_BAR_SIZE`, `IN_RANGE_POSITION` → `RANGE_POSITION`).
- **`TEST_IDS` / `setNonce`.** Почти везде добавлен публичный `TEST_IDS` (часто со значениями по схеме
  `<pkg>__<slot>`); реэкспорт `setNonce` из старых пакетов часто убран или сменил источник (`@ds/scroll`).
- **Смена скоупа зависимостей** `@snack-uikit/*` → `@ds/*` меняет и типы пропов, собранные через
  `Pick`/`Omit` из соседних пакетов.

## Пакеты без старого аналога (диффа нет)

Новые в v2 — публичного предшественника в старом ките нет:

- **AI-набор:** `@ds/ai-button-chevron`, `@ds/ai-card`, `@ds/ai-chain-of-thoughts`, `@ds/ai-field-banner`,
  `@ds/ai-field-notice`, `@ds/ai-icon-giga`, `@ds/ai-queue`, `@ds/ai-reasoning`, `@ds/ai-shimmer`,
  `@ds/ai-suggestion`, `@ds/ai-tool`.
- **Адаптивность/инфраструктура:** `@ds/adaptive`, `@ds/context-kit`, `@ds/bottom-sheet` (mobile-поверхность
  портальных компонентов), `@ds/portal-context`, `@ds/theme`, `@ds/materials`,
  `@ds/figma-variables`, `@ds/fonts`, `@ds/locale`.

  (`@ds/theme` формально новый — одноимённого пакета в старом ките не было, — но принял на себя
  theme/brand/palette-слой из `@cloud-ru/uikit-product-utils`: `useApplyCustomTheme`, генерация
  бренд-палитры и цвето-математика. Соответствие имён — в §`@ds/utils` ниже.)

  (`@ds/scroll`, `@ds/utils`, `@ds/icons` **имеют** старый аналог и продиффены ниже — `@ds/utils` и
  `@ds/icons` объединяют snack- и product-скоупы старого кита.)
- **Private-хелперы** (потребляются другими `@ds/*`, публичного surface старого кита не имели):
  `@ds/input-private`, `@ds/search-private`, `@ds/popover-private`.
- **Прочее:** `@ds/site-card-vacancy`.

Продуктовые пакеты, чей старый аналог **не найден в публичном npm**,
либо новые, либо публиковались под другим именем, **проверить вручную**:
`@ds/uikit-product-avatar-detail`, `@ds/uikit-product-flex`.

Три пакета, у которых старый аналог оказался под другим именем/скоупом (продиффены ниже):
`@ds/uikit-product-copy` ← `@cloud-ru/uikit-product-copy-line`;
`@ds/uikit-product-notification` ← `@snack-uikit/notification`;
`@ds/uikit-product-upload-files` — примитивы уехали в `@ds/dropzone` (старый `@snack-uikit/drop-zone`),
сам `UploadFiles` — новый высокоуровневый flow, чистого 1:1 нет.

---

# Разбор по пакетам

## A. Компоненты и утилиты `@ds/*` (из `@snack-uikit/*`)

### @ds/accordion  (old: @snack-uikit/accordion)

_Существенная переработка: парные `AccordionPrimary`/`AccordionSecondary` схлопнуты в единый `Accordion` с уровнями Primary/Secondary/Tertiary; хедер-слот `header` разложен на структурные пропсы._

**Переименованные пропсы (CollapseBlock):**
- `actions` (ReactNode, «Дополнительные действия») → `afterTitle` (ReactNode, «Контент справа от заголовка») — та же роль слота справа в шапке.
- `removeContentFromDOM` (boolean) → `keepMounted` (boolean) — та же ось «держать ли контент в DOM», **инвертирована семантика** (removeContentFromDOM=true ≈ keepMounted=false).
- `header` (ReactNode, единый слот шапки) разложен на `title` (string) + `subTitle` (ReactNode) + `afterTitle` (ReactNode). В OLD текст шапки задавался через вложенный `CollapseBlockHeader` c пропсами `title`/`description`/`tip`; в NEW это прямые пропсы блока (`title`, `subTitle`).

**Удалённые пропсы (CollapseBlock):**
- `onClick(id, expanded)` — колбэк клика по хедеру убран (состоянием управляет `ToggleGroup` через `Accordion`).
- `outline` (boolean) — заменён осью `view`.
- `shape` ('round' | 'square') — убран, роль оформления ушла в `view`.

**Удалённые компоненты/слоты:**
- Вложенный `CollapseBlockHeader` (helper с `title`/`description`/`tip`) больше не публичный слот — поля перенесены в `CollapseBlockProps`.
- Статические `AccordionPrimary.CollapseBlock` / `.CollapseBlockHeader` и `AccordionSecondary.*` убраны.

**Удалённые пропсы (Accordion):**
- `className` — у корневого `Accordion` больше нет (он рендерит `ToggleGroup`).

**Новые пропсы (CollapseBlock):** `view` (View), `chevronPosition` (ChevronPosition), `showChevron` (boolean, def true), `backgroundPredefined` (BackgroundPredefinedFill), `component` ('accordionPrimary'|'accordionSecondary'|'accordionTertiary'), `title`, `subTitle`, `afterTitle`.

**Новые компоненты:** единый `Accordion` с `Accordion.CollapseBlockPrimary` / `.CollapseBlockSecondary` / `.CollapseBlockTertiary` (добавлен уровень **Tertiary** — `Omit` view/backgroundPredefined).

**Значения enum-осей:**
- Новая ось `view`: `simple` | `outline` | `elevated` (заменяет boolean `outline` + `shape`).
- Новая ось `chevronPosition`: `before` | `after` (позиционная ось `<x>Position`).

**Переименованные/новые константы и типы:**
- Новые: `VIEW` + тип `View`; `CHEVRON_POSITION` + тип `ChevronPosition`; `TEST_IDS`; `ANIMATION_DURATION`. (В OLD этого не было — только testId `chevron`; полноценного `chevron`→`chevronPosition` ренейма из OLD-типа/константы нет, `chevronPosition` net-new.)
- `SELECTION_MODE` (Single/Multiple) — без изменений; в NEW реэкспортится из `@ds/toggles`.

---

### @ds/alert  (old: @snack-uikit/alert)

_`description`→`content`, удалён `link`, унифицирован `actions`, новая ось `align` + адаптив; AlertButton переписан (полиморфный, `text`→`label`)._

**Переименованные пропсы** (Alert + AlertTop, общий `AlertSharedFieldProps`)

| Было | Стало | Роль |
|------|-------|------|
| `description` | `content` | основной текст уведомления (канон) |
| `AlertTop.action` (одиночная кнопка) | `actions: { primary, secondary }` | футер-кнопки унифицированы с Alert |
| `AlertButton.text` | `AlertButton.label` | текст кнопки (канон) |

**Удалённые**
- `link?: PickLinkProps<…>` — удалён у Alert и AlertTop (слота ссылки больше нет).
- `AlertButton.dataTestId` — заменён на support-проп `data-test-id` через `...rest`.

**Новые**
- `align?: Align` — выравнивание контента (vertical/horizontal), общая ось.
- `collapsible?: boolean` — раскрываемый alert (общий; у AlertTop — дефолт адаптива).
- `layoutPresets?: LayoutPresets<…>` — override mobile-дефолтов адаптива (Alert и AlertTop).
- `AlertButton`: полиморфизм `as` + `innerRef`, `iconPosition`, `disabled`, `variant`, `invertFocusOutlineColor`.

**Изменённый тип/сигнатура**
- `AlertButton` стал полиморфным (`AlertButtonProps<T extends ElementType = 'button'>`): `onClick`/`href` идут через intrinsic-пропсы `as`, не отдельным полем. `icon`: `ReactElement` → `ReactNode`.
- `actions.primary/secondary`: `Omit<…, 'appearance'>` → `Omit<…, 'variant' | 'size'>`.
- Alert/AlertTop больше не дженерики по `LinkElement` (ссылка убрана).

**Значения enum-осей**
- Новая `ALIGN`: `vertical`, `horizontal`.
- `AlertButton VARIANT`: было `'simple' | 'tonal'` → стало `onColor | onAccent`.
- `APPEARANCE` (neutral/primary/error/warning/success/info) и `SIZE` (s/m) — без изменений.

**Переименованные константы/типы**
- `APPEARANCE_TO_COLOR_MAP` / `APPEARANCE_TO_LINK_COLOR_MAP` → `APPEARANCE_TO_THEME_COLOR` (значения теперь `neutral|primary|red|yellow|green|blue`).
- `AlertTop/APPEARANCE_TO_COLOR_MAP_INVERT` — удалён.
- Новые публичные экспорты: `ALIGN`/`Align`, `TEST_IDS` (вложенный `{ alert, alertTop }`).

---

### @ds/attachment  (old: @snack-uikit/attachment)

_Поверхность пропсов практически без изменений; добавлены публичные константы `SIZE`/`TEST_IDS`, убран реэкспорт `setNonce`, вторичный текст остаётся `description`._

**Удалённые пропсы**

- **index** — реэкспорт `setNonce` из `@snack-uikit/card` **удалён**.

**Изменённый тип/сигнатура**

- `checked` / `disabled` / `onClick` / `className` — раньше приходили через `Pick<CardProps, …>`, теперь объявлены явно в `AttachmentSquareProps`. `onClick` конкретизирован: `(event: MouseEvent<HTMLDivElement>): void` (был `CardProps['onClick']`).
- `Size` — литеральный `'s' | 'm'` → `ValueOf<typeof SIZE>` (значения те же).

**Переименованные константы/типы**

- **Новые константы**: `SIZE` (`{ S:'s', M:'m' }`), `TEST_IDS`. Экспорт типов сменился с явного `export type { AttachmentSquareProps, AttachmentProps }` на `export *`.
- `truncateVariant` наследует значения из `@ds/truncate-string` — enum-значения `end`/`middle` не менялись (в JSDoc `End`/`Middle` → строчные `end`/`middle`).

`title`→`title`, `description`→`description` (канон соблюдён). Пропсы `file`, `onDownload`, `onDelete`, `onRetry`, `error`, `loading`, `icon`, `truncate` — без изменений.

---

### @ds/avatar  (old: @snack-uikit/avatar)

_Переименована ось SHAPE, изменён набор SIZE, `indicator`→`status` + новый слот `badge`._

**Переименованные пропсы**

| Было | Стало | Роль |
|------|-------|------|
| `indicator` | `status` | appearance дефолтного StatusIndicator (значок в углу) |

**Новые**
- `badge?: ReactNode` — произвольный нод в слот значка, перекрывает `status`.

**Значения enum-осей**
- `SHAPE`: `round`/`square` → `rounded`/`squared` (канон).
- `SIZE`: было `xxs, xs, s, m, l, xl, xxl` → стало `xs, s, m, l, 3xl, 6xl, 10xl`. Удалены `xxs, xl, xxl`; добавлены `3xl, 6xl, 10xl`.
- `APPEARANCE`: набор значений не изменился (neutral, primary, red, orange, yellow, green, blue, violet, pink), только порядок.

**Изменённый тип/сигнатура**
- Корень теперь расширяет `HTMLAttributes<HTMLDivElement>` (раньше только `WithSupportProps`).

---

### @ds/breadcrumbs  (old: @snack-uikit/breadcrumbs)

_Без изменений публичного API, кроме удаления одного legacy-флага._

**Удалённые пропсы**
| Компонент | Было | Тип | Примечание |
|---|---|---|---|
| `Breadcrumbs` | `lastEmpty` | `boolean` | Убран из `BreadcrumbsProps` (внутренний legacy-флаг, лежал в публичном типе). |

Остальное идентично: `items: Item[]`, `separator`, `size`, `firstItemIconOnly`, `inactiveLastItem`. `Item = { id, label, icon?, href?, shortLabel?, onClick? }` без изменений. Оси `SIZE`/`ITEM_RENDER_MODE`/`ELEMENT_TYPE` — 1:1.

---

### @ds/button  (old: @snack-uikit/button)

_Архитектурная переработка: 6 отдельных компонентов-view заменены одним полиморфным `Button` с осью `view`; добавлен `ButtonGroup`._

**Переименованные пропсы / компоненты**
- Компоненты-варианты `ButtonFilled`, `ButtonSimple`, `ButtonOutline`, `ButtonTonal`, `ButtonFunction`, `ButtonElevated` → единый `Button` + проп `view` (`VIEW`: filled/outline/simple/tonal/elevated/function). Отдельные экспорты удалены.

**Удалённые**
- `href`, `target` (`AnchorButtonProps`), `onClick`, `onKeyDown`, `onFocus`, `onBlur`, `type`, `tabIndex` — больше не в явном API; приходят через полиморфный spread `Omit<ComponentPropsWithoutRef<T>, ...>`.
- Константы `HTML_TYPE`, `TARGET` удалены.

**Новые**
- `Button` — полиморфный (`as` + `innerRef`), проп `view`.
- `ButtonGroup` (`ButtonGroupProps`) — новый компонент.
- Константа/тип `VIEW` / `View`.
- `counter` теперь у всех кнопок (`Omit<CounterProps, 'size'|'appearance'>`), а не только у ButtonFunction.

**Изменённый тип/сигнатура**
- Полиморфизм: было `forwardRef` + `CommonButtonProps` (anchor/button) → стало `ButtonProps<T extends ElementType>` c `as` + `innerRef` (canon react-types).
- `icon`: `ReactElement` → `ReactNode`.
- `counter`: было `CounterInButtonProps = Pick<CounterProps,'value'|'appearance'|'variant'|'plusLimit'>` → `Omit<CounterProps,'size'|'appearance'>`.

**Значения enum-осей**
- `APPEARANCE`: `destructive` → `critical` (переименование значения). Набор: primary/neutral/critical.
- `SIZE`: удалено `xs`. Было `{ Xs, S, M, L }` → стало `{ S, M, L }`.
- `ICON_POSITION` без изменений.

---

### @ds/button-combo  (old: @snack-uikit/button-combo)

_Аддитивно: добавлены оси view/appearance; удалён публичный map._

**Новые пропсы**
- `ButtonCombo.view` (`View` из @ds/button, дефолт `filled`) — раньше был прибит к ButtonFilled.
- `ButtonCombo.appearance` (`Appearance`, дефолт `primary`).

**Изменённый тип/сигнатура**
| Компонент | Проп | Было | Стало |
|---|---|---|---|
| `ButtonCombo` | `defaultValue` | `string` | `ItemId` (`string\|number`) |

**Переименованные/удалённые константы**
- Удалён публичный экспорт `DROPLIST_SIZE_MAP` (BREAKING для прямых импортов).
- Добавлены `TEST_IDS`, реэкспорт `APPEARANCE`/`SIZE`/`VIEW`, публичный тип `Item`.

`Item.label`/`loading` уже были в каноне. Остальные пропсы без изменений.

---

### @ds/calendar  (old: @snack-uikit/calendar)

_Аддитивно новые Dropdown-обёртки; удалены footerMode и presets.title; тип Cell переименован._

**Удалённые пропсы (BREAKING)**
| Компонент | Проп | Примечание |
|---|---|---|
| `TimePicker` | `footerMode` | удалён (+ тип `TimePickerFooterMode`). |
| `Calendar` | `presets.title` | удалено поле в `PresetsOptions`. |
| корень пакета | реэкспорт `setNonce` | удалён. |

**Переименованные пропсы (тип `Cell`, был приватным → стал публичным)**
| Было | Стало | Примечание |
|---|---|---|
| `isCurrent` | `current` | |
| `isSelected` | `checked` | |
| `isDisabled` | `disabled` | стал опциональным |
| `isHoliday` | `holiday` | стал опциональным |
| `isInCurrentLevelPeriod` | `another` | **инверсия смысла** |
| `inRangePosition` | `rangePosition` | |

**Новые пропсы/компоненты**
- Компоненты `CalendarDropdown`, `TimePickerDropdown` (адаптивные: popover/bottom-sheet).
- `Calendar.bottomSlot?: ReactNode`.

**Переименованные константы/типы**
| Было | Стало |
|---|---|
| `IN_RANGE_POSITION` | `RANGE_POSITION` |
| `InRangePosition` | `RangePosition` |
| `TimePickerFooterMode` | удалён |

Оси `VIEW_MODE`/`CALENDAR_MODE`/`SIZE` — без изменений.

---

### @ds/card  (old: @snack-uikit/card)

_Крупная переработка: полиморфный контейнер вместо compound-компонента, outline→view, size→radius._

**Переименованные пропсы**
- `outline?: boolean` → `view?: View` (`'simple'|'outline'|'shadow'`, DOM); `outline` больше нет.
- `size?: Size` → `radius?: Radius` (`'s'|'m'|'l'`, DOM `data-radius`). `Size`/`SIZE` сохранены алиасами на `Radius`/`RADIUS`.
- `multipleSelection?` → `multiSelect?`.

**Удалённые**
- Compound-подкомпоненты `Card.Header`, `Card.Image`, `Card.Footer`, `Card.FunctionBadge` и namespace-типы (`Card.HeaderProps`, `Card.ImageProps`, `Card.FooterActionProps`, `Card.FooterPromoProps`, `Card.FooterCallToActionProps`, `Card.FunctionBadgeProps`) — контент теперь только через `children`.
- Слот-пропсы `header`, `footer`, `image`, `functionBadge`, `promoBadge`, `badgeAlwaysVisible`, `name`.
- `onClick`, `onKeyDown`, `href` — заменены полиморфизмом (`as='a'` + нативные атрибуты).

**Новые**
- Полиморфизм: `as?: T`, `innerRef?: PolymorphicRef<T>`, + `Omit<ComponentPropsWithoutRef<T>, …>`.
- `view?: View`, `backgroundPredefined?: BackgroundPredefinedFill`, `interactive?: boolean` (default true).
- Новые типы: `View`, `Radius`, `BaseCardProps`, `CardProps<T>`, `PolymorphicRef`; константы `RADIUS`, `VIEW`.

**Изменённый тип/сигнатура**
- `CardProps` из плоского `WithSupportProps<{…}>` → generic полиморфный `CardProps<T extends ElementType='div'>`.

**Переименованные константы/типы**
- `SIZE` → `RADIUS` (`SIZE` = алиас). Новый `VIEW`.
- `TEST_IDS`: добавлен `root`; `check`→`checkBadge`; удалены `promoBadge`, `option`, `check`, `anchor`; ключи слотов приведены к `card__…`.

---

### @ds/carousel  (old: @snack-uikit/carousel)

_Публичная поверхность пропсов `Carousel` без изменений; ось `controlsVisibility` вынесена в именованную константу/тип._

**Изменённый тип/сигнатура**

- `controlsVisibility?: 'hover' | 'always'` → `controlsVisibility?: ControlsVisibility` (структурно совместимо).

**Переименованные/удалённые константы и типы**

- Добавлены `CONTROLS_VISIBILITY` (const) и тип `ControlsVisibility`.
- `TEST_IDS` теперь `as const` со строковыми значениями (`carousel__arrow-next` и т.д.); раньше тип-объект со строками.
- `Control` / `ItemProvider` в публичный корень не экспортируются (как и раньше).

Пропсы `CarouselProps` (showItems, scrollBy, transition, swipe, autoSwipe, arrows, pagination, gap, state, infiniteScroll, …) — **без изменений**.

---

### @ds/chips  (old: @snack-uikit/chips)

Набор компонентов (ChipAssist, ChipToggle, ChipChoice* , ChipChoiceRow) сохранён; breaking-изменения в осях размеров и в нескольких типах.

**Значения enum-осей**
- `SIZE`: было `xs | s | m | l` → стало `s | m | l`. Удалено значение `xs`.
- `BUTTON_SIZE`: было `xxs | xs` → стало `s | m`. Полная смена значений.
- `ChipChoiceRowSize`: было `xs | s | m` (`ValueOf<CHIP_CHOICE_ROW_SIZE>`) → стало `= Size` (`s | m | l`). Удалён `xs`, добавлен `l`.
- `CHIP_CHOICE_TYPE` — без изменений.

**Удалённые константы/типы**
- `VARIANT` const + тип `Variant` (`label-only`/`icon-before`) — удалены из публичного API (в старом ките экспортировались из корня).
- `CHIP_CHOICE_ROW_SIZE` const — удалён.
- `MAP_ROW_SIZE_TO_CHOICE_SIZE` const — удалён.

**Переименованные константы**
- `CHIP_CHOICE_ROW_IDS` → `CHIP_CHOICE_ROW_TEST_IDS` (значения теперь kebab с префиксом `chip-choice-row__`).

**Удалённые пропсы**
- `ChipChoiceTimeProps`: убран проброс `footerMode` (был `Pick<TimePickerProps, ...'footerMode'>`).
- `ChipChoiceDate.mode` теперь ссылается на `CalendarDropdownProps['mode']` (переименован источник типа), поведенчески эквивалент.

**Изменённый тип/сигнатура**
- `BaseChipProps.icon`: `ReactElement` → `ReactNode`.
- `ContentRenderProps`: `Omit<ItemContentProps, 'option' | 'disabled'>` → `Omit<ItemContentProps, 'label' | 'disabled'>` (изменён исключаемый ключ `option`→`label`).
- `disableFuzzySearch` перемещён из `ChipChoiceCommonProps` в `ChipChoiceSelectCommonProps` (у date/time/custom его больше нет).
- Дефолт `ChipChoiceRow.size`: `'s'` → `'m'`. Дефолты `size` у ChipAssist/ChipChoice* : теперь `SIZE.M`.

**Новые константы/типы** (brief): `SPINNER_SIZE_MAP`, тип `Range` (в ChipChoice), `resetButton`/`selectedCount` в `CHIP_CHOICE_TEST_IDS`, locale-экспорт (`chipsLocale`).

---

### @ds/code-editor  (old: @snack-uikit/code-editor)

_Публичный API CodeEditor в основном сохранён; изменены типы schema-режима и загрузчик monaco._

**Переименованные пропсы**
- `hasBackground` → `background` (`boolean`, псевдо-бекграунд editor-области) — канон bare-flag «наличие фона» (FF-8680, [prop-naming.md §2](.claude/skills/prop-naming.md)). DOM-атрибут: `data-has-background` → `data-background`.

**Новые пропсы**
- `CodeEditorProps.theme?: string` — вынесен явным пропом (раньше приходил через `EditorBaseProps = MonacoEditorProps.theme`), с авто-подбором `snack`/`snackDark` по DS-теме.
- `CodeEditorProps.showRowNumber?: boolean` — колонка номеров строк.

**Изменённый тип/сигнатура**
- `EditorBaseProps`: было `= MonacoEditorProps`; стало `Omit<MonacoEditorProps, 'theme'> & { jsonSchema?: never }` (discriminated union).
- `EditorWithJsonSchemaProps`: было `Omit<EditorBaseProps,'language'|'path'> & { language } & (WithJsonSchema|WithoutJsonSchema)`; стало `Omit<MonacoEditorProps,'theme'|'path'|'language'> & WithJsonSchema`.
- `WithJsonSchema`: добавлено поле `language: SupportedSchemaLanguage` (раньше язык жил в родительском типе); `WithoutJsonSchema`-ветка убрана.

**Удалённые (из публичного экспорта)**
- Ре-экспорт `loader`, `useMonaco` из `@monaco-editor/react` (был в корневом index). Заменены на `loadMonacoEditor`, `preloadMonacoEditor`, `withMonaco`.

**Новые (экспорты/компоненты)**
- `AsyncCodeEditor`, `LazyCodeEditor` (+ тип `LazyCodeEditorProps = CodeEditorProps`).
- Константа `TEST_IDS`.
- `loadMonacoEditor`, `preloadMonacoEditor`, `withMonaco`.

_Примечание: `CopyButton` в обеих версиях не входит в публичный барель (components/index)._

---

### @ds/color-picker  (old: @snack-uikit/color-picker)

_Заметный сдвиг API: проп `colorMode` заменён на `availableModes`, исправлена опечатка `Rbg`→`Rgb`, добавлены size/withColorArea._

**Переименованные пропсы**
- `colorMode?: { hex?; rgb?; hsv? }` → `availableModes?: ColorMode[]` (объект-флаги → массив режимов).

**Новые пропсы**
- `withColorArea?: boolean` (default `true`) — 2D saturation/value область.
- `size?: Size` (default `m`).

**Изменённый тип/сигнатура**
- `onChange?(rawColor)` — параметр `Partial<RawColor>` → `RawColor`.

**Значения enum-осей / константы**
- `COLOR_MODE`: ключ `Rbg` (опечатка) → `Rgb`; значения из `string` стали строковыми литералами `'hex'|'rgb'|'hsv'`.
- `COLOR_MODE_LABEL`: ключ `Rbg` → `Rgb`.

**Переименованные константы/типы**
- `ColorMode` перенесён из `constants` в `types` (имя сохранено).
- Цветовые типы (`RgbColor`, `RgbaColor`, `HslColor`, `HslaColor`, `HsvColor`, `HsvaColor`) теперь определены локально, а не реэкспортируются из `react-colorful` (имена совпадают).

**Удалённые (константы)**
- `COLOR_MODE_OPTIONS`, `DEFAULT_COLOR_MODE_CONFIG`.

**Новые (экспорты/константы/типы)**
- Константы: `DEFAULT_AVAILABLE_MODES`, `DEFAULT_COLOR`, `SIZE`, `NATIVE_INPUT_SUFFIX`, `TEST_IDS`.
- Тип `Size`; утилита `isColorMode`; locale-слой (`colorPickerLocale`).

---

### @ds/counter  (old: @snack-uikit/counter)

_Пропсы CounterProps без изменений (value, appearance, variant, size, plusLimit, color, className + support props). Изменения только в enum-осях._

**Значения enum-осей**
- `APPEARANCE`: добавлены `Orange`, `Yellow`, `Green`, `Blue`, `Violet`, `Pink` (было `Primary`/`Neutral`/`Red`).
- `SIZE`: было `{ S:'s', M:'m' }` → стало `{ XS:'xs', S:'s' }`. Значение `M` удалено, добавлено `XS`. **Дефолт size остался `s`**, но набор значений сместился.

---

### @ds/divider  (old: @snack-uikit/divider)

_Ось толщины линии переименована, добавлена ось цвета._

**Переименованные пропсы**
- `weight` → `variant` (та же роль — толщина линии).

**Новые**
- `appearance` (`DividerAppearance`) — цвет линии: `default` / `onComplementary`.

**Значения enum-осей**
- Ось толщины: было `WEIGHT { Light:'light', Regular:'regular' }` → стало `VARIANT { Regular:'regular', Thin:'thin' }`. Значение `light` → `thin`, `regular` сохранено.
- `ORIENTATION` без изменений.

**Переименованные константы/типы**
- `WEIGHT` → `VARIANT`; тип `Weight` → `DividerVariant`.
- Тип `Orientation` → `DividerOrientation`.
- Добавлены `APPEARANCE` / `DividerAppearance`, `TEST_IDS`.

---

### @ds/drawer  (old: @snack-uikit/drawer)

_Аналогично modal: `size`→`width`, потеря `mode`/`titleTooltip`/`image`, position расширен, компонент адаптивный._

**Переименованные пропсы**
- `Drawer.size` → `Drawer.width`; `DrawerCustom.size` → `DrawerCustom.width`. Тип `Size` → `Width`.

**Удалённые пропсы**
- `Drawer.titleTooltip` (Pick из DrawerHeader) — заменён на `slotAfterTitle`.
- `Drawer.image` / `DrawerHeader.image` — вместо неё `media?: ReactNode`.
- `DrawerCustom.mode` — режим `Regular`/`Soft` убран целиком.

**Новые пропсы** (brief)
- `Drawer`: `slotAfterTitle`, `onBackButtonClick`, `media`, `disclaimer`, `footer`, `footerActionsOrientation`, mobile-пропсы `swipeEnabled`/`snapPoints`/`snapIndex`/`onSnapIndexChange`/`safeArea`.
- `DrawerCustom`: `showBlackout` (default true), `heightAuto`, `footer`, mobile `snapPoints`/`swipeEnabled`/`safeArea`. `position` стал **обязательным** (был опциональным).

**Изменённый тип/сигнатура**
- `approveButton`/`cancelButton`/`additionalButton`: `Omit<Button*Props,'size'> & { tooltip?: TooltipProps }` → `BottomSheetActionButton` (вложенный `tooltip` убран).
- `DrawerProps` теперь адаптивный union (desktop-панель / mobile-BottomSheet).

**Значения enum-осей**
- `POSITION`: было `{ Left, Right }` → стало `{ Left, Right, Top, Bottom }`.

**Переименованные константы/типы**
- `SIZE` {S,M,L} → `WIDTH`; `SIZE_AS_VALUES` → `WIDTH_AS_VALUES`; тип `Size` → `Width`.
- Удалены `MODE`, тип `Mode`, константа `NESTED_DRAWER_PUSH_DISTANCE`.
- Новый реэкспорт `FOOTER_ACTIONS_ORIENTATION`, `BottomSheetActionButton`, `FooterActionsOrientation`.

---

### @ds/dropdown  (old: @snack-uikit/list — DropList + EmptyState; истинный old-surface @snack-uikit/dropdown в дампе отсутствует)

_Не диф, а переработка: новый @ds/dropdown — адаптивная surface-оболочка popover/BottomSheet (шапка/поиск/футер/состояние), а НЕ старый DropList (popover+List). Список уехал в @ds/list (Droplist). Сверять построчно не с чем — старый `@snack-uikit/dropdown` в дампе не лежит (в дампе только @snack-uikit/list). Ниже — что подтверждается по канону FF-8680 и по перенесённому empty-state._

**Переименованные пропсы**

| Компонент | Было | Стало | Тип | Примечание |
|---|---|---|---|---|
| Dropdown | `headline` | `title` | `ReactNode` | канон FF-8680; исходный проп жил в old `@snack-uikit/dropdown` (в дампе нет), в новом — `title` (заголовок topBar) |
| Dropdown | `headlineHint` | `slotAfterTitle` | `ReactNode` | канон; подсказка-иконка рядом с заголовком |
| EmptyState | `description` | `content` | `InfoBlockProps['content']` | old `EmptyStateProps = Pick<InfoBlockProps,'description'\|...>` → в новом состоянии `content` (`Pick<InfoBlockProps,'content'>`) |

**Изменённый тип/сигнатура**
- Модель пустых состояний полностью переделана. Было: объект `EmptyState = { noDataState, noResultsState, errorDataState }`, каждый — `EmptyStateProps = Pick<InfoBlockProps,'description'|'icon'|'data-test-id'|'footer'|'className'>`. Стало: дискриминированный union `DropdownState = {type:'loading'} | ({type:'not-found'}&Action&{content}) | ({type:'no-data'}&Action&{content,icon}) | ({type:'data-error'}&Action&{content,icon})`, где `Action = { actionLabel?, onActionClick?() }`. Флаги `dataFiltered`/`dataError` заменены явным `state.type`.
- Пропсы позиционирования/поведения теперь `Pick<PopoverPrivateProps,...>` (`@ds/popover-private`) вместо старого `@snack-uikit/dropdown`.

**Значения enum-осей / Переименованные константы/типы**
- Новая const `STATE = { Loading:'loading', NotFound:'not-found', NoData:'no-data', DataError:'data-error' }`; `TEST_IDS = { root:'dropdown', trigger:'dropdown-trigger' }`. В старом list-дампе аналога `STATE` не было (были объекты `*State`).

**Новые (кратко)**
- Адаптивность: desktop → popover, mobile (`AdaptiveProvider`) → `BottomSheet` (`@ds/bottom-sheet`); единый `DropdownProps`.
- Новые слоты/пропсы surface: `content` (обязательный body), `title`, `slotAfterTitle`, `search`, `footer`, `headerDivider`, `footerDivider`, `state`, `bodyPadding` (default `true`), `className`.
- Desktop-only popover-пропы (молча игнорируются на mobile): `placement`, `widthStrategy`, `offset`, `fallbackPlacements`, `hoverDelayOpen/Close`, `closeOnEscapeKey`, `triggerClickByKeys`, `outsideClick`, `disableSpanWrapper`, `triggerClassName`, `triggerRef`, `container`, `stopPropagation`.

---

### @ds/dropzone  (old: @snack-uikit/drop-zone)

_Значительная переработка: ренейм компонента DropZone→Dropzone, слоты title/description→children, новые form-field пропсы, size._

**Переименованные пропсы**
- `Dropzone`: слоты `title?: string` + `description?: ReactNode` удалены → контент теперь через `children?: ReactNode`.

**Удалённые**
- `Dropzone`: `title`, `description` (см. выше).

**Новые**
- `Dropzone`: `children?`, `size?: Size` (`'s'|'m'|'l'`, default `m`), плюс общий `FileFieldProps`: `maxSize?`, `onFilesReject?(rejections)`, `name?`, `id?`, `required?`, `form?`, `capture?`, `onChange?`, `innerRef?`.
- `FileUpload`: `onFilesReject?`, `onChange?`, `maxSize?`, `disabled?`, `innerRef?` + `NativeInputProps` (нативные атрибуты input).
- Новые типы: `FileFieldProps`, `AcceptInput`, `FileRejection` (из `utils`), `Size`.

**Изменённый тип/сигнатура**
- `accept` во всех компонентах: `string` → `AcceptInput` (`string | string[]`).
- `DropzoneProps` = `WithSupportProps<{…} & FileFieldProps>` (ранее `Omit<PrivateDropZoneProps, 'isOver'|DropEvents>`).
- `HiddenDropZoneProps`: `DropZoneProps & {children}` → `Omit<DropzoneProps,'children'> & {children: ReactNode}`.

**Переименованные константы/типы**
- Компонент `DropZone` → `Dropzone`; тип `DropZoneProps` → `DropzoneProps`.
- `UPLOAD_MODE` перенесён из helperComponents в `constants.ts` (значения `Single`/`Multiple` без изменений).
- Новые `SIZE`, `TEST_IDS` в публичном API.

---

### @ds/fields  (old: @snack-uikit/fields)

_Массовый рефактор: единый `defaultValue` (uncontrolled), новые слоты `background`/`fieldClassName`/`iconBefore`/`layoutPresets`, `labelTooltip` стал `QuestionTooltipProps`, FieldSelect перешёл на `items` (@ds/list), FieldDate получил `date-range`._

#### FieldDecorator (база, шарится всеми полями)

**Переименованные / изменённый тип**
| Было | Стало | Примечание |
|------|-------|-----------|
| `labelTooltip?: ReactNode` | `labelTooltip?: QuestionTooltipProps` | тип сменился на объект-пропсы тултипа |
| ref через `forwardRef` | `innerRef?: Ref<HTMLDivElement>` | ref теперь отдельным пропом |

- **Удалено:** `labelTooltipPlacement` (ушёл внутрь `labelTooltip`-объекта) — во всех полях.
- **Enum:** `SIZE` теперь `s | m | l` (добавлен `l`). `VALIDATION_STATE` добавил `valid` (стало default/error/warning/success/valid).

#### Общее по всем полям (FieldText/TextArea/Select/Stepper/Secure/Date/…)
- **Новые пропсы:** `defaultValue` (uncontrolled-режим — раньше только controlled `value`), `background?: boolean`, `fieldClassName?: string`, `layoutPresets?: FieldLayoutPresets` (адаптив), `iconBefore?: ReactNode`.
- `prefixIcon`: `ReactElement` → `ReactNode` (FieldText/FieldSecure).
- Пропы поля больше не собираются из `@snack-uikit/input-private` `Pick`-ами, а объявлены явно (`id`/`name`/`placeholder`/`disabled`/`readonly`/`autoFocus`/`onFocus`/`onBlur`/…).

#### FieldText
- **Переименовано/удалено:** `button?: Button` → удалён; вместо него слоты `elementBefore?`/`elementAfter?: FieldElementSlot` + `droplist?: FieldElementDroplistProps`.
- **Новое:** `iconAfter`, `outline`.
- `onChange`: `(value, e?: InputEvent)` → `(value: string)` (без второго аргумента).
- Колбеки `onClearButtonClick`/`onCopyButtonClick` — имена сохранены.
- Удалён `type?: 'text'|'tel'|'email'`.

#### FieldTextArea
- **Новое:** `header?: ReactNode` (в дополнение к `footer`).
- `footer`, `minRows`, `maxRows`, `resizable`, `showClearButton`, `showCopyButton`, `allowMoreThanMaxLength` — сохранены.

#### FieldStepper
- `min`/`max` теперь собственные пропсы (были из input-private Pick).
- **Новое:** `clampTooltipText?: { min?; max? }` (замена/дополнение к тултипам лимитов), `showCopyButton`.
- `plusButtonTooltip`/`minusButtonTooltip`, `step`, `allowMoreThanLimits`, `prefix`/`postfix` — сохранены.

#### FieldSecure
- **Переименовано:** нет прямых; **новое:** `defaultHidden?: boolean`, `showHideButton?: boolean` (шорткат маскирования кнопкой).
- `hidden`/`onHiddenChange`, `showCopyButton`, `asyncValueGetter`, `allowMoreThanMaxLength` — сохранены.

#### FieldSelect
- **Крупная смена модели данных:** `options: OptionProps[]` (кастомный shape `option`/`caption`/`description`/`value`) → `items?: ItemProps[]` (формат `@ds/list`). `pinTop`/`pinBottom` → `ItemProps[]`. Значение теперь `ItemId`, а не `string|number` + собственный тег.
- **Enum:** `selection` — значения `single`/`multiple` без изменений (в легаси уже был `multiple`); новая константа `SELECTION_MODE` + тип `Selection`.
- **Переименовано:** для множественного режима `selectedOptionFormatter` → `formatSelected` (сигнатура `(selected: {id,label}[]) => string`); одиночный сохраняет `selectedOptionFormatter` с новой сигнатурой `(selected: {id,label}) => string` (было `(item?: ItemWithId) => string`).
- `onChange`: single `(value: ItemId | undefined)`, multiple `(value: ItemId[])`.
- **Удалено:** `prefixIcon` (→ `iconBefore`).
- **Новое:** `placement`, `background`, `fieldClassName`, `defaultValue`.
- Сохранены (в т.ч. `@deprecated addOptionByEnter`): `searchable`, `search`, `autocomplete`, `enableFuzzySearch`, `resetSearchOnOptionSelection`, `removeByBackspace`, `widthStrategy`, `showCopyButton`/`showClearButton`, `open`/`onOpenChange`.
- Примечание: `addCustomOptionTriggers` (single/multiple) — присутствовал в легаси, в новых типах не обнаружен (вероятно удалён).

#### FieldDate
- **Enum/константа:** `MODES` (`date`,`date-time`) → `DATE_MODE` (`date`,`date-time`,**`date-range`**); тип `Mode` → `DateMode`. Новый режим периода.
- **Новые типы:** `DateValue = Date | undefined`, `DateRangeValue = [DateValue, DateValue]`; пропсы разделены на `FieldDateSingleProps` / range-вариант.
- **Новое:** `background`, `fieldClassName`, `iconBefore`, `placeholder`, `labelFrom`/`labelTo` (aria для полей периода), `layoutPresets`, плоский `showSeconds` (раньше — в дискриминированном `FieldDateWithSeconds`), `defaultValue`.
- **Удалено:** `buildCellProps` (Pick из CalendarProps) — не обнаружен в новом API.
- `value`/`onChange`/`open`/`onOpenChange`/`showCopyButton`/`showClearButton`/`mode` — сохранены (value/onChange расширены под range).

#### Переименованные константы/типы (уровень пакета)
- Удалены `CONTAINER_VARIANT` / `BUTTON_VARIANT` и типы `ContainerVariant` / `ButtonVariant` (внутренняя раскладка ушла).
- `Button` (тип встроенной кнопки FieldText) удалён → слот-модель `FieldElementSlot` / `FieldElementDroplistProps`.
- Публичный `TEST_IDS` (плоский, по всем полям) — новый экспорт.

---

### @ds/hot-spot  (old: @snack-uikit/hot-spot)

Пропсы `HotSpotProps` идентичны. Единственное отличие поверхности — сужение enum `APPEARANCE`.

**Значения enum-осей**
- `APPEARANCE`: удалено значение `Neutral: 'neutral'` (было первым в старом ките). Остальные (`Primary`, `Red`, `Orange`, `Yellow`, `Green`, `Blue`, `Violet`, `Pink`) — без изменений. `PLACEMENT` — без изменений.

**Новые константы** (brief): `TEST_IDS`.

---

### @ds/icon-predefined  (old: @snack-uikit/icon-predefined)

Одно переименование пропа (`decor`→`background`); breaking-изменения в значениях `shape` и оси `SIZE`.

**Переименованные пропсы**
- `decor` → `background` (`boolean`, наличие цветной подложки, дефолт `true`) — канон bare-flag «наличие фон/заливка-слоя» (FF-8680, [prop-naming.md §2](.claude/skills/prop-naming.md)). DOM-атрибут: `data-decor` → `data-background`. Токен theme-цвета `decor` и CSS-класс `.decor` **не** переименованы (отдельная поверхность).

**Значения enum-осей**
- `shape`: `'round' | 'square'` → `'rounded' | 'squared'` (канон FF-8680). Дефолт — `'rounded'`.
- `SIZE`: было `s | m | l` → стало `m | l | 5xl`. Удалён `s`, добавлен `5xl`.
- `APPEARANCE` — без изменений.

**Новые константы** (brief): `TEST_IDS`.

Пропсы `IconPredefinedProps` (`appearance`, `background`, `icon`, `size`, `shape`, `className`); `background` (ex-`decor`) дефолт `true`.

---

### @ds/icons  (old: @snack-uikit/icons + @cloud-ru/uikit-product-icons)

_Смена модели доставки: раньше — плоский root-баррель с named-экспортом каждой иконки (инлайн standalone `<svg>`); теперь — sprite-first доставка через subpath-экспорты по доменам + fallback-first рендер. Props ядра и схема имён (`<Name>SVG`, проп `size: number`) сохранены._

#### Модель доставки (главное изменение)
- **Было:** корневой `index` = `export * from './components'` — ВСЕ иконки named-экспортом из корня пакета (`import { CalendarSVG } from '@snack-uikit/icons'`). Каждая иконка — отдельно сгенерированный `forwardRef` с инлайновым `<svg>` (standalone). Продуктовый пакет добавлял свои домены и реэкспортил `Sprite` из snack.
- **Стало:** корневой `index` экспортирует ТОЛЬКО `./types` и `./factory`. Иконки едут через **subpath-экспорты по доменам** (лучше tree-shaking, тянешь только нужную группу): `@ds/icons/interface/product`, `/interface/web`, `/interface/system`, `/flags`, `/logos`, `/services`, `/extensions`, `/sprite`.
- **Рендер иконок:** вместо standalone-инлайна каждая иконка сгенерирована через `createSpriteIcon({ symbolId, testId, fallback })` — **sprite-first с инлайн-fallback** (`<use href="#symbolId">` по смонтированному спрайту, но с зашитой копией глифа → видна и без спрайта). Standalone-инлайн остался только для `flags`/`logos` (сохранение цвета через `createStandaloneIcon`).

#### Ядро Icon-компонента (без изменений)
- Props: `ISvgIconProps = { className?, size?: number, style? } & SVGProps<SVGSVGElement>`. Размер — числовой проп `size` (в новом дефолт `24`).
- Схема имён — прежняя: named-экспорт `<PascalName>SVG`, `forwardRef<SVGSVGElement>`.

#### Изменённое / переименованное
- `ISvgIconProps`: было — per-file `interface ISvgIconProps extends SVGProps` (дублировалась в каждом файле иконки); стало — единый `export type ISvgIconProps` в `src/types.ts`.
- **Новые публичные фабрики** (`./factory`): `createThemedIcon` (+ типы `ThemedIconConfig`, `ThemedIconVariant`) — сборка цветной иконки/логотипа со свитчем по DS-теме (`@ds/theme` `useThemeAppearance`). Внутренние `createSpriteIcon`/`createStandaloneIcon`/`createPairedThemedIcon` наружу из `factory/index` НЕ экспортируются (только `createThemedIcon`).

#### Sprite-слой (subpath `@ds/icons/sprite`)
- Сохранены: `Sprite` (проп `content: string`, теперь `memo` + registry-нотификация), `SpriteSVG` (raw-symbol — теперь алиас на `sprite.system`).
- Новое: компоненты `SpriteFromUrl` (проп `src`, fetch+инлайн спрайта) и `SpriteIcon` (`SpriteIconProps = ISvgIconProps & { symbolId, testId?, fallback? }`, публичный, fallback-first).
- Спрайт разбит по доменам: raw-экспорты `SpriteSystemSVG`, `SpriteProductSVG`, `SpriteWebSVG`, `SpriteServicesSVG`, `SpriteExtensionsSVG` (вместо единого snack `SpriteSVG` + продуктового `SpriteSystemSVG`). Плюс внутренние `registry.ts` / `manifest.ts`.

#### Удалённое
- Продуктовые хуки `useThemeModification`, `useBrandModification` (`components/utils`) — убраны; тематизация иконок теперь через `@ds/theme` внутри `createThemedIcon`.
- Плоский root-экспорт всех иконок из `@ds/icons` (импорт иконок из корня пакета больше не работает — только через доменные subpath'ы).

---

### @ds/info-block  (old: @snack-uikit/info-block)

_Rename основного слота + удаление subcomponent Footer._

**Переименованные пропсы**
| Компонент | Было | Стало | Тип | Примечание |
|---|---|---|---|---|
| `InfoBlock` | `description` | `content` | `ReactNode` | канон: основной body → `content` (вторичного `description` в new нет). |

**Удалённые**
- Subcomponent `InfoBlock.Footer` + `FooterProps` + хук `useButtonWithTooltip`. Футер теперь — произвольный `ReactNode` в пропе `footer`.

**Изменённый тип/сигнатура**
| Компонент | Проп | Было | Стало |
|---|---|---|---|
| `InfoBlock` | `icon` | `Pick<IconPredefinedProps,'icon'\|'decor'\|'appearance'>` | `IconPredefinedProps` (полный) |
| `InfoBlock` | `footer` | `ReactElement<FooterProps> \| ReactNode` | `ReactNode` |

**Переименованные константы/типы**
- `TEST_IDS`: ключ `description`→`content`; удалены `primaryButton`/`secondaryButton`; добавлен `root`; значения теперь `info-block__<slot>`. Тип `FooterProps` удалён.

Оси `SIZE`(s/m/l)/`ALIGN`(vertical/horizontal), пропсы `title`/`size`/`align` — без изменений.

---

### @ds/link  (old: @snack-uikit/link)

_Крупный рефактор: переименование текстового пропа, удаление осей size/purpose, замена textMode на role._

**Переименованные пропсы**
- `text` → `label` (canon FF-8680).
- `textMode` → `role` (роль поверхности; общее значение `OnAccent` сохранено). Значения: `default`/`accent`/`on-accent` → `regular`/`onAccent` (см. ниже).

**Удалённые**
- `size` (+ константа `SIZE` `s`/`m`/`l` и тип `Size`) — ось размера убрана.
- `purpose` (+ константа `PURPOSE` Display/Headline/Title/Label/Body и тип `Purpose`) — типографическая роль убрана.
- `truncateMaxLines` — больше нет; убран discriminated-union по `truncateVariant`.

**Новые**
- `role` (`ROLE` `regular`/`onAccent`) — см. переименование из textMode.
- `underlined?: boolean` (default `false`) — нижнее подчёркивание.

**Изменённый тип/сигнатура**
- `truncateVariant`: было `Extract<..., 'end'|'middle'>` в составе union `TruncateEndProps | TruncateMiddleProps` → стало простой `TruncateStringProps['variant']`.
- `PickLinkProps`: `DistributivePick` → обычный `Pick`.

**Значения enum-осей**
- `APPEARANCE`: значение `invert-neutral` → `invertNeutral` (kebab → camelCase). Остальные значения те же.
- `TARGET` без изменений.

**Переименованные константы/типы**
- `TEXT_MODE`/`TextMode` → `ROLE`/`Role`; удалены `SIZE`/`Size`, `PURPOSE`/`Purpose`.

---

### @ds/list  (old: @snack-uikit/list)

_Public API сохранён; ключевые ренеймы — ItemContent `option→label`, EmptyState `description→content`; крупное новое — drag&drop (`ReorderableList`/`ReorderableDroplist`) и адаптивный `Droplist`._

**Переименованные пропсы**

| Компонент | Было | Стало | Тип | Примечание |
|---|---|---|---|---|
| ItemContent | `option` | `label` | `string \| number` | канон FF-8680 (обязательное поле) |
| ItemContent | `truncate.option` | `truncate.label` | `number` | канон; в `TruncateProps` |
| ListEmptyState (EmptyStateProps) | `description` | `content` | `InfoBlockProps['content']` | `Pick<InfoBlockProps,'description'\|...>` → `'content'\|...` |

**Удалённые**
- `SearchState.onBlur` — old `SearchState = Pick<SearchPrivateProps,'value'\|'onChange'\|'onKeyDown'\|'onBlur'\|'placeholder'\|'loading'>`; новый `SearchState` собственный, `onBlur` убран.

**Изменённый тип/сигнатура**
- `SearchState` теперь автономный тип (был `Pick<SearchPrivateProps,...>` из `@snack-uikit/search-private`); `onChange` стал обязательным: `onChange(value: string, e?: ChangeEvent<HTMLInputElement>): void`.
- `DroplistProps` picks из `@ds/dropdown` `DropdownProps` (было — `@snack-uikit/dropdown`): `'trigger'|'placement'|'widthStrategy'|'open'|'onOpenChange'|'triggerClassName'|'closeOnPopstate'` — набор тот же.
- `List`/`Droplist` теперь `ListPropsCommon`-based; `virtualized` живёт в `ListProps` (не в `ReorderableList`).

**Значения enum-осей**
- `selection.mode`: `'none' | 'single' | 'multiple'` — БЕЗ изменений. Канон `multi→multiple` к @ds/list НЕ применяется: старый `@snack-uikit/list` уже использовал `'multiple'` (проверено по old SelectionProvider). Новое — вынесено в const `MODE`.
- `ITEM_TYPE`: добавлен `Simple: 'simple'` (был набор `next-list`/`collapse`/`group`/`group-select`).

**Переименованные константы/типы**
- Оси вынесены в `as const` + `ValueOf`-типы: `SIZE`→`Size`, `MODE`→`Mode`, `ITEM_TYPE`→`ItemType` (в старом — строковые литералы в типах, без const-объектов).
- `ITEM_PREFIXES` значения сменились: old `default:'default'/pinTop:'pinTop'/...` → new `default:'~main'/pinTop:'~pinTop'/pinBottom:'~pinBottom'/footer:'~footer'/search:'~search'/dropFocus:'~dropFocus'` (сменились и значение `default`, и префикс `~`).
- Публичный `TEST_IDS` — новый (в старом list не экспортировался).

**Новые (кратко)**
- `ReorderableList` + `ReorderableDroplist` (drag&drop за ручку), модель `ReorderItem`/`SimpleItem`/`SimpleGroupItem`, колбек `onItemsReorder(items)`.
- Адаптивный `Droplist`: desktop popover / mobile `BottomSheet`; mobile-слоты `label`/`actionButton`/`slotAfterTitle`/`onBackButtonClick`; `container` (ref портала).
- `List`: новые `header`, `headerDivider`, `footerDivider`, `limitedScrollHeight`.
- Новые экспорты: `getDefaultItemId`/`getFooterItemId`/`getItemAutoId`, `NewListContextProvider`; локаль (`./locale`).

---

### @ds/loader  (old: @snack-uikit/loaders)

_Пакет loaders→loader; в `LOADER_SIZE` значение `xxs` переименовано в `2xs`; у `Sun` отдельная ось размеров._

**Значения enum-осей**

- `LOADER_SIZE`: было `XXS='xxs'` → стало `'2XS'='2xs'`. **`xxs` удалён, добавлен `2xs`** — ломает `size="xxs"`.
- Добавлена ось `SUN_SIZE = { XS, S, M, L }` (без `2xs`).

**Изменённый тип/сигнатура**

- `SunProps.size`: тип `LoaderSize` → `SunSize` (у `Sun` больше нет `2xs`). `Spinner.size` остаётся `LoaderSize`.

**Переименованные/удалённые константы и типы**

- Добавлен тип `SunSize`.
- Имя npm-пакета: `@snack-uikit/loaders` → `@ds/loader`.

---

### @ds/markdown  (old: @snack-uikit/markdown)

_Крупный редизайн MarkdownEditor: режим Mode(View/Edit) заменён на `preview`-тогл, убраны field-пропсы, добавлен управляемый тулбар._

**Markdown — переименованные пропсы**
- `onCopyClick?(): void` → `onCodeCopyClick?(code: string): void` (переименован + сигнатура с аргументом кода).

**Markdown — изменённый тип/сигнатура**
- `value?: string` → `value: string` (обязателен).
- `remarkPlugins` / `rehypePlugins`: `Options['...']` → `PluggableList`.

**MarkdownEditor — удалённые пропсы**
- `defaultMode?: Mode` (заменён `preview`/`defaultPreview`), `error`, `required`, `onCodeCopyClick`, `components`, и Pick-поля `caption`, `hint`, `labelTooltip`, `labelTooltipPlacement`, `footer`.

**MarkdownEditor — новые пропсы**
- `defaultValue?`, `preview?`/`defaultPreview?`/`onPreviewChange?`, `previewLabel?`, `hideHeader?`, `toolbar?: false | ToolbarItemId[]`.

**MarkdownEditor — изменённый тип/сигнатура**
- `value` и `onChange` стали опциональными (было required).
- `label?: string` → `label?: string | false`.

**Переименованные константы/типы**
- Ось `MODE` (`View`/`Edit`) и тип `Mode` удалены — заменены boolean-пропом `preview`.

**Удалённые (экспорты)**
- Ре-экспорт `setNonce` из `@snack-uikit/fields`.

**Новые (константы/типы)**
- `TOOLBAR_ITEM`, `HEADING_LEVEL`, `ON_CHANGE_DEBOUNCE_MS`, `TEST_IDS` + helper-фабрики test-id; типы `ToolbarItemId`, `HeadingLevel`; locale-слой.

---

### @ds/modal  (old: @snack-uikit/modal)

_Значимые изменения публичной поверхности. Старый API уже был на `title`/`subtitle`/`content` (не `headline`), но перешёл с `size`→`width`, потерял `align`/`picture`, стал адаптивным._

**Переименованные пропсы**
- `Modal.size` → `Modal.width` (и `ModalCustom.size` → `ModalCustom.width`). Тип `Size` → `ModalWidth`.

**Удалённые пропсы**
- `Modal.align` (и `ModalHeader.align`, `ModalBody.align`, `ModalFooter.align`) — ось выравнивания `ContentAlign`/`Align` убрана целиком.
- `Modal.picture` / `ModalHeader.picture` (иконка/картинка в шапке) — вместо неё новый слот `media?: ReactNode`.
- `Modal.titleTooltip` / `ModalHeader.titleTooltip` — заменён на `slotAfterTitle`.
- `ModalCustom.animationDuration`, `ModalCustom.animationDurationPercent` — убраны.
- Дискриминированный union `ModalSProps | ModalMProps | ModalLProps` (с `LinkElement` generic) — убран, `ModalProps` теперь один плоский тип без generic.

**Новые пропсы** (brief)
- `Modal`: `media`, `footer` (произвольный, приоритетнее кнопок), `footerActionsOrientation`, `onBackButtonClick`, `slotAfterTitle`, `heightAuto`, `container`, `className`, `rootClassName`.
- `ModalCustom`: `rootClassName`, `heightAuto`, `container`, mobile-пропсы `snapPoints`/`swipeEnabled`/`safeArea`/`showBackdrop` (Только mobile). Адаптивный (desktop-модалка / mobile-BottomSheet).

**Изменённый тип/сигнатура**
- `approveButton`/`cancelButton`/`additionalButton`: `Omit<ButtonFilled/Outline/SimpleProps,'size'|'data-test-id'>` → `BottomSheetActionButton`. `approveButton` стал **опциональным** (был обязателен).
- `disclaimer`: `{ text: string; link?: PickLinkProps<...> }` → `ReactNode`.

**Значения enum-осей**
- `MODE` без изменений (`regular`/`aggressive`/`forced`).

**Переименованные константы/типы**
- `SIZE` {S,M,L} → `WIDTH` {S,M,L}.
- `Size` → `ModalWidth`; `Mode` → `ModalMode`.
- Удалены `ALIGN`, `CONTENT_ALIGN`, `ANIMATION_STATE` и типы `Align`, `ContentAlign`, `AnimationState`.
- Новый реэкспорт `FOOTER_ACTIONS_ORIENTATION`, `BottomSheetActionButton`, `FooterActionsOrientation` (из `@ds/bottom-sheet`).

---

### @ds/pagination  (old: @snack-uikit/pagination)

_Пропсы Pagination сохранены; переименована/переопределена ось размера (xs/s → s/m), дефолт size сменился._

**Изменённый тип/сигнатура**
- `PaginationProps.size`: тип `Size` → `PaginationSize`; дефолт `'s'` → `'m'`.

**Значения enum-осей**
- Публичная ось размера: было `xs | s`, стало `s | m` (значение `xs` убрано из публичной оси, `m` добавлено).

**Переименованные константы/типы**
- `SIZE` → `PAGINATION_SIZE` (значения переопределены на `S/M`); тип `Size` → `PaginationSize`.
- `VARIANT` / `Variant` — без изменений.

**Новые (константы/типы/экспорты)**
- `PAGINATION_SLIDER_SIZE` (`Xs`/`S`) + тип `PaginationSliderSize` (внутренняя ось слайдера).
- `TEST_IDS` + `getPageNumberTestId` / `getPageMoreTestId` / `getSliderItemTestId`.
- Реэкспорт `utils` (`getPaginationEntries`, `getRange`).

---

### @ds/popover  (old: @snack-uikit/popover)

_Слот контента переименован; поверхность расширена (полный проброс PopoverPrivateProps вместо curated Pick)._

**Переименованные пропсы**
- `tip` → `content` (главный слот тела поповера; canon payload→content).

**Удалённые**
- `disableMaxWidth` — убран; ограничение ширины теперь через `POPOVER_WIDTH_STRATEGY` из popover-private.

**Изменённый тип/сигнатура**
- Раньше публиковался узкий `Pick<PopoverPrivateProps, 'trigger'|'triggerRef'|'triggerClassName'|'className'|'placement'|'open'|'onOpenChange'|'children'|'hoverDelayOpen'|'hoverDelayClose'|'outsideClick'|'closeOnPopstate'>`. Теперь — `Omit<PopoverPrivateProps, 'popoverContent'|'hasArrow'|'arrowContainerClassName'|'arrowElementClassName'>`, то есть проброшен весь публичный private-API (шире набор пропсов).

**Значения enum-осей / константы**
- Реэкспортируются из `@ds/popover-private`: `PLACEMENT`, `TRIGGER`, `POPOVER_WIDTH_STRATEGY`, `POPOVER_HEIGHT_STRATEGY`, `DEFAULT_FALLBACK_PLACEMENTS`. Добавлена `TEST_IDS`.

---

### @ds/progress-bar  (old: @snack-uikit/progress-bar)

_Аддитивно: новый ProgressBarCircle, size стал опциональным._

**Изменённый тип/сигнатура**
| Компонент | Проп | Было | Стало |
|---|---|---|---|
| `ProgressBar` | `size` | required | опциональный (дефолт `s`) |

**Новые пропсы/компоненты**
- Компонент `ProgressBarCircle` (`progress` required, `size` `s`/`xs`, `appearance`, `className`).
- `ProgressBarPage.appearance`.

**Переименованные константы/типы**
| Было | Стало |
|---|---|
| `SIZE` | `PROGRESS_BAR_SIZE` (+ `PROGRESS_BAR_CIRCLE_SIZE`) |

Оси `APPEARANCE`/размеры — без изменений. Ломающих пропов нет.

---

### @ds/promo-tag  (old: @snack-uikit/promo-tag)

Заметные breaking-изменения: переименования пропсов, смена оси размеров, добавлен полиморфизм.

**Переименованные пропсы**
- `text?: string` → `label?: string` (канон FF-8680).
- `color?: Color` → `role?: RoleAppearance`.

**Значения enum-осей**
- `SIZE`: было `xxs | xs | s` → стало `xs | s | m`. Удалён `xxs`, добавлен `m`.
- `APPEARANCE` — без изменений. Значения роли (`accent | decor`) — без изменений.

**Переименованные константы/типы**
- `COLOR` → `ROLE_APPEARANCE`; тип `Color` → `RoleAppearance`.

**Изменённый тип/сигнатура**
- Убрана union-развилка `PromoTagWithNodesProps | PromoTagWithoutNodesProps` (раньше `size='xxs'` запрещал `beforeContent`/`afterContent`, а `xs`/`s` — требовал). Теперь единый `PromoTagOwnProps`: `size`, `beforeContent`, `afterContent` доступны совместно без ограничений.
- Добавлен полиморфизм: generic `PromoTagProps<T extends ElementType = 'button'>` с `as` + `innerRef` + intrinsic-props. Корень по умолчанию `<button>` (был `<div>`).
- `onClick`: `(e: MouseEvent<HTMLDivElement>) => void` → `MouseEventHandler<HTMLElement>`.

**Новые константы/типы** (brief): `ROLE_APPEARANCE`/`RoleAppearance`, `MAP_SIZE_TO_TYPOGRAPHY_SIZE`, `TEST_IDS`, `PromoTagOwnProps`, `PolymorphicRef`.

---

### @ds/rating  (old: @snack-uikit/rating)

Публичный API совместим, изменений имён/удалений нет — только добавления.

**Новые пропсы**
- `size?: Size` (`'xs' | 's'`, дефолт `s`) — новой оси размера в старой версии не было.

**Переименованные константы/типы** — _без изменений_ (`APPEARANCE`, `Appearance`, `DEFAULT_STAR_COUNT`, `DEFAULT_RATING_VALUE` сохранены).

**Новые константы/типы** (brief): `SIZE` + тип `Size`, `TEST_IDS`, `HALF_STAR_VALUE`.

**Изменённый тип/сигнатура**: `onChange?: (value)=>void` → method-signature `onChange?(value): void` (косметика, совместимо).

---

### @ds/scroll  (old: @snack-uikit/scroll)

_Публичная поверхность сохранена почти 1:1. Один экспортируемый компонент `Scroll` + `setNonce`; отдельного `Scrollbar` нет ни в старом, ни в новом. Констант-осей SIZE/RESIZE/… в старом root-барреле не было (index = `export * from './components'`), в новом они явно экспортированы._

**Новые (экспорты / пропсы):**
- `SIZE`, `BAR_HIDE_STRATEGY`, `RESIZE`, `AUTOSCROLL_TO`, `BAR_AUTO_HIDE_DELAY_MS`, `AUTOSCROLL_ENABLE_LIMIT` и типы `Size`/`BarHideStrategy`/`Resize`/`AutoscrollTo` теперь явно экспортируются из корня пакета (в старом корневой `index` реэкспортил только `./components`).
- `ScrollProps.overflow?: { x?, y?: 'hidden'|'visible'|'scroll'|'visible-hidden'|'visible-scroll' }` — новый проп управления overflow по осям.

**Без изменений:**
- `Scroll` (forwardRef, `ref: HTMLElement`), `setNonce` (теперь = `OverlayScrollbars.nonce` напрямую).
- Пропсы `className`, `size`, `clickScrolling`, `autoscrollTo`, `barHideStrategy`, `onScroll`, `resize`, `untouchableScrollbars`, `paddingAbsolute`, `onInitialized` — идентичны. `WithSupportProps<PropsWithChildren<...>>` сохранён.
- Ничего не переименовано и не удалено.

---

### @ds/search  (old: @snack-uikit/search)

_Крупное сокращение поверхности: убраны autocomplete-режим и все sub-компоненты, `postfix` заменён на `buttonField`._

**Удалённые пропсы**
- `Search.autocomplete` + `Search.options` — режим Autocomplete убран целиком (union `SearchProps` схлопнут до одного типа).
- `Search.postfix` (`ReactNode`) — заменён слотом `buttonField`.

**Новые пропсы** (brief)
- `Search.buttonField?: Omit<ButtonFieldProps,'variant'>` — слот-кнопка справа от поля (вместо `postfix`).
- `Search.disabled?`, `Search.background?` (default `true`).

**Изменённый тип/сигнатура**
- `SearchProps`: `SearchBaseProps & (autocomplete-union)` → `Omit<SearchPrivateProps,'onKeyDown'> & { disabled?; background?; buttonField?; outline? }`.
- `outline` теперь имеет `@default true` (раньше без дефолта).

**Переименованные константы/типы**
- `SIZE` без изменений (`s`/`m`/`l`).
- `TEST_IDS` переопределён: было `{ main, decorator, droplist, option }` → стало `{ root, input, clearButton, buttonField }`.

**Удалённые компоненты/типы (публичный API)**
- Компоненты `SearchAutocomplete`, `SearchDecorator`, `SearchFieldText` — удалены.
- Типы `SearchBaseProps`, `SearchAutocompleteProps`, `SearchDecoratorProps`, `SearchTextFieldProps` — удалены.
- Константа `PRIVATE_SEARCH_TEST_IDS` и реэкспорт `setNonce` — удалены.

---

### @ds/segment-control  (old: @snack-uikit/segmented-control)

_Переименован пакет + компонент; сжатие counter; удалён размер XS._

**Переименованные константы/типы (BREAKING)**
| Было | Стало |
|---|---|
| компонент `SegmentedControl` | `SegmentControl` |
| тип `SegmentedControlProps` | `SegmentControlProps` |
| пакет `@snack-uikit/segmented-control` | `@ds/segment-control` |

**Изменённый тип/сигнатура**
| Компонент | Проп | Было | Стало |
|---|---|---|---|
| `items[i]` (Segment) | `counter` | `Omit<CounterProps,'size'>` | `string \| number` |
| `items[i]` | `label` | required в ветке с counter | всегда optional |

**Новые пропсы**
- `items[i].iconPosition?: 'before' \| 'after'`; icon и counter теперь можно вместе (снята дискриминация).

**Значения enum-осей**
| Ось | Было | Стало |
|---|---|---|
| `SIZE` | `xs`/`s`/`m`/`l` | `s`/`m`/`l` (удалён `xs`) |

Пропсы `items`/`value`/`onChange`/`outline`/`width`/`name` — без изменений.

---

### @ds/skeleton  (old: @snack-uikit/skeleton)

_У `SkeletonText` проп `typography` (комбинированный `role-size`) разбит на `variant` + `size` + `align`._

**Переименованные пропсы**

| Компонент | Было | Стало | Тип | Примечание |
|---|---|---|---|---|
| SkeletonText | `typography?: Variant` (`` `${Purpose}-${Size}` ``, напр. `body-m`) | `variant?: Variant` (`display`/`headline`/`title`/`label`/`body`) + `size?: Size` (`s`/`m`/`l`) | retype/split | комбинированная строка разбита на две оси |

**Новые пропсы**

- `SkeletonText`: `align?: Align` (`left`/`right`).

**Переименованные/удалённые константы и типы**

- `SkeletonText` внутр. `PURPOSE` → `VARIANT` (были приватные, не в корне).
- `Skeleton`, `WithSkeleton`, `SkeletonContextProvider`, `useIsLoadingValue` — без изменений сигнатур.

---

### @ds/slider  (old: @snack-uikit/slider)

_Аддитивные изменения: та же база (Omit RCSliderProps + handleTip + tipFormatter), добавлен один проп + константы._

**Новые**
- `marksEqualSpacing?: boolean` — равномерное распределение при нелинейных метках.
- `'data-test-id'?: string` — явно в типе.
- Экспорт типа `TipFormatter` и константы `TEST_IDS` (`root`, `handle`), `THEME_CLASS`.

**Изменённый тип/сигнатура**
- `SliderProps` — тот же `Omit<RCSliderProps, 'trackStyle'|'handleStyle'|'railStyle'|'dotStyle'|'activeDotStyle'|'styles'|'classNames'|'prefixCls'|'style'|'handleRender'|'vertical'>`; сигнатура `tipFormatter` без изменений.

_Переименований/удалений публичных пропсов нет._

---

### @ds/status  (old: @snack-uikit/status)

Компоненты `Status` + `StatusIndicator` сохранены; breaking-изменения в enum'ах размеров и appearance.

**Переименованные пропсы**
- `hasBackground` → `background` (`boolean`) — канон bare-flag «наличие фон/заливка-слоя» (FF-8680, [prop-naming.md §2](.claude/skills/prop-naming.md)). DOM-атрибут: `data-has-background` → `data-background`.

**Значения enum-осей**
- `APPEARANCE`: удалено значение `Primary` (было первым). Осталось `neutral | red | orange | yellow | green | blue | violet | pink`.
- Размер `StatusIndicator`: было `xxs | xs | s | m | l` → стало `4xs | 3xs | 2xs | xs | s`. Удалены `m`, `l`; `xxs`→`2xs`; добавлены `4xs`, `3xs`.
- Размер `Status`: значения без изменений (`xs | s`).

**Переименованные константы/типы**
- `SIZE` (Status, из `Status/constants`) → `STATUS_SIZE`; тип `Size` → `StatusSize`.
- `SIZE` (StatusIndicator) → `STATUS_INDICATOR_SIZE`; тип `Size` → `StatusIndicatorSize`.

**Удалённые константы**
- `STATUS_INDICATOR_SIZE_MAP`, `LOADER_SIZE_MAP` — больше не в публичном API.

**Новые пропсы**
- `StatusProps.progress?: number` — прогресс загрузки (0–100).

**Новые константы** (brief): `TEST_IDS`.

---

### @ds/stepper  (old: @snack-uikit/stepper)

_Поверхность почти стабильна; компонент стал адаптивным, из render-api убран `goToStep`._

**Удалённые пропсы**
- `StepperApi.goToStep?(stepIndex?)` — убран из объекта, передаваемого в render-функцию `children`. Остаются `goNext`/`goPrev`.

**Новые пропсы** (brief)
- Новые утилиты/константы: `TEST_IDS`, `getStepTestId()`, `getTailTestId()`. Компонент адаптивный (desktop/mobile через `AdaptiveProvider`).

**Изменённый тип/сигнатура**
- `StepperProps.defaultCurrentStepIndex`: обязательный `number` → **опциональный** `number?`.
- `StepperProps` больше не обёрнут в `WithSupportProps<>` — теперь плоский тип с явным `'data-test-id'?` (произвольные support-props/`...rest` больше не типизируются).
- `StepperState`: был `StepperApi & { stepper: ReactElement }` → теперь просто псевдоним `StepperApi` (сохранён для обратной совместимости).

**Значения enum-осей**
- `STEP_STATE` без изменений (`completed`/`current`/`loading`/`waiting`/`rejected`).

**Переименованные константы/типы**
- Нет переименований; `useStepperApi`, `StepperContext`, `StepData`, `StepViewData`, `StepsValidator` сохранены.

---

### @ds/table  (old: @snack-uikit/table)

_Крупное расширение API: добавлен карточный вид (`view='cards'`), виртуализация, sticky-хром и адаптив; экспорт-модуль убран в пользу колбэка; переименованы значения `COLUMN_SETTINGS_MODE`._

**Переименованные пропсы:**
- `EmptyStateProps` (noDataState/noResultsState/errorDataState): поле `description` → `content` (Pick из `InfoBlockProps`, канон payload description→content).
- `ServerTableProps.search.initialValue` → `initialState` (согласование с Table/ClientTable, где всегда `initialState`).

**Удалённые пропсы:**
- `exportSettings` (`ExportButtonProps<TData>['settings']`, экспорт CSV/XLSX через объект) — убран. Заменён колбэком `onExport?(): void` (рендерит иконку экспорта в тулбаре; фактическую выгрузку пишет потребитель).

**Удалённые публичные экспорты:**
- Модуль `exportTable`: `exportToCSV`, `exportToXLSX`, тип `ExportTableData` — больше не экспортируются.
- `ExportButton` и тип `ExportButtonProps` — убраны из публичного API.

**Изменённый тип/сигнатура:**
- `scrollRef`: `RefObject<HTMLElement>` → `Ref<HTMLElement>` (расширен).
- `expanding` (sub-object): добавлено поле `initialState?: ExpandedState` (был только `state`/`onChange`).
- `RowAppearance` и `ToolbarCheckBoxMode`: были `enum` → стали `as const`-объект + одноимённый тип (значения без изменений: `disabled`/`hide-toggler`, `pageRows`/`allRows`). `DefaultColumns`: `enum` → `as const` + тип.
- `STATUS_APPEARANCE`: раньше доступен только как namespace-свойство `Table.statusAppearances` → теперь самостоятельный экспорт `STATUS_APPEARANCE` + тип `StatusAppearance` (значения те же, включая `loading`).

**Новые пропсы (BaseTableProps):**
- Карточный вид: `view` (View, controlled), `defaultView` (View, uncontrolled), `onViewChange`, `showDataView` (тоггл table/cards в тулбаре, def false), `headlineId`, `cardColumns`, `cardMinWidth` (def 292), `renderCard` (кастомный рендер, контекст `RenderCardContext`).
- `fullWidth` (boolean, def true; растягивать на ширину контейнера — раньше пропа не было).
- `onExport` (замена `exportSettings`).
- `headerRowBackgroundColor` (TableRowColor, тон строки заголовков).
- Sticky-хром/адаптив: `stickyControls` (тип `StickyControls`), `layoutPresets` (`LayoutPresets<TableLayoutDefaults>`).
- Виртуализация: `enableRowVirtualization`, `rowVirtualizerOptions`, `rowVirtualizerInstanceRef`, `enableColumnVirtualization`, `columnVirtualizerOptions`, `columnVirtualizerInstanceRef`.
- `InfiniteTableProps`: `onLoadMore`, `hasMore`, `loadMoreTrigger` (`'scroll' | 'button'`, тип `LoadMoreTrigger`) — раньше был только `infiniteLoading`.
- Cell-хелпер `TreeColumnDefinitionProps`: добавлено `showLines?: boolean`.

**Новые публичные экспорты:** пресеты `presets/*` (simpleTable, adminTable, entitiesTable, infiniteTable, treeTable, serverAdminTable, serverSimpleTable), `columnUtils/*` (defineColumns, actionsColumn, statusColumn, mapCardViewProps), `getSelectionCellColumnDef`, `getTreeColumnDef` (явно), `TableCard`, `locale`, типы `RenderCardContext`/`StickyControls`/`View`/`TableStickyControlsBackgroundPredefined`/`MasterSelectionOptions`/`RowVirtualizer`/`ColumnVirtualizer`.

**Значения enum-осей:**
- `COLUMN_SETTINGS_MODE` — переименованы **и ключи, и значения**:
  - `Hidden: 'hidden'` → `Locked: 'locked'`
  - `DefaultTrue: 'defaultTrue'` → `DefaultVisible: 'defaultVisible'`
  - `DefaultFalse: 'defaultFalse'` → `DefaultHidden: 'defaultHidden'`
- Новая ось `VIEW`: `table` | `cards` (+ `DEFAULT_VIEW = 'table'`).
- `COLUMN_PIN_POSITION`, `COLUMN_ALIGN`, `SORT_FN`, `TABLE_ROW_COLOR` — без изменений.

**Новые константы:** `VIEW`/`View`, `DEFAULT_VIEW`, `TABLE_CSS_VARS`, `TABLE_COLUMN_CSS_VARS`, `TABLE_STICKY_CONTROLS_BACKGROUND_*`. `TEST_IDS` расширен (card, columnSettings, export, viewSort, loadMoreButton, selectAll и др.).

---

### @ds/tabs  (old: @snack-uikit/tabs)

_Ось `type` (primary/secondary) заменена на `size` (l/m); удалены константы `TYPE`/`APPEARANCE`/`COLOR`._

**Переименованные пропсы**

| Компонент | Было | Стало | Тип | Примечание |
|---|---|---|---|---|
| TabBar | `type` (`primary`/`secondary`) | `size` (`l`/`m`) | ось API | смена смысла оси; `disableDivider` теперь доступен всегда (был только при `type=secondary`) |

**Изменённый тип/сигнатура**

- `TabBarProps`: убрано дискриминированное объединение по `type`; `disableDivider?: boolean` безусловный, добавлен `size?: Size` (default `L`), `markerPosition` default `After`.
- `TabBarContextValue`: поле `type: Type` → `size: Size`.

**Значения enum-осей**

- Добавлена ось `SIZE = { L:'l', M:'m' }`.

**Переименованные/удалённые константы и типы**

- Удалены константы: `TYPE`, `APPEARANCE`, `COLOR`.
- Удалён тип `Type`; добавлен `Size`.
- Корень теперь реэкспортирует `constants`, `context`, `utils`, `TEST_IDS` (раньше только `components`).
- `Tab`, `TabContent`, `Tabs`, `TabsProps` — пропсы без изменений.

---

### @ds/tag  (old: @snack-uikit/tag)

_Убран проп `tooltip` и связанные типы; `TagLink` стал полиморфным (`as`); добавлен размер `M`._

**Переименованные пропсы**

| Компонент | Было | Стало | Тип | Примечание |
|---|---|---|---|---|
| TagLink | `href` / `onClick` / `target` (инлайн) | `as` + `...ComponentPropsWithoutRef<T>` | полиморфизм | `TagLink<T extends ElementType='a'>`; ссылочные атрибуты теперь через spread по `as` |

**Удалённые пропсы**

- `Tag`/`TagRowItem`: `tooltip?: TooltipProps` — тултип над тегом убран полностью.

**Изменённый тип/сигнатура**

- `TagLinkProps` — стал дженериком `TagLinkProps<T extends ElementType='a'>` (был плоский `href/onClick/target`).
- `TagProps` = `TagBaseProps | TagLinkProps` (убрано ветвление с `TagWithTooltipProps`).

**Значения enum-осей**

- `SIZE`: добавлено `M='m'` (было только `Xs`, `S`).

**Переименованные/удалённые константы и типы**

- Удалены типы: `TagTooltipProps`, `TagWithTooltipProps`, `TagWithoutTooltipProps`, `ManageRestrictTooltipProps`.
- `setNonce` теперь из `@ds/scroll` (было `@snack-uikit/scroll`).
- Раньше корень реэкспортировал точечно (`Appearance, Size, TagRowItem, TagProps`) — теперь `export * from './types'` (шире). `TagRowProps` теперь публичный.

---

### @ds/timeline  (old: @snack-uikit/timeline)

_`TimelineProps` без изменений; расширен публичный экспорт (субкомпоненты + константы) и `TrackItemProps`._

**Новые (публичная поверхность)**
- Раньше корень пакета экспортировал только `Timeline` (+`TimelineItem`/`TimelineProps`). Теперь дополнительно публичны субкомпоненты `Track`, `TrackItem` и константы `ROLE`, `STYLE`, `POSITION`, `VARIANT`, `APPEARANCE` (раньше жили в helperComponents со static-namespace `TrackDot.variants`/`TrackItem.roles`, наружу не реэкспортились).
- `TrackItemProps` получил `key?: string` (раньше ключ выводился из индекса).

**Изменённый тип/сигнатура**
- `TimelineProps` идентичен (`items`, `contentPosition`, `alternate`, `fullWidth`, `className`).
- static-namespace API (`TrackDot.appearances`, `TrackItem.roles`, `.contentPositions`, `.dotVariants`, `.lineStyles`) заменён обычными экспортируемыми константами.

**Значения enum-осей**
- `VARIANT` (default/subEvent), `APPEARANCE` (neutral/primary/red/orange/yellow/green/blue/violet/pink), `POSITION` (right/left), `STYLE` (solid/dashed) — значения без изменений.
- `enum Width { Auto, Full }` сохранён в constants, но, как и раньше, не реэкспортируется из корня.

---

### @ds/toaster  (old: @snack-uikit/toaster)

_Глубокий рефактор: контейнер стал дискриминированным union'ом с обязательным `type`, у тостов переехали слоты `link`/`action`, менеджер заменил `react-toastify`. Канон соблюдён: `title`→`title`, вторичный текст остаётся `description` (не `content`)._

**Переименованные пропсы**

| Компонент | Было | Стало | Тип | Примечание |
|---|---|---|---|---|
| ToastSystemEvent | `link.text` | `link.label` | `ToastSystemEventLink` | текст ссылки → `label` (control label) |
| ToastUpload (UploadItem) | `link.text` | `link.label` | `ToastUploadItemLink = Pick<LinkProps,…>` | `Pick<..,'text'>` → `Pick<..,'label'>`, следует переименованию в `@ds/link` |

**Удалённые пропсы**

- **ToastUserAction** — `link?: ToastUserActionLink` **удалён** (заменён на `action`, см. новые). Тип `ToastUserActionLink` больше не экспортируется.
- **ToastUpload** — `cancelButton?: ButtonTextNeutralProps` **удалён** (заменён на колбэк `onCancelAll`); `draggable?`, `draggableBounds?: DraggableProps['bounds']` **удалены** (перетаскивание ушло на уровень контейнера).
- **ToastSystemEvent** — `loading?: never` удалён (косметика).
- **index** — реэкспорт `setNonce` из `@snack-uikit/scroll` **удалён**.

**Новые пропсы**

- **ToastUserAction** — `action?: ToastUserActionAction<'button'> | ToastUserActionAction<'a'>` (полиморфный action-слот вместо `link`); `timer?: boolean` (кольцо обратного отсчёта).
- **ToastSystemEvent** — `autoClose?: number | false` (раньше жил только в `toastOptions`).
- **ToastUpload** — `onCancelAll?: (e) => void` (вместо `cancelButton`).
- **ToasterContainer** (union) — `width?: ToasterWidth`, `stacked?: boolean`, `draggable?: boolean`, `draggableDirection?: DraggableDirection`, `autoClose?: number|false`, `'data-test-id'?`.

**Изменённый тип/сигнатура**

- **ToasterContainerProps** — было плоское `{ position?, limit?, containerId?, displayCloseAllButton?, type? }` с **опциональным** `type`; стало дискриминированный union `SystemEvent|UserAction|Upload`-Props с **обязательным** `type` и `position`, суженным под тип (`SystemEventPosition` / `UserActionPosition`). Компонент по-прежнему экспортируется как `ToasterContainer` (+ алиас `ToasterProps = ToasterContainerProps`). **Breaking**: `type` теперь обязателен.
- **ToastSystemEvent.action** — `ButtonActionProps[]` → `ToastButtonActionProps[]` (переименован helper-тип).
- **UploadItem.progress** — `ProgressBarProps['progress']` → `number`.
- **UploadItem.actions** — обязательный → `actions?` (опциональный); **ToastUpload.generalActions** — обязательный → `generalActions?`.
- **ToastUpload.closable** — дефолт теперь `true` (документирован).
- **UpdateToast** — `id: string|number` → `id: ToasterId`; маршрутизация `containerId` убрана из верхнего уровня props и перенесена в `toastOptions`.
- **ToastOptions** — `autoClose: RtToastOptions['autoClose']` → `number | false`; добавлен `containerId?`. Из `openToast`-props `toasterParent?: HTMLDivElement` → `HTMLElement`.
- **Toaster.upload.startOrUpdate** — возврат `void` → `PromisedId | void`.
- **Toaster.*.dismiss** — `dismiss(id?: ToasterId)` → `dismiss(idOrOptions?: ToasterId | { containerId? })`.
- **UserActionOptions / SystemEventOptions / UploadOptions** — добавлены `Pick<ToastOptions,'autoClose'>` и `RoutingOptions { containerId? }`.

**Переименованные константы/типы**

- `TOASTER_CONTAINER_DEFAULT_PROPS` → `TOASTER_CONTAINER_DEFAULTS` (тип `Record<ToasterType, ToasterContainerDefaults>`).
- `APPEARANCE_TO_ON_COLOR_MAP` → `APPEARANCE_TO_LINK_APPEARANCE` (ToastSystemEvent/constants).
- **Удалены**: `VARIANT` (`WithIcon`/`LabelOnly`) из ToastUserAction; тип `ToastUserActionLink`.
- **Новые константы**: `POSITION_SYSTEM_EVENT`, `POSITION_USER_ACTION`, `TOASTER_WIDTH`, `DRAGGABLE_DIRECTION`, `DEFAULT_UPLOAD_TOAST_ID`, `STACK_VISIBLE_LIMIT`, `CLOSE_ALL_THRESHOLD`, `LEAVE_ANIMATION_MS`, `STACK_TRANSITION_MS`, `TEST_IDS`. Прежде публичным из констант был только `TOASTER_TYPE`; теперь `export *` открывает весь модуль (включая `AUTO_CLOSE_TIME`, `TOASTER_ROOT_ID`, `TOASTER_CONTAINER_PREFIX`).
- **Новые типы**: `SystemEventPosition`, `UserActionPosition`, `ToasterPosition`, `ToasterWidth`, `DraggableDirection`, `SystemEventToasterContainerProps`/`UserActionToasterContainerProps`/`UploadToasterContainerProps`, `ToasterContainerDefaults`, `ToastUserActionAction`, `ToastButtonActionProps`.
- **helpers** — добавлен `isToastActive`; экспорт-набор `dismissToast, isToastActive, openToast, toaster, updateToast`.

---

### @ds/toggles  (old: @snack-uikit/toggles)

_Favorite→Favourite (британское написание) во всём семействе; `SIZE` сменил значения (m→нет, +xs); `Switch.showIcon` убран; `loading` поднят в базу._

**Удалённые пропсы**

| Компонент | Проп | Примечание |
|---|---|---|
| Switch | `showIcon?: boolean` | убран |
| Favourite | `onKeyUp` (в `FavouriteProps`) | остаётся только на базе |

**Новые пропсы**

- `ToggleProps` (база всех): `loading?: boolean` — поднят в базовый тип (раньше был только у `Switch`). Теперь есть у Checkbox/Radio/Switch/Favourite.

**Значения enum-осей**

- `SIZE`: было `S='s'`, `M='m'` → стало `XS='xs'`, `S='s'`. **Значение `m`/`M` удалено, добавлено `xs`/`XS`** — ломает потребителей на `size="m"`.

**Переименованные константы и типы**

| Было | Стало |
|---|---|
| `FAVORITE_ICON` | `FAVOURITE_ICON` |
| тип `FavoriteIcon` | `FavouriteIcon` |
| компонент `Favorite` | `Favourite` |
| тип `FavoriteProps` | `FavouriteProps` |
| тип `TogglePrivateProps` (public) | `TogglePropsBase` (внутренний, не экспортируется) |

- Компонент/экспорт `TogglePrivate` удалён из публичного API.
- Добавлена константа `NATIVE_INPUT_SUFFIX`, контекст `ToggleGroupContext` / `useToggleGroupContext`.
- `SELECTION_MODE` без изменений (`single`/`multiple` — уже канон).

---

### @ds/toolbar  (old: @snack-uikit/toolbar)

_Удалён selectionMode; аддитивно dataView и bulk-count пропсы._

**Удалённые пропсы (BREAKING)**
| Компонент | Было | Примечание |
|---|---|---|
| `BulkActions` / `Toolbar` | `selectionMode` (`'single'\|'multiple'`) | ось режима выбора убрана целиком (не переименована). Транзитивно ломает `<Toolbar selectionMode=…>`. |

**Новые пропсы**
- `Toolbar.dataView` (переключатель вида, `list`/`compact`), `FilterRow.initialOpen`.
- `BulkActions.showBulkCheckbox` / `selectedCount` / `totalCount`.

**Переименованные/удалённые константы/типы**
| Было | Стало |
|---|---|
| `SELECTION_MODE` / `SelectionMode` | удалены |
| — | новые публичные `DATA_VIEW_VALUE`, `TOOLBAR_AFTER_OVERFLOW_ATTR`, `BulkActionsProps`, `TEST_IDS` |

`TEST_IDS`: значения переехали на схему `toolbar__<slot>`. `slotAfterHeadline`→`slotAfterTitle` у BulkActions (см. §renames по всему киту). Импорты `@snack-uikit/*`→`@ds/*`, `setNonce` из `@ds/scroll`.

---

### @ds/tooltip  (old: @snack-uikit/tooltip)

_`Tooltip` и `WithTooltip` без изменений публичной поверхности. Изменения в `QuestionTooltip` (стал адаптивным) и в константах._

**Удалённые пропсы**
- `QuestionTooltip.triggerSupportProps` (`WithSupportProps<Record>`) — убран.
- `QuestionTooltip.trigger` больше не собственная ось `Trigger` (`hover`/`click`) — теперь наследуется из `TooltipProps` (значения из `@ds/popover-private` TRIGGER: `hoverAndFocusVisible`/`clickAndFocusVisible`). Прежние `hover`/`click` больше не принимаются.

**Новые пропсы** (brief)
- `QuestionTooltip.triggerLabel` — доступное имя иконки-триггера. Компонент адаптивный (desktop popover / mobile BottomSheet), mobile-игнор для `placement`/`trigger`/`offset`/hover-delay и т.п.

**Изменённый тип/сигнатура**
- `QuestionTooltipProps`: `Omit<TooltipProps,'children'|'triggerClassName'|'trigger'> & {...}` → `TooltipProps & {...}` (больше не омитит `children`/`triggerClassName`/`trigger`).

**Значения enum-осей**
- `QuestionTooltip` `SIZE` значения без изменений (`xs`/`s`), но ключ `Xs` → `XS`.
- Ось `TRIGGER` компонента `{ Hover:'hover', Click:'click' }` удалена; используется `TRIGGER` из `@ds/popover-private`.

**Переименованные константы/типы**
- Локальный `SIZE` QuestionTooltip'а поднят на уровень пакета `SIZE` {XS, S}; ключ `Xs`→`XS`.
- Удалены `SIZES_MAP`, `TRIGGER` (Hover/Click), `TRIGGER_MAP`, тип `Trigger`.
- Новый экспорт `PLACEMENT`/`Placement`; `TRIGGER`/`PLACEMENT` реэкспортятся из `@ds/popover-private`.

---

### @ds/tree  (old: @snack-uikit/tree)

_Есть публичные изменения: enum selectionMode, новые оси size/titleMaxLines, ренейм loading у TreeNode._

**Переименованные пропсы**
- `TreeNodeProps`/helper `TreeNode`: `isLoading?` → `loading?` (helperComponent TreeNode/types.ts).

**Значения enum-осей**
- `selectionMode`: `'multi'` → `'multiple'` (в `TreeMultiSelect` дискриминант; JSDoc обновлён на `Multiple`). `'single'` без изменений.

**Переименованные константы/типы**
- `SELECTION_MODE.Multi: 'multi'` → `SELECTION_MODE.Multiple: 'multiple'`.
- `TEST_IDS`: удалён ключ `droplistAction`.
- `TRANSITION_TIMING.accordionFolding` теперь типизирован `as const` (значение 200, ранее просто `number`).

**Новые**
- `size?: Size` (`'s'|'m'|'l'`, `SIZE`, default `'m'`) — новая ось Figma variant.
- `titleMaxLines?: number` (default 1) — обрезка/перенос заголовка узла.
- Новый тип `Size = ValueOf<typeof SIZE>` и константа `SIZE`.
- `ExtendedTreeNodeProps.getTitle` уточнён: `(): void` → `(): string`.

---

### @ds/truncate-string  (old: @snack-uikit/truncate-string)

_Без изменений в поверхности пропсов. `text` подтверждённо остаётся `text` (не переименован в `label`)._

- `TruncateStringProps` (union `variant?: End` / `variant: Middle`), `TruncateStringEndProps`, `TruncateStringMiddleProps` — идентичны: `text`, `className`, `tooltipClassName`, `hideTooltip`, `maxLines` (только End), `placement`, `trigger`. **`text` НЕ переименован в `label`** — верно, это не control-label.
- `VARIANT` (`Middle:'middle'`, `End:'end'`) и тип `Variant` — без изменений значений.

**Переименованные константы/типы**

- **Новая константа**: `TEST_IDS`. `VARIANT` / `Variant` теперь реэкспортируются из корня (`export * from './constants' / './types'`); в старом `0.7.8` корень отдавал только `./components`.

---

### @ds/typography  (old: @snack-uikit/typography)

Полная переработка публичного API — крупные breaking-изменения.

**Переименованные пропсы**
- `purpose: Purpose` (обязательный) → `variant?: TypographyVariant` (опциональный, дефолт `body`). Значения совпадают.
- `family: Family` (обязательный) → `weight?: TypographyWeight` (опциональный, дефолт `regular`). Значения изменены (см. ниже).
- `tag?: Tag` → `as?: ElementType`. Тип расширен с фикс-union до `ElementType`.

**Удалённые пропсы / поверхность**
- Сгенерированные компоненты-варианты (`Typography.SansBodyL`, `Typography.LinkTitleM`, … 75 шт. через `VARIANTS` + `GeneratedTypography`) полностью удалены. `GeneratedTypographyProps`/`GeneratedTypography` тоже нет.
- `WithSupportProps`-обёртка заменена на `HTMLAttributes<HTMLElement> & { 'data-test-id'? }`.

**Изменённый тип/сигнатура**
- `size: Size` был обязательным → теперь `size?: TypographySize` (дефолт `m`).
- Компонент теперь `forwardRef` (проброс `ref`).

**Значения enum-осей**
- WEIGHT (бывш. FAMILY): `sans → regular`, `light → thin`, `mono` (сохранён); значения `link`, `crossed-out` **удалены**. Итог: `regular | thin | mono`.
- VARIANT (бывш. PURPOSE): значения без изменений (`display | headline | title | label | body`).
- SIZE: без изменений (`s | m | l`).

**Переименованные константы/типы**
- `PURPOSE` → `VARIANT`; тип `Purpose` → `TypographyVariant`.
- `FAMILY` → `WEIGHT`; тип `Family` → `TypographyWeight`.
- `SIZE` сохранён; тип `Size` → `TypographySize`.
- Удалены: `TAG` const и тип `Tag`, `VARIANTS`.
- Новые: `DEFAULT_VARIANT`, `DEFAULT_SIZE`, `DEFAULT_WEIGHT`.

---

### @ds/utils  (old: @snack-uikit/utils + @cloud-ru/uikit-product-utils, объединены)

_Слияние на практике = сохранена поверхность `@snack-uikit/utils` (минус ThemeProvider) плюс новые хелперы; foundation-утилиты `@cloud-ru/uikit-product-utils` (adaptive/theme/brand/color/config/language/displayMode) в `@ds/utils` НЕ перенесены — часть уехала в `@ds/adaptive`, язык — в `@ds/locale` (`useLang`), theme/brand/palette — в `@ds/theme`, config отсутствует в `packages/*/src`._

#### Из @snack-uikit/utils

**Сохранённые (1:1):**
- Хуки: `useDebounce`, `useDynamicList`, `useEventHandler`, `useIsomorphicLayoutEffect` (экспорт `useLayoutEffect`), `useSwipeable` (+ типы `UseSwipeProps`, `UseSwipeReturnType`, `DATA_SWIPE_DIRECTIONS_ATTRIBUTE`), `useValueControl`, `useDataPersist` (+ `useSource`, типы `DataPersistOptions`, `LocalStorageSource`, `QueryParamSource`, `StateProps`), `usePopstateSubscription`, `useModalOpenState`.
- Утилиты: `componentPropsProcessors` (`extractSupportProps`, `excludeSupportProps`, `extractDataTestProps`, тип `WithSupportProps`), `isBrowser`.
- Тип `ValueOf`.

**Удалённые (из @ds/utils):**
- `ThemeProvider`, `useThemeContext`, `useThemeConfig`, `ThemeContext`, типы `ThemeContextType`, `ThemeProviderProps` — весь theme-слой убран из utils.

#### Из @cloud-ru/uikit-product-utils

**Удалённые из @ds/utils (перенесены в другие пакеты или отсутствуют):**
- Adaptive: `useAdaptive`, `getAdaptive`, `ADAPTIVE_QUERIES`, `LAYOUT_TYPE`, `LayoutType`, `WithLayoutType`, `Adaptive`, `useMatchMediaGeneric`, `getMatchMediaGeneric` и т.д. → уехали в `@ds/adaptive` (см. `packages/adaptive/src/`).
- Язык: `useLanguage`, `Channel`, `createTextProvider`, `useTextProvider` → язык теперь в `@ds/locale` (`useLang`).
- Тема/бренд/палитра: `useTheme`, `useBrand`, `useForThemeMode`/`ForThemeMode`, `generateThemeStyles`, `DEFAULT_STYLES`, `ANIMATIONS`, `SHADOW` — в `@ds/utils` отсутствуют.
- Кастомная бренд-палитра: `useApplyCustomTheme`, `generatePalette`, цвето-математика (`oklch`, `colorSpace`, `apcaContrast`, `OKLCH_to_OKLab`, `BASE_PALETTE`, `TColor`) → уехали в `@ds/theme` (`packages/theme/src/utils/customTheme/`), из `@ds/utils` их нет. Имена частично изменились: `generatePalette` → `generateBrandPalette` (+ тип `BrandPalette`), `BASE_PALETTE` → `BASE_BRAND_PALETTE`. Новые рядом: `buildBrandPaletteCss`, `buildBrandPaletteVars`, `BRAND_PRIMARY_TONES`, `BRAND_PRIMARY_VAR_PREFIX`, `PRIMARY_ACCENT_TONE`, тип `BrandPrimaryTone`. Чистая (без React/DOM) часть доступна из `@ds/theme/ssr`. Декларативная альтернатива хуку — пропсы `brandColor` / `nonce` у `RootThemeProvider` и `ThemeScope`.
- Config: `ConfigProvider`, `useConfig`, `ConfigProviderProps`.
- Прочее: `useComponentSize`, `useUniqueId`/`uniqueId`, `useForceUpdate`, `useForceUpdateOnPageLoadedCompletely`, `getUserAgentInfo`, `keyboardSelectHandler`, `tryParseJson`, `getDisplayMode`/`useDisplayMode`/`DISPLAY_MODES`, `alert` — в `@ds/utils` отсутствуют.

**Сохранённые (имя то же, реализация своя):**
- `useLocalStorage<T extends string = string>(key, defaultValue): [T, (v: T) => void]` — есть в `@ds/utils`. Работает только со строковыми значениями (без JSON-сериализации), запись/чтение под `isBrowser()`-guard'ом, cross-tab-синхронизации нет. Старую сигнатуру 1:1 не воспроизводит — при переезде сверяйся с типом.

**Сохранённые (общие с snack, дублировались в обоих):**
- `extractSupportProps`, `excludeSupportProps`, `WithSupportProps` — единая реализация из snack-ветки (в product были одноимённые + алиасы `extractProps`/`excludeProps`, алиасы убраны).

#### Новые в @ds/utils (не было ни в одном старом)
- Иерархический выбор: хук `useHierarchicalSelection` + утилиты `createHierarchicalSelectionHandlers`, `toggleHierarchicalSelection`, `getNodeSelectionState`, `checkGroupSelection`, `applySelectionDiff` + типы `HierarchicalSelectionConfig`, `HierarchicalSelectionHandlers`, `HierarchicalAncestor`, `GroupSelectionState`, `GetNodeSelectionStateParams`, `HierarchicalSelectionNodeParams`, `HierarchicalSelectionToggleParams`, `ToggleHierarchicalSelectionParams`.
- Клипборд: `useCopyToClipboard` + `copyToClipboard`.
- События: `stopEventPropagation` (`MouseEvent | KeyboardEvent` → `stopPropagation()`).
- Клавиатура: `ARROW_KEYS`, `VERTICAL_ARROW_KEYS`, `ArrowKey`, `isArrowKey`, `isVerticalArrowKey`, `preventScrollOnArrowKeys`, `preventScrollOnVerticalArrows`, `focusWithoutScroll`.
- Type-guards: `isArray`, `isObject`, `isString`, `isBoolean`, `isNil`.

---

## B. Продуктовые `@ds/uikit-product-*` (из `@cloud-ru/uikit-product-*` и `@snack-uikit/*`)

### @ds/uikit-product-button-predefined  (old: @cloud-ru/uikit-product-button-predefined)

_Пакет резко сузился: остался только `ButtonDropdown`; `ButtonPromo`/`ButtonPromoOutline` и весь общий тип/константный слой удалены._

**Удалённые (компоненты + их типы)**
- `ButtonPromo` / `ButtonPromoProps` — удалён.
- `ButtonPromoOutline` / `ButtonPromoOutlineProps` — удалён.

**Удалённые (константы)**
- `APPEARANCE` (tertiary/secondary), `HTML_TYPE`, `TARGET`, `SIZE` (xs/s/m/l), `ICON_POSITION` — все удалены.

**Удалённые (типы)**
- `Appearance`, `IconPosition`, `Size`, `BaseButtonProps`, `AnchorButtonProps`, `CommonButtonProps` — удалены (файл `types.ts` больше не существует).

**ButtonDropdown — Изменённый тип/сигнатура**
- Было: `WithLayoutType<Omit<ButtonFunctionProps,'icon'|'iconPosition'> & (Omit<DropdownProps,'children'> | Omit<DroplistProps,'children'|'size'>)>`.
- Стало: `ButtonDropdownTriggerProps & ButtonDropdownDroplistConfig` — триггер на `ButtonProps` из `@ds/button` (`Omit<...,'icon'|'iconPosition'|'view'|'size'>` + `size`/`open`/`onOpenChange`), droplist сведён к `Pick<DroplistProps,'items'|'closeDroplistOnItemClick'|'placement'|'triggerClassName'|'closeOnPopstate'>`.
- `WithLayoutType`-обёртка убрана; вариант `Dropdown` (кастомный `content`) убран — только list-конфиг через `items`.
- `size` принимает `xs` как алиас (маппится на кнопку `s`).

**Новые**
- `TEST_IDS` (buttonDropdown/droplist/itemYear/itemMonth) — новый публичный экспорт.

---

### @ds/uikit-product-card-predefined  (old: @cloud-ru/uikit-product-card-predefined)

_Все карточки стали полиморфными (as/innerRef); description→content; новый compound CardCustom._

**Переименованные пропсы**
- `CardBanner`, `CardService`, `CardSuggest`: `description: string` → `content: string`.
- `CardSuggest.truncate`: `description?` → `content?`.

**Удалённые**
- Во всех: `Pick<CardProps,'onClick'|'href'|'disabled'|'outline'|'checked'>`-заимствования заменены — `href`, `onClick` теперь через полиморфизм `as`.
- `CardServiceLight`: `layoutType` (был `WithLayoutType`) удалён; `type?: 'button'|'submit'|'reset'` удалён (через нативные атрибуты `as='button'`).

**Новые**
- Полиморфизм у всех: `as?: T`, `innerRef?: PolymorphicRef<T>` (`CardServiceLight` default `'button'`, остальные `'div'`).
- Новый compound-компонент `CardCustom` (`CardCustom.Header/Body/Footer/Image/FunctionBadge` + namespace-типы) — миграция старого compound API из `@snack-uikit/card`. Экспорт `MODE` (Image).
- Новые типы: `VisibilityStrategy`, `CardSize`, `FavoriteProps`; константы `TEST_IDS`, `VISIBILITY_STRATEGY`, `CARD_SUGGEST_TRUNCATE_DEFAULTS`, `CARD_SIZE`.

**Изменённый тип/сигнатура**
- `CardSuggest.size`: `'s'|'m'` → `CardSize` (`CARD_SIZE`, default `m`).
- `promoBadge`: `CardProps['promoBadge']` / `PromoTagPredefinedProps` → `PromoTagProps` (из `@ds/promo-tag`) в `CardServiceSmall`, `CardSuggest`.
- `CardServiceLight.promoTag`: `Omit<PromoTagPredefinedProps,'trigger'>` → `PromoTagProps`.
- `CardServiceLight.icon`: обязательный → опциональный (`icon?`).
- `favorite` вынесен в общий тип `FavoriteProps` (в `CardServiceSmall` — `& { visibilityStrategy: 'always'|'hover' }` обязателен).
- `CardService.emblem`: `Required<Card.HeaderProps['emblem']>` → `ReactElement`; `CardServiceSmall.emblem`: `{ icon } | ReactElement`.
- Все `*Props` из плоских `WithSupportProps<…>` → generic полиморфные `*Props<T extends ElementType>`.

---

### @ds/uikit-product-config-selector  (old: @cloud-ru/uikit-product-config-selector)

_Пропсы `ConfigSelectorProps` без изменений._

**Новые (константы)**
- `TEST_IDS` (`root`/`input`/`label`) — теперь экспортируется из пакета.

---

### @ds/uikit-product-copy  (old: @cloud-ru/uikit-product-copy-line)

_Публичная поверхность близка 1:1 (CopyLine + CopyButton). Основное — упразднена ось `size` у CopyLine._

**Удалённые пропсы**
- `CopyLine.size?: Size` (`'s' | 'xs'`) — удалён. Строка теперь всегда одного размера (кнопка `size='s'`, иконка 16px хардкодом).

**Новые пропсы**
- `CopyButton.label?: string` — текст рядом с иконкой (без него — icon-only).
- `CopyButton.onClick?: MouseEventHandler<HTMLButtonElement>` — доп. обработчик клика.

**Изменённый тип/сигнатура**
- `CopyButton.size`: `ButtonFunctionProps['size']` → `ButtonProps['size']` (дефолт `'m'`; ранее не задан).
- `CopyButton.valueToCopy` без изменений (`string | number`, required).
- `CopyLine.onClick`: `MouseEventHandler` → `MouseEventHandler<HTMLDivElement>` (уточнён generic).

**Удалённые константы/типы**
- `SIZES` (const) и `Size` (тип) удалены вместе с осью `size`.

**Сохранено**
- `COPY_BUTTON_HIDE_STRATEGY` (`Never='never'`, `Hover='hover'`) и `CopyButtonHideStrategy` — без изменений.
- `CopyLine`: `content` (ReactNode), `valueToCopy?`, `className?`, `copyButtonHideStrategy?` (дефолт `Hover`) — сохранены. Канон `content` для отображаемого содержимого соблюдён.

---

### @ds/uikit-product-error-pages  (old: @cloud-ru/uikit-product-error-pages)

_`custom.text`→`custom.description`; enum'ы заменены на `as const`-объекты; удалён logo-variant `MLSpace` и статические namespace-хелперы._

**Переименованные пропсы**
- `ErrorPageCustomConfig.text` → `description`.

**Переименованные константы/типы**
- Enum `LogoVariant` → const `LOGO_VARIANT` + тип `LogoVariant` (`ValueOf`).
- Enum `ErrorType` → const `ERROR_TYPE` + тип `ErrorType` (`ValueOf`).

**Удалённые**
- Значение `LOGO_VARIANT.MLSpace` (было в enum `LogoVariant.MLSpace`).
- Константа `COLORS`.
- Статические свойства `ErrorPage.logoVariants` / `ErrorPage.errorTypes`.

**Новые типы**
- `ErrorPageContent`, `TEST_IDS`, locale-экспорт.

**Изменённый тип/сигнатура**
- `MainButtonConfig`: было `Pick<ButtonFilledProps,'label'|'href'|'onClick'|'icon'>` → явный объектный тип с теми же полями (базовый пакет кнопки `@snack-uikit/button` → `@ds/*`).

---

### @ds/uikit-product-fields-predefined  (old: @cloud-ru/uikit-product-fields-predefined)

_Сквозная ломающая правка: у всех полей удалён обязательный проп `layoutType` — раскладка теперь из `AdaptiveProvider` (контекст). `SelectCreate`→`FieldSelectCreate`, `AIDisclaimer` убран._

**Удалённые пропсы (сквозное)**

| Компонент | Проп | Примечание |
|---|---|---|
| FieldName, FieldNameRHF, FieldDescription, FieldDescriptionRHF, FieldMask, FieldPhone, FieldChat, FieldCode, FieldSelectCreate | `layoutType: LayoutType` (обёртка `WithLayoutType`) | **удалён у всех** — раскладка из `useAdaptiveLayout()` / `AdaptiveProvider` (адаптивная модель `@ds/adaptive`) |

**Переименованные пропсы**

| Компонент | Было | Стало | Тип | Примечание |
|---|---|---|---|---|
| FieldPhone | `FieldPhoneOptionsProps.content.option` | `content.label` | вложенный ключ | канон option→label |

**Удалённые компоненты/экспорты**

- `AIDisclaimer` (и `AIDisclaimerProps`) — убран из публичного API.

**Изменённый тип/сигнатура**

- **`SelectCreate` → `FieldSelectCreate`** (переименование компонента). Соответственно `SelectCreateProps` → `FieldSelectCreateProps`.
  - `LayoutProps`: модалка/дровер теперь на `@ds/modal`/`@ds/drawer` (`Omit<ModalProps|DrawerProps, 'open'|'onClose'|'approveButton'|'cancelButton'>`), было на `Adaptive{Modal,Drawer}Props`. У дровера default `position='right'`.
  - `entityIcon`: `IconPredefinedProps['icon']` → `EntityIcon` (из `noDataState.icon`).
  - Тип `FieldSelectProps` → `SelectFieldProps`; `OmittedSelectProps` → приватный `OmittedSelectKeys`.
  - `permission` без изменений (`none`/`canRead`/`canCreate`).
- `FieldPhoneProps` (Omit из базового `FieldTextProps` сменился): убраны из Omit `autocomplete`, `decoratorRef`, `onKeyDown`, `button`, `maxLength`; добавлены `elementBefore`, `elementAfter` (следствие смены базового поля `@ds/fields`).
- `FieldChatProps` (Omit): убран `labelTooltip`; добавлены `minRows`, `maxRows`, `showCopyButton`, `onKeyDown` (зафиксированы внутри).
- `FieldMask`: default `size='m'`. Own-props (`value`, `onChange(value, mask)`, `mask`) без изменений.
- `FieldName` / `FieldDescription` own-props (`showLabel`/`customSchema`/`addButton`/`onValidationError`/`controllerProps`) — без изменений, кроме снятого `layoutType`.

**Переименованные/удалённые константы и типы**

- `setNonce` теперь из `@ds/scroll` (было `@cloud-ru/uikit-product-mobile-fields`).
- Корень добавил реэкспорт `constants` (`TEST_IDS`), `hooks`, `locale`.
- `MASK` / `Mask` (FieldMask), `PLACEHOLDER_CHAR`, country-коды, `CountrySettings`, `FieldPhoneOptionsProps` — сохранены.
- Внутренние: `CREATE_LAYOUT_TYPE`, `PERMISSION`, типы `CreateLayoutType`, `Permission`, `EntityName`, `EntityIcon` — публичны в `FieldSelectCreate`.

_Прочие поля (`FieldCode`: `FieldCodeOwnProps`/`FieldCodeRef`/`FieldCodeProps`) — состав own-props сохранён, снят только `layoutType`._

---

### @ds/uikit-product-info-row  (old: @cloud-ru/uikit-product-info-row)

_Публичный API совместим; переименований пропсов нет. Много новых пропсов (адаптивность + 2-колоночный режим), одна правка сигнатуры RowActionButton._

**Новые пропсы**
- `InfoRow`/`InfoGroupItem`: `secondaryLabel`, `secondaryLabelTruncate`, `secondaryLabelTooltip`, `secondaryLabelClassName`, `secondaryContent`, `secondaryRowActions`, `secondaryRowActionsSlot`, `rowActionsSlot`, `column` (`'1'|'2'`), `maxWidth`.
- `InfoRow`: `position` (`first`/`inner`/`last`, mobile-only).
- `InfoGroup`: `formatBoolean?(value: boolean): string`.

**Изменённый тип/сигнатура**
- `RowActionButton`: базовый тип кнопки `ButtonTonalProps` (`@snack-uikit/button`) → `ComponentProps<typeof Button>` (`@ds/button`); `Omit` изменён `'size'|'appearance'|'label'` → `'size'|'appearance'|'view'` (теперь `label` разрешён, вместо него скрыт `view`).

**Новые константы/типы**
- `POSITION`/`Position`, `TEST_IDS`, `InfoRowColumn`, `RowActionsPair`, `InfoRowFieldItem`, `InfoRowActionPlaceholder`. `NO_DATA_PLACEHOLDER`, `withTip` сохранены.

---

### @ds/uikit-product-layout  (old: @cloud-ru/uikit-product-layout)

_`BlockBasic` удалён. `EmptyBlock` заметно переработан (rename + смена action-слотов + тип иконки)._

**Переименованные пропсы**
- `EmptyBlock`: `description` → `content`.

**Удалённые**
- Компонент `BlockBasic` (`BlockBasicProps`) целиком.
- `EmptyBlock`: `primaryButton`, `secondaryButton` (слот действий переехал в `footer`).

**Новые пропсы**
- `EmptyBlock`: `footer?: ReactNode` (замена primaryButton/secondaryButton), `align`, `layoutPresets`.

**Изменённый тип/сигнатура**
- `EmptyBlock.icon`: было `Pick<InfoBlockProps,'icon'>` (ReactNode-слот) → `IconPredefinedProps`.
- `NoAccess` без изменений пропсов (`serviceName`, `className`); внутри сообщение теперь локализовано.

**Новые константы/типы**
- `EMPTY_BLOCK_LAYOUT_PRESETS`, `TEST_IDS`, locale-экспорт `layoutLocale`.

---

### @ds/uikit-product-load-status  (old: @cloud-ru/uikit-product-load-status)

_Пропсы совместимы, добавлен `showError`; новые публичные константы/типы._

**Новые пропсы**
- `LoadStatus`: `showError?: boolean` (полоса `red`; при нём `appearanceByProgress` игнорируется). `showErrorIcon` сохранён.

**Изменённый тип/сигнатура**
- `ProgressLimit.appearance`: `ProgressBarProps['appearance']` → `Appearance` (`@ds/progress-bar`); `condition` теперь `ProgressLimitCondition` вместо инлайн-union (значения те же).

**Новые константы/типы**
- `PROGRESS_LIMIT_CONDITION`, `ProgressLimitCondition`, `TEST_IDS` (ранее не экспортировались). `DEFAULT_APPEARANCE_BY_PROGRESS`, `SYMBOL_BY_TYPE`, `LoadValueType`, `ProgressLimitList` сохранены.

---

### @ds/uikit-product-modal-predefined  (old: @cloud-ru/uikit-product-modal-predefined)

_Поверхность сильно сокращена: adaptive/mobile/default-body варианты убраны (адаптивность теперь через `@ds/adaptive`), `description`→`content`, ReleaseNotesModal переименован в ReleaseNotes с enum-состоянием._

**Переименованные пропсы**
- DeleteModal / RecallModal: `description?: ReactNode` → `content?: ReactNode` (канон FF-8680; + locale-ключ `deleteModal.description`→`.content`).

**Удалённые пропсы**
- ReleaseNotes: `dataError?: boolean` → заменён на `contentState?: ReleaseNotesContentState` (`data`/`noData`/`error`).

**Новые пропсы**
- DeleteModal / RecallModal: `confirmable?: boolean`, `closeOnPopstate` (из `ModalCustomProps`).
- ReleaseNotes: `contentState?`, `readLaterButtonProps?: Partial<ButtonProps>` (Только mobile), `closeOnPopstate`.

**Изменённый тип/сигнатура**
- `titleTooltip`: `ModalCustom.HeaderProps['titleTooltip']` → `ReactNode`.
- `confirmTextVariant`: строковый union `'name' | 'text'` → тип `ConfirmTextVariant` (через `CONFIRM_TEXT_VARIANT`).

**Переименованные константы/типы**
- Компонент `ReleaseNotesModal` → `ReleaseNotes`; тип `ReleaseNotesModalProps` → `ReleaseNotesProps`.
- `TEST_IDS.closeButton` → `TEST_IDS.cancelButton` (`approveButton` сохранён); объект существенно расширен.

**Удалённые (компоненты/типы)**
- Компоненты: `DefaultDeleteModalBody`, `MobileDeleteModal`, `AdaptiveDeleteModal`, `DefaultRecallModalBody`, `MobileRecallModal`, `AdaptiveRecallModal`, `MobileReleaseNotesModal`, `AdaptiveReleaseNotesModal`.
- Типы: `DefaultDeleteModalBodyProps`, `DefaultRecallModalBodyProps`, `AdaptiveDeleteModalProps`, `AdaptiveRecallModalProps`, `AdaptiveReleaseNotesModalProps`, `MobileDeleteModalProps`, `MobileRecallProps`.

**Новые (константы/типы)**
- `CONTENT_STATE`, `CONFIRM_TEXT_VARIANT`; типы `ReleaseNotesContentState`, `ConfirmTextVariant`.
- `NoteItemProps` теперь публично экспортируется из `types`.
- locale-слой.

_Примечание: канон упоминает `slotAfterHeadline`→`slotAfterTitle` / `headline`→`title`, но в реальных legacy `.d.ts` DeleteModal/RecallModal таких пропсов нет (используются `titleTooltip`/`objectType`/`subtitle`); подтверждён только `description`→`content`._

---

### @ds/uikit-product-notification  (old: @snack-uikit/notification)

_Крупная перестройка. Компоненты переименованы/переразбиты: старый `NotificationPanel` (контент) → `NotificationPanelContent`; старый `NotificationPanelPopover` (overlay-обёртка) → новый адаптивный `NotificationPanel` (Drawer/BottomSheet)._

**Переименованные компоненты (архитектура)**
- Старый `NotificationPanel` (header+body+footer контент) → **`NotificationPanelContent`**.
- Старый `NotificationPanelPopover` (popover-обёртка) → **`NotificationPanel`** — теперь адаптивная обёртка на `DrawerCustom` (desktop=drawer, mobile=bottom-sheet), а не popover.
- Namespace-хелперы переехали: было `NotificationPanel.{Blank,Divider,Stack,Group}` → стало `NotificationPanelContent.{Blank,Stack,Group}`.

**Переименованные пропсы**
- `NotificationCard.content` (ReactNode, **required**) → `NotificationCard.description` (ReactNode, **optional**). По канону «вторичный текст под заголовком карточки = `description`».
- `NotificationCard.link`: picked-проп `'text'` → `'label'` (`PickLinkProps<…,'text'|…>` → `PickLinkProps<'a','label'|'insideText'|'truncateVariant'>`).

**Удалённые пропсы/компоненты**
- `NotificationPanelPopover` целиком удалён (заменён новым `NotificationPanel`); ушли его пропы `trigger`, `placement`, `hoverDelayOpen/Close`, `offset`, `triggerClickByKeys`, `triggerRef`, `contentClassName`, `children` и т.д. (popover-специфика). Новая обёртка берёт Drawer-пропы: `open`, `onClose`, `showBlackout`, `container`, `closeOnPopstate`, `rootClassName`, `position`, `width`.
- `NotificationPanelContent.footerButton` — удалён (в старом `NotificationPanel` был `{ label, onClick }`).
- `NotificationPanel.Divider` (`NotificationPanelDivider` + `NotificationPanelDividerProps`) — удалён из namespace и как компонент.
- `chipToggle.defaultChecked?` — удалён (остались `label`/`checked`/`onChange`).
- `NotificationPanelContent` (быв. NotificationPanel): `scrollEndRef`/`scrollContainerRef` сохранены; `skeletonsAmount`, `loading`, `content` сохранены.

**Новые пропсы/экспорты**
- `NotificationPanel` (overlay): `content: ReactElement<NotificationPanelContentProps>` + `position?` (default `Right`), `width?` (default `S`) — **Только desktop** (на mobile игнорируются).
- `NotificationPanelSettings.size?: 's' | 'm'` — новый; `button` стал **optional** (был required).
- `NotificationCardSkeleton` теперь публично реэкспортится из barrel.

**Изменённый тип/сигнатура**
- `NotificationCard` больше не generic по `LinkElement extends ElementType` — зафиксирован на `'a'`.
- `NotificationCard.primaryButton`: `Omit<ButtonTonalProps,'size'|'appearance'|'data-test-id'>` → `Omit<ButtonProps,'size'|'appearance'|'view'|'data-test-id'>` (добавлен omit `view`; рендерится view='tonal').
- `NotificationCard.secondaryButton`: `Omit<ButtonSimpleProps,…>` → `Omit<ButtonProps,'size'|'appearance'|'view'|'data-test-id'>` (рендерится view='simple').
- `NotificationPanelContent.readAllButton`: `Omit<ButtonFunctionProps,'data-test-id'> & {tooltip}` → `Omit<ButtonProps,'data-test-id'|'size'> & {tooltip}` (добавлен omit `size`).
- `NotificationPanelContent.segments`: `Omit<SegmentedControlProps,…>` → `Omit<SegmentControlProps,…>` (тип переименован SegmentedControl→SegmentControl).
- `NotificationPanelSettings.button`: `Omit<ButtonSimpleProps,'label'|'type'|'size'|'data-test-id'>` → `Omit<ButtonProps<ElementType>,'label'|'size'|'view'|'data-test-id'>`.
- `NotificationCardStackProps` теперь обёрнут в `WithSupportProps` (появились support-пропы, e.g. `data-test-id`); `onOpenChanged` типизирован method-signature.
- `NotificationPanelGroupProps`, `Action` — без изменений (Action переехал из `helperComponents/ActionsButton` в `src/types.ts`, тот же shape `{ icon?, tagLabel? } & Pick<BaseItemProps,'content'|'onClick'|'disabled'>`).

**Значения enum-осей — `APPEARANCE`**
- `Neutral: 'neutral'` → `Default: 'default'` (ключ и значение).
- `ErrorCritical: 'errorCritical'` — удалён.
- Осталось: `Error`, `Warning`, `Success`.
- `Appearance` тип переехал из `NotificationCard/types` в `src/types.ts`.

**Переименованные константы**
- `TEST_IDS` перестроен: был плоский `{ label, title, content, … }` в NotificationCard + отдельный в NotificationPanel → единый `{ card: {...}, panel: {...} }` (ключ `content` → `description`, добавлены `statusIndicator`, `chipToggle`, `readAll`→panel, `blank`, `error`, `group`, `cardStack.actions` и т.д.).
- `setNonce` реэкспорт: из `@snack-uikit/scroll` → из `@ds/scroll` (API сохранён).

---

### @ds/uikit-product-page-layout  (old: @cloud-ru/uikit-product-page-layout)

_Крупный пакет. Главное: `actions` у PageCatalog/PageServices стал структурированным (`Action[]` вместо `ReactNode`); новый публичный модуль `Actions`; enum-строки заменены на общие `as const`-константы уровня пакета; в TreeNavigation добавлен режим `fixed`._

**Новые пропсы**
- `PageCatalog` / `PageServices`: `maxVisibleActionsItems?: number`.
- `Headline`: `moreActions?: ReactNode`.

**Изменённый тип/сигнатура**
- `PageCatalog.actions` / `PageServices.actions`: было `HeadlineProps['actions']` (ReactNode) → `Action[]` (структурированный массив, оборачивается компонентом в `DesktopActions`/`MobileActions`).
- `PageForm.footer.buttonPrimary`/`buttonSecondary`: базовый тип `Omit<ButtonFilledProps|ButtonOutlineProps,'label'>` → `Omit<ButtonProps,'label'>` (`@ds/button`).
- `PageForm.footer.buttonAdditional`: `ButtonSimpleProps & { tooltip; view?: 'simple'|'outline' }` → `ButtonProps & { tooltip }` — под-проп `view?: 'simple'|'outline'` удалён (задаётся через `ButtonProps.view`).
- `SidebarItemWithItems.type`: инлайн `'collapse'|'group'` → `SidebarItemType`; `HeaderProps.type`: `'title'|'back'` → `SIDEBAR_HEADER_TYPE.*` (значения те же).

**Значения enum-осей**
- `TreeNavigationProps.mode`: было `'popover'|'aside'` → `TreeNavigationMode` = `'popover'|'aside'|'fixed'` (**добавлено значение `fixed`**).

**Новые константы/типы**
- Компонент/модуль `Actions`: `Action`, `ActionsProps`, `BUTTON_TYPE`, `ButtonDroplistProps`/`ButtonKebabProps`/`ButtonQuotaProps`, `DesktopActions`/`MobileActions` — вся поверхность новая.
- Константы уровня пакета: `GLOBAL_CONTAINER_ID`, `TREE_NAVIGATION_MODE`, `SIDEBAR_ITEM_TYPE`, `SIDEBAR_HEADER_TYPE`, `TEST_IDS`; типы `TreeNavigationMode`, `SidebarItemType`, `SidebarHeaderType`. `BUTTON_PRIMARY_VARIANT`/`BUTTON_SECONDARY_VARIANT` (+ типы) сохранены, но перенесены из `PageForm/constants` в корневой `constants.ts`/`types.ts`. locale-экспорт добавлен.

**Прочее**
- Статические свойства namespace у компонентов не обнаружены; DefaultSubHeader/PageLoading/PageSidebar/TreeNavigation-поля без изменений (кроме указанного).

---

### @ds/uikit-product-price-summary  (old: @cloud-ru/uikit-product-price-summary)

_Убран layoutType; Link text→label во всех вложенных ссылках/бейджах; PricePeriod enum→union._

**Переименованные пропсы**
- `PriceSummary.docsLink` / `PriceSummarySmall.docsLink`: `{ href, text }` → `{ href, label }` (LinkProps `text`→`label`).
- `hintLink` (в `TotalValueBlockProps`): `{ href?, text }` → `{ href?, label }`.
- `HeaderBlock.promoBadge`: `Pick<PromoTagProps,'text'|'appearance'>` → `Pick<PromoTagProps,'label'|'appearance'>` (canon `text`→`label`).

**Удалённые**
- `PriceSummaryProps`: обёртка `WithLayoutType` убрана → публичного пропа `layoutType` больше нет (раскладка читается из `@ds/adaptive`-контекста).
- Хук `usePriceTotalValueFormatter` удалён из публичного API.

**Новые**
- Экспорт хука `usePeriodFormat`; экспорт `locale`.
- Корневые экспорты `APPEARANCE_STATE` + тип `AppearanceState`, `PRICE_PERIOD`, `TEST_IDS`, `PERIOD_OPTION_TEST_IDS`.

**Изменённый тип/сигнатура**
- `PricePeriod`: TS `enum PricePeriod` → `ValueOf<typeof PRICE_PERIOD>` (const-объект; значения `year/month/day/hour/minute` без изменений, но это union вместо enum).

**Переименованные константы/типы**
- `APPEARANCE_STATE`/`AppearanceState` перенесены из внутреннего `TotalValueBlock` в публичный `constants.ts`/`types.ts` (значения `Default/UserError/SystemError/Warning` без изменений).
- `PricePeriod` enum → `PRICE_PERIOD` const-объект.

---

### @ds/uikit-product-promo-tag-predefined  (old: @cloud-ru/uikit-product-promo-tag-predefined)

_Пропсы `variant`/`context`/`tooltip` сохранены; расширена поверхность за счёт проброса всех PromoTag-пропсов и добавлен locale._

**Изменённый тип/сигнатура**

- `tooltip` — `Pick<TooltipProps, 'placement' | 'trigger'>` → `Pick<TooltipProps, 'placement' | 'trigger' | 'open' | 'onOpenChange'>` (добавлены `open`/`onOpenChange`).
- Базовый спред — было `& Pick<PromoTagProps, 'onClick'>` (только `onClick`), стало `& Omit<PromoTagProps<ElementType>, 'label' | 'appearance' | 'role' | 'size'>` — теперь пробрасываются все пропсы `PromoTag` (включая полиморфизм `as`, `href` и т.п.), кроме `label`/`appearance`/`role`/`size`. `onClick` сохранён.

**Переименованные константы/типы**

- **Новые константы**: `HOVER_DELAY_OPEN_MS`, `TEST_IDS`. Добавлен экспорт locale (`promoTagPredefinedLocale`); тексты тултипов теперь из `@ds/locale`.
- `PREVIEW_CONTEXT`, `VARIANTS`, типы `PreviewContext`, `Variant` — без изменений значений (`variant`/`context` без ренейма).

---

### @ds/uikit-product-quota  (old: @cloud-ru/uikit-product-quota)

_Ренейм булевых флагов по канону; `QuotaWidgetMobile` удалён (адаптив)._

**Переименованные пропсы**
- `QuotaWidgetPropsBase` (наследуют QuotaWidget/QuotaWidgetMini): `isLoading` → `loading`, `isError` → `error`.
- `QuotaWidgetMini`: `isExpandedDefault` → `defaultExpanded`.

**Удалённые**
- Компонент `QuotaWidgetMobile` (`QuotaWidgetMobileProps`, включая пропы `isOpen`/`onClose`) — мобильная поверхность теперь через адаптив.

**Изменённый тип/сигнатура**
- `QuotaWidget.buttonProps`: `Pick<ButtonFunctionProps, …>` → `Pick<ButtonProps, …>` (`@ds/button`); набор ключей `size|className|fullWidth|label|appearance|disabled` не изменился.

**Новые константы/типы**
- `TEST_IDS`, locale-экспорт (`quotaLocale`). `QuotaItem`, утилиты (`getPercent`/`checkIsExceeded`/`formatNumber`) сохранены.

---

### @ds/uikit-product-switch-row  (old: @cloud-ru/uikit-product-switch-row)

_Публичный API SwitchRow сохранён; добавлена uncontrolled-поддержка и TEST_IDS. Вторичный текст остаётся `description` (подтверждено — это setting, не payload)._

**Изменённый тип/сигнатура**
- `checked: boolean` (required) → `checked?: boolean` (optional, controlled).
- `onChange(checked): void` (required) → `onChange?(checked): void` (optional).

**Новые**
- `defaultChecked?: boolean` — uncontrolled initial state.
- `TEST_IDS` (root/switch/title/titleTooltip/description/toggleTooltip) — новый публичный экспорт констант.
- Пропсы обёрнуты в `WithSupportProps<>` (доступны `data-test-id` и support-пропы).

_Переименований пропсов нет: `title`/`description`/`loading`/`tip`/`disabledToggleTip`/`type`/`name` без изменений._

---

### @ds/uikit-product-title-clickable  (old: @cloud-ru/uikit-product-title-clickable)

_Крупный редизайн API: компонент стал полиморфным (`as`/`innerRef`), `href`/`target`/`onClick` ушли в `...rest`; слот слева унифицирован в `before`, старые `icon`/`avatar` помечены deprecated._

**Удалённые (как объявленные пропсы)**
- `href: string` (был **required**) — больше не объявлен; передаётся через intrinsic-пропсы `as='a'` (`...rest`). Обязательность снята.
- `target` — удалён из типа, идёт через `...rest`.
- `onClick?: MouseEventHandler<HTMLAnchorElement>` — удалён из типа, идёт через `...rest`.

**Новые**
- `as?: T` + `innerRef?: PolymorphicRef<T>` — полиморфизм (по умолчанию `'a'`).
- `before?: ReactNode` — унифицированный слот слева от заголовка (пресеты `TitleClickableIcon` / `TitleClickableAvatar`).
- `showArrow?: boolean` (default `true`) — стрелка справа; авто-`external link` при `target='_blank'`.
- Новые публичные компоненты + типы: `TitleClickableIcon`/`TitleClickableIconProps`, `TitleClickableAvatar`/`TitleClickableAvatarProps`.

**Deprecated (сохранены, но с @deprecated)**
- `icon` → рекомендуют `before={<TitleClickableIcon icon={...} />}`.
- `avatar` → рекомендуют `before={<TitleClickableAvatar {...} />}`.

**Изменённый тип/сигнатура**
- `icon`: `JSXElementConstructor<{ size?; className? }>` → `ReactNode`.
- `titleTag`: `Tag` (из `@snack-uikit/typography`) → `ElementType`.

**Переименованные константы/типы (TEST_IDS)**
- Добавлен ключ `root`; удалён ключ `subtitle` (avatarSubtitle остался).

---

### @ds/uikit-product-toggles-predefined  (old: @cloud-ru/uikit-product-toggles-predefined)

_Публичные типы осей и слотов перевели с прокинутых snack-типов на собственные `constants.ts`/`types.ts`; убран проп `name` у ToggleCard._

**ToggleCard — Удалённые**
- `name?: string` — удалён.

**ToggleCard — Изменённый тип/сигнатура**
- `emblem`: `Card.HeaderProps['emblem']` → собственный union `Emblem = EmblemPicture | EmblemIcon` (`{ src; alt }` либо `Pick<IconPredefinedProps,'icon'|'appearance'|'decor'|'shape'>`); теперь передаются только параметры, `IconPredefined` встроен.
- `promoBadge`: `CardProps['promoBadge']` → `Pick<PromoTagProps,'label'|'appearance'> | string`.
- `truncate`: `Pick<Card.HeaderProps['truncate'],'title'|'description'>` → собственный `{ title?: number; description?: number }`.
- `size`: `CardProps['size']` → собственный `Size` (`SIZE` s/m/l).

**ToggleGroup — Изменённый тип/сигнатура**
- `orientation`: инлайн `'horizontal'|'vertical'` → тип `Orientation` (значения те же).
- `gap`: инлайн `'s'|'m'|'l'` → тип `Gap` (значения те же).
- база: `ToggleGroupProps` из `@snack-uikit/toggles` → `@ds/toggles`.

**Новые (публичные экспорты)**
- Константы `SIZE`, `ORIENTATION`, `GAP`, `TEST_IDS`; типы `Size`, `Orientation`, `Gap`, `Emblem`, `EmblemPicture`, `EmblemIcon`.

_Значения enum-осей не изменились (s/m/l, horizontal/vertical). `useToggleGroup` по-прежнему реэкспортится (из `@ds/toggles`)._

---

### @ds/uikit-product-upload-files  (old: @snack-uikit/drop-zone — слабое соответствие)

_Нет чистого 1:1. Старый `@snack-uikit/drop-zone` — набор низкоуровневых примитивов (`FileUpload`, `DropZone`, `HiddenDropZone`, `buildAcceptAttribute`); они переехали в отдельный пакет `@ds/dropzone`. Новый `UploadFiles` — это высокоуровневый компонент полного flow загрузки (прогресс, вложения, валидация, controlled value, локализация), которого в старом drop-zone не было. Сопоставляю только по духу «загрузка файлов»._

**Соответствие пакетов (не props-level)**
- Старые примитивы `FileUpload` / `DropZone` / `HiddenDropZone` из `@snack-uikit/drop-zone` → низкоуровневый слой ушёл в `@ds/dropzone` (не этот пакет). `buildAcceptAttribute` реэкспортится здесь из `@ds/dropzone`.
- Здесь публикуется **новый** компонент `UploadFiles` + хук-контроллер `useUploadFilesController` + `Attachments`/`UploadFilesDropZone` (внутренние компоненты пакета).

**Новый публичный API (`UploadFiles`)**
- `upload: UploadFn<TResult>` (required) — `(file, { signal }) => Promise<TResult>` — кастомная функция загрузки с AbortSignal.
- `value?` / `defaultValue?` / `onChange?` — controlled/uncontrolled список `UploadFileItem<TResult>[]` (`{ id, file, status, progress?, error?, result? }`).
- `accept?: UploadFilesAcceptItem[]` — `{ extention, icon?, displayExtension? }` (по канону-объекту, а не голая строка `accept` как в старом FileUpload). Дефолт `[{ extention: '*' }]`.
- `maxFiles?` (default 3), `maxSize?` (байты, default 5MB).
- `label?`, `hint?` (question tooltip), `optional?` (default true), `disabled?`, `name?`, `onBlur?`, `error?` (ошибка формы, e.g. RHF), `className?`, `attachmentClassname?`.

**Новые типы/константы (публичные)**
- `UploadStatus` (`UPLOAD_STATUS`: `Uploading='uploading'`, `Success='success'`, `Error='error'`).
- `SummaryErrorType` (`SUMMARY_ERROR_TYPE`: `FileLimit='fileLimit'`, `SomeFilesNotUploaded='someFilesNotUploaded'`).
- `UploadFileItem<TResult>`, `UploadFn<TResult>`, `UploadFilesAcceptItem`, `FileSizeUnits`, `UploadFilesDropZoneProps` (`title?`/`description?`/`buttonLabel?`).
- Хук `useUploadFilesController<TResult>` + типы `UseUploadFilesControllerOptions/Result`, `UploadFilesMessages`.
- Утилиты: `formatFileSize`, `formatFileDescription`, `joinWithConjunction`, `makeId`.
- Локализация через `uploadFilesLocale` (`./locale`) — в старом drop-zone локали не было.
- Константы `DEFAULT_MAX_FILES`, `DEFAULT_MAX_SIZE`, `DEFAULT_ACCEPT`, `TEST_IDS` (`root`/`dropzone`/`attachment`).

**Про старые пропсы (для справки, у примитивов drop-zone — теперь вне этого пакета)**
- Старый `FileUpload`: `children` (ReactElement-триггер), `onFilesUpload(files)`, `mode?` (`UploadMode`: single/multiple), `accept?: string`.
- Старый `DropZone`/`PrivateDropZone`: `onFilesUpload`, `title?`, `description?`, `disabled?`, `mode?`, `accept?: string`, drag-события.
- В новом `UploadFiles` этих пропов нет напрямую — flow инкапсулирован: `onFilesUpload`→внутренний контроллер + `onChange(items)`; `accept: string`→`accept: UploadFilesAcceptItem[]`; `mode`→`maxFiles`; `UploadMode`/`UPLOAD_MODE` не публикуются.

---

### @ds/uikit-product-widget  (old: @cloud-ru/uikit-product-widget)

_Пакет свёлся к одному `Widget`; `ProductsWidget`/`SolutionsWidget` удалены. `WithLayoutType` заменён на контекст `@ds/adaptive`; добавлены собственные константы/TEST_IDS и слот `segmentControl`._

**Удалённые (компоненты + их публичные константы)**
- `ProductsWidget` / `ProductsWidgetProps` — удалён; вместе с ним константы `ROW_SIZE`, `COLUMN_SIZE`, `MOBILE_ROW_SIZE`, `MOBILE_COLUMN_SIZE`.
- `SolutionsWidget` / `SolutionsWidgetProps` — удалён.

**WidgetProps — Переименованные/Удалённые пропсы**
- `controlChildren?: ReactNode` — удалён (заменён на `segmentControl`).
- `layoutType` (приходил из `WithLayoutType`) — удалён; раскладка теперь из контекста `@ds/adaptive` (`useAdaptiveLayout`).

**WidgetProps — Новые**
- `segmentControl?: SegmentControlProps` — слот SegmentControl в шапке.
- `wide` теперь помечен «Только desktop» (на mobile принудительно off).

**Переименованные константы/типы**
- `WIDGET_TEST_IDS` (kebabButton/kebabDroplist/actions) → `TEST_IDS` (root/header/content/actions/control/kebabButton/kebabDroplist/dropdown/errorRetry).
- Новые константы `WIDGET_STATE`, `BUTTON_TYPE`; новые типы `WidgetLayoutType`, `WidgetAction`, `WidgetActionListItem/Group/Entry/Props`.

**Изменённый тип/сигнатура (Action и вложенные)**
- `Action`: варианты `variant` те же (filled/outline/tonal/function/simple/kebab/droplist), но базовые пропсы кнопки переехали со snack `Button<Variant>Props` на `Omit<ButtonProps<'button'>,'view'>` из `@ds/button`; `tooltip` — `TooltipProps` из `@ds/tooltip` (был из mobile-tooltip).
- `ButtonKebabProps` / `ButtonDroplistProps`: `list` сменил тип с `Pick<AdaptiveDroplistProps,...>` на собственный `WidgetActionListProps`; `WithLayoutType`-обёртка убрана; button-база snack→`@ds/button`.
- `WidgetProps` больше не обёрнут в `WithLayoutType`.

**Новые (прочее)**
- Экспорт `./locale` (локаль-слой пакета).

_`WidgetHeaderProps` по-прежнему `Pick<TitleClickableProps,...>` включая `icon`/`avatar`/`href` (в title-clickable они стали deprecated/rest, но Pick резолвится)._

---

