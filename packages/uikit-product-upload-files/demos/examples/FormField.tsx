import { LocaleProvider } from '@ds/locale';
import { UPLOAD_STATUS, UploadFileItem, UploadFiles } from '@ds/uikit-product-upload-files';
import { useState } from 'react';

async function upload(file: File) {
  await new Promise(resolve => setTimeout(resolve, 600));

  return { url: `https://example.com/${file.name}` };
}

export function FormField() {
  const [files, setFiles] = useState<UploadFileItem[]>([]);
  const hasUploaded = files.some(item => item.status === UPLOAD_STATUS.Success);

  return (
    <LocaleProvider lang='ru-RU'>
      <UploadFiles
        label='Договор'
        optional={false}
        value={files}
        onChange={setFiles}
        upload={upload}
        error={hasUploaded ? undefined : 'Обязательное поле'}
      />
    </LocaleProvider>
  );
}
