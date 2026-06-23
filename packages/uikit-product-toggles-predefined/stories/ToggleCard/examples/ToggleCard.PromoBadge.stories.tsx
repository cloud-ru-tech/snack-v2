import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { WithPromoBadge } from '../../../demos/examples/WithPromoBadge';
import { TEST_IDS } from '../../../src/constants';
import styles from '../styles.module.scss';

const meta: Meta = {
  title: 'Uikit Product/TogglesPredefined/ToggleCard/Examples/PromoBadge',
};

export default meta;
type Story = StoryObj;

export const PromoBadge: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>PromoBadge</DemoTitle>
        <DemoHint>
          promoBadge — PromoTag в правом верхнем углу карточки: строка или объект с text и appearance.
        </DemoHint>
        <DemoActions align='center'>
          <div className={styles.panel}>
            <WithPromoBadge />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByTestId(TEST_IDS.promoBadge)).toHaveLength(2);
  },
};
