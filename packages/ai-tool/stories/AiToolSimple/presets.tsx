import { AI_TOOL_BADGE_TYPE, AiToolBadge } from '@ds/ai-tool';

import { TOOL_NAME } from '../AiTool/presets';

export const SIMPLE_NAME = TOOL_NAME;
export const SIMPLE_DESCRIPTION = 'Запрашивает статусы пользователей и агрегирует результат по сервисам.';

export const badgesPreset = (
  <>
    <AiToolBadge badgeType={AI_TOOL_BADGE_TYPE.CloudRu} label='users-service' />
    <AiToolBadge badgeType={AI_TOOL_BADGE_TYPE.CloudRu} label='auth-service' />
    <AiToolBadge badgeType={AI_TOOL_BADGE_TYPE.Other} label='audit-log' />
    <AiToolBadge badgeType={AI_TOOL_BADGE_TYPE.Other} label='billing' />
  </>
);
