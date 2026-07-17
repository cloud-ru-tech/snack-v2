import { Alert } from '@ds/alert';

export function Info() {
  return (
    <Alert appearance='info' title='Настройки сохранены' content='Изменения применены ко всем активным проектам.' />
  );
}
