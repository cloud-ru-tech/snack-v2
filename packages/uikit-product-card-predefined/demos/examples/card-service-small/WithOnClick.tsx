import { PlaceholderSVG } from '@ds/icons';
import { Typography } from '@ds/typography';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

export function WithOnClick() {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CardServiceSmall
        title='Название сервиса'
        emblem={{ icon: PlaceholderSVG }}
        onClick={() => setClicks(c => c + 1)}
      />

      <Typography variant='body' size='m'>
        Кликов по карточке: {clicks}
      </Typography>
    </div>
  );
}
