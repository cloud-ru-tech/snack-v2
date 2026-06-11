import { CrossSVG } from '@ds/icons';
import { NotificationPanel } from '@ds/uikit-product-notification';

export function PanelError() {
  return (
    <NotificationPanel
      title='Уведомления'
      content={
        <NotificationPanel.Blank
          icon={{ icon: CrossSVG, appearance: 'neutral' }}
          title='Сервис временно недоступен'
          description='Восстановление уже идёт. Обновите страницу через минуту.'
        />
      }
    />
  );
}
