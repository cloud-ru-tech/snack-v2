import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';

export function Disabled() {
  return <CardServiceLight title='Мой сервис' icon={<PlaceholderSVG size={24} />} disabled />;
}
