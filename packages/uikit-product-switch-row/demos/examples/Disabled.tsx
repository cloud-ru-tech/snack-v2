import { PortalContextProvider } from '@ds/portal-context';
import { SwitchRow } from '@ds/uikit-product-switch-row';

export function Disabled() {
  return (
    <PortalContextProvider>
      <SwitchRow
        title='Push-уведомления'
        description='Доступно после подтверждения email'
        disabled
        disabledToggleTip='Подтвердите email, чтобы включить'
      />
    </PortalContextProvider>
  );
}
