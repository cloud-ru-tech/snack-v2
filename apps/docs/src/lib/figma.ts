export const FIGMA_EMBED_HOST = 'ds-docs';

export type FigmaNodeRef = {
  fileKey: string;
  fileName: string;
  nodeId: string;
};

export const FIGMA_BUTTON: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '2782-111011',
};

export const FIGMA_TITLE_CLICKABLE: FigmaNodeRef = {
  fileKey: 'VWNiBRIUmVXIWYlLzMxcs6',
  fileName: 'Product-UI-Kit--variables-',
  nodeId: '3024-193',
};

export const FIGMA_STEPPER: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '19676-77965',
};

export const FIGMA_STEPPER_STEP: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '7502-225',
};

export const FIGMA_STEPPER_EXAMPLE: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '11487-86709',
};

export const FIGMA_TOGGLES: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '2815-30903',
};

export const FIGMA_CHECKBOX: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '2834-25233',
};

export const FIGMA_RADIO: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '7587-163964',
};

export const FIGMA_SWITCH: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '2834-25184',
};

export const FIGMA_FAVOURITE: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '2834-25294',
};

export const FIGMA_ACCORDION: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '6764-5128',
};

export const FIGMA_DRAWER: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '2438-94227',
};

export const FIGMA_SEGMENT_CONTROL: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '6150-257592',
};

export const FIGMA_SEGMENT_CONTROL_SEGMENT: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '5870-2870',
};

export const FIGMA_PRODUCT_AVATAR_DETAIL: FigmaNodeRef = {
  fileKey: 'VWNiBRIUmVXIWYlLzMxcs6',
  fileName: 'Product-UI-Kit--variables-',
  nodeId: '2157:3642',
};

export const FIGMA_INFO_ROW: FigmaNodeRef = {
  fileKey: 'VWNiBRIUmVXIWYlLzMxcs6',
  fileName: 'Product-UI-Kit--variables-',
  nodeId: '3040-21176',
};

export const FIGMA_COPY: FigmaNodeRef = {
  fileKey: 'VWNiBRIUmVXIWYlLzMxcs6',
  fileName: 'Product-UI-Kit--variables-',
  nodeId: '2184:2737',
};

export const FIGMA_COPY_LINE: FigmaNodeRef = { ...FIGMA_COPY, nodeId: '2212:888' };

export const FIGMA_COPY_BUTTON: FigmaNodeRef = { ...FIGMA_COPY, nodeId: '2212:613' };

export const FIGMA_UIKIT_PRODUCT_SWITCH_ROW: FigmaNodeRef = {
  fileKey: 'VWNiBRIUmVXIWYlLzMxcs6',
  fileName: 'Product-UI-Kit--variables-',
  nodeId: '3019:5599',
};

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
