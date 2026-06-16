import { LocaleProvider } from '@ds/locale';
import { PortalContextProvider } from '@ds/portal-context';
import { UPLOAD_STATUS, UploadFileItem, UploadFiles } from '@ds/uikit-product-upload-files';
import { useRef } from 'react';

async function upload(file: File) {
  return { url: `https://example.com/${file.name}` };
}

function buildValue(): UploadFileItem[] {
  return [
    {
      id: 'demo-1',
      file: new File([new Uint8Array(1024)], 'договор.pdf', { type: 'application/pdf' }),
      status: UPLOAD_STATUS.Success,
      result: { url: 'https://example.com/договор.pdf' },
    },
  ];
}

export function Disabled() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <LocaleProvider lang='ru-RU'>
      <PortalContextProvider root={hostRef}>
        <div ref={hostRef} style={{ position: 'relative' }}>
          <UploadFiles label='Документы' disabled value={buildValue()} upload={upload} />
        </div>
      </PortalContextProvider>
    </LocaleProvider>
  );
}
