import { ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';

export function Basic() {
  return (
    <ToggleGroup defaultValue='pro'>
      <ToggleCard value='start' title='Тариф Start' description='10 ГБ хранилища' />
      <ToggleCard value='pro' title='Тариф Pro' description='100 ГБ хранилища, приоритетная поддержка' />
      <ToggleCard value='enterprise' title='Тариф Enterprise' description='Безлимит и выделенный менеджер' />
    </ToggleGroup>
  );
}
