import { Alert } from '@ds/alert';

export function Error() {
  return (
    <Alert
      appearance='error'
      title='Не удалось сохранить'
      content='Проверьте подключение к сети и повторите попытку.'
      onClose={() => undefined}
    />
  );
}
