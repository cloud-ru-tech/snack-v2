// Figma variant: Attachment Type=Image|File
export const ATTACHMENT_TYPE = {
  Image: 'image',
  File: 'file',
} as const;

// Figma variant: Attachment State=Default|Loading|Error
export const ATTACHMENT_STATE = {
  Default: 'default',
  Loading: 'loading',
  Error: 'error',
} as const;

export const TEST_IDS = {
  root: 'ai-attachment',
  remove: 'ai-attachment__remove',
  retry: 'ai-attachment__retry',
  loader: 'ai-attachment__loader',
} as const;
