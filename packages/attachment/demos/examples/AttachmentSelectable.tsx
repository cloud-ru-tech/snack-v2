import { Attachment } from '@ds/attachment';
import { useState } from 'react';

import { PDF_FILE } from './sample';

export function AttachmentSelectable() {
  const [checked, setChecked] = useState(false);

  return (
    <Attachment
      file={PDF_FILE}
      checked={checked}
      onClick={() => setChecked(v => !v)}
      onDelete={file => console.info('delete', file?.name)}
    />
  );
}
