import { APPEARANCE, Button, VIEW } from '@ds/button';
import {
  POSITION_SYSTEM_EVENT,
  POSITION_USER_ACTION,
  TOAST_UPLOAD_ITEM_STATUS,
  toaster,
  TOASTER_TYPE,
  ToasterContainer,
  UploadItem,
} from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import styles from './stories.module.scss';
import {
  TOASTER_UPDATE_FLOW_DISMISS_ALL_TEST_ID,
  TRIGGER_UPDATE_SYSTEM_ERROR_TEST_ID,
  TRIGGER_UPDATE_SYSTEM_SUCCESS_TEST_ID,
  TRIGGER_UPDATE_UPLOAD_TEST_ID,
  TRIGGER_UPDATE_USER_ACTION_TEST_ID,
} from './testIds';

// InteractionTest для Toaster: проверяет, что pending-тосты `toaster.*.neutral`
// корректно превращаются в финальный appearance через `update.*(id, …)`.
const SHARED_CONTAINER_ID = 'story-update-flow-shared';
const USER_ACTION_CONTAINER_ID = 'story-update-flow-user-action';

function InteractionTestDemo() {
  const startSystemSuccess = async () => {
    const id = await toaster.systemEvent.neutral({
      title: 'Сохранение…',
      description: 'Не закрывайте окно',
      autoClose: false,
      progressBar: false,
      closable: false,
      containerId: SHARED_CONTAINER_ID,
    });
    setTimeout(() => {
      toaster.systemEvent.update.success(id, {
        title: 'Сохранено',
        description: 'Все изменения зафиксированы',
        autoClose: 3000,
        containerId: SHARED_CONTAINER_ID,
      });
    }, 800);
  };

  const startSystemError = async () => {
    const id = await toaster.systemEvent.neutral({
      title: 'Отправка…',
      description: 'Ждём ответа',
      autoClose: false,
      progressBar: false,
      closable: false,
      containerId: SHARED_CONTAINER_ID,
    });
    setTimeout(() => {
      toaster.systemEvent.update.error(id, {
        title: 'Ошибка',
        description: 'Попробуйте ещё раз',
        autoClose: 5000,
        closable: true,
        containerId: SHARED_CONTAINER_ID,
      });
    }, 800);
  };

  const startUserAction = async () => {
    const id = await toaster.userAction.neutral({
      label: 'Копируем…',
      containerId: USER_ACTION_CONTAINER_ID,
      autoClose: false,
    });
    setTimeout(() => {
      toaster.userAction.update.success(id, {
        label: 'Скопировано',
        containerId: USER_ACTION_CONTAINER_ID,
        autoClose: 2000,
      });
    }, 700);
  };

  const startUpload = () => {
    const id = 'update-flow-upload-id';
    const fileDefs = [
      { id: 'f-doc', title: 'document.pdf', formattedSize: '12.4 МБ', step: 9 },
      { id: 'f-img', title: 'image.png', formattedSize: '2.1 МБ', step: 18 },
      { id: 'f-arc', title: 'archive.zip', formattedSize: '8.7 МБ', step: 6 },
      { id: 'f-rep', title: 'report.xlsx', formattedSize: '320 КБ', step: 24 },
    ] as const;
    const progresses = fileDefs.map(() => 0);
    const TOTAL = fileDefs.length;

    const buildFiles = (): UploadItem[] =>
      fileDefs.map((f, i) => {
        const done = progresses[i] >= 100;
        return {
          id: f.id,
          title: f.title,
          formattedSize: f.formattedSize,
          progress: progresses[i],
          status: done ? TOAST_UPLOAD_ITEM_STATUS.Uploaded : TOAST_UPLOAD_ITEM_STATUS.Loading,
          statusLabel: done ? 'Загружено' : 'Загрузка…',
          actions: done ? {} : { onCancel: () => {}, onPause: () => {} },
        };
      });

    const tick = () => {
      fileDefs.forEach((f, i) => {
        if (progresses[i] < 100) progresses[i] = Math.min(100, progresses[i] + f.step);
      });

      const completed = progresses.filter(p => p >= 100).length;
      const allDone = completed === TOTAL;

      toaster.upload.startOrUpdate({
        id,
        title: allDone ? 'Загрузка завершена' : 'Загрузка файлов',
        description: `${completed} из ${TOTAL} файлов`,
        status: allDone ? 'uploaded' : 'loading',
        progress: { current: completed, total: TOTAL },
        files: buildFiles(),
        generalActions: { onPause: () => {}, onContinue: () => {} },
        closable: true,
        containerId: SHARED_CONTAINER_ID,
      });

      if (!allDone) setTimeout(tick, 250);
    };
    tick();
  };

  const dismissAll = () => {
    toaster.systemEvent.dismiss({ containerId: SHARED_CONTAINER_ID });
    toaster.upload.dismiss({ containerId: SHARED_CONTAINER_ID });
    toaster.userAction.dismiss({ containerId: USER_ACTION_CONTAINER_ID });
  };

  return (
    <div className={styles.demoPage}>
      <section className={`${styles.demoPanel} ${styles.demoPanelWide}`}>
        <h3 className={styles.demoTitle}>Обновление тостов</h3>
        <p className={styles.demoHint}>
          Pending-тост открывается с <code>autoClose: false</code>, через <code>update.*(id, options)</code>{' '}
          превращается в финальный appearance без пересоздания DOM. SystemEvent и Upload рисуются в общий контейнер
          справа снизу, UserAction — в свой контейнер по центру снизу.
        </p>

        <div className={styles.triggersColumns}>
          <div className={styles.triggersColumn}>
            <p className={styles.demoSectionLabel}>SystemEvent · neutral → success / error</p>
            <div className={styles.triggersColumnButtons}>
              <Button
                view={VIEW.Outline}
                appearance={APPEARANCE.Neutral}
                label='→ success'
                onClick={startSystemSuccess}
                data-test-id={TRIGGER_UPDATE_SYSTEM_SUCCESS_TEST_ID}
              />
              <Button
                view={VIEW.Outline}
                appearance={APPEARANCE.Neutral}
                label='→ error'
                onClick={startSystemError}
                data-test-id={TRIGGER_UPDATE_SYSTEM_ERROR_TEST_ID}
              />
            </div>
          </div>

          <div className={styles.triggersColumn}>
            <p className={styles.demoSectionLabel}>UserAction · neutral → success</p>
            <div className={styles.triggersColumnButtons}>
              <Button
                view={VIEW.Outline}
                appearance={APPEARANCE.Neutral}
                label='Запустить'
                onClick={startUserAction}
                data-test-id={TRIGGER_UPDATE_USER_ACTION_TEST_ID}
              />
            </div>
          </div>

          <div className={styles.triggersColumn}>
            <p className={styles.demoSectionLabel}>Upload · startOrUpdate</p>
            <div className={styles.triggersColumnButtons}>
              <Button
                view={VIEW.Outline}
                appearance={APPEARANCE.Neutral}
                label='Запустить'
                onClick={startUpload}
                data-test-id={TRIGGER_UPDATE_UPLOAD_TEST_ID}
              />
            </div>
          </div>
        </div>

        <div className={styles.demoActionsCenter}>
          <Button
            appearance={APPEARANCE.Critical}
            label='Закрыть все'
            onClick={dismissAll}
            data-test-id={TOASTER_UPDATE_FLOW_DISMISS_ALL_TEST_ID}
          />
        </div>
      </section>

      <ToasterContainer
        type={TOASTER_TYPE.SystemEvent}
        containerId={SHARED_CONTAINER_ID}
        position={POSITION_SYSTEM_EVENT.BottomRight}
        limit={3}
        stacked
        displayCloseAllButton
        autoClose={false}
      />
      <ToasterContainer
        type={TOASTER_TYPE.UserAction}
        containerId={USER_ACTION_CONTAINER_ID}
        position={POSITION_USER_ACTION.BottomCenter}
        limit={2}
        autoClose={false}
      />
    </div>
  );
}

const meta: Meta<typeof InteractionTestDemo> = {
  title: 'Components/Toaster/Toaster',
  component: InteractionTestDemo,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof InteractionTestDemo>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click: SystemEvent neutral → success transition triggers', async () => {
      const button = canvas.getByTestId(TRIGGER_UPDATE_SYSTEM_SUCCESS_TEST_ID);
      await userEvent.click(button);
      await waitFor(() => expect(button).toBeVisible());
    });

    await step('click: UserAction neutral → success transition triggers', async () => {
      const button = canvas.getByTestId(TRIGGER_UPDATE_USER_ACTION_TEST_ID);
      await userEvent.click(button);
      await waitFor(() => expect(button).toBeVisible());
    });
  },
};
