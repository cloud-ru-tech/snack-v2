import { APPEARANCE, Button, VIEW } from '@ds/button';
import {
  DRAGGABLE_DIRECTION,
  DraggableDirection,
  openToast,
  POSITION_SYSTEM_EVENT,
  POSITION_USER_ACTION,
  SystemEventPosition,
  toaster,
  TOASTER_TYPE,
  TOASTER_WIDTH,
  ToasterContainer,
  ToasterContainerProps,
  ToasterPosition,
  ToasterType,
  ToasterWidth,
  ToastSystemEventProps,
  ToastUploadProps,
  ToastUserActionProps,
  UserActionPosition,
} from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle, DemoWarning } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import { fileLoading, filePause, fileUploaded } from '../uploadFixtures';
import styles from './styles.module.scss';

const ALL_POSITIONS: ToasterPosition[] = Array.from(
  new Set<ToasterPosition>([...Object.values(POSITION_SYSTEM_EVENT), ...Object.values(POSITION_USER_ACTION)]),
);

const USER_ACTION_POSITIONS = new Set<string>(Object.values(POSITION_USER_ACTION));
const SYSTEM_EVENT_POSITIONS = new Set<string>(Object.values(POSITION_SYSTEM_EVENT));

const DEFAULT_POSITION: Record<ToasterType, ToasterPosition> = {
  [TOASTER_TYPE.SystemEvent]: POSITION_SYSTEM_EVENT.BottomRight,
  [TOASTER_TYPE.UserAction]: POSITION_USER_ACTION.BottomCenter,
  [TOASTER_TYPE.Upload]: POSITION_SYSTEM_EVENT.BottomRight,
};

function resolvePosition(type: ToasterType, requested: ToasterPosition): { value: ToasterPosition; clamped: boolean } {
  const validSet = type === TOASTER_TYPE.UserAction ? USER_ACTION_POSITIONS : SYSTEM_EVENT_POSITIONS;
  if (validSet.has(requested)) return { value: requested, clamped: false };
  return { value: DEFAULT_POSITION[type], clamped: true };
}

type DraggableDirectionArg = DraggableDirection | 'auto';

type PlaygroundArgs = {
  type: ToasterType;
  position: ToasterPosition;
  width: ToasterWidth;
  stacked: boolean;
  limit: number;
  autoCloseEnabled: boolean;
  autoCloseMs: number;
  displayCloseAllButton: boolean;
  draggable: boolean;
  draggableDirection: DraggableDirectionArg;
  containerId?: string;
  dataTestId?: string;
  scopeToFrame: boolean;
};

function PlaygroundDemo({
  type,
  position,
  width,
  stacked,
  limit,
  autoCloseEnabled,
  autoCloseMs,
  displayCloseAllButton,
  draggable,
  draggableDirection,
  containerId,
  dataTestId,
  scopeToFrame,
}: PlaygroundArgs) {
  const autoClose: number | false = autoCloseEnabled ? autoCloseMs : false;
  const frameRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const { value: effectivePosition, clamped } = resolvePosition(type, position);

  // Уникальный containerId на тип: контейнеры разных типов рендерятся
  // параллельно, при смене type старые тосты остаются в своём контейнере
  // (мы их сразу гасим). Position/limit/stacked и т.д. меняются in-place,
  // потому что JSX-контейнер ре-рендерится с новыми пропсами.
  const playgroundContainerId = containerId ?? `playground-${type}`;

  // Гасим тосты только при смене типа — внутри одного типа изменения
  // настроек контейнера применяются на лету и стирать накопленные тосты не
  // нужно.
  useEffect(() => {
    toaster.systemEvent.dismiss({ containerId: playgroundContainerId });
    toaster.userAction.dismiss({ containerId: playgroundContainerId });
    toaster.upload.dismiss({ containerId: playgroundContainerId });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- dismiss only on type change
  }, [type]);

  const containerPropsForScope = (): ToasterContainerProps => {
    const resolvedType = type === TOASTER_TYPE.Upload ? TOASTER_TYPE.SystemEvent : type;
    const base = {
      position: effectivePosition,
      width,
      stacked,
      limit,
      autoClose,
      displayCloseAllButton,
      draggable,
      draggableDirection: draggableDirection === 'auto' ? undefined : draggableDirection,
      containerId: playgroundContainerId,
      'data-test-id': dataTestId || undefined,
    };
    if (resolvedType === TOASTER_TYPE.UserAction) {
      return { type: TOASTER_TYPE.UserAction, ...base, position: effectivePosition as UserActionPosition };
    }
    return { type: TOASTER_TYPE.SystemEvent, ...base, position: effectivePosition as SystemEventPosition };
  };

  const open = () => {
    const next = counter + 1;
    setCounter(next);

    // В scopeToFrame идём через openToast с toasterParent, чтобы тосты жили
    // внутри локального бокса. JSX-контейнер в этом режиме не рендерится,
    // поэтому передаём containerProps явно.
    if (scopeToFrame) {
      const parent = frameRef.current ?? undefined;
      if (type === TOASTER_TYPE.SystemEvent) {
        openToast({
          type: TOASTER_TYPE.SystemEvent,
          toasterProps: {
            appearance: 'neutral',
            title: `Системное событие #${next}`,
            description: 'Заготовленная карточка для демонстрации настроек контейнера',
          } satisfies ToastSystemEventProps,
          containerProps: containerPropsForScope(),
          toasterParent: parent,
        });
        return;
      }
      if (type === TOASTER_TYPE.UserAction) {
        openToast({
          type: TOASTER_TYPE.UserAction,
          toasterProps: { appearance: 'success', label: `Действие выполнено #${next}` } satisfies ToastUserActionProps,
          containerProps: containerPropsForScope(),
          toasterParent: parent,
        });
        return;
      }
      openToast({
        type: TOASTER_TYPE.Upload,
        toasterProps: {
          title: 'Загрузка файлов',
          description: '2 из 3 файлов',
          status: 'loading',
          progress: { current: 2, total: 3 },
          files: [fileLoading, filePause, fileUploaded],
          generalActions: { onPause: () => {}, onContinue: () => {} },
          closable: true,
        } satisfies ToastUploadProps,
        containerProps: containerPropsForScope(),
        toastOptions: { id: 'playground-upload' },
        toasterParent: parent,
      });
      return;
    }

    if (type === TOASTER_TYPE.SystemEvent) {
      toaster.systemEvent.neutral({
        title: `Системное событие #${next}`,
        description: 'Заготовленная карточка для демонстрации настроек контейнера',
        containerId: playgroundContainerId,
      });
      return;
    }

    if (type === TOASTER_TYPE.UserAction) {
      toaster.userAction.success({ label: `Действие выполнено #${next}`, containerId: playgroundContainerId });
      return;
    }

    toaster.upload.startOrUpdate({
      id: 'playground-upload',
      title: 'Загрузка файлов',
      description: '2 из 3 файлов',
      status: 'loading',
      progress: { current: 2, total: 3 },
      files: [fileLoading, filePause, fileUploaded],
      generalActions: { onPause: () => {}, onContinue: () => {} },
      closable: true,
      containerId: playgroundContainerId,
    });
  };

  const dismissAll = () => {
    if (type === TOASTER_TYPE.SystemEvent) toaster.systemEvent.dismiss({ containerId: playgroundContainerId });
    if (type === TOASTER_TYPE.UserAction) toaster.userAction.dismiss({ containerId: playgroundContainerId });
    if (type === TOASTER_TYPE.Upload) toaster.upload.dismiss({ containerId: playgroundContainerId });
  };

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Настройки контейнера рулятся из Controls справа. Тост — заготовленный шаблон под выбранный <code>type</code>.
          UserAction поддерживает только <code>top-center</code> и <code>bottom-center</code>: если выбрана
          несовместимая позиция — она снапится на дефолт для текущего типа.
        </DemoHint>

        {clamped && (
          <DemoWarning>
            <code>position={position}</code> недопустим для <code>type={type}</code>. Использую{' '}
            <code>{effectivePosition}</code>.
          </DemoWarning>
        )}

        <DemoActions>
          <Button
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            label={`Открыть тост (${type})`}
            onClick={open}
            data-test-id={TEST_IDS.playground.triggerOpen}
          />
          <Button
            appearance={APPEARANCE.Critical}
            label='Закрыть все'
            onClick={dismissAll}
            data-test-id={TEST_IDS.playground.triggerReset}
          />
        </DemoActions>
      </DemoPanel>

      {scopeToFrame ? (
        <div className={styles.playgroundFrame} ref={frameRef} />
      ) : (
        <ToasterContainer
          type={type}
          position={effectivePosition as SystemEventPosition & UserActionPosition}
          width={width}
          stacked={stacked}
          limit={limit}
          autoClose={autoClose}
          displayCloseAllButton={displayCloseAllButton}
          draggable={draggable}
          draggableDirection={draggableDirection === 'auto' ? undefined : draggableDirection}
          containerId={playgroundContainerId}
          data-test-id={dataTestId || undefined}
        />
      )}
    </DemoPage>
  );
}

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Toaster/Toaster',
  component: PlaygroundDemo,
  parameters: { layout: 'fullscreen' },
  args: {
    type: TOASTER_TYPE.SystemEvent,
    position: POSITION_SYSTEM_EVENT.BottomRight,
    width: TOASTER_WIDTH.Auto,
    stacked: true,
    limit: 5,
    autoCloseEnabled: true,
    autoCloseMs: 5000,
    displayCloseAllButton: true,
    draggable: false,
    draggableDirection: 'auto',
    containerId: undefined,
    dataTestId: TEST_IDS.toasterContainer,
    scopeToFrame: false,
  },
  argTypes: {
    type: {
      control: 'radio',
      options: Object.values(TOASTER_TYPE),
      description: 'Тип контейнера.',
    },
    position: {
      control: 'select',
      options: ALL_POSITIONS,
      description:
        'Позиция контейнера. SystemEvent/Upload — 6 corner-точек, UserAction — top-center / bottom-center. ' +
        'Невалидные комбинации снапятся на дефолт для текущего типа с предупреждением в панели.',
    },
    width: {
      control: 'radio',
      options: Object.values(TOASTER_WIDTH),
      description: 'Ширина контейнера: auto (по контенту) или full (на всю ширину).',
    },
    stacked: {
      control: 'boolean',
      description: 'Свернуть тосты в collapsed-стек, раскрывать по hover. Не применяется для UserAction.',
      if: { arg: 'type', neq: TOASTER_TYPE.UserAction },
    },
    limit: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Максимум одновременно видимых тостов. Старые скрываются при превышении.',
    },
    autoCloseEnabled: {
      control: 'boolean',
      description: 'Включить автозакрытие. False → autoClose: false (тост закрывается только пользователем).',
    },
    autoCloseMs: {
      control: { type: 'number', min: 500, step: 500 },
      description: 'Дефолтное время автозакрытия (мс). Переопределяется per-toast `autoClose` опцией.',
      if: { arg: 'autoCloseEnabled', truthy: true },
    },
    displayCloseAllButton: {
      control: 'boolean',
      description: 'Кнопка «Закрыть все» при ≥ CLOSE_ALL_THRESHOLD (2) тостах. Не применяется для UserAction.',
      if: { arg: 'type', neq: TOASTER_TYPE.UserAction },
    },
    draggable: {
      control: 'boolean',
      description: 'Swipe-to-dismiss: тост закрывается свайпом мыши/пальцем. Для Upload не применяется.',
      if: { arg: 'type', neq: TOASTER_TYPE.Upload },
    },
    draggableDirection: {
      control: 'radio',
      options: ['auto', ...Object.values(DRAGGABLE_DIRECTION)] as DraggableDirectionArg[],
      description: 'Ось свайпа. auto — выводится из position: top-/bottom-center → y, иначе → x.',
      if: { arg: 'draggable', truthy: true },
    },
    containerId: {
      control: 'text',
      description: 'Явный id контейнера. По умолчанию — `playground-<type>` (отдельный на каждый тип в этой стори).',
    },
    dataTestId: {
      control: 'text',
      description: 'Override `data-test-id` корня контейнера. По умолчанию — `TEST_IDS.toasterContainer`.',
    },
    scopeToFrame: {
      control: 'boolean',
      description:
        '`toasterParent`: рендерит тосты внутри локального бокса (transform: translateZ(0) → containing block для position: fixed), а не на всём вьюпорте. Применяется при следующем спавне.',
    },
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.playground.triggerOpen)).toBeVisible();
  },
};
