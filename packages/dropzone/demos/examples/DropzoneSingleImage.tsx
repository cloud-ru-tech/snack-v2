import { Dropzone } from '@ds/dropzone';

export function DropzoneSingleImage() {
  return (
    <Dropzone mode='single' accept='image/*' onFilesUpload={() => {}}>
      <span>Только одно изображение</span>
    </Dropzone>
  );
}
