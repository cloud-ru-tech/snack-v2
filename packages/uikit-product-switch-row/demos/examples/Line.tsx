import { SWITCH_ROW_TYPES, SwitchRow } from '@ds/uikit-product-switch-row';

export function Line() {
  return (
    <SwitchRow
      type={SWITCH_ROW_TYPES.Line}
      title='Тёмная тема'
      description='Применяется ко всему интерфейсу'
      defaultChecked
    />
  );
}
