import { AiButtonChevron } from '@ds/ai-button-chevron';
import { useState } from 'react';

export function Default() {
  const [open, setOpen] = useState(false);
  return <AiButtonChevron open={open} onClick={() => setOpen(prev => !prev)} />;
}
