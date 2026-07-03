import { PlaceholderSVG } from '@ds/icons';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';

export function Basic() {
  return <CardServiceLight title='Мой сервис' icon={<PlaceholderSVG size={24} />} />;
}
