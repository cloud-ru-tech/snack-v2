import { PlaceholderSVG } from '@ds/icons';
import { ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';

export function WithPromoBadge() {
  return (
    <ToggleGroup defaultValue='pro'>
      <ToggleCard value='basic' emblem={{ icon: PlaceholderSVG }} title='Basic' description='Для старта' />
      <ToggleCard
        value='pro'
        emblem={{ icon: PlaceholderSVG }}
        title='Pro'
        description='Популярный тариф'
        promoBadge='−20%'
      />
      <ToggleCard
        value='enterprise'
        emblem={{ icon: PlaceholderSVG }}
        title='Enterprise'
        description='Для команд'
        promoBadge={{ text: 'New', appearance: 'blue' }}
      />
    </ToggleGroup>
  );
}
