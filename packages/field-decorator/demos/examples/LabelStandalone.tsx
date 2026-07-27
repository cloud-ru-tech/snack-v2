import { Label } from '@ds/field-decorator';

export function LabelStandalone() {
  return (
    <Label
      label='Заголовок поля'
      caption='Опционально'
      required
      labelTooltip={{ tip: 'Пояснение к заголовку через иконку вопроса' }}
    />
  );
}
