import {
  TOAST_SYSTEM_EVENT_APPEARANCE,
  ToastSystemEvent,
  ToastSystemEventAppearance,
  ToastSystemEventProps,
} from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import styles from './stories.module.scss';
import { SYSTEM_EVENT_TEST_ID } from './testIds';

const linkPresets = {
  none: undefined,
  withHref: { text: 'Подробнее', href: '#' },
  withOnClick: { text: 'Открыть', href: '#', onClick: fn() },
};

const actionPresets = {
  none: undefined,
  one: [{ label: 'Действие', onClick: fn() }],
  twoPrimarySecondary: [
    { label: 'Основное', onClick: fn() },
    { label: 'Отмена', onClick: fn() },
  ],
};

const autoClosePresets = {
  off: false as const,
  '2000': 2000,
  '5000': 5000,
  '10000': 10000,
};

type PlaygroundArgs = {
  title: string;
  description?: string;
  appearance: ToastSystemEventAppearance;
  progressBar: boolean;
  closable: boolean;
  autoClose: ToastSystemEventProps['autoClose'];
  link: ToastSystemEventProps['link'];
  action: ToastSystemEventProps['action'];
  onCloseClick: ToastSystemEventProps['onCloseClick'];
  'data-test-id'?: string;
};

function PlaygroundCard(props: PlaygroundArgs) {
  return (
    <div className={styles.playgroundPage}>
      <section className={styles.playgroundPanel}>
        <h3 className={styles.playgroundTitle}>ToastSystemEvent</h3>
        <p className={styles.playgroundHint}>
          Системная карточка-уведомление с заголовком, описанием, ссылкой и кнопками действий. Все props в панели
          Controls. В реальной системе размещается через <code>ToasterContainer</code> со стеком и autoClose-каскадом.
        </p>
        <div className={styles.toastCell}>
          <ToastSystemEvent {...props} />
        </div>
      </section>
    </div>
  );
}

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Toaster/ToastSystemEvent',
  component: PlaygroundCard,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Заголовок уведомления',
    description: 'Короткое описание события',
    appearance: TOAST_SYSTEM_EVENT_APPEARANCE.Neutral,
    progressBar: true,
    closable: true,
    autoClose: 5000,
    link: undefined,
    action: undefined,
    onCloseClick: fn(),
    'data-test-id': SYSTEM_EVENT_TEST_ID,
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    appearance: { control: 'radio', options: Object.values(TOAST_SYSTEM_EVENT_APPEARANCE) },
    closable: { control: 'boolean' },
    progressBar: { control: 'boolean' },
    autoClose: {
      control: 'select',
      options: Object.keys(autoClosePresets),
      mapping: autoClosePresets,
    },
    link: {
      control: 'select',
      options: Object.keys(linkPresets),
      mapping: linkPresets,
    },
    action: {
      control: 'select',
      options: Object.keys(actionPresets),
      mapping: actionPresets,
    },
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SYSTEM_EVENT_TEST_ID)).toBeVisible();
  },
};
