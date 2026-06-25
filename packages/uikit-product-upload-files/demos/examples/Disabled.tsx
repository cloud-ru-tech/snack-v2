import { LocaleProvider } from '@ds/locale';
import { UPLOAD_STATUS, UploadFileItem, UploadFiles } from '@ds/uikit-product-upload-files';

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
  return (
    <LocaleProvider lang='ru-RU'>
      <UploadFiles label='Документы' disabled value={buildValue()} upload={upload} />
    </LocaleProvider>
  );
}
