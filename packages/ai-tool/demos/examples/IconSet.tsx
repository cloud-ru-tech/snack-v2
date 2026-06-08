import { AI_TOOL_ICON_TYPE, AiToolIcon } from '@ds/ai-tool';

export function IconSet() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {Object.values(AI_TOOL_ICON_TYPE).map(variant => (
        <AiToolIcon key={variant} variant={variant} />
      ))}
    </div>
  );
}
