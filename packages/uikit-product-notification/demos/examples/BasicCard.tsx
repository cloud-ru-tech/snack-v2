import { APPEARANCE, NotificationCard } from '@ds/uikit-product-notification';

export function BasicCard() {
  return (
    <NotificationCard
      id='backup-1729'
      label='Backup'
      appearance={APPEARANCE.Success}
      title='Резервная копия завершена'
      description='Бэкап БД prod-1 (412 ГБ) загружен в холодное хранилище s3://backups-prod/2026-05-27/'
      date='сегодня · 14:32'
    />
  );
}
