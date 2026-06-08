import { AiToolArray, AiToolObject } from '@ds/ai-tool';
import { useState } from 'react';

export function ArrayList() {
  const [opened, setOpened] = useState(true);

  return (
    <div style={{ width: 360 }}>
      <AiToolArray name='Key[ArrayName]' count={2} unit='шт.' opened={opened} onToggle={setOpened}>
        <AiToolObject name='Key[0]' opened>
          <AiToolObject variant='string' name='region' value='ru-central1' />
          <AiToolObject variant='string' name='status' value='ok' />
        </AiToolObject>
        <AiToolObject name='Key[1]' opened>
          <AiToolObject variant='string' name='region' value='ru-central1-a' />
          <AiToolObject variant='string' name='status' value='pending' />
        </AiToolObject>
      </AiToolArray>
    </div>
  );
}
