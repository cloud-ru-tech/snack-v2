import { AiToolArray, AiToolObject } from '@ds/ai-tool';
import { useState } from 'react';

export function ArrayList() {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ width: 360 }}>
      <AiToolArray name='Key[ArrayName]' count={2} unit='шт.' open={open} onOpenChange={setOpen}>
        <AiToolObject name='Key[0]' open>
          <AiToolObject variant='string' name='region' value='ru-central1' />
          <AiToolObject variant='string' name='status' value='ok' />
        </AiToolObject>
        <AiToolObject name='Key[1]' open>
          <AiToolObject variant='string' name='region' value='ru-central1-a' />
          <AiToolObject variant='string' name='status' value='pending' />
        </AiToolObject>
      </AiToolArray>
    </div>
  );
}
