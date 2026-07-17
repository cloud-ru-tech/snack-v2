import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';

export function Disabled() {
  return <CardServiceSmall title='Название сервиса' emblem={{ icon: PlaceholderSVG }} disabled />;
}
