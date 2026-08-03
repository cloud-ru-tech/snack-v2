import { Block } from '@ds/block';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';

export function Transparent() {
  return (
    <Block backgroundPredefined={BACKGROUND_PREDEFINED_FILL.DecorTransparent} size='m'>
      <span>Transparent</span>
    </Block>
  );
}
