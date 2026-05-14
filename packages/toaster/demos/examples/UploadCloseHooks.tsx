import { APPEARANCE, Button } from '@ds/button';
import { PortalContextProvider } from '@ds/portal-context';
import {
  POSITION_SYSTEM_EVENT,
  TOAST_UPLOAD_ITEM_STATUS,
  TOAST_UPLOAD_STATUS,
  toaster,
  TOASTER_TYPE,
  ToasterContainer,
  UploadItem,
} from '@ds/toaster';
import { useState } from 'react';

import styles from './styles.module.scss';

const CONTAINER_ID = 'demo-upload-close-hooks';
const TOAST_ID = 'demo-upload-close-hooks-toast';

const file: UploadItem = {
  id: '1',
  title: 'archive.zip',
  status: TOAST_UPLOAD_ITEM_STATUS.Loading,
  statusLabel: '40%',
  progress: 40,
  formattedSize: '120 МБ',
};

export function UploadCloseHooks() {
  const [log, setLog] = useState<string[]>([]);
  const push = (line: string) => setLog(prev => [line, ...prev].slice(0, 4));

  const open = () => {
    toaster.upload.startOrUpdate({
      id: TOAST_ID,
      title: 'Загрузка файла',
      description: '40% из 100%',
      status: TOAST_UPLOAD_STATUS.Loading,
      progress: { current: 40, total: 100 },
      files: [file],
      closable: true,
      containerId: CONTAINER_ID,
      onCloseClick: (_e, close) => {
        if (window.confirm('Закрыть тост загрузки?')) {
          push('onCloseClick → close()');
          close?.();
        } else {
          push('onCloseClick → отменено');
        }
      },
      onClose: id => push(`onClose(${String(id)})`),
    });
  };

  return (
    <PortalContextProvider>
      <div className={styles.uploadFrame}>
        <Button appearance={APPEARANCE.Primary} label='Открыть Upload' onClick={open} />
        <Button appearance={APPEARANCE.Neutral} label='Очистить лог' onClick={() => setLog([])} />
        <ul className={styles.eventLog} aria-label='Лог событий'>
          {log.length === 0 ? <li>Лог пуст</li> : log.map((line, i) => <li key={i}>{line}</li>)}
        </ul>
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
