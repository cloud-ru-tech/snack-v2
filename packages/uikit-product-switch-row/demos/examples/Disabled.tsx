import { SwitchRow } from '@ds/uikit-product-switch-row';

export function Disabled() {
  return (
    <SwitchRow
      title='Push-уведомления'
      description='Доступно после подтверждения email'
      disabled
      disabledToggleTip='Подтвердите email, чтобы включить'
    />
  );
}
