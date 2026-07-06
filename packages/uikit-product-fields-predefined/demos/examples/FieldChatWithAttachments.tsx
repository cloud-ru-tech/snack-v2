import { FieldChat } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldChatWithAttachments() {
  const [value, setValue] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FieldChat
      value={value}
      onChange={setValue}
      handleSubmit={() => {
        setValue('');
        setFiles([]);
      }}
      attachment={{
        files,
        accept: 'image/*,.pdf',
        onFilesUpload: uploaded => setFiles(prev => [...prev, ...uploaded]),
        onFileDelete: file => setFiles(prev => prev.filter(item => item !== file)),
      }}
    />
  );
}
