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
import { useEffect, useRef } from 'react';

import styles from './styles.module.scss';

const CONTAINER_ID = 'demo-upload-progress';
const TOAST_ID = 'demo-upload-progress-toast';
const TICK_MS = 400;
const CLOSE_DELAY_MS = 1500;

function getStatusLabel(progress: number, status: UploadItem['status']): string {
  if (status === TOAST_UPLOAD_ITEM_STATUS.Uploaded) return 'Загружено';
  if (status === TOAST_UPLOAD_ITEM_STATUS.Error) return 'Ошибка';
  return `${progress}%`;
}

function makeFile(progress: number, status: UploadItem['status'], onCancel: () => void): UploadItem {
  return {
    id: '1',
    title: 'video.mp4',
    status,
    statusLabel: getStatusLabel(progress, status),
    progress,
    formattedSize: '48.6 МБ',
    actions: status === TOAST_UPLOAD_ITEM_STATUS.Loading ? { onCancel } : {},
    ...(status === TOAST_UPLOAD_ITEM_STATUS.Uploaded ? { link: { text: 'Открыть', href: '#' } } : {}),
  };
}

export function UploadProgress() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef(0);

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const cancel = () => {
    stop();
    if (closeTimerRef.current) return;
    toaster.upload.startOrUpdate({
      id: TOAST_ID,
      title: 'Загрузка остановлена',
      description: 'Закроется автоматически',
      status: TOAST_UPLOAD_STATUS.Pause,
      progress: { current: progressRef.current, total: 100 },
      files: [makeFile(progressRef.current, TOAST_UPLOAD_ITEM_STATUS.Pause, cancel)],
      generalActions: {},
      closable: true,
      containerId: CONTAINER_ID,
    });
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      toaster.upload.dismiss({ containerId: CONTAINER_ID });
    }, CLOSE_DELAY_MS);
  };

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  const start = () => {
    stop();
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    progressRef.current = 0;
    let progress = 0;

    toaster.upload.startOrUpdate({
      id: TOAST_ID,
      title: 'Загрузка файла',
      description: `${progress}% из 100%`,
      status: TOAST_UPLOAD_STATUS.Loading,
      progress: { current: progress, total: 100 },
      files: [makeFile(progress, TOAST_UPLOAD_ITEM_STATUS.Loading, cancel)],
      generalActions: { onPause: stop },
      closable: true,
      onCancelAll: cancel,
      containerId: CONTAINER_ID,
    });

    intervalRef.current = setInterval(() => {
      progress += 10;
      progressRef.current = progress;
      const done = progress >= 100;

      toaster.upload.startOrUpdate({
        id: TOAST_ID,
        title: done ? 'Файл загружен' : 'Загрузка файла',
        description: done ? '1 из 1 файлов' : `${progress}% из 100%`,
        status: done ? TOAST_UPLOAD_STATUS.Uploaded : TOAST_UPLOAD_STATUS.Loading,
        progress: { current: progress, total: 100 },
        files: [
          makeFile(progress, done ? TOAST_UPLOAD_ITEM_STATUS.Uploaded : TOAST_UPLOAD_ITEM_STATUS.Loading, cancel),
        ],
        generalActions: {},
        closable: true,
        onCancelAll: done ? undefined : cancel,
        containerId: CONTAINER_ID,
      });

      if (done) stop();
    }, TICK_MS);
  };

  return (
    <PortalContextProvider>
      <div className={styles.uploadFrame}>
        <Button appearance={APPEARANCE.Primary} label='Запустить загрузку' onClick={start} />
        <Button appearance={APPEARANCE.Neutral} label='Закрыть все' onClick={cancel} />
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
