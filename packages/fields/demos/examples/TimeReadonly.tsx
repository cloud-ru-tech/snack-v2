import { FieldTime } from '@ds/fields';

export function TimeReadonly() {
  return <FieldTime label='Время выполнения' readonly defaultValue={{ hours: 23, minutes: 59, seconds: 59 }} />;
}
