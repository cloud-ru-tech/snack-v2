import { AI_TOOL_ICON_TYPE, AI_TOOL_STATUS_STATE, AiTool, AiToolSimple } from '@ds/ai-tool';

export const CHAIN_DURATION = 31568949;

/**
 * Контент-цепочка по умолчанию: две компактные строки `AiToolSimple` и две
 * полные `AiTool` с длительностью — повторяет дефолтный контент Figma-макета
 * Chain Of Thoughts.
 */
export const chainContentPreset = (
  <>
    <AiToolSimple name='status_for_users' icon={AI_TOOL_ICON_TYPE.Search} connector />
    <AiToolSimple name='status_for_users' icon={AI_TOOL_ICON_TYPE.Search} connector />
    <AiTool
      name='status_for_users'
      icon={AI_TOOL_ICON_TYPE.Search}
      state={AI_TOOL_STATUS_STATE.Success}
      duration={CHAIN_DURATION}
      connector
      call='{ "user_ids": [1, 2, 3] }'
    />
    <AiTool
      name='status_for_users'
      icon={AI_TOOL_ICON_TYPE.Search}
      state={AI_TOOL_STATUS_STATE.Success}
      duration={CHAIN_DURATION}
      call='{ "user_ids": [4, 5, 6] }'
    />
  </>
);
