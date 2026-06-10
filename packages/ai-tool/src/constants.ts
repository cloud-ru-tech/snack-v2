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
  tool: 'ai-tool',
  toolStatus: 'ai-tool__status',
  toolConnector: 'ai-tool__connector',
  toolHeader: 'ai-tool__header',
  toolIcon: 'ai-tool__icon',
  toolName: 'ai-tool__name',
  toolDuration: 'ai-tool__duration',
  toolChevron: 'ai-tool__chevron',
  toolCall: 'ai-tool__call',
  toolResult: 'ai-tool__result',
  simple: 'ai-tool-simple',
  simpleIcon: 'ai-tool-simple__icon',
  simpleStatus: 'ai-tool-simple__status',
  simpleConnector: 'ai-tool-simple__connector',
  simpleHeader: 'ai-tool-simple__header',
  simpleName: 'ai-tool-simple__name',
  simpleChevron: 'ai-tool-simple__chevron',
  simpleDescription: 'ai-tool-simple__description',
  simpleContent: 'ai-tool-simple__content',
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
