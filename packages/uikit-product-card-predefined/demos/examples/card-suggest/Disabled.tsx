import { CardSuggest } from '@ds/uikit-product-card-predefined';

export function Disabled() {
  return (
    <CardSuggest
      title='Подсказка для пользователя'
      description='Краткое описание действия или функциональности'
      disabled
    />
  );
}
