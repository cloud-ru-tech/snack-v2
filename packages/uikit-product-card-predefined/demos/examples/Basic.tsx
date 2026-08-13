import { CardBanner } from '@ds/uikit-product-card-predefined';

import illustrationSrc from '../assets/card-banner-illustration.jpg?url';

export function Basic() {
  return (
    <CardBanner
      title='Заголовок карточки'
      content='Краткое описание сервиса или предложения для пользователя'
      actionLabel='Подробнее'
      image={{ src: illustrationSrc, alt: 'Иллюстрация сервиса' }}
    />
  );
}
