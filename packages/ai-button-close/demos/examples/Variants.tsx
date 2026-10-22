import { AiButtonClose, SIZE } from '@ds/ai-button-close';

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiButtonClose size={SIZE.Xs} outline />
      <AiButtonClose size={SIZE.S} outline />
      <AiButtonClose size={SIZE.S} />
      <AiButtonClose size={SIZE.M} />
    </div>
  );
}
