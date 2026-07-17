import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';

export function WithChecked() {
  return <CardServiceSmall title='Название сервиса' emblem={{ icon: PlaceholderSVG }} checked />;
}
