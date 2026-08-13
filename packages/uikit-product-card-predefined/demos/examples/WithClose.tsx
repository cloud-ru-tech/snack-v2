import { Typography } from '@ds/typography';
import { CardBanner } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

import illustrationSrc from '../assets/card-banner-illustration.jpg?url';

export function WithClose() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <Typography variant='body' size='m'>
        Баннер закрыт
      </Typography>
    );
  }

  return (
    <CardBanner
      title='Заголовок карточки'
      content='Кнопка закрытия появляется при передаче onClose'
      actionLabel='Подробнее'
      image={{ src: illustrationSrc, alt: 'Иллюстрация сервиса' }}
      onClose={() => setVisible(false)}
    />
  );
}
