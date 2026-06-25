import { FieldDate } from '@ds/fields';

export function DateReadonly() {
  return <FieldDate label='Дата создания' readonly defaultValue={new Date(2026, 4, 17)} />;
}
