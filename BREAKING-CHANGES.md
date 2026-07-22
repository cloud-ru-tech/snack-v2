# BREAKING CHANGES — унификация публичного API (FF-8680)

Все ломающие изменения API компонентов в этой ветке относительно `master`. Источник — коммиты
`refactor(FF-8680)!: …` (унификация именования пропсов по канону
[`.claude/skills/prop-naming.md`](.claude/skills/prop-naming.md)).

Renames — **hard rename без legacy-alias**: потребитель обязан обновить вызовы.

## 1. Переименования пропсов

| Пакет | Компонент | Было | Стало | Тип / примечание |
|-------|-----------|------|-------|------------------|
| `@ds/link` | `Link` | `text` | `label` | `string` — подпись контрола |
| `@ds/promo-tag` | `PromoTag` | `text` | `label` | `string` |
| `@ds/list` | `ItemContent` | `option` | `label` | `string \| number` — основной текст строки |
| `@ds/list` | `ItemContent` | `truncate.option` | `truncate.label` | `number` — max строк (зеркальный ключ) |
| `@ds/accordion` | `CollapseBlock` | `chevron` | `chevronPosition` | ось положения → суффикс `Position` |
| `@ds/bottom-sheet` | `BottomSheet` | `subHeadline` | `subtitle` | `ReactNode` |
| `@ds/dropdown` | `Dropdown` | `headline` | `title` | `ReactNode` — заголовок поверхности |
| `@ds/dropdown` | `Dropdown` | `headlineHint` | `slotAfterTitle` | `ReactNode` — слот справа от заголовка |
| `@ds/bottom-sheet` | `BottomSheet` | `slotAfterHeadline` | `slotAfterTitle` | `ReactNode` |
| `@ds/modal` | `Modal` | `slotAfterHeadline` | `slotAfterTitle` | `ReactNode` |
| `@ds/drawer` | `Drawer` | `slotAfterHeadline` | `slotAfterTitle` | `ReactNode` |
| `@ds/list` | `DropList` | `slotAfterHeadline` | `slotAfterTitle` | `ReactNode` |
| `@ds/toolbar` | `BulkActions` | `slotAfterHeadline` | `slotAfterTitle` | `ReactNode` |
| `@ds/uikit-product-modal-predefined` | `DeleteModal` / `RecallModal` | `slotAfterHeadline` | `slotAfterTitle` | `ReactNode` |
| `@ds/ai-reasoning` | `AiReasoning` | `description` | `content` | `ReactNode` — основной payload |
| `@ds/alert` | `Alert` | `description` | `content` | `ReactNode` — тело сообщения |
| `@ds/ai-field-banner` | `AiFieldBanner` | `description` | `content` | `ReactNode` |
| `@ds/ai-field-notice` | `AiFieldNotice` | `description` | `content` | `ReactNode` |
| `@ds/info-block` | `InfoBlock` | `description` | `content` | `ReactNode` — тело блока |
| `@ds/info-block` | `InfoBlock` | `truncate.description` | `truncate.content` | `number` — max строк |
| `@ds/dropdown` | `Dropdown` (empty-state) | `description` | `content` | через `Pick<InfoBlockProps>` |
| `@ds/list` | `ListEmptyState` | `description` | `content` | через `InfoBlock` |
| `@ds/table` | `TableEmptyState` | `description` | `content` | через `InfoBlock` |
| `@ds/uikit-product-card-predefined` | `CardBanner` | `description` | `content` | `string` |
| `@ds/uikit-product-card-predefined` | `CardService` | `description` | `content` | `string` |
| `@ds/uikit-product-card-predefined` | `CardSuggest` | `description` | `content` | `string` (+ `truncate.description` → `truncate.content`) |
| `@ds/uikit-product-layout` | `EmptyBlock` | `description` | `content` | `ReactNode` |
| `@ds/uikit-product-layout` | `NoAccess` | `description` | `content` | `ReactNode` |
| `@ds/uikit-product-modal-predefined` | `DeleteModal` | `description` | `content` | `ReactNode` |
| `@ds/uikit-product-modal-predefined` | `RecallModal` | `description` | `content` | `ReactNode` |
| `@ds/uikit-product-modal-predefined` | `ReleaseNotesContent` | `description` | `content` | `ReactNode` |
| `@ds/uikit-product-quota` | `QuotaWidget` / `QuotaWidgetMini` | `isLoading` | `loading` | `boolean` |
| `@ds/uikit-product-quota` | `QuotaWidget` | `isError` | `error` | `boolean` |
| `@ds/uikit-product-quota` | `QuotaWidgetMini` | `isExpandedDefault` | `defaultExpanded` | `boolean` |
| `@ds/tree` | `TreeNode` | `isLoading` | `loading` | `boolean` |
| `@ds/uikit-product-error-pages` | `ErrorPage` | `custom.text` | `custom.description` | `string` |
| `@ds/status` | `Status` | `hasBackground` | `background` | `boolean` — наличие фон-подложки (bare-flag канон) |
| `@ds/code-editor` | `CodeEditor` | `hasBackground` | `background` | `boolean` — псевдо-бекграунд editor-области |
| `@ds/icon-predefined` | `IconPredefined` | `decor` | `background` | `boolean` — цветная подложка иконки |

Единый bare-flag «наличие фон/заливка-слоя» → **`background`** (канон [prop-naming.md §2](.claude/skills/prop-naming.md)). DOM-атрибут следует за пропом: `data-has-background` / `data-decor` → **`data-background`** (SCSS-селекторы и e2e-ассерты обновлены). Токен theme-цвета `decor` и CSS-класс `.decor` в icon-predefined **не** переименованы (отдельная поверхность).

## 2. Переименования значений enum-осей

| Пакет | Компонент | Ось | Было | Стало | Примечание |
|-------|-----------|-----|------|-------|------------|
| `@ds/icon-predefined` | `IconPredefined` | `shape` | `'round'` | `'rounded'` | дефолт тоже `'round'` → `'rounded'` |
| `@ds/icon-predefined` | `IconPredefined` | `shape` | `'square'` | `'squared'` | канон оси — `rounded` / `squared` |
| `@ds/tree` | `Tree` | `selectionMode` | `'multi'` | `'multiple'` | константа `SELECTION_MODE.Multi` → `.Multiple` |

## 3. Переименованные константы / типы (публичный экспорт)

| Пакет | Было | Стало |
|-------|------|-------|
| `@ds/accordion` | `CHEVRON` (const) | `CHEVRON_POSITION` |
| `@ds/accordion` | `Chevron` (type) | `ChevronPosition` |
| `@ds/tree` | `SELECTION_MODE.Multi` | `SELECTION_MODE.Multiple` |

`@ds/avatar` ось `shape` **не менялась** относительно `master` — осталась `rounded` / `squared`
(`SHAPE.Squared`). Промежуточное переименование в `square` внутри ветки отменено: см. §4.

## 4. `TEST_IDS` (публичный экспорт)

`TEST_IDS` реэкспортируется из пакета и используется потребителем в e2e — переименование ключа
и его строки ломает существующие локаторы.

| Пакет | Было (ключ → строка) | Стало |
|-------|----------------------|-------|
| `@ds/bottom-sheet` | `slotAfterHeadline` → `'bottom-sheet__slot-after-headline'` | `slotAfterTitle` → `'bottom-sheet__slot-after-title'` |
| `@ds/bottom-sheet` | `subHeadline` → `'bottom-sheet__sub-headline'` | `subtitle` → `'bottom-sheet__subtitle'` |
| `@ds/modal` | `slotAfterHeadline` → `'modal__slot-after-headline'` | `slotAfterTitle` → `'modal__slot-after-title'` |
| `@ds/alert` | `alert.description` → `'alert__description'` | `alert.content` → `'alert__content'` |
| `@ds/alert` | `alertTop.description` → `'alert-top__description'` | `alertTop.content` → `'alert-top__content'` |
| `@ds/ai-field-banner` | `description` → `'ai-field-banner__description'` | `content` → `'ai-field-banner__content'` |
| `@ds/ai-field-notice` | `description` → `'ai-field-notice__description'` | `content` → `'ai-field-notice__content'` |
| `@ds/ai-field-notice` | `descriptionMessage` → `'ai-field-notice__description-message'` | `contentMessage` → `'ai-field-notice__content-message'` |
| `@ds/ai-reasoning` | `description` → `'ai-reasoning__description'` | `content` → `'ai-reasoning__content'` |
| `@ds/info-block` | `description` → `'info-block__description'` | `content` → `'info-block__content'` |
| `@ds/list` | `baseItemOption` → `'list__base-item-option'` | `baseItemLabel` → `'list__base-item-label'` |
| `@ds/uikit-product-card-predefined` | `cardBannerDescription` → `'card-banner__description'` | `cardBannerContent` → `'card-banner__content'` |
| `@ds/uikit-product-card-predefined` | `cardServiceDescription` → `'card-service__description'` | `cardServiceContent` → `'card-service__content'` |
| `@ds/uikit-product-card-predefined` | `cardSuggestDescription` → `'card-suggest__description'` | `cardSuggestContent` → `'card-suggest__content'` |

Эти id уже сидели на слоте `content` — переименование пропа `description` → `content` их не затронуло, и ключ разошёлся со смыслом.

`@ds/uikit-product-notification` `NotificationCard`: проп **остаётся `description`**. Промежуточное переименование
в `content` внутри ветки отменено — карточка опознаётся своим `title`, текст под ним вторичен (тест «убери текст»),
рантайм гардит пустоту. Роль идентична `ToastSystemEvent`, который канон оставляет на `description`.

## 5. Ключи локалей

Ключи словаря — публичная поверхность: потребитель переопределяет строки через `<pkg>Locale.extend(lang, { … })`
по имени ключа. Переименование ключа ломает такие оверрайды.

| Пакет | Было | Стало |
|-------|------|-------|
| `@ds/uikit-product-modal-predefined` | `deleteModal.description` | `deleteModal.content` |
| `@ds/uikit-product-modal-predefined` | `recallModal.description` | `recallModal.content` |

Ключ держит дефолт для пропа `content` (`{content ?? t('deleteModal.content')}`) — имя следует за пропом.

## Канон именования (справочно)

- `text` / `option` как подпись контрола → **`label`**.
- `isLoading` → **`loading`** (булевы флаги — утвердительно, без `is`).
- `headline` / `headlineHint` / `subHeadline` → **`title`** / **`slotAfterTitle`** / **`subtitle`**.
- вторичное описание сущности остаётся **`description`**; основной payload/тело → **`content`**
  (тест «убери текст»: пропал смысл компонента → `content`; остался подписанный контрол → `description`).
- ось положения — суффикс **`<x>Position`** (`chevronPosition`).
- `selectionMode` — **`single`** / **`multiple`**; `shape` — **`rounded`** / **`squared`**
  (`square` в токенах занят билдером под `width`+`height` — см. `prop-naming.md`).

Полный канон и провенанс — [`.claude/skills/prop-naming.md`](.claude/skills/prop-naming.md),
история: `git log --grep=FF-8680`.
