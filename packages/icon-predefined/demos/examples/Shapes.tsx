import { IconPredefined } from '@ds/icon-predefined';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function Shapes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <IconPredefined icon={PlaceholderSVG} shape='rounded' />
      <IconPredefined icon={PlaceholderSVG} shape='squared' />
      <IconPredefined icon={PlaceholderSVG} shape='rounded' background={false} />
    </div>
  );
}
