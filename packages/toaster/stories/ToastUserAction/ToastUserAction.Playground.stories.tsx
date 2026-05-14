import {
  TOAST_USER_ACTION_APPEARANCE,
  TOASTER_WIDTH,
  ToastUserAction,
  ToastUserActionAction,
  ToastUserActionAppearance,
} from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import styles from './stories.module.scss';
import { USER_ACTION_TEST_ID } from './testIds';

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

function buildAction(preset: ActionPreset, onClick: (e: unknown) => void): ToastUserActionAction | undefined {
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
    <div className={styles.playgroundPage}>
      <section className={styles.playgroundPanel}>
        <h3 className={styles.playgroundTitle}>ToastUserAction</h3>
        <p className={styles.playgroundHint}>
          Снэкбар-карточка по результату действия пользователя. Все props в панели Controls. Ось <code>width</code> в
          реальной системе задаётся контейнером (<code>ToasterContainer.width</code>), здесь эмулируется обёрткой для
          изолированного рендера.
        </p>
        <div className={width === TOASTER_WIDTH.Full ? styles.widthFull : styles.widthAuto} data-width={width}>
          <ToastUserAction {...props} action={buildAction(action, onActionClick)} />
        </div>
      </section>
    </div>
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
    'data-test-id': USER_ACTION_TEST_ID,
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
    await expect(within(canvasElement).getByTestId(USER_ACTION_TEST_ID)).toBeVisible();
  },
};
