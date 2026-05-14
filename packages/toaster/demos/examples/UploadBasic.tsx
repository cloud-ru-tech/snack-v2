import { APPEARANCE, Button } from '@ds/button';
import { PortalContextProvider } from '@ds/portal-context';
import {
  POSITION_SYSTEM_EVENT,
  TOAST_UPLOAD_ITEM_STATUS,
  toaster,
  TOASTER_TYPE,
  ToasterContainer,
  UploadItem,
} from '@ds/toaster';
import { useState } from 'react';

import styles from './styles.module.scss';

const CONTAINER_ID = 'demo-upload-basic';
const TOAST_ID = 'demo-upload-basic-toast';

const initialFiles: UploadItem[] = [
  {
    id: '1',
    title: 'document.pdf',
    status: TOAST_UPLOAD_ITEM_STATUS.Loading,
    statusLabel: 'Загрузка...',
    progress: 45,
    formattedSize: '12.4 МБ',
  },
  {
    id: '2',
    title: 'image.png',
    status: TOAST_UPLOAD_ITEM_STATUS.Uploaded,
    statusLabel: 'Загружено',
    progress: 100,
    formattedSize: '2.1 МБ',
    actions: {},
    link: { text: 'Открыть', href: '#' },
  },
];

const CLOSE_DELAY_MS = 1500;

export function UploadBasic() {
  const [files, setFiles] = useState<UploadItem[]>(initialFiles);

  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));

  const cancelAll = () => {
    const stopped = files.map(f =>
      f.status === TOAST_UPLOAD_ITEM_STATUS.Loading ? { ...f, status: TOAST_UPLOAD_ITEM_STATUS.Pause, actions: {} } : f,
    );
    setFiles(stopped);
    toaster.upload.startOrUpdate({
      id: TOAST_ID,
      title: 'Загрузка остановлена',
      description: 'Закроется автоматически',
      status: 'pause',
      progress: { current: 0, total: stopped.length },
      files: stopped,
      closable: true,
      containerId: CONTAINER_ID,
    });
    setTimeout(() => {
      toaster.upload.dismiss({ containerId: CONTAINER_ID });
      setFiles(initialFiles);
    }, CLOSE_DELAY_MS);
  };

  const filesWithActions: UploadItem[] = files.map(f =>
    f.status === TOAST_UPLOAD_ITEM_STATUS.Loading ? { ...f, actions: { onCancel: () => removeFile(f.id) } } : f,
  );

  const open = () => {
    const completed = filesWithActions.filter(f => f.status === TOAST_UPLOAD_ITEM_STATUS.Uploaded).length;
    toaster.upload.startOrUpdate({
      id: TOAST_ID,
      title: 'Загрузка файлов',
      description: `${completed} из ${filesWithActions.length} файлов`,
      status: 'loading',
      progress: { current: completed, total: filesWithActions.length },
      files: filesWithActions,
      closable: true,
      onCancelAll: cancelAll,
      containerId: CONTAINER_ID,
    });
  };

  return (
    <PortalContextProvider>
      <div className={styles.uploadFrame}>
        <Button appearance={APPEARANCE.Primary} label='Открыть Upload' onClick={open} />
        <Button
          appearance={APPEARANCE.Neutral}
          label='Сбросить'
          onClick={() => {
            setFiles(initialFiles);
            toaster.upload.dismiss({ containerId: CONTAINER_ID });
          }}
        />
        <ToasterContainer
          type={TOASTER_TYPE.Upload}
          containerId={CONTAINER_ID}
          position={POSITION_SYSTEM_EVENT.BottomRight}
          limit={1}
          autoClose={false}
        />
      </div>
    </PortalContextProvider>
  );
}
