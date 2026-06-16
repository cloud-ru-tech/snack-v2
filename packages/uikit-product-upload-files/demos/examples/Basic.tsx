import { LocaleProvider } from '@ds/locale';
import { PortalContextProvider } from '@ds/portal-context';
import { UploadFileItem, UploadFiles } from '@ds/uikit-product-upload-files';
import { useRef, useState } from 'react';

async function upload(file: File) {
  await new Promise(resolve => setTimeout(resolve, 600));

  return { url: `https://example.com/${file.name}` };
}

export function Basic() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<UploadFileItem[]>([]);

  return (
    <LocaleProvider lang='ru-RU'>
      <PortalContextProvider root={hostRef}>
        <div ref={hostRef} style={{ position: 'relative' }}>
          <UploadFiles label='Документы' value={files} onChange={setFiles} upload={upload} />
        </div>
      </PortalContextProvider>
    </LocaleProvider>
  );
}
