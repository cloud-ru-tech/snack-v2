import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceInfo } from '@ds/uikit-product-card-predefined';

export function Disabled() {
  return (
    <CardServiceInfo
      title='Мой сервис'
      description='Краткое описание сервиса для подробного режима карточки.'
      icon={<PlaceholderSVG size={24} />}
      disabled
    />
  );
}
