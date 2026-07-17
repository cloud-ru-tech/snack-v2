import { IconPredefined } from '@ds/icon-predefined';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function Appearances() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <IconPredefined icon={PlaceholderSVG} appearance='primary' />
      <IconPredefined icon={PlaceholderSVG} appearance='neutral' />
      <IconPredefined icon={PlaceholderSVG} appearance='red' />
      <IconPredefined icon={PlaceholderSVG} appearance='green' />
      <IconPredefined icon={PlaceholderSVG} appearance='blue' />
      <IconPredefined icon={PlaceholderSVG} appearance='violet' />
    </div>
  );
}
