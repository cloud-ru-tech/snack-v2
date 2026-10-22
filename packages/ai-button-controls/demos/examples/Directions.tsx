import { AiButtonControls, DIRECTION } from '@ds/ai-button-controls';

export function Directions() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiButtonControls direction={DIRECTION.Left} />
      <AiButtonControls direction={DIRECTION.Right} />
      <AiButtonControls direction={DIRECTION.Down} />
    </div>
  );
}
