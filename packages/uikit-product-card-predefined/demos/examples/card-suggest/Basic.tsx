import { CARD_SIZE, CardSuggest } from '@ds/uikit-product-card-predefined';

export function Basic() {
  return (
    <CardSuggest
      title='Подсказка для пользователя'
      description='Краткое описание действия или функциональности'
      size={CARD_SIZE.M}
    />
  );
}
