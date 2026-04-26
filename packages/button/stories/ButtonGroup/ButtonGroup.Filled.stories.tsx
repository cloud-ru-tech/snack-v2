import { ButtonGroup } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Filled: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.narrow}>
      <ButtonGroup
        data-test-id='button-group'
        filled
        primaryAction={{ label: 'Применить', appearance: 'primary', view: 'filled' }}
        secondaryAction={{ label: 'Сбросить', appearance: 'neutral', view: 'outline' }}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const buttons = within(canvasElement).getAllByRole('button');
    await expect(buttons).toHaveLength(2);
  },
};
