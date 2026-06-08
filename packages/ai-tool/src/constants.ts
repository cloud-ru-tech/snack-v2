export const AI_TOOL_ICON_TYPE = {
  Reasoning: 'reasoning',
  Search: 'search',
  Read: 'read',
  Act: 'act',
  Security: 'security',
  Wait: 'wait',
} as const;

export const AI_TOOL_STATUS_STATE = {
  Success: 'success',
  Error: 'error',
  Loading: 'loading',
  Pending: 'pending',
} as const;

export const AI_TOOL_KEY_VALUE_TYPE = {
  Line: 'line',
  Column: 'column',
} as const;

export const AI_TOOL_OBJECT_TYPE = {
  Complex: 'complex',
  String: 'string',
} as const;

export const AI_TOOL_BADGE_TYPE = {
  CloudRu: 'cloud-ru',
  Other: 'other',
} as const;

export const AI_TOOL_DETAILS_STATE = {
  Default: 'default',
  Error: 'error',
} as const;

export const TEST_IDS = {
  icon: 'ai-tool-icon',
  status: 'ai-tool-status',
  text: 'ai-tool-text',
  keyValue: 'ai-tool-key-value',
  object: 'ai-tool-object',
  objectToggle: 'ai-tool-object__toggle',
  array: 'ai-tool-array',
  arrayToggle: 'ai-tool-array__toggle',
  badge: 'ai-tool-badge',
  badgeIcon: 'ai-tool-badge__icon',
  details: 'ai-tool-details',
  detailsLabel: 'ai-tool-details-label',
  detailsLabelSecret: 'ai-tool-details-label__secret',
} as const;
