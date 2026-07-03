import { CardSuggest } from '@ds/uikit-product-card-predefined';

export function PolymorphicLink() {
  return (
    <CardSuggest
      as='a'
      href='https://cloud.ru'
      target='_blank'
      title='Подсказка-ссылка'
      description='Это якорный элемент'
    />
  );
}
