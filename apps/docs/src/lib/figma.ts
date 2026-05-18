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
  alert: { ...SNACK, nodeId: '3222-166' }, // alert → alert
  avatar: { ...SNACK, nodeId: '3910-70' }, // avatar → avatar
  block: { ...SNACK, nodeId: '10940-24646' }, // block → block
  breadcrumbs: { ...SNACK, nodeId: '7422-10279' }, // breadcrumbs → breadcrumbs
  button: { ...SNACK, nodeId: '2507-25203' }, // button → button
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
  'color-picker': { ...SNACK, nodeId: '5664-155346' }, // color-picker → colorPicker
  counter: { ...SNACK, nodeId: '2088-10548' }, // counter → counter
  divider: { ...SNACK, nodeId: '2932-6308' }, // divider → divider
  drawer: { ...SNACK, nodeId: '2438-94227' }, // drawer → drawer
  dropdown: { ...SNACK, nodeId: '2254-442' }, // dropdown → dropdown
  dropzone: { ...SNACK, nodeId: '4971-205' }, // dropzone → dropzone
  'hot-spot': { ...SNACK, nodeId: '8965-552893' }, // hot-spot → hotSpot
  'icon-predefined': { ...SNACK, nodeId: '5237-157234' }, // icon-predefined → iconPredefined
  'info-block': { ...SNACK, nodeId: '5828-3470' }, // info-block → infoBlock
  link: { ...SNACK, nodeId: '6913-5372' }, // link → link
  loader: { ...SNACK, nodeId: '2918-21302' }, // loader → loader
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
  tabs: { ...SNACK, nodeId: '8671-2412' }, // tabs → tabs
  tag: { ...SNACK, nodeId: '3733-11265' }, // tag → tag
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
  'uikit-product-copy': {
    _: { ...PRODUCT, nodeId: '2184:2737' }, // uikit-product-copy → Copy
    'copy-button': { ...PRODUCT, nodeId: '2212:613' }, // uikit-product-copy/copy-button → CopyButton
    'copy-line': { ...PRODUCT, nodeId: '2212:888' }, // uikit-product-copy/copy-line → CopyLine
  },
  'uikit-product-info-row': { ...PRODUCT, nodeId: '3040-21176' }, // uikit-product-info-row → InfoRow
  'uikit-product-switch-row': { ...PRODUCT, nodeId: '3019:5599' }, // uikit-product-switch-row → SwitchRow
  'uikit-product-title-clickable': { ...PRODUCT, nodeId: '3024-193' }, // uikit-product-title-clickable → TitleClickable
  'uikit-product-avatar-detail': { ...PRODUCT, nodeId: '2157:3642' }, // uikit-product-avatar-detail → AvatarDetail
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
