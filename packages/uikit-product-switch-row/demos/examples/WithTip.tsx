import { SwitchRow } from '@ds/uikit-product-switch-row';

export function WithTip() {
  return (
    <SwitchRow
      title='Двухфакторная аутентификация'
      description='Подтверждение входа кодом из приложения'
      tip='Защищает аккаунт, даже если кто-то узнает пароль'
      defaultChecked
    />
  );
}
