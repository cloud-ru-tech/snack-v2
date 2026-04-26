import { Alert } from '@ds/alert';

export function WithActions() {
  return (
    <Alert
      appearance='warning'
      title='Требуется подтверждение'
      description='Операция необратима. Продолжить?'
      actions={{
        primary: { label: 'Продолжить', onClick: () => undefined },
        secondary: { label: 'Отмена', onClick: () => undefined },
      }}
    />
  );
}
