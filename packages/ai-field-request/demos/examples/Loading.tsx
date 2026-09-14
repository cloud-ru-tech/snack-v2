import { AiFieldRequest, APPEARANCE } from '@ds/ai-field-request';

export function Loading() {
  return (
    <AiFieldRequest
      title='Удалить виртуальную машину?'
      content='Диски будут удалены вместе с машиной.'
      hint='Подсказка под панелью'
      appearance={APPEARANCE.Primary}
      primaryAction={{ label: 'Подтвердить', loading: true }}
      secondaryAction={{ label: 'Отмена' }}
    />
  );
}
