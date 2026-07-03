import { PlaceholderSVG } from '@ds/icons';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';

export function WithOutline() {
  return <CardServiceSmall title='Название сервиса' emblem={{ icon: PlaceholderSVG }} outline />;
}
