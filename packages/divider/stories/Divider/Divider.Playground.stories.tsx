import { Divider, ORIENTATION, VARIANT } from '@ds/divider';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'fullscreen' },
  args: {
    variant: VARIANT.Regular,
    orientation: ORIENTATION.Horizontal,
    className: '',
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Толщина линии (regular: 1px, thin: 0.5px)',
    },
    orientation: {
      control: 'radio',
      options: Object.values(ORIENTATION),
      description: 'Ориентация разделителя',
    },
    className: { control: 'text', table: { category: 'Testing' } },
    'data-test-id': { control: 'text', table: { category: 'Testing' } },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Разделитель: горизонтальный или вертикальный, варианты по толщине линии.</DemoHint>
        <DemoActions block>
          {args.orientation === ORIENTATION.Vertical ? (
            <div className={styles.verticalRow}>
              <span className={styles.verticalRowLabel}>Left</span>
              <div className={styles.verticalRowDividerCell}>
                <Divider {...args} />
              </div>
              <span className={styles.verticalRowLabel}>Right</span>
            </div>
          ) : (
            <div className={styles.horizontalWrapper}>
              <Divider {...args} />
            </div>
          )}
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
