import {
  TOAST_SYSTEM_EVENT_APPEARANCE,
  ToastSystemEvent,
  ToastSystemEventAppearance,
  ToastSystemEventProps,
} from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const linkPresets = {
  none: undefined,
  withHref: { label: 'Подробнее', href: '#' },
  withOnClick: { label: 'Открыть', href: '#', onClick: fn() },
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
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          {
            'Системная карточка-уведомление с заголовком, описанием, ссылкой и кнопками действий. В реальной системе размещается через ToasterContainer со стеком и autoClose-каскадом.'
          }
        </DemoHint>
        <DemoActions align='center'>
          <div className={styles.toastCell}>
            <ToastSystemEvent {...props} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
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
    'data-test-id': TEST_IDS.systemEventRoot,
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
    await expect(within(canvasElement).getByTestId(TEST_IDS.systemEventRoot)).toBeVisible();
  },
};
