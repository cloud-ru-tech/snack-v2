import { PlaceholderSVG } from '@ds/icons';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';

export function PolymorphicLink() {
  return (
    <CardServiceLight
      as='a'
      href='https://cloud.ru'
      target='_blank'
      title='Ссылка-сервис'
      icon={<PlaceholderSVG size={24} />}
    />
  );
}
