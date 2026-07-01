import { APPEARANCE, NotificationCard } from '@ds/uikit-product-notification';
import { ReactNode } from 'react';

export const SAMPLE_CARDS: ReactNode = (
  <>
    <NotificationCard
      id='p1'
      title='Резервная копия завершена'
      content='Бэкап успешно загружен в холодное хранилище'
      date='сегодня · 14:32'
      appearance={APPEARANCE.Success}
      unread
    />
    <NotificationCard
      id='p2'
      title='Лимит дисковой квоты'
      content='Использовано 92% /var/data'
      date='вчера · 19:04'
      appearance={APPEARANCE.Warning}
    />
    <NotificationCard
      id='p3'
      title='Ошибка отправки метрик'
      content='Сборщик метрик недоступен'
      date='вчера · 17:11'
      appearance={APPEARANCE.Error}
    />
  </>
);
