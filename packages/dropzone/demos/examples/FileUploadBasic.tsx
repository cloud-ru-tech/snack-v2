import { Button } from '@ds/button';
import { FileUpload } from '@ds/dropzone';

export function FileUploadBasic() {
  return (
    <FileUpload onFilesUpload={() => {}}>
      <Button type='button' label='Загрузить файлы' />
    </FileUpload>
  );
}
