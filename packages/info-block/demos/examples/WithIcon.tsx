import { PlaceholderSVG } from '@ds/icons/interface/system';
import { InfoBlock } from '@ds/info-block';

export function WithIcon() {
  return (
    <InfoBlock
      title='С иконкой'
      content='Иконка передаётся через проп icon как IconPredefinedProps.'
      icon={{ icon: PlaceholderSVG, appearance: 'primary', decor: true }}
    />
  );
}
