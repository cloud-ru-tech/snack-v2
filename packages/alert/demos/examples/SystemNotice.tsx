import { AlertTop } from '@ds/alert';

export function SystemNotice() {
  return (
    <AlertTop
      appearance='info'
      title='Плановые работы'
      description='Сегодня с 22:00 до 23:00 возможны кратковременные перебои.'
    />
  );
}
