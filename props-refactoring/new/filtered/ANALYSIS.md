# ANALYSIS — Code-only (public components)

- Generated: 2026-07-16 (после всех P0/P1/P2 ренеймов, разрешения осцилляции description↔content/hint и ренеймов quota/error-pages)
- Command: `pnpm gen:props && pnpm aggregate:props && pnpm extract:prop-renames && pnpm extract:object-shapes && pnpm analyze:props`
- Scope: **2.1** — межкомпонентный анализ Code без Figma (text/content pass)
- Components: 294
- Text-like props: 1302

> **Статус (2026-07-16).** Закрыты в коде: **все 3 P0**, **оба P2** и **primary-text ветка P1**
> (см. §P1 «Выполненные ренеймы»). Осталась только secondary-text ветка P1 — зафиксирована ниже
> как **сложившийся канон** (ренеймов не требует).
>
> **P0 `{ label, value }` закрыт** (`refactor(FF-8680)!: rename ItemContent option prop to label`).
> `ItemContent.option` был **единственным** выбросом — [chips.FlattenOption](packages/chips/src/components/ChipChoice/utils/kindFlattenOptions.ts), [segment-control.Segment](packages/segment-control/src/helperComponents/Segment/Segment.tsx),
> [ai-tool.AiToolKeyValue](packages/ai-tool/src/components/AiToolKeyValue/AiToolKeyValue.tsx) уже несли `{ label, value }`. Ренейм выровнял выброс; заодно ушёл конфликт
> **option overload** (`option` текст vs `truncate.option` maxLines): текст стал `label`,
> `truncate.option` → `truncate.label` — теперь сосуществует с `label` так же, как `truncate.description`
> с `description`.
>
> **Счётчики генератора — false positives** (как chevronPosition/markerPosition):
> - `{ label, value }` всё ещё в P0 — но теперь это значит «типы **согласованы** на `{ label, value }`»,
>   а не дрейф. Генератор группирует по сигнатуре и не отличает согласие от расхождения.
> - `{ content, label }` / `{ content, title }` в P0 — пересборка корзин после `description → content`,
>   семантически новых конфликтов нет.
> **Актуализация 2026-07-15** (сверка с master после FF-8770 / FF-8711 / SITE-11631).
> Публичная поверхность почти не двинулась: +1 компонент, набор конфликтов вырос ровно
> на один — `content → option` (см. §P1 boundary renames). Решения по P1/P2 остаются в силе.
> Изменения, не влияющие на анализ:
>
> - `FF-8770` — унификация дефолтов `size` (`s` → `m`, 17 пакетов): менялся только `defaultValue`,
>   наборы значений осей прежние (инвентарь дефолты не индексирует).
> - `FF-8711` — `ButtonGroup.renderAction` (escape-hatch, не text/enum ось);
>   `PageForm`: `filters` удалён, `stickyFooter` добавлен (boolean, вне text-пасса).
> - `SITE-11631` — `CollapseBlock.title` стал optional (required → optional, не переименование).

## 1. Категориальная сводка (Code)

→ [CATEGORY_SUMMARY.md](./CATEGORY_SUMMARY.md) — справочная сводка по категориям осей (не backlog для agreement).

## 2. Конфликты и кандидаты на унификацию

### P0 — механический rename (одна семантика, совместимые types/values)

#### chevron / markerPosition (similar-values) — ✅ DONE

Разные имена, одинаковые enum values (Jaccard 1.00). **Решение: переименовать chevron в chevronPosition.**

**Сделано** — `refactor(FF-8680)!: rename CollapseBlock chevron prop to chevronPosition`:

- проп `chevron` → `chevronPosition`, константа `CHEVRON` → `CHEVRON_POSITION`, тип `Chevron` → `ChevronPosition`;
- DOM-атрибут `data-chevron` → `data-chevron-position` (ось API и `data-*` должны совпадать, см. [component-api-surface.md](.claude/rules/component-api-surface.md); на атрибут смотрит `rendering.spec`);
- `showChevron`, `TEST_IDS.chevron`, `styles.chevronWrapper` **не** тронуты — адресуют сам элемент-шеврон, а не ось его положения.

Затронуты: [accordion.CollapseBlock](packages/accordion/src/components/CollapseBlock/CollapseBlock.tsx) + Primary/Secondary/Tertiary. `tabs` не менялся — он уже канон.

> **Внимание при перечитывании сгенерированного [ANALYSIS.md](../ANALYSIS.md):** конфликт остался
> там под именем `chevronPosition / markerPosition` — это **ожидаемый false positive**, а не
> недоделка. Анализатор группирует по «одинаковый набор значений, разные имена», а `{before, after}`
> у шеврона аккордеона и маркера табов совпадают. Это **разные оси разных компонентов**; целью было
> выровнять конвенцию именования (суффикс `*Position`), а не слить их в одно имя. Rename здесь
> закрыт — дальнейших действий не требует.

#### loading / isLoading (alias-names) — ✅ DONE

Состояние загрузки. Используются разные имена (`loading` × 46, `isLoading` × 4). Value sets совпадают — механический rename.
**Решение: заменить все `isLoading` на `loading`.**

**Сделано** — `refactor(FF-8680)!: rename isLoading prop to loading`. Конфликт ушёл из сгенерированного [ANALYSIS.md](../ANALYSIS.md) полностью, `isLoading` в публичной поверхности не осталось.

Все 4 публичных usage сводились к **одному** объявлению [uikit-product-quota.QuotaWidgetPropsBase.isLoading](packages/uikit-product-quota/src/types.ts) — `ButtonQuotaProps` = `QuotaWidgetProps`, поэтому правка одной строки прокатилась по цепочке типов:

| Usage | Как получал проп |
|-------|------------------|
| [uikit-product-quota.QuotaWidget](packages/uikit-product-quota/src/components/QuotaWidget/QuotaWidget.tsx) | напрямую из `QuotaWidgetPropsBase` |
| [uikit-product-quota.QuotaWidgetMini](packages/uikit-product-quota/src/components/QuotaWidgetMini/QuotaWidgetMini.tsx) | напрямую из `QuotaWidgetPropsBase` |
| [uikit-product-page-layout.ButtonQuota](packages/uikit-product-page-layout/src/components/Actions/buttons/ButtonQuota.tsx) | `ButtonQuotaProps = QuotaWidgetProps` |
| [uikit-product-page-layout.ActionView](packages/uikit-product-page-layout/src/components/Actions/ActionView.tsx) | ветка union `Action`: `{ variant: 'quota' } & ButtonQuotaProps` |

Nested-вхождения (`actions.isLoading`, `actions.items.isLoading`, `maxVisibleActionsItems.items.isLoading` у `PageCatalog`/`PageForm`/`PageServices`) — **не отдельные пропсы**, а тот же union `Action`, развёрнутый флэттенером вглубь. Переименовались автоматически.

Заодно выровнены внутренние потребители того же слота: `QuotaCardsGrid`, `Grid`, `QuotaWidgetCardsSkeleton` (quota) и [tree.TreeNode](packages/tree/src/helperComponents/TreeNode/types.ts) / `ExpandableTreeNode` (приватная поверхность, не breaking).

**Осознанно не тронуты:**

- **`packages/table`** — [EntityListQueryResult](packages/table/src/presets/entitiesTable/types.ts) повторяет форму `UseQueryResult` из TanStack Query (`isLoading` / `isFetching` / `isError` / `isSuccess` / `refetch`); потребитель передаёт туда результат `useQuery`. Это чужой контракт, а не наше именование. В public-props не числился — поле возвращаемого значения `queryFn`, не проп.
- **Локальные переменные** в `attachment` / `skeleton` / `code-editor` / `ai-tool` / `fields`: `const isLoading = loading || loadingImage`, `useIsLoadingValue(loading)` — производные от уже канонического пропа `loading`. Переименование невозможно физически (переобъявление в той же области видимости).

#### { label, value } (object-shape-drift) — ✅ DONE

Канон формы item/option — **`{ label, value }`**. Ключевое наблюдение: это был не выбор из двух вариантов, а выравнивание **единственного** выброса.

| Тип | Было | Стало |
|-----|------|-------|
| [chips.FlattenOption](packages/chips/src/components/ChipChoice/utils/kindFlattenOptions.ts) | `{ value, label }` | без изменений (уже канон) |
| [segment-control.Segment.{ value, label }](packages/segment-control/src/types.ts) | `{ value, label }` | без изменений (уже канон) |
| [ai-tool.AiToolKeyValue](packages/ai-tool/src/components/AiToolKeyValue/AiToolKeyValue.tsx) | `{ label, value }` | без изменений (уже канон) |
| [list.ItemContent](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | **`{ option, … }`** | **`{ label, … }`** — выброс выровнен |

**Сделано** — `refactor(FF-8680)!: rename ItemContent option prop to label` (162 файла). `ItemContent.option` (`string | number`, primary text строки списка) → `label`; `truncate.option` (maxLines) → `truncate.label`. ~468 call sites вида `content: { option: … }` переехали на `content: { label: … }` через codemod с tsc-driver.

Runtime-guard'ы (`'label' in content`, `isContentItem`, фильтрация поиска) проверены в живом Storybook — фильтрация списка по `content.label` работает (typecheck такие не ловит).

> **В сгенерированном [ANALYSIS.md](../ANALYSIS.md) `{ label, value }` остался в P0** — это **false positive**:
> теперь три+ типа **согласованы** на `{ label, value }`, а генератор группирует по сигнатуре и читает
> согласие как «дрейф». Действий не требует.

### P1 — text/content naming (фидбек option / label / text / caption)

> Источник: негативный фидбек разработчиков — неконсистентность имён для одного semantic slot «заголовок / primary text».
> Field → `caption`, Link → `text`, Button → `label`, List/ItemContent → `option`.

> **Статус P1:** **primary-text ветка закрыта** — каждый контрол-каптион приведён к `label`
> (Button — эталон, Link и ItemContent выровнены), заголовки поверхностей — `title`, слот-контент — `content`.
> **secondary-text ветка** зафиксирована как сложившийся канон (см. §«caption / description / hint / subtitle»),
> ренеймов не требует.

#### Выполненные ренеймы (2026-07-16) — ✅ DONE

Точечные решения, зафиксированные вручную. Каждый закрывает часть alias-конфликтов ниже.

| Ренейм | Пакеты | Коммит |
|--------|--------|--------|
| `PromoTag.text` → `label` | promo-tag (+ card-predefined, price-summary, promo-tag-predefined, toggles-predefined как потребители) | `refactor(FF-8680)!: rename PromoTag text prop to label` |
| `description` → `content` (primary body slot) | ai-field-banner, alert (Alert/AlertTop), info-block, card-predefined (CardBanner/CardService/CardSuggest), [uikit-product-layout.EmptyBlock](packages/uikit-product-layout/src/components/EmptyBlock/EmptyBlock.tsx), modal-predefined (Delete/RecallModal), [notification.NotificationPanelBlank](packages/uikit-product-notification/src/components/NotificationPanelContent/components/NotificationPanelBlank/NotificationPanelBlank.tsx) | `refactor(FF-8680)!: rename description prop to content` |
| `AiReasoning.description` → `content` | ai-reasoning | `refactor(FF-8680)!: rename AiReasoning description prop to content` |
| `Dropdown.headline` → `title`, `headlineHint` → `slotAfterHeadline` | dropdown (+ [fields.FieldColor](packages/fields/src/components/FieldColor/FieldColor.tsx), [list.DesktopDroplist](packages/list/src/helperComponents/DesktopDroplist/DesktopDroplist.tsx)) | `refactor(FF-8680)!: rename Dropdown headline to title and headlineHint to slotAfterHeadline` |
| `BottomSheet.subHeadline` → `subtitle` | bottom-sheet (+ drawer/modal/calendar/dropdown mobile-обёртки) | `refactor(FF-8680)!: rename BottomSheet subHeadline prop to subtitle` |
| `Link.text` → `label` | link (+ toaster, notification, price-summary, error-pages — link-дескрипторы) | `refactor(FF-8680)!: rename Link text prop to label` |
| `ItemContent.option` → `label`, `truncate.option` → `truncate.label` | list (+ fields, chips, toolbar, calendar, breadcrumbs, widget, fields-predefined, notification, button-predefined — ~468 call sites) | `refactor(FF-8680)!: rename ItemContent option prop to label` |
| `QuotaWidget.isError` → `error` (`is`-префикс, рядом каноничный `loading`) | uikit-product-quota (+ page-layout как потребитель) | `refactor(FF-8680)!: rename QuotaWidget isError prop to error` |
| `QuotaWidgetMini.isExpandedDefault` → `defaultExpanded` (uncontrolled `default*`) | uikit-product-quota | `refactor(FF-8680)!: rename QuotaWidgetMini isExpandedDefault to defaultExpanded` |
| `ErrorPage.custom.text` → `description` (вторичный текст под заголовком) | uikit-product-error-pages | `refactor(FF-8680)!: rename ErrorPage custom text prop to description` |

**Не тронуты осознанно** (остаются `description` — не входят в решение):

- **Осцилляция откачена → остаются `description`:** [site-card-vacancy.CardVacancy](packages/site-card-vacancy/src/CardVacancy.tsx), [toaster.ToastSystemEvent](packages/toaster/src/components/ToastSystemEvent/ToastSystemEvent.tsx), switch-row, [toggles-predefined.ToggleCard](packages/uikit-product-toggles-predefined/src/components/ToggleCard/ToggleCard.tsx) сначала ушли в `content`, но вернулись в `description` (вторичный текст под заголовком — канон `description`). [ai-tool.AiToolSimple](packages/ai-tool/src/components/AiToolSimple/AiToolSimple.tsx) и [toaster.ToastUpload](packages/toaster/src/components/ToastUpload/ToastUpload.tsx) рассматривались как `hint`, но остались `description`. Итог: `content` только для body-payload, `description` — для вторичного текста под заголовком.
- text-роль maxLines: `ItemContent.truncate.description`, `CardSuggest.truncate.*` — **не текст**, а `number`.
- `attachment` (Attachment/AttachmentSquare), `uikit-product-avatar-detail`, [list.ItemContent](packages/list/src/helperComponents/ItemContent/ItemContent.tsx), `NoteItemProps` (ReleaseNotes), `CardC[ustom.Header](packages/uikit-product-card-predefined/src/components/CardCustom/Header/Header.tsx)` — вне списка решений.
- `TEST_IDS.description` и CSS-классы `.description` **не переименованы** — это отдельная поверхность (e2e-селекторы потребителей); имя слота изменилось, id остался. Выровнять при явном решении.

**Отменён (коллизия):** `Droplist.label` → `header` — имя `header` уже занято `ListProps.header` (desktop-слот topBar, живой в `DroplistWithHeader`/Playground). Ренейм забирал бы существующий слот и ломал desktop-шапку; typecheck это не ловит. По решению — оставлено `label`.

#### label / text / title / option / content (text-alias-names)

Primary text / заголовок. Разные имена для одной роли — **полный перечень usages** → [TEXT_ALIAS_INVENTORY.md](./TEXT_ALIAS_INVENTORY.md).

| Alias | Total | Top-level | Nested | Основной type |
|-------|-------|-----------|--------|---------------|
| `label` | 205 | 46 | 159 | `string`, `ReactNode` |
| `title` | 91 | 47 | 44 | `string`, `ReactNode` |
| `content` | 74 | 21 | 53 | `ReactNode`, `ItemContentProps` (slot) |
| `text` | 14 | 4 | 10 | `string` |
| `option` | 16 | 1 | 15 | `string \| number` (text), `number` (truncate.maxLines) |
| `headline` | 1 | 1 | 0 | `ReactNode` |

Type buckets в совокупности: `string`, `ReactNode`, `string | number`, slot-композиция — **не механический rename без решения по типам и sub-roles**.

**→ agreement: выбрать канон primary text (`label` vs `text`) и sub-roles (`title` page-level, `content` slot, `option` → merge в канон)**

Ключевые примеры (фидбек):

| Component | Проп | Тип | Роль |
|-----------|------|-----|------|
| [button.Button.label](packages/button/src/Button/types.ts) | `label` | string | primary text кнопки |
| [link.Link.text](packages/link/src/types.ts) | `text` | string | primary text ссылки |
| [fields.FieldText.label](packages/fields/src/components/FieldDecorator/FieldDecorator.tsx) | `label` | string | label поля |
| [list.ItemContent.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `option` | string \| number | primary text строки списка |
| [drawer.Drawer.content](packages/bottom-sheet/src/types.ts) | `content` | ReactNode | slot body |
| [modal.Modal.title](packages/bottom-sheet/src/types.ts) | `title` | string | заголовок модалки |

**Top-level `label` (46):** ai-chain-of-thoughts, ai-suggestion, ai-tool, [alert.AlertButton](packages/alert/src/components/AlertButton/AlertButton.tsx), button, chips, fields.*, [list.Droplist](packages/list/src/components/Lists/Droplist/DropList.tsx)/Separator, segment-control, status, tabs, tag, toaster, uikit-product-* — см. [TEXT_ALIAS_INVENTORY.md § label](./TEXT_ALIAS_INVENTORY.md#label-205-total-46-top-level-159-nested).

**Top-level `text` (4):** [ai-shimmer.AiShimmer](packages/ai-shimmer/src/AiShimmer.tsx), [link.Link](packages/link/src/Link.tsx), [promo-tag.PromoTag](packages/promo-tag/src/PromoTag/PromoTag.tsx), [truncate-string.TruncateString](packages/truncate-string/src/TruncateString.tsx).

**Top-level `title` (47):** accordion, ai-card, alert, attachment, drawer, modal, uikit-product-page-layout.*, uikit-product-notification.*, … — полный список в inventory.

**Top-level `option` (было 1) → ✅ переименован в `label`:** [list.ItemContent](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) — primary text строки списка. `option` как имя primary-text из репо **ушёл полностью** (nested `*.content.option` → `content.label`, `truncate.option` → `truncate.label`).

**Top-level `content` (21):** drawer, modal, bottom-sheet, dropdown, list item shapes, popover, … — часто slot, не plain text.

#### caption / description / hint / subtitle (text-alias-names) — ✅ канон зафиксирован

Secondary text / описание. **Полный перечень usages** → [SECONDARY_TEXT_ALIAS_INVENTORY.md](./SECONDARY_TEXT_ALIAS_INVENTORY.md).

**Решение (2026-07-16): 4 имени = 4 под-роли, ренеймов не требуется.** Каждое имя уже доминирует в своей роли:

| Имя | Под-роль | Канон-домен |
|-----|----------|-------------|
| `caption` | подпись под label поля | `fields.*` |
| `hint` | хелпер под полем | `fields.*`, product widgets |
| `subtitle` | подзаголовок поверхности | drawer / modal / bottom-sheet |
| `description` | вторичный текст в теле карточки/строки | attachment, avatar-detail, ItemContent, ReleaseNotes |

Точечные `description → content` / `description → hint` (см. «Выполненные ренеймы») уже развели тело-контент и подсказку; оставшийся `description` — законный вторичный текст. Общий ренейм не нужен.

| Alias | Total | Top-level | Nested | Основной type | Домен |
|-------|-------|-----------|--------|---------------|-------|
| `description` | 128 | 24 | 104 | `string`, `ReactNode` | alert, cards, list/table empty states, ItemContent |
| `caption` | 27 | 14 | 13 | `string` | **fields.*** , [list.ItemContent](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) |
| `hint` | 17 | 15 | 2 | `string`, `ReactNode` | **fields.***, product widgets |
| `subtitle` | 10 | 7 | 3 | `ReactNode`, `string` | drawer, modal |

**Конфликт фидбека:** Field использует **`caption`** + **`hint`** для подписи/подсказки поля; Alert/Card/List — **`description`**; Drawer/Modal — **`subtitle`**.

**→ agreement: канон secondary text (`description` vs `caption` vs `hint` vs `subtitle`) и когда что применять**

Ключевые примеры:

| Component | Проп | Тип | Роль |
|-----------|------|-----|------|
| [fields.FieldText.caption](packages/fields/src/components/FieldDecorator/FieldDecorator.tsx) | `caption` | string | подпись под label (Field-specific) |
| [fields.FieldText.hint](packages/fields/src/components/FieldDecorator/FieldDecorator.tsx) | `hint` | string | hint под полем |
| [list.ItemContent.caption](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `caption` | string | secondary line в строке списка |
| [list.ItemContent.description](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `description` | string | tertiary line в строке списка |
| [alert.Alert.description](packages/alert/src/components/AlertBase/AlertBase.tsx) | `description` | ReactNode | body alert |
| [drawer.Drawer.subtitle](packages/modal/src/helperComponents/ModalHeader/ModalHeader.tsx) | `subtitle` | ReactNode | подзаголовок drawer |

**Top-level `caption` (14):** все `fields.Field*` (10), [list.ItemContent](packages/list/src/helperComponents/ItemContent/ItemContent.tsx), `[uikit-product-fields-predefined.FieldChat](packages/uikit-product-fields-predefined/src/components/FieldChat/FieldChat.tsx)/Mask/Phone` — **доминирует fields**. См. [inventory § caption](./SECONDARY_TEXT_ALIAS_INVENTORY.md#caption-27-total-14-top-level-13-nested).

**Top-level `hint` (15):** все `fields.Field*` (10), [uikit-product-fields-predefined.FieldMask](packages/uikit-product-fields-predefined/src/components/FieldMask/FieldMask.tsx), [uikit-product-fields-predefined.FieldPhone](packages/uikit-product-fields-predefined/src/components/FieldPhone/FieldPhone.tsx), `LoadStatus`, `PriceSummary`, `UploadFiles`. См. [inventory § hint](./SECONDARY_TEXT_ALIAS_INVENTORY.md#hint-17-total-15-top-level-2-nested).

**Top-level `description` (24):** ai-*, alert, attachment, block, info-block, [list.ItemContent](packages/list/src/helperComponents/ItemContent/ItemContent.tsx), cards, modals, switch-row, toaster — **широкий разброс**; много nested `*.noDataState.description` / `errorDataState.description` (empty states, **не** field hint). См. [inventory § description](./SECONDARY_TEXT_ALIAS_INVENTORY.md#description-128-total-24-top-level-104-nested).

**Top-level `subtitle` (7):** drawer/modal headers, TitleClickableAvatar. См. [inventory § subtitle](./SECONDARY_TEXT_ALIAS_INVENTORY.md#subtitle-10-total-7-top-level-3-nested).

**Overload `description`:** nested `truncate.description` и `content.truncate.description` — **maxLines (number)**, не текст; см. inventory § description nested.

**`helperText`:** в public API не найден (0 usages).

#### Text boundary renames (boundary-rename)

Public API prop передаётся в дочерний DS-компонент под **другим именем** — семантика совпадает, имена расходятся на границе. **Полный перечень** → [TEXT_BOUNDARY_RENAME_INVENTORY.md](./TEXT_BOUNDARY_RENAME_INVENTORY.md).

| Pair | Occurrences | Паттерн |
|------|-------------|---------|
| `label → text` | 10 | API `label` → child `text` (ChipAssist, Segment, Separator, …) |
| `option → text` | 1 | API `option` → TruncateString `text` (ItemContent) |
| `label → option` | 2 | item shape `label` → ItemContent `option` (ChipChoice) |
| `content → option` | 1 | primitive `content` → ItemContent `option` (BaseItem) — **новое, FF-8770** |

**→ agreement: унифицировать имена на границе DS с выбранным каноном primary text**

Связанные (не P1 core, 52 pair): `title → text` (21), `description → text` (10), `item → text` (3), … — см. [inventory § related](./TEXT_BOUNDARY_RENAME_INVENTORY.md#related-text-naming-boundary-renames).

##### option → text

Единственный случай: primary text строки списка называется `option` в API, но передаётся как `text`.

| Component | API prop | Child prop | File |
|-----------|----------|------------|------|
| [list.ItemContent.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `option` | `text` (TruncateString) | [ItemContent.tsx:61](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) |

**→ agreement: переименовать `ItemContent.option` → `text` (или канон `label`)**

##### content → option

Новый случай (FF-8770, `0d1a705c`). `BaseItem` получил шорткат для примитивного `content`: строка/число из
публичного `content` передаётся в `ItemContent` под именем `option`. То есть **третье** имя (`content`) для
того же semantic slot «primary text строки списка», который уже зовётся `option` и рендерится как `text`.

| Component | Source prop | Target prop | File |
|-----------|-------------|-------------|------|
| [list.BaseItem.content](packages/list/src/components/Items/BaseItem/BaseItem.tsx) | `content` (primitive) | `option` (ItemContent) | [BaseItem.tsx:164](packages/list/src/components/Items/BaseItem/BaseItem.tsx) |

Усиливает цепочку `content` → `option` → `text` на одном значении: **три имени на один слот**.

**→ agreement: тот же канон primary text; шорткат должен передавать выбранное каноническое имя**

##### label → option

Обратный паттерн: item/option shape использует `label`, внутри — `option` на ItemContent.

| Component | Source prop | Target prop | File |
|-----------|-------------|-------------|------|
| `chips.ChipChoice` | `label` (FlattenOption) | `option` (ItemContent) | [options.tsx:22](packages/chips/src/components/ChipChoice/utils/options.tsx), [options.tsx:55](packages/chips/src/components/ChipChoice/utils/options.tsx) |

**→ agreement: унифицировать с каноном item shape (`{ label, value }` vs `{ option, value }`)**

##### label → text

API `label` передаётся в text-oriented child как `text` — зеркало конфликта Button.label vs Link.text.

| Component | Count | Примеры |
|-----------|-------|---------|
| [chips.ChipAssist](packages/chips/src/components/ChipAssist/ChipAssist.tsx) | 1 | [ChipAssist.tsx:73](packages/chips/src/components/ChipAssist/ChipAssist.tsx) |
| [chips.ChipToggle](packages/chips/src/components/ChipToggle/ChipToggle.tsx) | 1 | [ChipToggle.tsx:85](packages/chips/src/components/ChipToggle/ChipToggle.tsx) |
| [list.Separator](packages/list/src/helperComponents/Separator/Separator.tsx) | 1 | [Separator.tsx:88](packages/list/src/helperComponents/Separator/Separator.tsx) |
| [segment-control.Segment](packages/segment-control/src/helperComponents/Segment/Segment.tsx) | 1 | [Segment.tsx:74](packages/segment-control/src/helperComponents/Segment/Segment.tsx) |
| [toaster.ToastUserAction](packages/toaster/src/components/ToastUserAction/ToastUserAction.tsx) | 1 | [ToastUserAction.tsx:58](packages/toaster/src/components/ToastUserAction/ToastUserAction.tsx) |
| `uikit-product-*` | 5 | ConfigSelector, InfoRow, NotificationCard |

**→ agreement: если канон primary text = `label`, child props тоже `label`; если `text` — выровнять API**

Полный список → [inventory § label → text](./TEXT_BOUNDARY_RENAME_INVENTORY.md#label--text-10).

#### option overload (same-name-overload) — ✅ DONE

Имя `option` несло **две семантики** (primary text vs maxLines). **Разведено** в `refactor(FF-8680)!: rename ItemContent option prop to label`: primary text → `label`, `truncate.option` (maxLines) → `truncate.label`. Теперь `label` (текст) и `truncate.label` (число) сосуществуют так же, как `description` и `truncate.description` — на разной вложенности, без коллизии. Имя `option` в роли текста/maxLines из репо ушло.

Историческая справка (было) — **полный перечень** → [OPTION_OVERLOAD_INVENTORY.md](./OPTION_OVERLOAD_INVENTORY.md).

| Semantic bucket | Count | Type | Примеры |
|-----------------|-------|------|---------|
| primary text | 12 | `string \| number` | [list.ItemContent.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx), `*.content.option` |
| maxLines | 4 | `number \| undefined` | `truncate.option`, `content.truncate.option` |

**Total:** 16 usages (1 top-level, 15 nested). Доминирует list/ItemContent shape.

**Конфликт:** [list.ItemContent](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) одновременно имеет `option` (primary text) и `truncate.option` (maxLines) — **одно имя, разный type bucket**.

**→ agreement: не blind rename; развести sub-roles (`text` vs `truncate.maxLines`) или nested namespace**

Ключевые примеры:

| Component | Prop | Type | Роль |
|-----------|------|------|------|
| [list.ItemContent.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `option` | string \| number | primary text строки |
| [list.ItemContent.truncate.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `truncate.option` | number \| undefined | maxLines, **не текст** |
| [list.AccordionItem.content.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `content.option` | string \| number | primary text (nested) |
| [list.AccordionItem.content.truncate.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `content.truncate.option` | number \| undefined | maxLines (nested) |

См. также P0 `{ label, value }` — item shapes с `option` vs `label` для того же semantic slot.

### P2 — одно имя, разная семантика (опасно)

#### selectionMode (same-name-diff-values) — ✅ DONE

Одно имя `selectionMode`, но 2 разных value sets — возможно разная семантика под одним именем.
**Решение: целевые значения `multiple` и `single`, обновить в tree.**

**Сделано** — `refactor(FF-8680)!: align tree selectionMode value multi with canon multiple`. Конфликт ушёл из сгенерированного [ANALYSIS.md](../ANALYSIS.md); ось схлопнулась в единый набор `selectionMode: multiple, single` (4 usages).

Правился только `tree` (`multi` → `multiple`): [constants.ts](packages/tree/src/constants.ts) (`Multi: 'multi'` → `Multiple: 'multiple'`), литерал в discriminated union [TreeMultiSelect](packages/tree/src/types.ts) + JSDoc, все обращения `SELECTION_MODE.Multi` → `.Multiple`. `accordion` / `toggles` / `uikit-product-toggles-predefined` не менялись — они уже канон.

**Осознанно не тронуты** (не значение оси, а внутренние идентификаторы режима и имена сторей): `multiSelect` / `isMultiSelect` / `multiSelectState`, DOM-флаг `data-multiselect`, story-id `multi-select`, файлы `Tree.MultiSelect*.stories.tsx`. Внешние потребители (`Menu`, `TocTree`, `NavTree`) используют только `'single'` — их правка не затронула.

#### shape (same-name-diff-values) — ✅ DONE

Одно имя `shape`, но 2 разных value sets — возможно разная семантика под одним именем.
**Решение: целевые значения `rounded` (как в [TailwindCSS](https://tailwindcss.com/docs/border-radius)) и `square` (нет такого по смыслу как «заквадраченный»), обновить во всех трёх местах.**

**Сделано** — `refactor(FF-8680)!: align shape values with canon rounded and square`. Конфликт ушёл из сгенерированного [ANALYSIS.md](../ANALYSIS.md); ось схлопнулась в единый набор `shape: rounded, square` (3 usages).

| Место | Было | Стало |
|-------|------|-------|
| [avatar.Avatar.shape](packages/avatar/src/Avatar.tsx) | rounded, **squared** | rounded, **square** |
| [uikit-product-title-clickable.TitleClickableAvatar.shape](packages/avatar/src/Avatar.tsx) | rounded, **squared** | rounded, **square** (переиспользует тип `Avatar`) |
| [icon-predefined.IconPredefined.shape](packages/icon-predefined/src/IconPredefined.tsx) | **round**, square | **rounded**, square |

**Токены Figma не переименованы — заведён map-алиас «API → токен».** В `avatar` значение оси уходило **прямо в имя токена** (`simple-var(avatar.$avatar, 'anatomy', 'size', $size, $shape, 'border-radius')`), а токены называются `rounded` / `squared`. Без моста селектор `[data-shape='square']` остался бы без токена и скругление молча пропало бы. Поэтому в [avatar/styles.module.scss](packages/avatar/src/styles.module.scss) добавлен `$shapeMap` (как уже было в [icon-predefined](packages/icon-predefined/src/styles.module.scss)):

```scss
$shapes: 'rounded', 'square';
$shapeMap: ('rounded': 'rounded', 'square': 'squared');  // API → токен
```

Проверено по скомпилированному CSS: `.avatar[data-size=xs][data-shape=square]` резолвится в `--sn-avatar-anatomy-size-xs-squared-borderRadius`. Паттерн канонический — см. [scss-styles-standard.md](.claude/rules/scss-styles-standard.md) §«Несколько осей и алиасы».

**→ Этап 7 (Figma):** решить, переименовывать ли сам токен `squared` → `square`. Пока расхождение закрыто map-алиасом с комментарием в SCSS.

Rename разошёлся по 37 файлам: `IconPredefinedProps['shape']` и `Avatar['shape']` переэкспонируются через вложенные типы в ~десяток пакетов (attachment, dropdown, fields, info-block, list, table, uikit-product-*). Отдельно поправлен хардкод дефолта `?? 'round'` в [uikit-product-card-predefined.Emblem](packages/uikit-product-card-predefined/src/helperComponents/Emblem/Emblem.tsx) и `shape='round'` в Playground [card](packages/card/stories/Card/Card.Playground.stories.tsx) — оба поймал `pnpm typecheck`.

## 3. Следующие шаги

- **2.3** — ручная фильтрация завершена (см. backlog в §2, incl. text/content naming)
- **2.2 / Этап 3** — Code ↔ Figma diff (с matching-слоем)
- **Этап 4** — P0 и P2 закрыты полностью; P1 — primary-text ветка закрыта, secondary-text зафиксирована каноном (ренеймов не требует). Открытых code-решений по text/content **нет**.

### Статус P0 / P1 / P2

| Приоритет | Пункт | Статус | Коммит |
|-----------|-------|--------|--------|
| P0 | `chevron` → `chevronPosition` | ✅ done | `refactor(FF-8680)!: rename CollapseBlock chevron prop to chevronPosition` |
| P0 | `isLoading` → `loading` | ✅ done | `refactor(FF-8680)!: rename isLoading prop to loading` |
| P0 | `{ label, value }` (item shape) | ✅ done | `refactor(FF-8680)!: rename ItemContent option prop to label` |
| P1 | `PromoTag.text` → `label` | ✅ done | `refactor(FF-8680)!: rename PromoTag text prop to label` |
| P1 | `description` → `content` | ✅ done | `refactor(FF-8680)!: rename description prop to content` |
| P1 | `AiReasoning.description` → `content` (hint-ветка откачена: AiToolSimple/ToastUpload остались `description`) | ✅ done | `refactor(FF-8680)!: rename AiReasoning description prop to content` |
| P1 | `Dropdown.headline/headlineHint` → `title/slotAfterHeadline` | ✅ done | `refactor(FF-8680)!: rename Dropdown headline …` |
| P1 | `BottomSheet.subHeadline` → `subtitle` | ✅ done | `refactor(FF-8680)!: rename BottomSheet subHeadline prop to subtitle` |
| P1 | `Link.text` → `label` | ✅ done | `refactor(FF-8680)!: rename Link text prop to label` |
| P1 | `ItemContent.option` → `label` (+ option overload) | ✅ done | `refactor(FF-8680)!: rename ItemContent option prop to label` |
| P1 | secondary-text (`caption/hint/subtitle/description`) | ✅ канон зафиксирован | — (ренеймов не требует) |
| P1 | `Droplist.label` → `header` | ⛔ отменён | коллизия с `ListProps.header` |
| P2 | `selectionMode`: `multi` → `multiple` | ✅ done | `refactor(FF-8680)!: align tree selectionMode value multi with canon multiple` |
| P2 | `shape`: канон `rounded` / `square` | ✅ done | `refactor(FF-8680)!: align shape values with canon rounded and square` |
| доп | `QuotaWidget.isError` → `error` | ✅ done | `refactor(FF-8680)!: rename QuotaWidget isError prop to error` |
| доп | `QuotaWidgetMini.isExpandedDefault` → `defaultExpanded` | ✅ done | `refactor(FF-8680)!: rename QuotaWidgetMini isExpandedDefault to defaultExpanded` |
| доп | `ErrorPage.custom.text` → `description` | ✅ done | `refactor(FF-8680)!: rename ErrorPage custom text prop to description` |

Все выполненные пункты — **breaking changes** публичного API. Deprecation-алиасы не заводились: hard rename по [dont-do-that.md](.claude/rules/dont-do-that.md) / [stories-standard.md](.claude/rules/stories-standard.md) («не оставлять legacy-aliases как переходный мост»). Если agreement решит иначе — вернуться к Этапу 6, п. 3 [PLAN.md](../PLAN.md).

### Открытые задачи по Figma (Этап 7)

Во всех закрытых пунктах переименованы **только Code-оси**; Figma не трогали. В очереди:

- `chevron` / `isLoading` / `selectionMode` + text/content-ренеймы P1 — синхронизация variant property names, где применимо.
- **`shape`** — отдельно: токены остались `rounded` / **`squared`**, расхождение с API закрыто map-алиасом `$shapeMap` в SCSS (avatar, icon-predefined). Решить, переименовывать ли сам токен `squared` → `square`; если да — мост убирается.
