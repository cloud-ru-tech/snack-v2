import { IconPredefined } from '@ds/icon-predefined';
import { PlaceholderSVG } from '@ds/icons';

export function Shapes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <IconPredefined icon={PlaceholderSVG} shape='round' />
      <IconPredefined icon={PlaceholderSVG} shape='square' />
      <IconPredefined icon={PlaceholderSVG} shape='round' decor={false} />
    </div>
  );
}
