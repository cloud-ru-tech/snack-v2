import { AI_TOOL_STATUS_STATE, AiToolStatus } from '@ds/ai-tool';

export function StatusRow() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiToolStatus state={AI_TOOL_STATUS_STATE.Pending} />
      <AiToolStatus state={AI_TOOL_STATUS_STATE.Loading} />
      <AiToolStatus state={AI_TOOL_STATUS_STATE.Success} />
      <AiToolStatus state={AI_TOOL_STATUS_STATE.Error} />
    </div>
  );
}
