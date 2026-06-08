import { AiToolArray, AiToolKeyValue, AiToolObject } from '@ds/ai-tool';
import { useState } from 'react';

export function ToolCallTree() {
  const [openRoot, setOpenRoot] = useState(true);
  const [openZones, setOpenZones] = useState(true);

  return (
    <AiToolObject variant='complex' name='result' opened={openRoot} onToggle={setOpenRoot}>
      <AiToolKeyValue label='region' value='ru-central1' />
      <AiToolKeyValue label='status' value='running' />
      <AiToolArray name='zones' count={2} unit='шт.' opened={openZones} onToggle={setOpenZones}>
        <AiToolObject variant='string' name='[0]' value='ru-central1-a' />
        <AiToolObject variant='string' name='[1]' value='ru-central1-b' />
      </AiToolArray>
    </AiToolObject>
  );
}
