import { APPEARANCE, Button, VIEW } from '@ds/button';
import { SegmentControl } from '@ds/segment-control';
import {
  openToast,
  POSITION_SYSTEM_EVENT,
  POSITION_USER_ACTION,
  TOAST_UPLOAD_ITEM_STATUS,
  toaster,
  TOASTER_TYPE,
  TOASTER_WIDTH,
  ToastSystemEventProps,
  ToastUploadProps,
  ToastUserActionProps,
  UploadItem,
} from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { DemoPage, DemoPanel } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';

// Composition-стори: тосты привязаны к локальному containing block (телефонная
// рамка) через `toasterParent` + `transform: translateZ(0)`. Демонстрирует
// scoped frame, а не ось viewport-а.
const SYSTEM_SHARED_ID = 'story-mobile-system-shared';
const USER_ACTION_ID = 'story-mobile-user-action';

const uploadFiles: UploadItem[] = [
  {
    id: 'f1',
    title: 'document.pdf',
    status: TOAST_UPLOAD_ITEM_STATUS.Loading,
    statusLabel: 'Загрузка',
    progress: 45,
    formattedSize: '12.4 МБ',
    actions: { onPause: () => {}, onCancel: () => {} },
  },
];

type PhoneSize = 'sm' | 'md' | 'lg';

const PHONE_SIZE_ITEMS = [
  { value: 'sm' as const, label: 'SE · 360' },
  { value: 'md' as const, label: 'iPhone · 390' },
  { value: 'lg' as const, label: 'Pro Max · 430' },
];

const PHONE_SIZE_CLASS: Record<PhoneSize, string> = {
  sm: styles.phoneSizeSm,
  md: styles.phoneSizeMd,
  lg: styles.phoneSizeLg,
};

function CompositionDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const parent = () => frameRef.current ?? undefined;
  const [size, setSize] = useState<PhoneSize>('md');
  const systemEventCounter = useRef(0);
  const uploadCounter = useRef(0);
  const userActionCounter = useRef(0);

  const fireSystemEvent = () => {
    const n = ++systemEventCounter.current;
    return openToast({
      type: TOASTER_TYPE.SystemEvent,
      toasterProps: {
        appearance: 'neutral',
        title: `Системное событие #${n}`,
        description: 'Top-center стек по мобильному дизайну',
      } satisfies ToastSystemEventProps,
      containerProps: {
        type: TOASTER_TYPE.SystemEvent,
        containerId: SYSTEM_SHARED_ID,
        position: POSITION_SYSTEM_EVENT.TopCenter,
        stacked: true,
        displayCloseAllButton: true,
        width: TOASTER_WIDTH.Full,
        limit: 0,
        draggable: true,
        draggableDirection: 'x',
      },
      toastOptions: { autoClose: 5000 },
      toasterParent: parent(),
    });
  };

  const fireUpload = () => {
    const n = ++uploadCounter.current;
    return openToast({
      type: TOASTER_TYPE.Upload,
      toasterProps: {
        title: `Загрузка файла #${n}`,
        description: '1 из 1 файла',
        status: 'loading',
        progress: { current: 0, total: 1 },
        files: uploadFiles,
        generalActions: {},
        closable: true,
      } satisfies ToastUploadProps,
      containerProps: {
        type: TOASTER_TYPE.SystemEvent,
        containerId: SYSTEM_SHARED_ID,
        position: POSITION_SYSTEM_EVENT.TopCenter,
        stacked: true,
        displayCloseAllButton: true,
        width: TOASTER_WIDTH.Full,
        limit: 0,
        draggable: true,
        draggableDirection: 'x',
      },
      toasterParent: parent(),
    });
  };

  const fireUserAction = () => {
    const n = ++userActionCounter.current;
    return openToast({
      type: TOASTER_TYPE.UserAction,
      toasterProps: { appearance: 'success', label: `Скопировано #${n}` } satisfies ToastUserActionProps,
      containerProps: {
        type: TOASTER_TYPE.UserAction,
        containerId: USER_ACTION_ID,
        position: POSITION_USER_ACTION.BottomCenter,
        limit: 2,
        width: TOASTER_WIDTH.Full,
        draggable: true,
        draggableDirection: 'y',
      },
      toastOptions: { autoClose: 2000 },
      toasterParent: parent(),
    });
  };

  const dismissAll = () => {
    toaster.systemEvent.dismiss({ containerId: SYSTEM_SHARED_ID });
    toaster.upload.dismiss({ containerId: SYSTEM_SHARED_ID });
    toaster.userAction.dismiss({ containerId: USER_ACTION_ID });
  };

  return (
    <DemoPage className={styles.phonePage}>
      <DemoPanel width='narrow' className={`${styles.demoPanel} ${styles.demoPanelNarrow}`}>
        <h3 className={styles.demoTitle}>Scoped frame composition</h3>
        <p className={styles.demoHint}>
          Контейнеры тостов привязаны к рамке справа через <code>toasterParent</code> — тосты появляются и живут внутри
          телефонной рамки (containing block), а не на всём вьюпорте Storybook.
        </p>
        <p className={styles.demoHint}>
          ⚠️ <strong>Свайп-дисмисс — экспериментально.</strong> На время drag&apos;а карточка выходит в{' '}
          <code>position: fixed</code> относительно <code>.toasterRoot</code> (<code>container-type: size</code>). Если
          в DOM-цепочке между рутом и тостом появляется ещё один containing block (новый <code>transform</code>,{' '}
          <code>filter</code>, <code>will-change</code>, …) — координаты разойдутся. Перед prod-использованием поведение
          нужно стабилизировать.
        </p>

        <div className={styles.triggersColumn}>
          <p className={styles.demoSectionLabel}>Размер экрана</p>
          <SegmentControl
            items={PHONE_SIZE_ITEMS}
            value={size}
            onChange={setSize}
            data-test-id={TEST_IDS.composition.size}
          />
        </div>

        <div className={styles.triggersColumn}>
          <p className={styles.demoSectionLabel}>SystemEvent + Upload · общий контейнер сверху</p>
          <div className={styles.triggersColumnButtons}>
            <Button
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              label='Открыть событие'
              onClick={fireSystemEvent}
              data-test-id={TEST_IDS.composition.systemEvent}
            />
            <Button
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              label='Открыть upload'
              onClick={fireUpload}
              data-test-id={TEST_IDS.composition.upload}
            />
          </div>
        </div>

        <div className={styles.triggersColumn}>
          <p className={styles.demoSectionLabel}>UserAction · свой контейнер снизу</p>
          <div className={styles.triggersColumnButtons}>
            <Button
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              label='Скопировано'
              onClick={fireUserAction}
              data-test-id={TEST_IDS.composition.userAction}
            />
          </div>
        </div>

        <div className={styles.demoActionsCenter}>
          <Button
            appearance={APPEARANCE.Critical}
            label='Закрыть все'
            onClick={dismissAll}
            data-test-id={TEST_IDS.composition.triggerReset}
          />
        </div>
      </DemoPanel>

      <div className={`${styles.phoneFrame} ${PHONE_SIZE_CLASS[size]}`}>
        <div className={styles.phoneNotch} />
        <div className={styles.phoneStatusBar}>
          <span>9:41</span>
          <span>●●● ▮</span>
        </div>
        <div className={styles.phoneSafeArea} ref={frameRef} />
        <div className={styles.phoneHomeIndicator} />
      </div>
    </DemoPage>
  );
}

const meta: Meta<typeof CompositionDemo> = {
  title: 'Components/Toaster/Toaster/Examples/Composition',
  component: CompositionDemo,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof CompositionDemo>;

export const Composition: Story = {
  tags: ['dev'],
};
