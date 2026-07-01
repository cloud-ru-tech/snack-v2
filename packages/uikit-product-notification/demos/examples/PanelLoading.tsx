import { NotificationPanelContent } from '@ds/uikit-product-notification';

export function PanelLoading() {
  return (
    <NotificationPanelContent
      title='Уведомления'
      loading
      skeletonsAmount={4}
      segments={{
        items: [
          { value: 'all', label: 'Все' },
          { value: 'unread', label: 'Непрочитанные' },
          { value: 'mentions', label: 'Упоминания' },
        ],
        value: 'all',
        onChange: () => {},
      }}
      readAllButton={{ label: 'Прочитать всё', onClick: () => {} }}
    />
  );
}
