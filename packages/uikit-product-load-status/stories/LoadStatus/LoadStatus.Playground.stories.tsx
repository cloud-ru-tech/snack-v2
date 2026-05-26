import { PROGRESS_BAR_SIZE } from '@ds/progress-bar';
import { LoadStatus } from '@ds/uikit-product-load-status';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof LoadStatus> = {
  title: 'Uikit Product/LoadStatus',
  component: LoadStatus,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Label',
    value: 'Value',
    hint: 'Hint',
    progress: 60,
    size: PROGRESS_BAR_SIZE.S,
    valueType: 'none',
    showError: false,
    showErrorIcon: false,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    hint: { control: 'text' },
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: {
      control: 'radio',
      options: Object.values(PROGRESS_BAR_SIZE),
    },
    valueType: {
      control: 'radio',
      options: ['none', 'percent'],
    },
    showError: { control: 'boolean' },
    showErrorIcon: { control: 'boolean' },
    appearanceByProgress: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof LoadStatus>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Строка загрузки с опциональным заголовком, процентом и подсказкой.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.panel}>
            <LoadStatus {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
