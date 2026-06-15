import { FieldTextArea } from '@ds/fields';

export function TextAreaReadonly() {
  return (
    <FieldTextArea
      label='Сгенерированный конфиг'
      readonly
      value={'server:\n  host: 0.0.0.0\n  port: 8080'}
      minRows={3}
      maxRows={8}
    />
  );
}
