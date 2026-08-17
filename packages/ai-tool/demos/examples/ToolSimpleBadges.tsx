import { AI_TOOL_BADGE_TYPE, AI_TOOL_ICON_TYPE, AI_TOOL_STATUS_STATE, AiToolBadge, AiToolSimple } from '@ds/ai-tool';

export function ToolSimpleBadges() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <AiToolSimple
        name='search_documents'
        icon={AI_TOOL_ICON_TYPE.Search}
        connector
        description='Ищет документы по запросу пользователя.'
      >
        <AiToolBadge badgeType={AI_TOOL_BADGE_TYPE.CloudRu} label='docs-service' />
        <AiToolBadge badgeType={AI_TOOL_BADGE_TYPE.Other} label='search-index' />
      </AiToolSimple>
      <AiToolSimple
        name='status_for_users'
        icon={AI_TOOL_ICON_TYPE.Act}
        state={AI_TOOL_STATUS_STATE.Loading}
        defaultOpen
        description='Запрашивает статусы пользователей и агрегирует результат.'
      >
        <AiToolBadge badgeType={AI_TOOL_BADGE_TYPE.CloudRu} label='users-service' />
        <AiToolBadge badgeType={AI_TOOL_BADGE_TYPE.Other} label='audit-log' />
      </AiToolSimple>
    </div>
  );
}
