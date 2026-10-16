import { AiCodeDiff, SIZE } from '@ds/ai-code-diff';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiCodeDiff added={83} removed={26} size={SIZE.M} />
      <AiCodeDiff added={83} removed={26} size={SIZE.S} />
    </div>
  );
}
