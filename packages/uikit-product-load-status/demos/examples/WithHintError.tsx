import { LoadStatus } from '@ds/uikit-product-load-status';

export function WithHintError() {
  return (
    <LoadStatus
      label='Загрузка'
      value='Ошибка'
      progress={35}
      valueType='percent'
      hint='Не удалось завершить операцию'
      showError
      showErrorIcon
    />
  );
}
