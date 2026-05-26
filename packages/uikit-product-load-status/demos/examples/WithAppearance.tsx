import { APPEARANCE } from '@ds/progress-bar';
import { LoadStatus, PROGRESS_LIMIT_CONDITION } from '@ds/uikit-product-load-status';

export function WithAppearance() {
  return (
    <LoadStatus
      label='Загрузка'
      progress={65}
      valueType='percent'
      hint='Статичный цвет полосы'
      appearanceByProgress={[{ condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 100, appearance: APPEARANCE.Green }]}
    />
  );
}
