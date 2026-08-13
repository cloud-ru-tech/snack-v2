import { CardBanner } from '@ds/uikit-product-card-predefined';

import illustrationSrc from '../assets/card-banner-illustration.jpg?url';

export function PolymorphicLink() {
  return (
    <CardBanner
      as='a'
      href='https://cloud.ru'
      target='_blank'
      title='Перейти на сайт'
      content='Откроется в новой вкладке'
      actionLabel='Подробнее'
      image={{ src: illustrationSrc, alt: 'Иллюстрация сервиса' }}
    />
  );
}
