import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceInfo } from '@ds/uikit-product-card-predefined';

export function Basic() {
  return (
    <CardServiceInfo
      title='Мой сервис'
      description='Краткое описание сервиса для подробного режима карточки.'
      icon={<PlaceholderSVG size={24} />}
    />
  );
}
