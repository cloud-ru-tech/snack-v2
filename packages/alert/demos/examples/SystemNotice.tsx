import { AlertTop } from '@ds/alert';

export function SystemNotice() {
  return (
    <AlertTop
      appearance='info'
      title='Плановые работы'
      content='Сегодня с 22:00 до 23:00 возможны кратковременные перебои.'
    />
  );
}
