import { FieldTextArea } from '@ds/fields';

export function TextAreaUncontrolled() {
  return (
    <FieldTextArea
      label='Заметка'
      hint='Uncontrolled: начальное значение через defaultValue'
      defaultValue={'Первая строка\nВторая строка'}
      minRows={3}
      maxRows={8}
    />
  );
}
