import { Alert } from '@ds/alert';

export function Collapsible() {
  return (
    <Alert
      appearance='info'
      collapsible
      title='Совет по настройке'
      description='Полное описание того, как правильно настроить функцию. Текст длинный и сворачивается до раскрытия.'
    />
  );
}
