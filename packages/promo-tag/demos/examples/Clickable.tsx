import { PromoTag } from '@ds/promo-tag';
import { useState } from 'react';

export function Clickable() {
  const [clicked, setClicked] = useState(false);

  return <PromoTag label={clicked ? 'Нажато' : 'Кликабельный'} appearance='blue' onClick={() => setClicked(true)} />;
}
