import { PlaceholderSVG } from '@ds/icons';
import { ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';

export function WithIcon() {
  return (
    <ToggleGroup defaultValue='cpu'>
      <ToggleCard value='cpu' emblem={{ icon: PlaceholderSVG }} title='CPU' description='4 vCPU, 8 ГБ RAM' />
      <ToggleCard value='gpu' emblem={{ icon: PlaceholderSVG }} title='GPU' description='1× A100, 80 ГБ' />
    </ToggleGroup>
  );
}
