import { AiFieldRequest, APPEARANCE } from '@ds/ai-field-request';

export function Destructive() {
  return (
    <AiFieldRequest
      title='Удалить виртуальную машину?'
      content='Диски будут удалены вместе с машиной. Операция необратима.'
      hint='Подсказка под панелью'
      appearance={APPEARANCE.Destructive}
      primaryAction={{ label: 'Удалить' }}
      secondaryAction={{ label: 'Отмена' }}
    />
  );
}
