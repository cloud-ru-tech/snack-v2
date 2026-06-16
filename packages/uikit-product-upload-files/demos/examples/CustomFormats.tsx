import { LocaleProvider } from '@ds/locale';
import { PortalContextProvider } from '@ds/portal-context';
import { UploadFileItem, UploadFiles, UploadFilesAcceptItem } from '@ds/uikit-product-upload-files';
import { useRef, useState } from 'react';

async function upload(file: File) {
  await new Promise(resolve => setTimeout(resolve, 600));

  return { url: `https://example.com/${file.name}` };
}

const accept: UploadFilesAcceptItem[] = [
  { extention: '.png', displayExtension: 'PNG' },
  { extention: '.jpg', displayExtension: 'JPG' },
];

export function CustomFormats() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<UploadFileItem[]>([]);

  return (
    <LocaleProvider lang='ru-RU'>
      <PortalContextProvider root={hostRef}>
        <div ref={hostRef} style={{ position: 'relative' }}>
          <UploadFiles
            label='Изображения'
            hint='До 5 файлов, каждый не больше 2 МБ'
            accept={accept}
            maxFiles={5}
            maxSize={2 * 1024 * 1024}
            value={files}
            onChange={setFiles}
            upload={upload}
          />
        </div>
      </PortalContextProvider>
    </LocaleProvider>
  );
}
