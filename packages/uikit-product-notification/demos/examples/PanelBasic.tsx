import { APPEARANCE, NotificationCard, NotificationPanel } from '@ds/uikit-product-notification';
import { useState } from 'react';

export function PanelBasic() {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const markRead = (id: string) => setReadIds(prev => (prev.has(id) ? prev : new Set(prev).add(id)));

  return (
    <NotificationPanel
      title='Уведомления'
      readAllButton={{
        label: 'Прочитать всё',
        onClick: () => setReadIds(new Set(['inc-4821', 'quota-var-data', 'deploy-9217', 'backup-1729'])),
      }}
      content={
        <>
          <NotificationCard
            id='inc-4821'
            label='INC-4821'
            appearance={APPEARANCE.Error}
            title='Кластер k8s-prod-1 деградирован'
            content='3 из 5 нод недоступны последние 6 минут.'
            date='03:14'
            link={{ text: 'Открыть инцидент', href: '/incidents/INC-4821' }}
            unread={!readIds.has('inc-4821')}
            onVisible={markRead}
          />
          <NotificationCard
            id='quota-var-data'
            label='Storage'
            appearance={APPEARANCE.Warning}
            title='Лимит дисковой квоты'
            content='Использовано 92% /var/data — осталось 38 ГБ из 480 ГБ.'
            date='02:50'
            unread={!readIds.has('quota-var-data')}
            onVisible={markRead}
          />
          <NotificationCard
            id='deploy-9217'
            label='api-gateway · v2.18.3'
            appearance={APPEARANCE.Error}
            title='Деплой не прошёл health-check'
            content='Readiness probe вернул 503 на 4 из 6 подов.'
            date='вчера · 23:11'
            unread={!readIds.has('deploy-9217')}
            onVisible={markRead}
          />
          <NotificationCard
            id='backup-1729'
            label='Backup'
            appearance={APPEARANCE.Success}
            title='Резервная копия завершена'
            content='Бэкап БД prod-1 (412 ГБ) загружен в s3://backups-prod/.'
            date='вчера · 14:32'
          />
        </>
      }
    />
  );
}
