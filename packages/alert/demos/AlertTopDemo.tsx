import { AlertTop } from '@ds/alert';

export function AlertTopDemo() {
  return (
    <AlertTop
      appearance='info'
      title='Системное уведомление'
      description='Плановые работы пройдут сегодня с 22:00 до 23:00 по московскому времени.'
    />
  );
}
