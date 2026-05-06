import { SwitchRow } from '@ds/uikit-product-switch-row';

export function Loading() {
  return <SwitchRow title='Синхронизация данных' description='Применяем изменение на сервере' defaultChecked loading />;
}
