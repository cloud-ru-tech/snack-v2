import { CardBanner } from '@ds/uikit-product-card-predefined';

import illustration from '../assets/card-banner-illustration.jpg';

export function PolymorphicLink() {
  return (
    <CardBanner
      as='a'
      href='https://cloud.ru'
      target='_blank'
      title='Перейти на сайт'
      description='Откроется в новой вкладке'
      actionLabel='Подробнее'
      image={{ src: illustration.src, alt: 'Иллюстрация сервиса' }}
    />
  );
}
