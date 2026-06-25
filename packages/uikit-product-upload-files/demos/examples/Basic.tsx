import { LocaleProvider } from '@ds/locale';
import { UploadFileItem, UploadFiles } from '@ds/uikit-product-upload-files';
import { useState } from 'react';

async function upload(file: File) {
  await new Promise(resolve => setTimeout(resolve, 600));

  return { url: `https://example.com/${file.name}` };
}

export function Basic() {
  const [files, setFiles] = useState<UploadFileItem[]>([]);

  return (
    <LocaleProvider lang='ru-RU'>
      <UploadFiles label='Документы' value={files} onChange={setFiles} upload={upload} />
    </LocaleProvider>
  );
}
