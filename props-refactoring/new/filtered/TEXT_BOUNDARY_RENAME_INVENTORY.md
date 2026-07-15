# Text boundary rename inventory — JSX prop renames (text/content naming)

- Source: `props-refactoring/new/prop-boundary-renames.md`
- Scope: text-related JSX boundary renames (public API prop → child prop name)
- Generated for agreement: P1 text/content naming (фидбек option/label/text)

## Summary

| Pair | Occurrences | P1 focus |
|------|-------------|----------|
| `option → text` | 1 | **yes** |
| `label → option` | 2 | **yes** |
| `content → option` | 1 | **yes** |
| `label → text` | 10 | **yes** |
| `title → text` | 21 | related |
| `description → text` | 10 | related |
| `item → text` | 3 | related |
| `item → label` | 2 | related |
| `cell → label` | 2 | related |
| `subtitle → subHeadline` | 2 | related |
| `bodyContent → content` | 2 | related |
| `subtitle → text` | 2 | related |
| `moreButtonLabel → text` | 2 | related |
| `createButtonLabel → label` | 2 | related |
| `content → body` | 2 | related |
| `shimmerText → text` | 1 | related |
| `actionLabel → label` | 1 | related |
| `resolvedDescription → description` | 1 | related |
| `item → content` | 1 | related |
| `node → label` | 1 | related |
| `item → node` | 1 | related |
| `callLabel → label` | 1 | related |
| `resultLabel → label` | 1 | related |
| `error → text` | 1 | related |
| `periodName → label` | 1 | related |
| `headline → title` | 1 | related |
| `pair → label` | 1 | related |
| `header → headline` | 1 | related |
| `flattenItem → label` | 1 | related |
| `entry → label` | 1 | related |
| `renderedHeader → text` | 1 | related |
| `optionsLabel → label` | 1 | related |
| `headerContent → text` | 1 | related |
| `link → text` | 1 | related |
| `linkInfo → text` | 1 | related |
| `showingTitle → text` | 1 | related |
| `name → text` | 1 | related |
| `contactData → label` | 1 | related |
| `metadata → text` | 1 | related |
| `content → text` | 1 | related |
| `content → label` | 1 | related |
| `secondaryLabel → text` | 1 | related |
| `error → hint` | 1 | related |
| `errorTitle → title` | 1 | related |
| `errorDescription → description` | 1 | related |
| `retryLabel → label` | 1 | related |
| `noDataTitle → title` | 1 | related |
| `noDataDescription → description` | 1 | related |
| `readLaterLabel → label` | 1 | related |
| `header → title` | 1 | related |
| `period → label` | 1 | related |
| `hintLink → text` | 1 | related |
| `projectName → text` | 1 | related |
| `item → error` | 1 | related |
| `dropzoneDescription → description` | 1 | related |
| `buttonLabel → label` | 1 | related |

**P1 core (фидбек):** public API имя ≠ имя prop на границе DS-компонента.

---

## P1 core pairs

## option → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [list.ItemContent.option](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `option` → `text` | [ItemContent.tsx:61](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `String(option)` |

## content → option (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [list.BaseItem.content](packages/list/src/components/Items/BaseItem/BaseItem.tsx) | `content` → `option` | [BaseItem.tsx:164](packages/list/src/components/Items/BaseItem/BaseItem.tsx) | `option={content}` (primitive-content шорткат) |

## label → option (2)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [options.tsx:22](packages/chips/src/components/ChipChoice/utils/options.tsx) | `label` → `option` | [options.tsx:22](packages/chips/src/components/ChipChoice/utils/options.tsx) | `label` |
| [options.tsx:55](packages/chips/src/components/ChipChoice/utils/options.tsx) | `label` → `option` | [options.tsx:55](packages/chips/src/components/ChipChoice/utils/options.tsx) | `label` |

## label → text (10)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [chips.ChipAssist](packages/chips/src/components/ChipAssist/ChipAssist.tsx) | `label` → `text` | [ChipAssist.tsx:73](packages/chips/src/components/ChipAssist/ChipAssist.tsx) | `label` |
| [chips.ChipToggle](packages/chips/src/components/ChipToggle/ChipToggle.tsx) | `label` → `text` | [ChipToggle.tsx:85](packages/chips/src/components/ChipToggle/ChipToggle.tsx) | `label` |
| [list.Separator](packages/list/src/helperComponents/Separator/Separator.tsx) | `label` → `text` | [Separator.tsx:88](packages/list/src/helperComponents/Separator/Separator.tsx) | `label` |
| [segment-control.Segment](packages/segment-control/src/helperComponents/Segment/Segment.tsx) | `label` → `text` | [Segment.tsx:74](packages/segment-control/src/helperComponents/Segment/Segment.tsx) | `label` |
| [toaster.ToastUserAction](packages/toaster/src/components/ToastUserAction/ToastUserAction.tsx) | `label` → `text` | [ToastUserAction.tsx:58](packages/toaster/src/components/ToastUserAction/ToastUserAction.tsx) | `label` |
| [uikit-product-config-selector.ConfigSelector](packages/uikit-product-config-selector/src/components/ConfigSelector/ConfigSelector.tsx) | `label` → `text` | [ConfigSelector.tsx:98](packages/uikit-product-config-selector/src/components/ConfigSelector/ConfigSelector.tsx) | `label` |
| [uikit-product-info-row.DesktopInfoRow](packages/uikit-product-info-row/src/helperComponents/DesktopInfoRow/DesktopInfoRow.tsx) | `label` → `text` | [DesktopInfoRow.tsx:61](packages/uikit-product-info-row/src/helperComponents/DesktopInfoRow/DesktopInfoRow.tsx) | `label` |
| [uikit-product-info-row.DesktopInfoRow](packages/uikit-product-info-row/src/helperComponents/DesktopInfoRow/DesktopInfoRow.tsx) | `label` → `text` | [DesktopInfoRow.tsx:88](packages/uikit-product-info-row/src/helperComponents/DesktopInfoRow/DesktopInfoRow.tsx) | `label` |
| [uikit-product-info-row.MobileInfoRow](packages/uikit-product-info-row/src/helperComponents/MobileInfoRow/MobileInfoRow.tsx) | `label` → `text` | [MobileInfoRow.tsx:64](packages/uikit-product-info-row/src/helperComponents/MobileInfoRow/MobileInfoRow.tsx) | `label` |
| [uikit-product-notification.NotificationCard](packages/uikit-product-notification/src/components/NotificationCard/NotificationCard.tsx) | `label` → `text` | [NotificationCard.tsx:173](packages/uikit-product-notification/src/components/NotificationCard/NotificationCard.tsx) | `label` |

---

## Related text naming boundary renames

## title → text (21)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [accordion.CollapseBlock](packages/accordion/src/components/CollapseBlock/CollapseBlock.tsx) | `title` → `text` | [CollapseBlock.tsx:126](packages/accordion/src/components/CollapseBlock/CollapseBlock.tsx) | `title` |
| [alert.AlertBase](packages/alert/src/components/AlertBase/AlertBase.tsx) | `title` → `text` | [AlertBase.tsx:159](packages/alert/src/components/AlertBase/AlertBase.tsx) | `title` |
| [attachment.TextBlock](packages/attachment/src/helperComponents/TextBlock/TextBlock.tsx) | `title` → `text` | [TextBlock.tsx:21](packages/attachment/src/helperComponents/TextBlock/TextBlock.tsx) | `title` |
| [modal.ModalHeader](packages/modal/src/helperComponents/ModalHeader/ModalHeader.tsx) | `title` → `text` | [ModalHeader.tsx:43](packages/modal/src/helperComponents/ModalHeader/ModalHeader.tsx) | `title` |
| [toaster.ToastSystemEvent](packages/toaster/src/components/ToastSystemEvent/ToastSystemEvent.tsx) | `title` → `text` | [ToastSystemEvent.tsx:64](packages/toaster/src/components/ToastSystemEvent/ToastSystemEvent.tsx) | `title` |
| [tree.TreeNode](packages/tree/src/helperComponents/TreeNode/TreeNode.tsx) | `title` → `text` | [TreeNode.tsx:358](packages/tree/src/helperComponents/TreeNode/TreeNode.tsx) | `title` |
| [uikit-product-card-predefined.CardBanner](packages/uikit-product-card-predefined/src/components/CardBanner/CardBanner.tsx) | `title` → `text` | [CardBanner.tsx:89](packages/uikit-product-card-predefined/src/components/CardBanner/CardBanner.tsx) | `title` |
| [uikit-product-card-predefined.CardService](packages/uikit-product-card-predefined/src/components/CardService/CardService.tsx) | `title` → `text` | [CardService.tsx:62](packages/uikit-product-card-predefined/src/components/CardService/CardService.tsx) | `title` |
| [uikit-product-card-predefined.CardServiceLight](packages/uikit-product-card-predefined/src/components/CardServiceLight/CardServiceLight.tsx) | `title` → `text` | [CardServiceLight.tsx:130](packages/uikit-product-card-predefined/src/components/CardServiceLight/CardServiceLight.tsx) | `title` |
| [uikit-product-card-predefined.CardServiceSmall](packages/uikit-product-card-predefined/src/components/CardServiceSmall/CardServiceSmall.tsx) | `title` → `text` | [CardServiceSmall.tsx:145](packages/uikit-product-card-predefined/src/components/CardServiceSmall/CardServiceSmall.tsx) | `title` |
| [uikit-product-card-predefined.CardSuggest](packages/uikit-product-card-predefined/src/components/CardSuggest/CardSuggest.tsx) | `title` → `text` | [CardSuggest.tsx:85](packages/uikit-product-card-predefined/src/components/CardSuggest/CardSuggest.tsx) | `title` |
| [uikit-product-card-predefined.Header](packages/uikit-product-card-predefined/src/components/CardCustom/Header/Header.tsx) | `title` → `text` | [Header.tsx:64](packages/uikit-product-card-predefined/src/components/CardCustom/Header/Header.tsx) | `title` |

## description → text (10)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [attachment.TextBlock](packages/attachment/src/helperComponents/TextBlock/TextBlock.tsx) | `description` → `text` | [TextBlock.tsx:28](packages/attachment/src/helperComponents/TextBlock/TextBlock.tsx) | `description` |
| [list.ItemContent](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `description` → `text` | [ItemContent.tsx:72](packages/list/src/helperComponents/ItemContent/ItemContent.tsx) | `description` |
| [toaster.ToastSystemEvent](packages/toaster/src/components/ToastSystemEvent/ToastSystemEvent.tsx) | `description` → `text` | [ToastSystemEvent.tsx:71](packages/toaster/src/components/ToastSystemEvent/ToastSystemEvent.tsx) | `description` |
| [toaster.ToastUploadTitleLine](packages/toaster/src/helperComponents/ToastUploadTitleLine/ToastUploadTitleLine.tsx) | `description` → `text` | [ToastUploadTitleLine.tsx:87](packages/toaster/src/helperComponents/ToastUploadTitleLine/ToastUploadTitleLine.tsx) | `description` |
| [uikit-product-avatar-detail.AvatarDetail](packages/uikit-product-avatar-detail/src/AvatarDetail.tsx) | `description` → `text` | [AvatarDetail.tsx:70](packages/uikit-product-avatar-detail/src/AvatarDetail.tsx) | `description` |
| [uikit-product-card-predefined.CardBanner](packages/uikit-product-card-predefined/src/components/CardBanner/CardBanner.tsx) | `description` → `text` | [CardBanner.tsx:95](packages/uikit-product-card-predefined/src/components/CardBanner/CardBanner.tsx) | `description` |
| [uikit-product-card-predefined.CardService](packages/uikit-product-card-predefined/src/components/CardService/CardService.tsx) | `description` → `text` | [CardService.tsx:68](packages/uikit-product-card-predefined/src/components/CardService/CardService.tsx) | `description` |
| [uikit-product-card-predefined.CardSuggest](packages/uikit-product-card-predefined/src/components/CardSuggest/CardSuggest.tsx) | `description` → `text` | [CardSuggest.tsx:90](packages/uikit-product-card-predefined/src/components/CardSuggest/CardSuggest.tsx) | `description` |
| [uikit-product-card-predefined.Header](packages/uikit-product-card-predefined/src/components/CardCustom/Header/Header.tsx) | `description` → `text` | [Header.tsx:86](packages/uikit-product-card-predefined/src/components/CardCustom/Header/Header.tsx) | `description` |
| [uikit-product-toggles-predefined.ToggleCard](packages/uikit-product-toggles-predefined/src/components/ToggleCard/ToggleCard.tsx) | `description` → `text` | [ToggleCard.tsx:96](packages/uikit-product-toggles-predefined/src/components/ToggleCard/ToggleCard.tsx) | `description` |

## item → text (3)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [toaster.ToastUploadFileLine](packages/toaster/src/helperComponents/ToastUploadFileLine/ToastUploadFileLine.tsx) | `item` → `text` | [ToastUploadFileLine.tsx:52](packages/toaster/src/helperComponents/ToastUploadFileLine/ToastUploadFileLine.tsx) | `item.title` |
| [toaster.ToastUploadFileLine](packages/toaster/src/helperComponents/ToastUploadFileLine/ToastUploadFileLine.tsx) | `item` → `text` | [ToastUploadFileLine.tsx:88](packages/toaster/src/helperComponents/ToastUploadFileLine/ToastUploadFileLine.tsx) | `item.statusLabel` |
| [uikit-product-price-summary.InvoiceItemLabelCell](packages/uikit-product-price-summary/src/components/PriceSummary/components/InvoiceItemLabelCell/InvoiceItemLabelCell.tsx) | `item` → `text` | [InvoiceItemLabelCell.tsx:24](packages/uikit-product-price-summary/src/components/PriceSummary/components/InvoiceItemLabelCell/InvoiceItemLabelCell.tsx) | `item.label` |

## item → label (2)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [ai-suggestion.AiSuggestionParent](packages/ai-suggestion/src/AiSuggestionParent/AiSuggestionParent.tsx) | `item` → `label` | [AiSuggestionParent.tsx:53](packages/ai-suggestion/src/AiSuggestionParent/AiSuggestionParent.tsx) | `item.label` |
| [toolbar.MoreActions](packages/toolbar/src/helperComponents/MoreActions/MoreActions.tsx) | `item` → `label` | [MoreActions.tsx:37](packages/toolbar/src/helperComponents/MoreActions/MoreActions.tsx) | `item.tagLabel` |

## cell → label (2)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [calendar.Grid](packages/calendar/src/helperComponents/Grid/Grid.tsx) | `cell` → `label` | [Grid.tsx:31](packages/calendar/src/helperComponents/Grid/Grid.tsx) | `cell.label` |
| [calendar.MobilePeriodBlock](packages/calendar/src/helperComponents/MobilePeriodBlock/MobilePeriodBlock.tsx) | `cell` → `label` | [MobilePeriodBlock.tsx:66](packages/calendar/src/helperComponents/MobilePeriodBlock/MobilePeriodBlock.tsx) | `cell.label` |

## subtitle → subHeadline (2)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [drawer.MobileDrawer](packages/drawer/src/helperComponents/MobileDrawer/MobileDrawer.tsx) | `subtitle` → `subHeadline` | [MobileDrawer.tsx:46](packages/drawer/src/helperComponents/MobileDrawer/MobileDrawer.tsx) | `subtitle` |
| [modal.MobileModal](packages/modal/src/helperComponents/MobileModal/MobileModal.tsx) | `subtitle` → `subHeadline` | [MobileModal.tsx:51](packages/modal/src/helperComponents/MobileModal/MobileModal.tsx) | `subtitle` |

## bodyContent → content (2)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [modal.DesktopModal](packages/modal/src/helperComponents/DesktopModal/DesktopModal.tsx) | `bodyContent` → `content` | [DesktopModal.tsx:109](packages/modal/src/helperComponents/DesktopModal/DesktopModal.tsx) | `bodyContent` |
| [modal.MobileModal](packages/modal/src/helperComponents/MobileModal/MobileModal.tsx) | `bodyContent` → `content` | [MobileModal.tsx:55](packages/modal/src/helperComponents/MobileModal/MobileModal.tsx) | `bodyContent` |

## subtitle → text (2)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [modal.ModalHeader](packages/modal/src/helperComponents/ModalHeader/ModalHeader.tsx) | `subtitle` → `text` | [ModalHeader.tsx:51](packages/modal/src/helperComponents/ModalHeader/ModalHeader.tsx) | `subtitle` |
| [uikit-product-title-clickable.TitleClickableAvatar](packages/uikit-product-title-clickable/src/components/TitleClickableAvatar/TitleClickableAvatar.tsx) | `subtitle` → `text` | [TitleClickableAvatar.tsx:28](packages/uikit-product-title-clickable/src/components/TitleClickableAvatar/TitleClickableAvatar.tsx) | `subtitle` |

## moreButtonLabel → text (2)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [tag.TagRowTruncated](packages/tag/src/helperComponents/TagRowTruncated/TagRowTruncated.tsx) | `moreButtonLabel` → `text` | [TagRowTruncated.tsx:127](packages/tag/src/helperComponents/TagRowTruncated/TagRowTruncated.tsx) | `moreButtonLabel` |
| [tag.TagRowTruncated](packages/tag/src/helperComponents/TagRowTruncated/TagRowTruncated.tsx) | `moreButtonLabel` → `text` | [TagRowTruncated.tsx:132](packages/tag/src/helperComponents/TagRowTruncated/TagRowTruncated.tsx) | `moreButtonLabel` |

## createButtonLabel → label (2)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-fields-predefined.FieldSelectCreate](packages/uikit-product-fields-predefined/src/components/FieldSelectCreate/FieldSelectCreate.tsx) | `createButtonLabel` → `label` | [FieldSelectCreate.tsx:119](packages/uikit-product-fields-predefined/src/components/FieldSelectCreate/FieldSelectCreate.tsx) | `createButtonLabel` |
| [uikit-product-fields-predefined.SelectFooter](packages/uikit-product-fields-predefined/src/components/FieldSelectCreate/helperComponents/SelectFooter/SelectFooter.tsx) | `createButtonLabel` → `label` | [SelectFooter.tsx:23](packages/uikit-product-fields-predefined/src/components/FieldSelectCreate/helperComponents/SelectFooter/SelectFooter.tsx) | `createButtonLabel` |

## content → body (2)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-info-row.DesktopInfoRow](packages/uikit-product-info-row/src/helperComponents/DesktopInfoRow/DesktopInfoRow.tsx) | `content` → `body` | [DesktopInfoRow.tsx:67](packages/uikit-product-info-row/src/helperComponents/DesktopInfoRow/DesktopInfoRow.tsx) | `content` |
| [uikit-product-info-row.DesktopInfoRow](packages/uikit-product-info-row/src/helperComponents/DesktopInfoRow/DesktopInfoRow.tsx) | `content` → `body` | [DesktopInfoRow.tsx:95](packages/uikit-product-info-row/src/helperComponents/DesktopInfoRow/DesktopInfoRow.tsx) | `content` |

## shimmerText → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [ai-chain-of-thoughts.AiChainOfThoughtsHeadline](packages/ai-chain-of-thoughts/src/components/AiChainOfThoughtsHeadline/AiChainOfThoughtsHeadline.tsx) | `shimmerText` → `text` | [AiChainOfThoughtsHeadline.tsx:56](packages/ai-chain-of-thoughts/src/components/AiChainOfThoughtsHeadline/AiChainOfThoughtsHeadline.tsx) | `shimmerText` |

## actionLabel → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [ai-field-banner.AiFieldBanner](packages/ai-field-banner/src/AiFieldBanner.tsx) | `actionLabel` → `label` | [AiFieldBanner.tsx:55](packages/ai-field-banner/src/AiFieldBanner.tsx) | `actionLabel` |

## resolvedDescription → description (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [ai-field-notice.AiFieldNotice](packages/ai-field-notice/src/components/AiFieldNotice/AiFieldNotice.tsx) | `resolvedDescription` → `description` | [AiFieldNotice.tsx:79](packages/ai-field-notice/src/components/AiFieldNotice/AiFieldNotice.tsx) | `resolvedDescription` |

## item → content (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [ai-field-notice.AiFieldNoticeAnimatedDescription](packages/ai-field-notice/src/components/AiFieldNoticeAnimatedDescription/AiFieldNoticeAnimatedDescription.tsx) | `item` → `content` | [AiFieldNoticeAnimatedDescription.tsx:29](packages/ai-field-notice/src/components/AiFieldNoticeAnimatedDescription/AiFieldNoticeAnimatedDescription.tsx) | `item.content` |

## node → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [ai-suggestion.AiSuggestionParent](packages/ai-suggestion/src/AiSuggestionParent/AiSuggestionParent.tsx) | `node` → `label` | [AiSuggestionParent.tsx:150](packages/ai-suggestion/src/AiSuggestionParent/AiSuggestionParent.tsx) | `node.label` |

## item → node (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [ai-suggestion.AiSuggestionParent](packages/ai-suggestion/src/AiSuggestionParent/AiSuggestionParent.tsx) | `item` → `node` | [AiSuggestionParent.tsx:224](packages/ai-suggestion/src/AiSuggestionParent/AiSuggestionParent.tsx) | `item` |

## callLabel → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [ai-tool.AiTool](packages/ai-tool/src/components/AiTool/AiTool.tsx) | `callLabel` → `label` | [AiTool.tsx:139](packages/ai-tool/src/components/AiTool/AiTool.tsx) | `callLabel` |

## resultLabel → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [ai-tool.AiTool](packages/ai-tool/src/components/AiTool/AiTool.tsx) | `resultLabel` → `label` | [AiTool.tsx:145](packages/ai-tool/src/components/AiTool/AiTool.tsx) | `resultLabel` |

## error → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [attachment.TextBlock](packages/attachment/src/helperComponents/TextBlock/TextBlock.tsx) | `error` → `text` | [TextBlock.tsx:36](packages/attachment/src/helperComponents/TextBlock/TextBlock.tsx) | `error` |

## periodName → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [calendar.Header](packages/uikit-product-card-predefined/src/components/CardCustom/Header/Header.tsx) | `periodName` → `label` | [Header.tsx:82](packages/calendar/src/helperComponents/Header/Header.tsx) | `periodName` |

## headline → title (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [dropdown.MobileDropdown](packages/dropdown/src/helperComponents/MobileDropdown/MobileDropdown.tsx) | `headline` → `title` | [MobileDropdown.tsx:69](packages/dropdown/src/helperComponents/MobileDropdown/MobileDropdown.tsx) | `headline` |

## pair → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [fields.FieldSelect](packages/fields/src/components/FieldSelect/FieldSelect.tsx) | `pair` → `label` | [FieldSelect.tsx:588](packages/fields/src/components/FieldSelect/FieldSelect.tsx) | `formatPair(pair)` |

## header → headline (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [list.DesktopDroplist](packages/list/src/helperComponents/DesktopDroplist/DesktopDroplist.tsx) | `header` → `headline` | [DesktopDroplist.tsx:273](packages/list/src/helperComponents/DesktopDroplist/DesktopDroplist.tsx) | `header` |

## flattenItem → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| `list.hooks` | `flattenItem` → `label` | [hooks.tsx:59](packages/list/src/components/Items/hooks.tsx) | `flattenItem.label` |

## entry → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [pagination.Pagination](packages/pagination/src/components/Pagination/Pagination.tsx) | `entry` → `label` | [Pagination.tsx:92](packages/pagination/src/components/Pagination/Pagination.tsx) | `entry.page` |

## renderedHeader → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [table.HeaderCell](packages/table/src/helperComponents/Cells/HeaderCell/HeaderCell.tsx) | `renderedHeader` → `text` | [HeaderCell.tsx:91](packages/table/src/helperComponents/Cells/HeaderCell/HeaderCell.tsx) | `renderedHeader` |

## optionsLabel → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [table.TablePagination](packages/table/src/helperComponents/TablePagination/TablePagination.tsx) | `optionsLabel` → `label` | [TablePagination.tsx:76](packages/table/src/helperComponents/TablePagination/TablePagination.tsx) | `optionsLabel` |

## headerContent → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| `table.TreeCell` | `headerContent` → `text` | [TreeCell.tsx:62](packages/table/src/helperComponents/Cells/TreeCell/TreeCell.tsx) | `headerContent` |

## link → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [toaster.ToastSystemEvent](packages/toaster/src/components/ToastSystemEvent/ToastSystemEvent.tsx) | `link` → `text` | [ToastSystemEvent.tsx:81](packages/toaster/src/components/ToastSystemEvent/ToastSystemEvent.tsx) | `link.text` |

## linkInfo → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [toaster.ToastUploadFileLine](packages/toaster/src/helperComponents/ToastUploadFileLine/ToastUploadFileLine.tsx) | `linkInfo` → `text` | [ToastUploadFileLine.tsx:56](packages/toaster/src/helperComponents/ToastUploadFileLine/ToastUploadFileLine.tsx) | `linkInfo.text` |

## showingTitle → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [toaster.ToastUploadTitleLine](packages/toaster/src/helperComponents/ToastUploadTitleLine/ToastUploadTitleLine.tsx) | `showingTitle` → `text` | [ToastUploadTitleLine.tsx:51](packages/toaster/src/helperComponents/ToastUploadTitleLine/ToastUploadTitleLine.tsx) | `showingTitle` |

## name → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-avatar-detail.AvatarDetail](packages/uikit-product-avatar-detail/src/AvatarDetail.tsx) | `name` → `text` | [AvatarDetail.tsx:48](packages/uikit-product-avatar-detail/src/AvatarDetail.tsx) | `name` |

## contactData → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-avatar-detail.AvatarDetail](packages/uikit-product-avatar-detail/src/AvatarDetail.tsx) | `contactData` → `label` | [AvatarDetail.tsx:59](packages/uikit-product-avatar-detail/src/AvatarDetail.tsx) | `contactData` |

## metadata → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-card-predefined.Header](packages/uikit-product-card-predefined/src/components/CardCustom/Header/Header.tsx) | `metadata` → `text` | [Header.tsx:72](packages/uikit-product-card-predefined/src/components/CardCustom/Header/Header.tsx) | `metadata` |

## content → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-copy.CopyLine](packages/uikit-product-copy/src/components/CopyLine/CopyLine.tsx) | `content` → `text` | [CopyLine.tsx:55](packages/uikit-product-copy/src/components/CopyLine/CopyLine.tsx) | `String(content)` |

## content → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-error-pages.ErrorPage](packages/uikit-product-error-pages/src/components/ErrorPage/ErrorPage.tsx) | `content` → `label` | [ErrorPage.tsx:77](packages/uikit-product-error-pages/src/components/ErrorPage/ErrorPage.tsx) | `String(content.statusCode)` |

## secondaryLabel → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-info-row.DesktopInfoRow](packages/uikit-product-info-row/src/helperComponents/DesktopInfoRow/DesktopInfoRow.tsx) | `secondaryLabel` → `text` | [DesktopInfoRow.tsx:71](packages/uikit-product-info-row/src/helperComponents/DesktopInfoRow/DesktopInfoRow.tsx) | `secondaryLabel` |

## error → hint (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-modal-predefined.InputConfirm](packages/uikit-product-modal-predefined/src/helperComponents/InputConfirm/InputConfirm.tsx) | `error` → `hint` | [InputConfirm.tsx:66](packages/uikit-product-modal-predefined/src/helperComponents/InputConfirm/InputConfirm.tsx) | `error` |

## errorTitle → title (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-modal-predefined.ReleaseNotesContent](packages/uikit-product-modal-predefined/src/helperComponents/ReleaseNotesContent/ReleaseNotesContent.tsx) | `errorTitle` → `title` | [ReleaseNotesContent.tsx:71](packages/uikit-product-modal-predefined/src/helperComponents/ReleaseNotesContent/ReleaseNotesContent.tsx) | `errorTitle` |

## errorDescription → description (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-modal-predefined.ReleaseNotesContent](packages/uikit-product-modal-predefined/src/helperComponents/ReleaseNotesContent/ReleaseNotesContent.tsx) | `errorDescription` → `description` | [ReleaseNotesContent.tsx:72](packages/uikit-product-modal-predefined/src/helperComponents/ReleaseNotesContent/ReleaseNotesContent.tsx) | `errorDescription` |

## retryLabel → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-modal-predefined.ReleaseNotesContent](packages/uikit-product-modal-predefined/src/helperComponents/ReleaseNotesContent/ReleaseNotesContent.tsx) | `retryLabel` → `label` | [ReleaseNotesContent.tsx:80](packages/uikit-product-modal-predefined/src/helperComponents/ReleaseNotesContent/ReleaseNotesContent.tsx) | `retryLabel` |

## noDataTitle → title (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-modal-predefined.ReleaseNotesContent](packages/uikit-product-modal-predefined/src/helperComponents/ReleaseNotesContent/ReleaseNotesContent.tsx) | `noDataTitle` → `title` | [ReleaseNotesContent.tsx:96](packages/uikit-product-modal-predefined/src/helperComponents/ReleaseNotesContent/ReleaseNotesContent.tsx) | `noDataTitle` |

## noDataDescription → description (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-modal-predefined.ReleaseNotesContent](packages/uikit-product-modal-predefined/src/helperComponents/ReleaseNotesContent/ReleaseNotesContent.tsx) | `noDataDescription` → `description` | [ReleaseNotesContent.tsx:97](packages/uikit-product-modal-predefined/src/helperComponents/ReleaseNotesContent/ReleaseNotesContent.tsx) | `noDataDescription` |

## readLaterLabel → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-modal-predefined.ReleaseNotesFooter](packages/uikit-product-modal-predefined/src/helperComponents/ReleaseNotesFooter/ReleaseNotesFooter.tsx) | `readLaterLabel` → `label` | [ReleaseNotesFooter.tsx:53](packages/uikit-product-modal-predefined/src/helperComponents/ReleaseNotesFooter/ReleaseNotesFooter.tsx) | `readLaterLabel` |

## header → title (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| `uikit-product-page-layout.useItemsCreator` | `header` → `title` | [useItemsCreator.tsx:44](packages/uikit-product-page-layout/src/components/PageSidebar/hooks/useItemsCreator.tsx) | `header.label` |

## period → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-price-summary.PeriodDropdown](packages/uikit-product-price-summary/src/components/PriceSummary/components/PeriodDropdown/PeriodDropdown.tsx) | `period` → `label` | [PeriodDropdown.tsx:46](packages/uikit-product-price-summary/src/components/PriceSummary/components/PeriodDropdown/PeriodDropdown.tsx) | `formatPeriod(period)` |

## hintLink → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-price-summary.TotalValueBlock](packages/uikit-product-price-summary/src/components/PriceSummary/components/TotalValueBlock/TotalValueBlock.tsx) | `hintLink` → `text` | [TotalValueBlock.tsx:76](packages/uikit-product-price-summary/src/components/PriceSummary/components/TotalValueBlock/TotalValueBlock.tsx) | `hintLink?.text` |

## projectName → text (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-quota.QuotaWidgetMini](packages/uikit-product-quota/src/components/QuotaWidgetMini/QuotaWidgetMini.tsx) | `projectName` → `text` | [QuotaWidgetMini.tsx:65](packages/uikit-product-quota/src/components/QuotaWidgetMini/QuotaWidgetMini.tsx) | `projectName` |

## item → error (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-upload-files.Attachments](packages/uikit-product-upload-files/src/components/Attachments/Attachments.tsx) | `item` → `error` | [Attachments.tsx:33](packages/uikit-product-upload-files/src/components/Attachments/Attachments.tsx) | `item.error` |

## dropzoneDescription → description (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-upload-files.UploadFiles](packages/uikit-product-upload-files/src/UploadFiles.tsx) | `dropzoneDescription` → `description` | [UploadFiles.tsx:196](packages/uikit-product-upload-files/src/UploadFiles.tsx) | `dropzoneDescription` |

## buttonLabel → label (1)

| Component | Source → Target | File | Expression |
|-----------|-----------------|------|------------|
| [uikit-product-upload-files.UploadFilesDropZone](packages/uikit-product-upload-files/src/components/UploadFilesDropZone/UploadFilesDropZone.tsx) | `buttonLabel` → `label` | [UploadFilesDropZone.tsx:15](packages/uikit-product-upload-files/src/components/UploadFilesDropZone/UploadFilesDropZone.tsx) | `buttonLabel` |

