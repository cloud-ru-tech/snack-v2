import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';

export function WithPromoTag() {
  return <CardServiceLight title='Мой сервис' icon={<PlaceholderSVG size={24} />} promoTag={{ variant: 'preview' }} />;
}
