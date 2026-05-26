import { LoadStatus } from '@ds/uikit-product-load-status';

export function WithPercent() {
  return <LoadStatus label='Загрузка' progress={72} valueType='percent' />;
}
