import { APPEARANCE, NotificationCard } from '@ds/uikit-product-notification';
import { useState } from 'react';

export function UnreadCard() {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const markRead = (id: string) => setReadIds(prev => (prev.has(id) ? prev : new Set(prev).add(id)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <NotificationCard
        id='quota-var-data'
        label='Storage'
        appearance={APPEARANCE.Warning}
        title='Лимит дисковой квоты'
        description='Использовано 92% квоты на /var/data — осталось 38 ГБ из 480 ГБ.'
        date='вчера · 19:04'
        unread={!readIds.has('quota-var-data')}
        onVisible={markRead}
      />
      <NotificationCard
        id='quota-var-log'
        label='Storage'
        appearance={APPEARANCE.Warning}
        title='Лимит дисковой квоты'
        description='Использовано 87% квоты на /var/log — осталось 62 ГБ из 480 ГБ.'
        date='вчера · 17:50'
        unread={!readIds.has('quota-var-log')}
        onVisible={markRead}
      />
    </div>
  );
}
