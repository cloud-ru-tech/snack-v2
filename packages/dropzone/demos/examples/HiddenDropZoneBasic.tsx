import { HiddenDropZone } from '@ds/dropzone';

export function HiddenDropZoneBasic() {
  return (
    <HiddenDropZone onFilesUpload={() => {}} content={<span>Отпустите, чтобы прикрепить файлы</span>}>
      <form>
        <label>
          Имя <input type='text' />
        </label>
      </form>
    </HiddenDropZone>
  );
}
