import { CardBanner } from '@ds/uikit-product-card-predefined';

import illustration from '../assets/card-banner-illustration.jpg';

export function Basic() {
  return (
    <CardBanner
      title='Заголовок карточки'
      content='Краткое описание сервиса или предложения для пользователя'
      actionLabel='Подробнее'
      image={{ src: illustration.src, alt: 'Иллюстрация сервиса' }}
    />
  );
}
