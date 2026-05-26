import { MarkdownEditor } from '@ds/markdown';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

export function EditorControlled() {
  const [value, setValue] = useState('# Controlled\n\nЗначение хранится во внешнем `useState`.');
  const [preview, setPreview] = useState(false);

  return (
    <PortalContextProvider>
      <MarkdownEditor
        value={value}
        onChange={setValue}
        preview={preview}
        onPreviewChange={setPreview}
        label='Описание'
      />
    </PortalContextProvider>
  );
}
