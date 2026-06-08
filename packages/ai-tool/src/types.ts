import { ValueOf } from '@ds/utils';

import {
  AI_TOOL_BADGE_TYPE,
  AI_TOOL_DETAILS_STATE,
  AI_TOOL_ICON_TYPE,
  AI_TOOL_KEY_VALUE_TYPE,
  AI_TOOL_OBJECT_TYPE,
  AI_TOOL_STATUS_STATE,
} from './constants';

export type AiToolIconType = ValueOf<typeof AI_TOOL_ICON_TYPE>;
export type AiToolStatusState = ValueOf<typeof AI_TOOL_STATUS_STATE>;
export type AiToolKeyValueType = ValueOf<typeof AI_TOOL_KEY_VALUE_TYPE>;
export type AiToolObjectType = ValueOf<typeof AI_TOOL_OBJECT_TYPE>;
export type AiToolBadgeType = ValueOf<typeof AI_TOOL_BADGE_TYPE>;
export type AiToolDetailsState = ValueOf<typeof AI_TOOL_DETAILS_STATE>;
