import { APPEARANCE, NotificationCard } from '@ds/uikit-product-notification';
import { useState } from 'react';

export function DeployFailureCard() {
  const [status, setStatus] = useState<'failed' | 'retrying' | 'dismissed'>('failed');

  if (status === 'dismissed') {
    return null;
  }

  return (
    <NotificationCard
      id='deploy-9217'
      label='api-gateway · v2.18.3'
      appearance={APPEARANCE.Error}
      title='Деплой не прошёл health-check'
      description='Readiness probe вернул 503 на 4 из 6 подов. Traffic не переключён на новую версию.'
      date='5 минут назад'
      primaryButton={{
        label: status === 'retrying' ? 'Запускаю…' : 'Повторить деплой',
        loading: status === 'retrying',
        onClick: () => {
          setStatus('retrying');
          // Если карточку закрыли во время повтора, по таймеру не возвращаем её в `failed`.
          setTimeout(() => setStatus(prev => (prev === 'retrying' ? 'failed' : prev)), 1200);
        },
      }}
      secondaryButton={{
        label: 'Логи пода',
        onClick: () => window.open('/logs/api-gateway/2.18.3', '_blank'),
      }}
      actions={[
        { content: { option: 'Отметить прочитанным' }, onClick: () => setStatus('dismissed') },
        { content: { option: 'Заглушить на 1 час' }, onClick: () => setStatus('dismissed') },
        { content: { option: 'Удалить' }, onClick: () => setStatus('dismissed') },
      ]}
    />
  );
}
