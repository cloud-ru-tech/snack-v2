import { Alert, APPEARANCE } from '@ds/alert';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Alert>;

const appearances = [
  APPEARANCE.Neutral,
  APPEARANCE.Primary,
  APPEARANCE.Info,
  APPEARANCE.Success,
  APPEARANCE.Warning,
  APPEARANCE.Error,
];

export const Appearances: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.stack}>
      {appearances.map(a => (
        <Alert key={a} appearance={a} title={`Alert ${a}`} description={`Описание для варианта ${a}`} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alerts = within(canvasElement).getAllByRole('alert');
    expect(alerts.length).toBe(appearances.length);
  },
};
