import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceInfo } from '@ds/uikit-product-card-predefined';

export function PolymorphicLink() {
  return (
    <CardServiceInfo
      as='a'
      href='https://cloud.ru'
      target='_blank'
      title='Ссылка-сервис'
      description='Карточка рендерится как якорь через as и href.'
      icon={<PlaceholderSVG size={24} />}
    />
  );
}
