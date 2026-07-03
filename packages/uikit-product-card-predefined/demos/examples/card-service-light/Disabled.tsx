import { PlaceholderSVG } from '@ds/icons';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';

export function Disabled() {
  return <CardServiceLight title='Мой сервис' icon={<PlaceholderSVG size={24} />} disabled />;
}
