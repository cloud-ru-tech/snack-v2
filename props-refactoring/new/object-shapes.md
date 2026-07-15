# Object shapes with text-like fields

- Generated: 2026-07-16T10:34:12.598Z
- Command: `pnpm extract:object-shapes`
- Shapes: 24

## Shapes by package

### ai-tool

- `AiToolKeyValueOwnProps` { label, value } — `packages/ai-tool/src/components/AiToolKeyValue/AiToolKeyValue.tsx`
### alert

- `AlertSharedFieldProps` { content, title } — `packages/alert/src/components/AlertBase/AlertBase.tsx`
- `UseAlertCollapseParams` { content, title } — `packages/alert/src/components/AlertBase/hooks.ts`
### chips

- `FlattenOption` { label, value } — `packages/chips/src/components/ChipChoice/utils/kindFlattenOptions.ts`
### fields

- `FieldTextAreaOwnProps` { placeholder, value } — `packages/fields/src/components/FieldTextArea/FieldTextArea.tsx`
- `FieldTimeOwnProps` { placeholder, value } — `packages/fields/src/components/FieldTime/FieldTime.tsx`
### list

- `SearchState` { placeholder, value } — `packages/list/src/types.ts`
- `TruncateProps` { description, label } — `packages/list/src/helperComponents/ItemContent/ItemContent.tsx`
### markdown

- `TipContentProps` { caption, title } — `packages/markdown/src/helperComponents/PrivateButton/PrivateButton.tsx`
### segment-control

- `Segment` { label, value } — `packages/segment-control/src/types.ts`
### site-card-vacancy

- `BaseCardVacancyProps` { content, title } — `packages/site-card-vacancy/src/types.ts`
### stepper

- `StepData` { description, title } — `packages/stepper/src/types.ts`
### toaster

- `ToastUploadTitleLineProps` { hint, title } — `packages/toaster/src/helperComponents/ToastUploadTitleLine/ToastUploadTitleLine.tsx`
### toolbar

- `SearchProps` { placeholder, value } — `packages/toolbar/src/helperComponents/Search/ToolbarSearch.tsx`
### uikit-product-card-predefined

- `BaseCardBannerProps` { content, title } — `packages/uikit-product-card-predefined/src/components/CardBanner/CardBanner.tsx`
- `BaseCardServiceProps` { content, title } — `packages/uikit-product-card-predefined/src/components/CardService/CardService.tsx`
- `BaseCardSuggestProps` { content, title } — `packages/uikit-product-card-predefined/src/components/CardSuggest/CardSuggest.tsx`
### uikit-product-error-pages

- `ErrorPageContent` { text, title } — `packages/uikit-product-error-pages/src/types.ts`
- `ErrorPageCustomConfig` { text, title } — `packages/uikit-product-error-pages/src/types.ts`
### uikit-product-info-row

- `DesktopInfoRowPropsBase` { content, label } — `packages/uikit-product-info-row/src/helperComponents/DesktopInfoRow/types.ts`
- `MobileInfoRowPropsBase` { content, label } — `packages/uikit-product-info-row/src/helperComponents/MobileInfoRow/types.ts`
### uikit-product-modal-predefined

- `NoteItemProps` { description, title } — `packages/uikit-product-modal-predefined/src/types.ts`
### uikit-product-price-summary

- `TotalValueBlockProps` { hint, value } — `packages/uikit-product-price-summary/src/components/PriceSummary/components/TotalValueBlock/TotalValueBlock.tsx`
### uikit-product-upload-files

- `UploadFilesDropZoneProps` { description, title } — `packages/uikit-product-upload-files/src/types.ts`

## Field signature groups (object-shape drift candidates)

### { content, title } (6)

- alert.AlertSharedFieldProps
- alert.UseAlertCollapseParams
- site-card-vacancy.BaseCardVacancyProps
- uikit-product-card-predefined.BaseCardBannerProps
- uikit-product-card-predefined.BaseCardServiceProps
- uikit-product-card-predefined.BaseCardSuggestProps

### { placeholder, value } (4)

- fields.FieldTextAreaOwnProps
- fields.FieldTimeOwnProps
- list.SearchState
- toolbar.SearchProps

### { label, value } (3)

- ai-tool.AiToolKeyValueOwnProps
- chips.FlattenOption
- segment-control.Segment

### { description, title } (3)

- stepper.StepData
- uikit-product-modal-predefined.NoteItemProps
- uikit-product-upload-files.UploadFilesDropZoneProps

### { text, title } (2)

- uikit-product-error-pages.ErrorPageContent
- uikit-product-error-pages.ErrorPageCustomConfig

### { content, label } (2)

- uikit-product-info-row.DesktopInfoRowPropsBase
- uikit-product-info-row.MobileInfoRowPropsBase
