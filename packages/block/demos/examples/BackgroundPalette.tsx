import { Block } from '@ds/block';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';

const FILLS = [
  BACKGROUND_PREDEFINED_FILL.PrimaryBackground,
  BACKGROUND_PREDEFINED_FILL.GreenBackground,
  BACKGROUND_PREDEFINED_FILL.YellowBackground,
  BACKGROUND_PREDEFINED_FILL.RedBackground,
  BACKGROUND_PREDEFINED_FILL.VioletBackground,
] as const;

export function BackgroundPalette() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {FILLS.map(fill => (
        <Block key={fill} backgroundPredefined={fill} size='m'>
          <span>{fill}</span>
        </Block>
      ))}
    </div>
  );
}
