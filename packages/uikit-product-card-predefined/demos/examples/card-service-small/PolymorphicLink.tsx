import { PlaceholderSVG } from '@ds/icons';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';

export function PolymorphicLink() {
  return (
    <CardServiceSmall
      as='a'
      href='https://cloud.ru'
      target='_blank'
      title='Ссылка-сервис'
      emblem={{ icon: PlaceholderSVG }}
    />
  );
}
