import { AiChainOfThoughts } from '@ds/ai-chain-of-thoughts';
import { AI_TOOL_ICON_TYPE, AI_TOOL_STATUS_STATE, AiTool, AiToolSimple } from '@ds/ai-tool';

export function Default() {
  return (
    <AiChainOfThoughts inProgress duration={31568949} defaultOpen>
      <AiToolSimple name='status_for_users' icon={AI_TOOL_ICON_TYPE.Search} connector />
      <AiTool
        name='status_for_users'
        icon={AI_TOOL_ICON_TYPE.Search}
        state={AI_TOOL_STATUS_STATE.Success}
        duration={9}
        call='{ "user_ids": [1, 2, 3] }'
      />
    </AiChainOfThoughts>
  );
}
