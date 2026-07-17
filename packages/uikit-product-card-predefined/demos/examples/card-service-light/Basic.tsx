import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';

export function Basic() {
  return <CardServiceLight title='Мой сервис' icon={<PlaceholderSVG size={24} />} />;
}
