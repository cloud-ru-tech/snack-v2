import {
  TOAST_USER_ACTION_APPEARANCE,
  TOASTER_WIDTH,
  ToastUserAction,
  ToastUserActionAction,
  ToastUserActionAppearance,
} from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

// Figma master `toastUserAction` (7084:541) выкатывает 4 variant-оси: status,
// width, load, timer. Status/load/timer ложатся в публичные пропы (appearance/
// loading/timer); width — это контейнерная ось (ToasterContainer.width), её
// эмулируем обёрткой класса для изолированного рендера в Playground.
type WidthMode = 'auto' | 'full';
type ActionPreset = 'none' | 'labelOnly' | 'link';

type PlaygroundArgs = {
  label: string;
  appearance: ToastUserActionAppearance;
  loading: boolean;
  timer: boolean;
  width: WidthMode;
  action: ActionPreset;
  onActionClick: (e: unknown) => void;
  'data-test-id'?: string;
};

function buildAction(
  preset: ActionPreset,
  onClick: (e: unknown) => void,
): ToastUserActionAction<'button'> | ToastUserActionAction<'a'> | undefined {
  switch (preset) {
    case 'labelOnly':
      return { label: 'Отменить', onClick };
    case 'link':
      return {
        label: 'Подробнее',
        as: 'a',
        href: '#',
        onClick: (e: { preventDefault?(): void }) => {
          e.preventDefault?.();
          onClick(e);
        },
      };
    case 'none':
    default:
      return undefined;
  }
}

function PlaygroundCard({ width, action, onActionClick, ...props }: PlaygroundArgs) {
  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          {
            'Снэкбар-карточка по результату действия пользователя. Ось width в реальной системе задаётся контейнером (ToasterContainer.width), здесь эмулируется обёрткой для изолированного рендера.'
          }
        </DemoHint>
        <DemoActions align='center'>
          <div className={width === TOASTER_WIDTH.Full ? styles.widthFull : styles.widthAuto} data-width={width}>
            <ToastUserAction {...props} action={buildAction(action, onActionClick)} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Toaster/ToastUserAction',
  component: PlaygroundCard,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Изменения сохранены',
    appearance: TOAST_USER_ACTION_APPEARANCE.Success,
    loading: false,
    timer: true,
    action: 'labelOnly',
    width: TOASTER_WIDTH.Auto,
    onActionClick: fn(),
    'data-test-id': TEST_IDS.userActionRoot,
  },
  argTypes: {
    label: { control: 'text' },
    'data-test-id': { control: 'text' },
    appearance: {
      control: 'radio',
      options: Object.values(TOAST_USER_ACTION_APPEARANCE),
    },
    loading: { control: 'boolean' },
    timer: { control: 'boolean' },
    width: {
      control: 'radio',
      options: Object.values(TOASTER_WIDTH),
      description:
        'Figma variant axis `width`. В реальной системе задаётся через `ToasterContainer.width`; здесь — обёртка для изоляции карточки.',
    },
    action: {
      control: 'select',
      options: ['none', 'labelOnly', 'link'] satisfies ActionPreset[],
      description:
        'Пресет action-слота: `none` — без кнопки; `labelOnly` — текстовая `<button>`; `link` — `as="a"` со ссылкой.',
    },
    onActionClick: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.userActionRoot)).toBeVisible();
  },
};
