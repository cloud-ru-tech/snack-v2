import { Button } from '@ds/button';
import { APPEARANCE, NotificationCard, NotificationPanel } from '@ds/uikit-product-notification';
import { useMemo, useState } from 'react';

type Filter = 'all' | 'unread' | 'mentions';

type CardId = 'inc-4821' | 'deploy-9217' | 'stack-quota' | 'mention-1' | 'backup-1729';

export function PanelFull() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [importantOnly, setImportantOnly] = useState(false);
  const [muted, setMuted] = useState(false);
  const [readIds, setReadIds] = useState<Set<CardId>>(new Set());

  const markRead = (id: string) =>
    setReadIds(prev => (prev.has(id as CardId) ? prev : new Set(prev).add(id as CardId)));

  const isUnread = (id: CardId) => !readIds.has(id);

  // Какие карточки попадают под текущий фильтр. `important` — критичные алерты (error/warning).
  const visible = useMemo(() => {
    const matches = (id: CardId, important: boolean, mention: boolean) => {
      if (filter === 'unread' && !isUnread(id)) return false;
      if (filter === 'mentions' && !mention) return false;
      if (importantOnly && !important) return false;
      return true;
    };

    return {
      inc: matches('inc-4821', true, false),
      deploy: matches('deploy-9217', true, false),
      quota: matches('stack-quota', true, false),
      mention: matches('mention-1', false, true),
      backup: matches('backup-1729', false, false),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, importantOnly, readIds]);

  const attentionVisible = visible.inc || visible.deploy;

  const panel = muted ? (
    <NotificationPanel
      open={open}
      onClose={() => setOpen(false)}
      title='Уведомления'
      settings={{
        button: { onClick: () => setMuted(false) },
        actions: [{ content: { label: 'Снять заглушение' }, onClick: () => setMuted(false) }],
      }}
      content={<NotificationPanel.Blank />}
    />
  ) : (
    <NotificationPanel
      open={open}
      onClose={() => setOpen(false)}
      title='Уведомления'
      segments={{
        items: [
          { value: 'all', label: 'Все' },
          { value: 'unread', label: 'Непрочитанные' },
          { value: 'mentions', label: 'Упоминания' },
        ],
        value: filter,
        onChange: value => setFilter(value as Filter),
      }}
      chipToggle={{
        label: 'Только важные',
        checked: importantOnly,
        onChange: setImportantOnly,
      }}
      settings={{
        button: {},
        actions: [
          { content: { label: 'Только непрочитанные' }, onClick: () => setFilter('unread') },
          { content: { label: 'Показать все' }, onClick: () => setFilter('all') },
          { content: { label: 'Заглушить на 1 час' }, onClick: () => setMuted(true) },
        ],
      }}
      readAllButton={{
        label: 'Прочитать всё',
        onClick: () => setReadIds(new Set(['inc-4821', 'deploy-9217', 'stack-quota', 'mention-1'])),
      }}
      content={
        <>
          {attentionVisible && (
            <NotificationPanel.Group title='Требуют внимания'>
              {visible.inc && (
                <NotificationCard
                  id='inc-4821'
                  label='INC-4821'
                  appearance={APPEARANCE.Error}
                  title='Кластер k8s-prod-1 деградирован'
                  description='3 из 5 нод недоступны последние 6 минут.'
                  date='03:14'
                  link={{ label: 'Открыть инцидент', href: '/incidents/INC-4821' }}
                  unread={isUnread('inc-4821')}
                  onVisible={markRead}
                />
              )}
              {visible.deploy && (
                <NotificationCard
                  id='deploy-9217'
                  label='api-gateway · v2.18.3'
                  appearance={APPEARANCE.Error}
                  title='Деплой не прошёл health-check'
                  description='Readiness probe вернул 503 на 4 из 6 подов.'
                  date='02:50'
                  primaryButton={{ label: 'Повторить', onClick: () => markRead('deploy-9217') }}
                  secondaryButton={{
                    label: 'Логи',
                    onClick: () => window.open('/logs/api-gateway/2.18.3', '_blank'),
                  }}
                  unread={isUnread('deploy-9217')}
                  onVisible={markRead}
                />
              )}
            </NotificationPanel.Group>
          )}

          {visible.quota && (
            <>
              <NotificationPanel.Stack
                title='Лимит дисковой квоты · 3 хоста'
                unread={isUnread('stack-quota')}
                actions={[
                  { content: { label: 'Прочитать все' }, onClick: () => markRead('stack-quota') },
                  { content: { label: 'Заглушить группу' }, onClick: () => setMuted(true) },
                ]}
                onOpenChanged={open => open && markRead('stack-quota')}
              >
                <NotificationCard
                  id='quota-prod-1'
                  label='Storage'
                  appearance={APPEARANCE.Warning}
                  title='prod-1 · /var/data'
                  description='Использовано 92% — осталось 38 ГБ из 480 ГБ.'
                  date='01:12'
                />
                <NotificationCard
                  id='quota-prod-2'
                  label='Storage'
                  appearance={APPEARANCE.Warning}
                  title='prod-2 · /var/log'
                  description='Использовано 87% — осталось 62 ГБ из 480 ГБ.'
                  date='00:48'
                />
                <NotificationCard
                  id='quota-stage-1'
                  label='Storage'
                  appearance={APPEARANCE.Warning}
                  title='stage-1 · /var/data'
                  description='Использовано 84% — осталось 76 ГБ из 480 ГБ.'
                  date='вчера · 23:50'
                />
              </NotificationPanel.Stack>
            </>
          )}

          {visible.mention && (
            <NotificationCard
              id='mention-1'
              label='@you · billing/PR-1402'
              appearance={APPEARANCE.Default}
              title='А. Иванов упомянул вас в PR'
              description='Пересмотрите расчёт grace-period в BillingScheduler.tsx:142'
              date='вчера · 18:20'
              link={{ label: 'Открыть PR', href: '/billing/pulls/1402' }}
              unread={isUnread('mention-1')}
              onVisible={markRead}
            />
          )}

          {visible.backup && (
            <>
              <NotificationCard
                id='backup-1729'
                label='Backup'
                appearance={APPEARANCE.Success}
                title='Резервная копия завершена'
                description='prod-1 (412 ГБ) → s3://backups-prod/2026-05-26/'
                date='вчера · 14:32'
              />
            </>
          )}
        </>
      }
    />
  );

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button label='Уведомления' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      {panel}
    </div>
  );
}
