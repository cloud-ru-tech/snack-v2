import { AiButtonChevron } from '@ds/ai-button-chevron';
import { useState } from 'react';

export function Default() {
  const [opened, setOpened] = useState(false);
  return <AiButtonChevron opened={opened} onClick={() => setOpened(prev => !prev)} />;
}
