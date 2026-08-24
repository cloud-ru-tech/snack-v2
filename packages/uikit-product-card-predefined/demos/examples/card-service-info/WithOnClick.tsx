import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Typography } from '@ds/typography';
import { CardServiceInfo } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

export function WithOnClick() {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CardServiceInfo
        title='Мой сервис'
        description='Краткое описание сервиса для подробного режима карточки.'
        icon={<PlaceholderSVG size={24} />}
        onClick={() => setClicks(c => c + 1)}
      />

      <Typography variant='body' size='m'>
        Кликов по карточке: {clicks}
      </Typography>
    </div>
  );
}
