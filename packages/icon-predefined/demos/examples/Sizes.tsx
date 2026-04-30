import { IconPredefined } from '@ds/icon-predefined';
import { PlaceholderSVG } from '@ds/icons';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <IconPredefined icon={PlaceholderSVG} size='m' />
      <IconPredefined icon={PlaceholderSVG} size='l' />
      <IconPredefined icon={PlaceholderSVG} size='5xl' />
    </div>
  );
}
