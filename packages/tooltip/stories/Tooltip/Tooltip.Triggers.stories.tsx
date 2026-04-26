import { Tooltip, TRIGGER } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Triggers: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Tooltip tip='Открывается по hover' trigger={TRIGGER.Hover}>
        <button type='button' data-test-id='tooltip-trigger-hover'>
          Hover
        </button>
      </Tooltip>
      <Tooltip tip='Открывается по клику' trigger={TRIGGER.Click}>
        <button type='button' data-test-id='tooltip-trigger-click'>
          Click
        </button>
      </Tooltip>
      <Tooltip tip='Hover и focus-visible' trigger={TRIGGER.HoverAndFocusVisible}>
        <button type='button' data-test-id='tooltip-trigger-hover-focus'>
          Hover + Focus
        </button>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('tooltip-trigger-hover')).toBeVisible();
    await expect(within(canvasElement).getByTestId('tooltip-trigger-click')).toBeVisible();
    await expect(within(canvasElement).getByTestId('tooltip-trigger-hover-focus')).toBeVisible();
  },
};
