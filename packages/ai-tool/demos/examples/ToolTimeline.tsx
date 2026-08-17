import { AI_TOOL_ICON_TYPE, AI_TOOL_STATUS_STATE, AiTool, AiToolKeyValue, AiToolText } from '@ds/ai-tool';

export function ToolTimeline() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 364 }}>
      <AiTool
        name='search_documents'
        icon={AI_TOOL_ICON_TYPE.Search}
        state={AI_TOOL_STATUS_STATE.Success}
        duration={3}
        connector
        call={<AiToolText mono>{'{ "query": "instance status" }'}</AiToolText>}
        result={
          <>
            <AiToolKeyValue label='found' value='12' />
            <AiToolKeyValue label='top_score' value='0.92' />
          </>
        }
      />
      <AiTool
        name='status_for_users'
        icon={AI_TOOL_ICON_TYPE.Act}
        state={AI_TOOL_STATUS_STATE.Loading}
        duration={9}
        defaultOpen
        call={<AiToolText mono>{'{ "user_id": 42 }'}</AiToolText>}
      />
    </div>
  );
}
