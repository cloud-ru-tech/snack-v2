import { Button } from '@ds/button';
import {
  APPEARANCE,
  NotificationCard,
  NotificationPanel,
  NotificationPanelContent,
} from '@ds/uikit-product-notification';
import { useMemo, useState } from 'react';

export function PanelScenario() {
  const [open, setOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const unreadCount = useMemo(() => ['inc-4821', 'deploy-9217'].filter(id => !readIds.has(id)).length, [readIds]);

  const markRead = (id: string) => setReadIds(prev => (prev.has(id) ? prev : new Set(prev).add(id)));

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '12px 16px',
        minHeight: 56,
      }}
    >
      <Button
        label={unreadCount > 0 ? `Уведомления · ${unreadCount}` : 'Уведомления'}
        view='outline'
        appearance='neutral'
        onClick={() => setOpen(true)}
      />
      <NotificationPanel
        open={open}
        onClose={() => setOpen(false)}
        content={
          <NotificationPanelContent
            title='Уведомления'
            readAllButton={{
              label: 'Прочитать всё',
              onClick: () => setReadIds(new Set(['inc-4821', 'deploy-9217'])),
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
                  id='deploy-9217'
                  label='api-gateway · v2.18.3'
                  appearance={APPEARANCE.Error}
                  title='Деплой не прошёл health-check'
                  content='Readiness probe вернул 503 на 4 из 6 подов.'
                  date='02:50'
                  primaryButton={{ label: 'Повторить', onClick: () => markRead('deploy-9217') }}
                  secondaryButton={{
                    label: 'Логи',
                    onClick: () => window.open('/logs/api-gateway/2.18.3', '_blank'),
                  }}
                  unread={!readIds.has('deploy-9217')}
                  onVisible={markRead}
                />
                <NotificationCard
                  id='backup-1729'
                  label='Backup'
                  appearance={APPEARANCE.Success}
                  title='Резервная копия завершена'
                  content='prod-1 (412 ГБ) → s3://backups-prod/2026-05-26/'
                  date='вчера · 14:32'
                />
              </>
            }
          />
        }
      />
    </div>
  );
}
