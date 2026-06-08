import { AI_TOOL_BADGE_TYPE, AiToolBadge } from '@ds/ai-tool';

export function Badges() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiToolBadge badgeType={AI_TOOL_BADGE_TYPE.CloudRu} label='my-vm-instance' />
      <AiToolBadge badgeType={AI_TOOL_BADGE_TYPE.Other} label='external-resource' />
      <AiToolBadge as='a' href='#' badgeType={AI_TOOL_BADGE_TYPE.CloudRu} label='link-resource' />
    </div>
  );
}
