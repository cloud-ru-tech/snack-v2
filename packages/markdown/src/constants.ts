export const TOOLBAR_ITEM = {
  Heading: 'heading',
  Bold: 'bold',
  Italic: 'italic',
  Strikethrough: 'strikethrough',
  Link: 'link',
  InlineCode: 'inline-code',
  BulletList: 'bullet-list',
  OrderedList: 'ordered-list',
  BlockQuote: 'block-quote',
  BlockCode: 'block-code',
  Table: 'table',
  Image: 'image',
} as const;

export const HEADING_LEVEL = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5 } as const;

export const ON_CHANGE_DEBOUNCE_MS = 150;

export const TEST_IDS = {
  viewer: 'markdown',
  viewerCodeCopy: 'markdown__code-copy',
  editor: 'markdown-editor',
  editorHeader: 'markdown-editor__header',
  editorPreviewToggle: 'markdown-editor__preview-toggle',
  editorLabel: 'markdown-editor__label',
  editorClear: 'markdown-editor__clear',
  editorContent: 'markdown-editor__content',
  // Оболочка поля (FieldShell из @ds/fields) — общая для raw и preview.
  editorField: 'markdown-editor__field',
  // Нативная textarea в raw-режиме.
  editorRawInput: 'markdown-editor__raw-input',
  toolbar: 'markdown-editor__toolbar',
  toolbarButton: 'markdown-editor__toolbar-button',
  toolbarMore: 'markdown-editor__toolbar-more',
  toolbarMoreList: 'markdown-editor__toolbar-more-list',
  toolbarHeading: 'markdown-editor__toolbar-heading',
  headingDropdown: 'markdown-editor__heading-dropdown',
  headingOption: 'markdown-editor__heading-option',
  tableGridPicker: 'markdown-editor__table-picker',
  tablePickerCell: 'markdown-editor__table-cell',
  tableCustomize: 'markdown-editor__table-customize',
  customizeModal: 'markdown-editor__customize-table',
  customizeColumns: 'markdown-editor__customize-table-columns',
  customizeRows: 'markdown-editor__customize-table-rows',
  customizeCancel: 'markdown-editor__customize-table-cancel',
  customizeAdd: 'markdown-editor__customize-table-add',
  linkModal: 'markdown-editor__link-modal',
  linkModalUrl: 'markdown-editor__link-modal-url',
  linkModalTitle: 'markdown-editor__link-modal-title',
  linkModalCancel: 'markdown-editor__link-modal-cancel',
  linkModalAdd: 'markdown-editor__link-modal-add',
  imageModal: 'markdown-editor__image-modal',
  imageModalUrl: 'markdown-editor__image-modal-url',
  imageModalAlt: 'markdown-editor__image-modal-alt',
  imageModalCancel: 'markdown-editor__image-modal-cancel',
  imageModalAdd: 'markdown-editor__image-modal-add',
} as const;

/** Стабильный data-test-id конкретной кнопки тулбара (`markdown-editor__toolbar-button--bold`). */
export const toolbarButtonTestId = (item: string) => `${TEST_IDS.toolbarButton}--${item}`;

/** data-test-id пункта heading-дропдауна (`…__heading-option--paragraph` | `…--2`). */
export const headingOptionTestId = (level: number | 'paragraph') => `${TEST_IDS.headingOption}--${level}`;

/** data-test-id ячейки table-picker'а (`…__table-cell--2x3`). */
export const tableCellTestId = (rows: number, cols: number) => `${TEST_IDS.tablePickerCell}--${rows}x${cols}`;
