export const DRAG_MODE = {
  Static: 'static',
  Dynamic: 'dynamic',
} as const;

export const ORIENTATION = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
} as const;

export const PLACEMENT = {
  Before: 'before',
  After: 'after',
} as const;

export const TEST_IDS = {
  dragGhost: 'drag-ghost',
  dragPreview: 'drag-preview',
  dropIndicator: 'drop-indicator',
  dropTarget: 'drop-target',
} as const;
