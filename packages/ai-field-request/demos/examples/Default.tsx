import { AiFieldRequest, APPEARANCE } from '@ds/ai-field-request';

const CONTENT =
  'Виртуальная машина будет остановлена и удалена вместе с дисками. Снимки и резервные копии останутся доступны в хранилище, восстановить машину из них можно в любой момент.';

export function Default() {
  return (
    <AiFieldRequest
      title='Удалить виртуальную машину?'
      content={CONTENT}
      hint='Подсказка под панелью'
      appearance={APPEARANCE.Primary}
      primaryAction={{ label: 'Подтвердить' }}
      secondaryAction={{ label: 'Отмена' }}
    />
  );
}
