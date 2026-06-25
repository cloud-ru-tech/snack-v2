import { MarkdownEditor } from '@ds/markdown';
import { useState } from 'react';

export function EditorControlled() {
  const [value, setValue] = useState('# Controlled\n\nЗначение хранится во внешнем `useState`.');
  const [preview, setPreview] = useState(false);

  return (
    <MarkdownEditor value={value} onChange={setValue} preview={preview} onPreviewChange={setPreview} label='Описание' />
  );
}
