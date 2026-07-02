export const FIGMA_EMBED_HOST = 'ds-docs';

export type FigmaNodeRef = {
  fileKey: string;
  fileName: string;
  nodeId: string;
};

type NodeOrSub = FigmaNodeRef | Record<string, FigmaNodeRef>;

const SNACK = { fileKey: 'aNPU3MHwRJiEwbk5F82zux', fileName: 'Snack-Ui-Kit-variables' } as const;
const PRODUCT = {
  fileKey: 'VWNiBRIUmVXIWYlLzMxcs6',
  fileName: 'Product-UI-Kit--variables-',
} as const;
const INTERFACES_ICONS = {
  fileKey: 'WGeuaJKutP2gAFPThLAexW',
  fileName: 'Interfaces-icons--variables-',
} as const;
const AI_COMPONENTS = {
  fileKey: 'tCbbB5RUGyJeBRtjF3dt4d',
  fileName: 'AI-COMPONENTS',
} as const;
const TOOL_ELEMENTS = { ...AI_COMPONENTS, nodeId: '7217-4865' } as const;
const HR_PORTAL = {
  fileKey: 'OWs2qGFYto945j5TEJmQgV',
  fileName: 'HR-Portal-Renovate',
} as const;
const LIST_STATES = {
  fileKey: 'BnDZww7tvszWBemlYQS1Pg',
  fileName: 'Sostoyaniya-dlya-list--tab--toggles--FF-8135-',
} as const;

/**
 * Карта Figma-узлов по имени пакета (`packages/<pkg>`).
 *
 * Значение — либо `FigmaNodeRef` (один узел на пакет), либо объект-карта
 * `{ _: <root>, '<sub-component>': <ref>, ... }` для пакетов с несколькими публичными
 * компонентами. Ключ `_` — узел пакета по умолчанию (когда story title содержит только pkg).
 *
 * Sub-ключ — kebab-case имени публичного компонента в kebab-case (как сегмент story title).
 *
 * **Что класть в `nodeId`**. Любой узел Figma — embed-iframe одинаково отрисует:
 *   - **canvas/page** (целая страница компонента — `<canvas name="stepper">`). Самый широкий
 *     обзор: видно все оси/состояния. Удобно для root-узла `_` пакета.
 *   - **frame / component_set** (конкретный вариант, например `stepperFilledPrimary` или
 *     один subcomponent в нескольких variant'ах). Удобно для sub-ключа, чтобы embed открывался
 *     прямо на нужном субкомпоненте, а не на всей странице.
 *   - **отдельный component / instance** — точечный показ одного варианта.
 *
 * Получить nodeId узла: ПКМ по фрейму в Figma → Copy/Paste → Copy link → из URL берётся
 * параметр `?node-id=A-B`, в `nodeId` пишется как `A-B` (или `A:B` — оба формата работают).
 *
 * Range/несколько узлов сразу Figma в URL не поддерживает: либо положи родительский фрейм,
 * содержащий все нужные варианты, либо разнеси на несколько sub-ключей.
 *
 * Пример для пакета с несколькими публичными компонентами и явными sub-узлами:
 *
 * ```ts
 * stepper: {
 *   _: { ...SNACK, nodeId: '7499-214' },          // canvas-страница "stepper" — всё семейство
 *   step: { ...SNACK, nodeId: '7502-225' },       // конкретный фрейм Step (не страница)
 *   example: { ...SNACK, nodeId: '11487-86709' }, // фрейм с примером использования
 * }
 * ```
 */
// Формат комментариев: `// <pkg-or-sub> → <figma-node-name>`.
export const FIGMA_NODES = {
  accordion: { ...SNACK, nodeId: '6045-114' }, // accordion → accordion
  'ai-button-chevron': { ...AI_COMPONENTS, nodeId: '7247-7715' }, // ai-button-chevron → ButtonChevron
  chips: {
    _: { ...SNACK, nodeId: '28137-1776436' }, // chips → chips - Matrix (canvas)
    'chip-assist': { ...SNACK, nodeId: '6437-16196' }, // chips/chip-assist → ChipAssist
    'chip-toggle': { ...SNACK, nodeId: '6424-65754' }, // chips/chip-toggle → chipToggles
    'chip-choice': { ...SNACK, nodeId: '6388-14835' }, // chips/chip-choice → chipChoiceSingle (legacy alias)
    'chip-choice-single': { ...SNACK, nodeId: '6388-14835' }, // chips/chip-choice-single → chipChoiceSingle
    'chip-choice-multiple': { ...SNACK, nodeId: '6458-14139' }, // chips/chip-choice-multiple → chipChoiceMultiple
    'chip-choice-date': { ...SNACK, nodeId: '6458-14855' }, // chips/chip-choice-date → chipChoiceDate
    'chip-choice-date-range': { ...SNACK, nodeId: '6437-64484' }, // chips/chip-choice-date-range → chipChoiceDateRange
    'chip-choice-time': { ...SNACK, nodeId: '6437-97451' }, // chips/chip-choice-time → chipChoiceTime
    'chip-choice-custom': { ...SNACK, nodeId: '6388-14835' }, // chips/chip-choice-custom → chips Matrix (no dedicated custom node)
    'chip-choice-row': { ...SNACK, nodeId: '6446-4036' }, // chips/chip-choice-row → chipChoiceRow
  },
  'ai-card': { ...AI_COMPONENTS, nodeId: '6081-3818' }, // ai-card → Card / Generative
  'ai-chain-of-thoughts': {
    _: { ...AI_COMPONENTS, nodeId: '7099-3584' }, // Chain Of Thoughts
    'ai-chain-of-thoughts-headline': { ...AI_COMPONENTS, nodeId: '7099-3365' }, // Chain Of Thoughts Headline
  },
  'ai-icon-giga': { ...AI_COMPONENTS, nodeId: '7404-40182' }, // ai-icon-giga → Icon Giga
  'ai-reasoning': { ...AI_COMPONENTS, nodeId: '7250-14770' }, // ai-reasoning → Reasoning
  'ai-queue': { ...AI_COMPONENTS, nodeId: '7099-4119' }, // ai-queue → Queue
  'ai-shimmer': { ...AI_COMPONENTS, nodeId: '7466-4447' }, // ai-shimmer → Shimmer
  'ai-suggestion': {
    _: { ...AI_COMPONENTS, nodeId: '6450-3666' }, // ai-suggestion → Suggestion / Simple
    'ai-suggestion': { ...AI_COMPONENTS, nodeId: '6450-3666' },
    'ai-suggestion-parent': { ...AI_COMPONENTS, nodeId: '6467-21511' }, // Suggestion / Parent
  },
  'ai-field-banner': { ...AI_COMPONENTS, nodeId: '7335-6317' }, // ai-field-banner → Field Banner
  'ai-tool': {
    _: { ...AI_COMPONENTS, nodeId: '7099-3606' }, // ai-tool → Tool (component set)
    'ai-tool': { ...AI_COMPONENTS, nodeId: '7099-3606' }, // AiTool → Tool
    'ai-tool-simple': { ...AI_COMPONENTS, nodeId: '7247-11350' }, // AiToolSimple → Tool Simple
    'ai-tool-array': TOOL_ELEMENTS,
    'ai-tool-badge': TOOL_ELEMENTS,
    'ai-tool-details': TOOL_ELEMENTS,
    'ai-tool-details-label': TOOL_ELEMENTS,
    'ai-tool-icon': TOOL_ELEMENTS,
    'ai-tool-key-value': TOOL_ELEMENTS,
    'ai-tool-object': TOOL_ELEMENTS,
    'ai-tool-status': TOOL_ELEMENTS,
    'ai-tool-text': TOOL_ELEMENTS,
  },
  'ai-field-notice': { ...AI_COMPONENTS, nodeId: '7099-3727' }, // ai-field-notice → Field Notice
  alert: { ...SNACK, nodeId: '3222-166' }, // alert → alert
  attachment: {
    _: { ...SNACK, nodeId: '5778-49181' },
    'attachment-square': { ...SNACK, nodeId: '5781-59628' },
  }, // attachment → attachment + attachmentSquare
  avatar: { ...SNACK, nodeId: '3910-70' }, // avatar → avatar
  block: { ...SNACK, nodeId: '10940-24646' }, // block → block
  'bottom-sheet': { ...SNACK, nodeId: '12833-171561' }, // bottom-sheet → bottomSheet
  breadcrumbs: { ...SNACK, nodeId: '7422-10279' }, // breadcrumbs → breadcrumbs
  button: { ...SNACK, nodeId: '2507-25203' }, // button → button
  'button-combo': { ...SNACK, nodeId: '7883-13864' }, // button-combo → buttonCombo
  card: { ...SNACK, nodeId: '5044-22704' }, // card → card
  calendar: {
    _: { ...SNACK, nodeId: '3839-193281' }, // calendar → calendar
    item: { ...SNACK, nodeId: '3722-10703' }, // calendar → itemCalendar
    timePicker: { ...SNACK, nodeId: '23720-17915' }, // calendar → timePicker
    timePickerDrum: { ...SNACK, nodeId: '12303-72025' }, // calendar → timePickerDrum
    timePickerDropdown: { ...SNACK, nodeId: '23720-29347' }, // calendar → timePickerDropdown
    calendarDropdown: { ...SNACK, nodeId: '19439-215955' }, // calendar → calendarDropdown
  },
  carousel: { ...SNACK, nodeId: '5307-114' }, // carousel → carousel
  'code-editor': { ...SNACK, nodeId: '7574-16699' }, // codeEditor — primary view
  'color-picker': { ...SNACK, nodeId: '5664-155346' }, // color-picker → colorPicker
  counter: { ...SNACK, nodeId: '2088-10548' }, // counter → counter
  divider: { ...SNACK, nodeId: '2932-6308' }, // divider → divider
  drawer: { ...SNACK, nodeId: '2438-94227' }, // drawer → drawer
  dropdown: { ...SNACK, nodeId: '2254-442' }, // dropdown → dropdown
  dropzone: { ...SNACK, nodeId: '4971-205' }, // dropzone → dropzone
  fields: {
    _: { ...SNACK, nodeId: '3059-4284' }, // fields → fields (umbrella)
    'field-text': { ...SNACK, nodeId: '3119-6096' }, // fields/field-text → fieldText
    'field-textarea': { ...SNACK, nodeId: '3299-13122' }, // fields/field-textarea → fieldTextArea
    'field-secure': { ...SNACK, nodeId: '3434-192001' }, // fields/field-secure → fieldSecure
    'field-stepper': { ...SNACK, nodeId: '3438-222637' }, // fields/field-stepper → fieldStepper
    'field-slider': { ...SNACK, nodeId: '3486-19477' }, // fields/field-slider → fieldSlider
    'field-select': { ...SNACK, nodeId: '5824-192430' }, // fields/field-select → fieldSelect
    'field-date': { ...SNACK, nodeId: '3755-87731' }, // fields/field-date → fieldDate
    'field-decorator': { ...SNACK, nodeId: '28132-1626178' }, // fields/field-decorator → field - Matrix
    'field-color': { ...SNACK, nodeId: '5597-23777' }, // fields/field-color → fieldSelectColor
    'field-time': { ...SNACK, nodeId: '5597-32852' }, // fields/field-time → fieldTime
  },
  'hot-spot': { ...SNACK, nodeId: '8965-552893' }, // hot-spot → hotSpot
  'icon-predefined': { ...SNACK, nodeId: '5237-157234' }, // icon-predefined → iconPredefined
  'info-block': { ...SNACK, nodeId: '5828-3470' }, // info-block → infoBlock
  link: { ...SNACK, nodeId: '6913-5372' }, // link → link
  list: {
    _: { ...LIST_STATES, nodeId: '2663-475758' }, // list → list
    item: { ...LIST_STATES, nodeId: '2940-5717' }, // list/item → ListItem
    'item-group': { ...LIST_STATES, nodeId: '2945-7297' }, // list/item-group → ListItemGroup
    'item-search': { ...LIST_STATES, nodeId: '13022-546' }, // list/item-search → ListItemSearch
  },
  loader: { ...SNACK, nodeId: '2918-21302' }, // loader → loader
  markdown: {
    _: { ...SNACK, nodeId: '9201-2412' }, // markdown → canvas
    editor: { ...SNACK, nodeId: '9271-51617' }, // markdown/editor → markdownEditor
    'syntax-example': { ...SNACK, nodeId: '9271-55434' }, // markdown/syntax-example → syntaxExample
  },
  modal: { ...SNACK, nodeId: '2291-117' }, // modal → modal
  pagination: { ...SNACK, nodeId: '4896-67' }, // pagination → pagination
  popover: { ...SNACK, nodeId: '2250-4278' }, // popover → popover
  'progress-bar': { ...SNACK, nodeId: '5823-2893' }, // progress-bar → progressBar
  'promo-tag': { ...SNACK, nodeId: '4132-10359' }, // promo-tag → promoTag
  rating: { ...SNACK, nodeId: '7725-1502' }, // rating → rating
  scroll: { ...SNACK, nodeId: '2311-3857' }, // scroll → scroll
  search: { ...SNACK, nodeId: '6313-114' }, // search → search
  'segment-control': {
    _: { ...SNACK, nodeId: '3311-74' }, // segment-control → segmentControl
    segment: { ...SNACK, nodeId: '5870-2870' }, // segment-control/segment → Segment
  },
  skeleton: { ...SNACK, nodeId: '2750-77960' }, // skeleton → skeleton
  slider: { ...SNACK, nodeId: '3457-121' }, // slider → slider
  status: { ...SNACK, nodeId: '3489-70' }, // status → status
  stepper: {
    _: { ...SNACK, nodeId: '7499-214' }, // stepper → stepper
    step: { ...SNACK, nodeId: '7502-225' }, // stepper/step → Step
    example: { ...SNACK, nodeId: '11487-86709' }, // stepper/example → StepperExample
  },
  table: {
    _: { ...SNACK, nodeId: '19012-223476' }, // table → component set (content × asCard)
    canvas: { ...SNACK, nodeId: '7164-114' }, // table → canvas page
    'private-elements': { ...SNACK, nodeId: '7184-521' }, // tableLine, tableCell, tableHead, sorting, …
    'property-matrix': { ...SNACK, nodeId: '17238-40336' }, // ComponentTable - Property Matrix
    'column-settings-bottom-sheet': { ...SNACK, nodeId: '22607-108364' },
    card: { ...SNACK, nodeId: '25274-100876' }, // table/card → card view
    examples: { ...SNACK, nodeId: '11487-110626' },
  },
  tabs: { ...SNACK, nodeId: '8671-2412' }, // tabs → tabs
  tag: { ...SNACK, nodeId: '3733-11265' }, // tag → tag
  toolbar: {
    _: { ...SNACK, nodeId: '7231-2277' }, // toolbar → canvas toolbar
    'mobile-bulk-bottom-sheet': { ...SNACK, nodeId: '7788-21915' }, // toolbar → bulkActionsBottomSheet
    'mobile-more-bulk-bottom-sheet': { ...SNACK, nodeId: '7546-10980' }, // toolbar → moreBulkActionsDropdownAsButtomSheet
  },
  timeline: { ...SNACK, nodeId: '8658-114' }, // timeline → timeline
  toaster: {
    _: { ...SNACK, nodeId: '6847-810' }, // toaster → canvas
    'system-event': { ...SNACK, nodeId: '7072-478' }, // toaster/system-event → toastSystemEvent
    'user-action': { ...SNACK, nodeId: '7084-541' }, // toaster/user-action → toastUserAction
    upload: { ...SNACK, nodeId: '7871-514005' }, // toaster/upload → toastUpload
  },
  toggles: {
    _: { ...SNACK, nodeId: '2815-30903' }, // toggles → toggle
    checkbox: { ...SNACK, nodeId: '2834-25233' }, // toggles/checkbox → Checkbox
    radio: { ...SNACK, nodeId: '7587-163964' }, // toggles/radio → Radio
    switch: { ...SNACK, nodeId: '2834-25184' }, // toggles/switch → Switch
    favourite: { ...SNACK, nodeId: '2834-25294' }, // toggles/favourite → Favourite
  },
  tooltip: { ...SNACK, nodeId: '2254-443' }, // tooltip → tooltip
  tree: { ...SNACK, nodeId: '6457-5611' }, // tree → tree
  'uikit-product-copy': {
    _: { ...PRODUCT, nodeId: '2184:2737' }, // uikit-product-copy → Copy
    'copy-button': { ...PRODUCT, nodeId: '2212:613' }, // uikit-product-copy/copy-button → CopyButton
    'copy-line': { ...PRODUCT, nodeId: '2212:888' }, // uikit-product-copy/copy-line → CopyLine
  },
  'uikit-product-info-row': { ...PRODUCT, nodeId: '3040-21176' }, // uikit-product-info-row → InfoRow
  'uikit-product-layout': {
    _: { ...PRODUCT, nodeId: '3070:32389' }, // layout canvas
    'empty-block': { ...PRODUCT, nodeId: '3957:129' }, // layout/empty-block → EmptyBlock
    'no-access': { ...PRODUCT, nodeId: '4267:16495' }, // layout/no-access → NoAccess
  },
  'uikit-product-switch-row': { ...PRODUCT, nodeId: '3019:5599' }, // uikit-product-switch-row → SwitchRow
  'uikit-product-toggles-predefined': { ...PRODUCT, nodeId: '2863:49' }, // uikit-product-toggles-predefined → togglesPredefined
  'uikit-product-load-status': { ...PRODUCT, nodeId: '3024-4357' }, // uikit-product-load-status → loadStatus
  'uikit-product-promo-tag-predefined': {
    _: { ...PRODUCT, nodeId: '2853-49' }, // promoTagPredefined canvas
    'preview-service': { ...PRODUCT, nodeId: '2861-787' },
    'preview-functional': { ...PRODUCT, nodeId: '2861-1054' },
    connecting: { ...PRODUCT, nodeId: '2861-672' },
    partner: { ...PRODUCT, nodeId: '2853-990' }, // Figma layer misnamed "connecting"
  },
  'uikit-product-button-predefined': {
    _: { ...PRODUCT, nodeId: '3060-29186' }, // button-dropdown → ButtonDropdown
    'button-dropdown': { ...PRODUCT, nodeId: '3060-29186' },
  },
  'uikit-product-modal-predefined': {
    _: { ...PRODUCT, nodeId: '3179:1987' }, // modalPredefined
    'delete-modal': { ...PRODUCT, nodeId: '3179:9134' }, // deleteModal
    'recall-modal': { ...PRODUCT, nodeId: '3179:9389' }, // recallModal
    'delete-modal-confirmable': { ...PRODUCT, nodeId: '3179:9135' }, // deleteModalConfirmable
    'recall-modal-confirmable': { ...PRODUCT, nodeId: '3179:9390' }, // recallModalConfirmable
    'release-notes': { ...PRODUCT, nodeId: '3181:10621' }, // releaseNotes (desktop surface); mobile sheet — 3181:14803
  },
  'uikit-product-price-summary': {
    _: { ...PRODUCT, nodeId: '2909-6589' },
    'price-summary': { ...PRODUCT, nodeId: '2909-5733' },
    'price-summary-small': { ...PRODUCT, nodeId: '2909-8947' },
  },
  'uikit-product-title-clickable': { ...PRODUCT, nodeId: '3024-193' }, // uikit-product-title-clickable → TitleClickable
  'uikit-product-widget': { ...PRODUCT, nodeId: '3024:759' }, // uikit-product-widget → widget
  'uikit-product-card-predefined': {
    _: { ...PRODUCT, nodeId: '2171-287' }, // canvas root
    'card-banner': { ...PRODUCT, nodeId: '2171-1507' },
    'card-service': { ...PRODUCT, nodeId: '2174-319' },
    'card-service-small': { ...PRODUCT, nodeId: '2176-3032' },
    'card-service-light': { ...PRODUCT, nodeId: '3226-23362' },
    'card-suggest': { ...PRODUCT, nodeId: '3792-69244' },
  },
  'uikit-product-avatar-detail': { ...PRODUCT, nodeId: '2157:3642' }, // uikit-product-avatar-detail → AvatarDetail
  'uikit-product-quota': {
    _: { ...PRODUCT, nodeId: '2917-49' }, // quota canvas
    'quota-widget': { ...PRODUCT, nodeId: '2934-13857' }, // quotaDropdown
    'quota-widget-mini': { ...PRODUCT, nodeId: '2950-5077' }, // quotaMini
    'quota-widget-card': { ...PRODUCT, nodeId: '2921-16397' }, // quotaCard
  },
  'uikit-product-page-layout': {
    _: { ...PRODUCT, nodeId: '2004:1133' }, // pageLayout canvas
    'page-services': { ...PRODUCT, nodeId: '3334:55254' }, // pageLayoutService
    'page-catalog': { ...PRODUCT, nodeId: '3449:33369' }, // pageLayoutCatalog
    'page-form': { ...PRODUCT, nodeId: '3912:5153' }, // pageLayoutForm
    'tree-navigation': { ...PRODUCT, nodeId: '4302:20315' }, // pageLayoutTreeNavigation
  },
  'site-card-vacancy': { ...HR_PORTAL, nodeId: '766-17256' }, // site-card-vacancy → cardVacancy
  'uikit-product-notification': {
    _: { ...PRODUCT, nodeId: '2924:49' }, // canvas: notification
    'notification-card': { ...PRODUCT, nodeId: '2924:6367' }, // notificationCard (status variants)
    'notification-panel-content': { ...PRODUCT, nodeId: '2924:6572' }, // контент панели (content=data)
    'notification-drawer': { ...PRODUCT, nodeId: '3165:4972' }, // обёртка: notificationDrawer (desktop)
    'notification-bottom-sheet': { ...PRODUCT, nodeId: '3166:6162' }, // notificationBottomSheet (mobile)
  },
  icons: { ...INTERFACES_ICONS, nodeId: '3-102' }, // icons → Interfaces icons (отдельный файл)
  materials: { ...SNACK, nodeId: '2014-81002' }, // materials → material
  typography: { ...SNACK, nodeId: '2461-23501' }, // typography → variables & styles
} as const satisfies Record<string, NodeOrSub>;

/**
 * Возвращает Figma-узел по имени пакета и опциональному sub-ключу.
 * `figmaNode('button')` — единственный узел пакета.
 * `figmaNode('toggles', 'checkbox')` — субкомпонент пакета.
 * `figmaNode('uikit-product-copy')` — корневой узел `_` пакета с субкомпонентами.
 */
function isLeaf(entry: NodeOrSub): entry is FigmaNodeRef {
  return typeof (entry as FigmaNodeRef).nodeId === 'string';
}

export function figmaNode(pkg: string, sub?: string): FigmaNodeRef | undefined {
  const entry = (FIGMA_NODES as Record<string, NodeOrSub>)[pkg];
  if (!entry) return undefined;
  if (isLeaf(entry)) return sub ? undefined : entry;
  return entry[sub ?? '_'];
}

export function figmaEmbedUrl({ fileKey, fileName, nodeId }: FigmaNodeRef): string {
  const params = new URLSearchParams({
    'node-id': nodeId,
    'embed-host': FIGMA_EMBED_HOST,
  });
  return `https://embed.figma.com/design/${fileKey}/${fileName}?${params}`;
}

export function figmaDesignUrl({ fileKey, fileName, nodeId }: FigmaNodeRef): string {
  const params = new URLSearchParams({
    'node-id': nodeId,
    m: 'dev',
  });
  return `https://www.figma.com/design/${fileKey}/${fileName}?${params}`;
}
