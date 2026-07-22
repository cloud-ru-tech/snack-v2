import { APPEARANCE, NotificationCard } from '@ds/uikit-product-notification';

export function IncidentCard() {
  return (
    <NotificationCard
      id='inc-4821'
      label='INC-4821'
      appearance={APPEARANCE.Error}
      title='Кластер k8s-prod-1 деградирован'
      description='3 из 5 нод недоступны последние 6 минут. Pod scheduling приостановлен.'
      date='сегодня · 03:14'
      link={{ label: 'Открыть инцидент', href: '/incidents/INC-4821' }}
      unread
    />
  );
}
