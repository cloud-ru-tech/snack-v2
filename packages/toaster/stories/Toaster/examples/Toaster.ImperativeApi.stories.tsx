import { APPEARANCE, Button, VIEW } from '@ds/button';
import {
  POSITION_SYSTEM_EVENT,
  POSITION_USER_ACTION,
  TOAST_SYSTEM_EVENT_APPEARANCE,
  TOAST_UPLOAD_STATUS,
  TOAST_USER_ACTION_APPEARANCE,
  toaster,
  TOASTER_TYPE,
  ToasterContainer,
  ToastSystemEventAppearance,
  ToastUploadStatus,
  ToastUserActionAppearance,
} from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';

import { DemoPage, DemoPanel } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { fileError, fileLoading, filePause, fileUploaded } from '../../uploadFixtures';
import styles from '../styles.module.scss';

// Демонстрация императивных API `toaster.systemEvent.*` / `toaster.userAction.*` /
// `toaster.upload.startOrUpdate`. Соответствует Tier L scenario-stories.
const SHARED_CONTAINER_ID = 'story-triggers-shared';
const USER_ACTION_CONTAINER_ID = 'story-triggers-user-action';

const SYSTEM_EVENT_COPY: Record<ToastSystemEventAppearance, string> = {
  neutral: 'Нейтральное событие — информирование без эмоционального окраса.',
  success: 'Успешное завершение операции — подтверждение результата.',
  warning: 'Предупреждение — стоит обратить внимание, но не блокирует.',
  error: 'Ошибка — операция не выполнена, нужна реакция пользователя.',
  errorCritical: 'Критичная ошибка — выделена красным заливом, сильнее привлекает внимание.',
};

const UPLOAD_FIXTURE: Record<
  ToastUploadStatus,
  { title: string; description: string; files: Array<typeof fileLoading>; progress: { current: number; total: number } }
> = {
  loading: {
    title: 'Загрузка файлов',
    description: '2 из 4 файлов',
    files: [fileLoading, filePause, fileError, fileUploaded],
    progress: { current: 2, total: 4 },
  },
  pause: {
    title: 'Загрузка на паузе',
    description: 'Можно продолжить',
    files: [filePause, fileLoading],
    progress: { current: 1, total: 2 },
  },
  error: {
    title: 'Ошибка загрузки',
    description: '1 файл не загружен',
    files: [fileError, fileLoading],
    progress: { current: 0, total: 2 },
  },
  uploaded: {
    title: 'Загрузка завершена',
    description: '2 из 2 файлов',
    files: [fileUploaded, fileUploaded],
    progress: { current: 2, total: 2 },
  },
  errorUploaded: {
    title: 'Загрузка с ошибками',
    description: '1 из 2 файлов',
    files: [fileUploaded, fileError],
    progress: { current: 1, total: 2 },
  },
};

function ImperativeApiDemo() {
  const fireSystemEvent = (appearance: ToastSystemEventAppearance) => {
    toaster.systemEvent[appearance]({
      title: `SystemEvent · ${appearance}`,
      description: SYSTEM_EVENT_COPY[appearance],
      containerId: SHARED_CONTAINER_ID,
    });
  };

  const fireUserAction = (appearance: ToastUserActionAppearance) => {
    toaster.userAction[appearance]({
      label: `UserAction · ${appearance}`,
      containerId: USER_ACTION_CONTAINER_ID,
    });
  };

  const fireUpload = (status: ToastUploadStatus) => {
    const fx = UPLOAD_FIXTURE[status];
    toaster.upload.startOrUpdate({
      id: 'triggers-upload',
      title: fx.title,
      description: fx.description,
      status,
      progress: fx.progress,
      files: fx.files,
      generalActions: { onPause: () => {}, onContinue: () => {} },
      closable: true,
      containerId: SHARED_CONTAINER_ID,
    });
  };

  const dismissAll = () => {
    toaster.systemEvent.dismiss({ containerId: SHARED_CONTAINER_ID });
    toaster.upload.dismiss({ containerId: SHARED_CONTAINER_ID });
    toaster.userAction.dismiss({ containerId: USER_ACTION_CONTAINER_ID });
  };

  return (
    <DemoPage>
      <DemoPanel width='wide' className={`${styles.demoPanel} ${styles.demoPanelWide}`}>
        <h3 className={styles.demoTitle}>Императивный API</h3>
        <p className={styles.demoHint}>
          SystemEvent и Upload рисуются в один общий контейнер справа снизу. UserAction — в свой контейнер по центру
          снизу.
        </p>

        <div className={styles.triggersColumns}>
          <div className={styles.triggersColumn}>
            <p className={styles.demoSectionLabel}>SystemEvent · 5 appearances</p>
            <p className={styles.demoHint}>Длинные нотификации с заголовком и описанием.</p>
            <div className={styles.triggersColumnButtons}>
              {(Object.values(TOAST_SYSTEM_EVENT_APPEARANCE) as ToastSystemEventAppearance[]).map(appearance => (
                <Button
                  key={appearance}
                  view={VIEW.Outline}
                  appearance={APPEARANCE.Neutral}
                  label={appearance}
                  onClick={() => fireSystemEvent(appearance)}
                  data-test-id={TEST_IDS.imperativeApi.systemEvent(appearance)}
                />
              ))}
            </div>
          </div>

          <div className={styles.triggersColumn}>
            <p className={styles.demoSectionLabel}>UserAction · 4 appearances</p>
            <p className={styles.demoHint}>Короткие снэкбары по результату действия.</p>
            <div className={styles.triggersColumnButtons}>
              {(Object.values(TOAST_USER_ACTION_APPEARANCE) as ToastUserActionAppearance[]).map(appearance => (
                <Button
                  key={appearance}
                  view={VIEW.Outline}
                  appearance={APPEARANCE.Neutral}
                  label={appearance}
                  onClick={() => fireUserAction(appearance)}
                  data-test-id={TEST_IDS.imperativeApi.userAction(appearance)}
                />
              ))}
            </div>
          </div>

          <div className={styles.triggersColumn}>
            <p className={styles.demoSectionLabel}>Upload · 5 статусов</p>
            <p className={styles.demoHint}>startOrUpdate в один и тот же id, статус переключает state.</p>
            <div className={styles.triggersColumnButtons}>
              {(Object.values(TOAST_UPLOAD_STATUS) as ToastUploadStatus[]).map(status => (
                <Button
                  key={status}
                  view={VIEW.Outline}
                  appearance={APPEARANCE.Neutral}
                  label={status}
                  onClick={() => fireUpload(status)}
                  data-test-id={TEST_IDS.imperativeApi.upload(status)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.demoActionsCenter}>
          <Button
            appearance={APPEARANCE.Critical}
            label='Закрыть все'
            onClick={dismissAll}
            data-test-id={TEST_IDS.imperativeApi.triggerReset}
          />
        </div>
      </DemoPanel>

      <ToasterContainer
        type={TOASTER_TYPE.SystemEvent}
        containerId={SHARED_CONTAINER_ID}
        position={POSITION_SYSTEM_EVENT.BottomRight}
        limit={5}
        stacked
        displayCloseAllButton
        autoClose={5000}
      />
      <ToasterContainer
        type={TOASTER_TYPE.UserAction}
        containerId={USER_ACTION_CONTAINER_ID}
        position={POSITION_USER_ACTION.BottomCenter}
        limit={2}
        autoClose={3000}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof ImperativeApiDemo> = {
  title: 'Components/Toaster/Toaster/Examples/ImperativeApi',
  component: ImperativeApiDemo,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof ImperativeApiDemo>;

export const ImperativeApi: Story = {
  tags: ['dev'],
};
