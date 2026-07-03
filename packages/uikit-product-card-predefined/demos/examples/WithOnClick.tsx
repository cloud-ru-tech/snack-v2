import { Typography } from '@ds/typography';
import { CardBanner } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

import illustration from '../assets/card-banner-illustration.jpg';

export function WithOnClick() {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CardBanner
        title='Заголовок карточки'
        description='Клик по карточке обрабатывается через onClick'
        actionLabel='Подробнее'
        image={{ src: illustration.src, alt: 'Иллюстрация сервиса' }}
        onClick={() => setClicks(c => c + 1)}
      />

      <Typography variant='body' size='m'>
        Кликов по карточке: {clicks}
      </Typography>
    </div>
  );
}
