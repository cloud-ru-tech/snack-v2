import { AiFieldRequest, APPEARANCE } from '@ds/ai-field-request';
import { useState } from 'react';

const CONTENT =
  'Виртуальная машина будет остановлена и удалена вместе с дисками. Снимки и резервные копии останутся доступны в хранилище, восстановить машину из них можно в любой момент. Сетевые интерфейсы и публичные адреса освободятся сразу после удаления.';

export function Expanded() {
  const [open, setOpen] = useState(true);

  return (
    <AiFieldRequest
      title='Удалить виртуальную машину?'
      content={CONTENT}
      hint='Подсказка под панелью'
      appearance={APPEARANCE.Primary}
      open={open}
      onOpenChange={setOpen}
      primaryAction={{ label: 'Подтвердить' }}
      secondaryAction={{ label: 'Отмена' }}
    />
  );
}
