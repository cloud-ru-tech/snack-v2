import { Dropzone } from '@ds/dropzone';

export function DropzoneDisabled() {
  return (
    <Dropzone disabled onFilesUpload={() => {}}>
      <span>Загрузка недоступна</span>
    </Dropzone>
  );
}
