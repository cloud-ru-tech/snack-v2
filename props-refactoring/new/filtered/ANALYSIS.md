# ANALYSIS — Code-only (public components)

- Generated: 2026-07-10T11:30:01.769Z
- Command: `pnpm analyze:props`
- Scope: **2.1** — межкомпонентный анализ Code без Figma (text/content pass)
- Components: 293
- Unique prop names: 3820
- Text-like props: 1299

## 1. Категориальная сводка (Code)

→ [CATEGORY_SUMMARY.md](./CATEGORY_SUMMARY.md) — справочная сводка по категориям осей (не backlog для agreement).

## 2. Конфликты и кандидаты на унификацию

### P0 — механический rename (одна семантика, совместимые types/values)

#### chevron / markerPosition (similar-values)

Разные имена, одинаковые enum values (Jaccard 1.00). **Предлагается переименовать chevron в chevronPosition**

Примеры:

- [accordion.CollapseBlock.chevron](packages/accordion/src/components/CollapseBlock/CollapseBlock.tsx)
- [accordion.CollapseBlockPrimary.chevron](packages/accordion/src/components/CollapseBlock/CollapseBlock.tsx)
- [accordion.CollapseBlockSecondary.chevron](packages/accordion/src/components/CollapseBlock/CollapseBlock.tsx)
- [tabs.TabBar.markerPosition](packages/tabs/src/components/TabBar/TabBar.tsx)
- [tabs.Tabs.TabBar.markerPosition](packages/tabs/src/components/TabBar/TabBar.tsx)

#### loading / isLoading (alias-names)

Состояние загрузки. Используются разные имена (`loading` × 46, `isLoading` × 4). Value sets совпадают — механический rename.
**Необходимо заменить все `isLoading` на `loading`**

#### { label, value } (object-shape-drift)

Одинаковый набор text-полей в item/option types — кандидат на унификацию имён полей (`label` vs `option` в других shapes).
**→ agreement: канон `{ label, value }` или `{ option, value }` для select/list items**

Примеры:

- [chips.FlattenOption](packages/chips/src/components/ChipChoice/utils/kindFlattenOptions.ts)
- [segment-control.Segment](packages/segment-control/src/helperComponents/Segment/Segment.tsx)
- [ai-tool.AiToolKeyValueOwnProps](packages/ai-tool/src/components/AiToolKeyValue/AiToolKeyValue.tsx)

### P1 — text/content naming (фидбек option / label / text / caption)

> Источник: негативный фидбек разработчиков — неконсистентность имён для одного semantic slot «заголовок / primary text».
> Field → `caption`, Link → `text`, Button → `label`, List/ItemContent → `option`.

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

**Top-level `option` (1):** только [list.ItemContent.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) — primary text; остальные 15 — nested `*.content.option` или `truncate.option` (maxLines).

**Top-level `content` (21):** drawer, modal, bottom-sheet, dropdown, list item shapes, popover, … — часто slot, не plain text.

#### caption / description / hint / subtitle (text-alias-names)

Secondary text / описание. **Полный перечень usages** → [SECONDARY_TEXT_ALIAS_INVENTORY.md](./SECONDARY_TEXT_ALIAS_INVENTORY.md).

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

**→ agreement: унифицировать имена на границе DS с выбранным каноном primary text**

Связанные (не P1 core, 52 pair): `title → text` (21), `description → text` (10), `item → text` (3), … — см. [inventory § related](./TEXT_BOUNDARY_RENAME_INVENTORY.md#related-text-naming-boundary-renames).

##### option → text

Единственный случай: primary text строки списка называется `option` в API, но передаётся как `text`.

| Component | API prop | Child prop | File |
|-----------|----------|------------|------|
| [list.ItemContent.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `option` | `text` (TruncateString) | [ItemContent.tsx:61](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) |

**→ agreement: переименовать `ItemContent.option` → `text` (или канон `label`)**

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

#### option overload (same-name-overload)

Имя `option` — **две несовместимые семантики**. **Полный перечень** → [OPTION_OVERLOAD_INVENTORY.md](./OPTION_OVERLOAD_INVENTORY.md).

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

#### selectionMode (same-name-diff-values)

Одно имя `selectionMode`, но 2 разных value sets — возможно разная семантика под одним именем.
**Целевые значения – multiple и single, необходимо обновить в tree**

Примеры:

- [accordion.Accordion.selectionMode](packages/accordion/src/Accordion.tsx) (multiple, single)
- [toggles.ToggleGroup.selectionMode](packages/toggles/src/components/ToggleGroup/ToggleGroup.tsx) (multiple, single)
- [uikit-product-toggles-predefined.ToggleGroup.selectionMode](packages/toggles/src/components/ToggleGroup/ToggleGroup.tsx) (multiple, single)
- [tree.Tree.selectionMode](packages/tree/src/types.ts) (multi, single)

#### shape (same-name-diff-values)

Одно имя `shape`, но 2 разных value sets — возможно разная семантика под одним именем.
**Целевые значения – rounded (как в [TailwindCSS](https://tailwindcss.com/docs/border-radius)) и square (нет такого по смыслу как "заквадраченный"), необходимо обновить во всех трех местах**

Примеры:

- [avatar.Avatar.shape](packages/avatar/src/Avatar.tsx) (rounded, squared)
- [uikit-product-title-clickable.TitleClickableAvatar.shape](packages/avatar/src/Avatar.tsx) (rounded, squared)
- [icon-predefined.IconPredefined.shape](packages/icon-predefined/src/IconPredefined.tsx) (round, square)

## 3. Следующие шаги

- **2.3** — ручная фильтрация завершена (см. backlog в §2, incl. text/content naming)
- **2.2 / Этап 3** — Code ↔ Figma diff (с matching-слоем)
- **Этап 4** — решения по P0/P1/P2 → `agreement.md`
