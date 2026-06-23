import { ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';

export function Horizontal() {
  return (
    <ToggleGroup orientation='horizontal' gap='m' breakpoint={200} defaultValue='month'>
      <ToggleCard value='month' title='Помесячно' description='Гибкая оплата' />
      <ToggleCard value='year' title='Годовая' description='Скидка 20%' />
    </ToggleGroup>
  );
}
