import { FieldColor } from '@ds/fields';

export function ColorReadonly() {
  // readonly блокирует ввод — onChange не нужен, значение показывается из defaultValue.
  return <FieldColor label='Цвет токена' readonly defaultValue='#7e57c2' showCopyButton />;
}
