import { Dropzone } from '@ds/dropzone';

export function DropzoneBasic() {
  return (
    <Dropzone onFilesUpload={() => {}}>
      <span>Перетащите файлы или нажмите, чтобы выбрать</span>
    </Dropzone>
  );
}
