import { CrossSVG } from '@ds/icons/interface/system';
import { NotificationPanelContent } from '@ds/uikit-product-notification';

export function PanelError() {
  return (
    <NotificationPanelContent
      title='Уведомления'
      content={
        <NotificationPanelContent.Blank
          icon={{ icon: CrossSVG, appearance: 'neutral' }}
          title='Сервис временно недоступен'
          description='Восстановление уже идёт. Обновите страницу через минуту.'
        />
      }
    />
  );
}
