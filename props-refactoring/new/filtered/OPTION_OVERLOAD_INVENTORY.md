# Option overload inventory — same prop name, different semantics

- Source: `props-refactoring/new/public-props.md`
- Scope: all public `option` props (top-level + nested flatten)
- Generated for agreement: P1 option overload (text vs maxLines)

## Summary

| Semantic bucket | Count | Type | Role |
|-----------------|-------|------|------|
| primary text | 12 | `string \| number` | primary line text в ItemContent shape |
| maxLines | 4 | `number \| undefined` | `truncate.option` — **не текст** |

**Total `option` usages:** 16 (1 top-level, 15 nested)

**Конфликт:** одно имя `option` — primary text (`ItemContent.option`, `content.option`) vs maxLines (`truncate.option`, `content.truncate.option`).

**→ agreement: не blind rename; развести sub-roles или nested namespace**

---

## Primary text (string | number) (12)

| Component | Prop | Type | Level |
|-----------|------|------|-------|
| [button-combo.ButtonCombo.items.content.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `items.content.option` | `string \| number` | nested |
| [list.AccordionItem.content.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `content.option` | `string \| number` | nested |
| [list.BaseItem.content.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `content.option` | `string \| number` | nested |
| [list.Droplist.items.content.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `items.content.option` | `string \| number` | nested |
| [list.Droplist.pinBottom.content.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `pinBottom.content.option` | `string \| number` | nested |
| [list.Droplist.pinTop.content.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `pinTop.content.option` | `string \| number` | nested |
| [list.ItemContent.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `option` | `string \| number` | **top-level** |
| [list.NextListItem.content.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `content.option` | `string \| number` | nested |
| [uikit-product-button-predefined.ButtonDropdown.items.content.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `items.content.option` | `string \| number` | nested |
| [uikit-product-notification.NotificationCard.actions.content.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `actions.content.option` | `string \| number` | nested |
| [uikit-product-notification.NotificationCardStack.actions.content.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `actions.content.option` | `string \| number` | nested |
| [uikit-product-notification.NotificationPanelSettings.actions.content.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `actions.content.option` | `string \| number` | nested |

## maxLines (number | undefined) — NOT text (4)

| Component | Prop | Type | Level |
|-----------|------|------|-------|
| [list.AccordionItem.content.truncate.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `content.truncate.option` | `number \| undefined` | nested |
| [list.BaseItem.content.truncate.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `content.truncate.option` | `number \| undefined` | nested |
| [list.ItemContent.truncate.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `truncate.option` | `number \| undefined` | nested |
| [list.NextListItem.content.truncate.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `content.truncate.option` | `number \| undefined` | nested |

