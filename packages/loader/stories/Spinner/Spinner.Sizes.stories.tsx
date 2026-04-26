import { LOADER_SIZE, Spinner } from '@ds/loader';
import { Meta, StoryObj } from '@storybook/react';

import styles from './Spinner.Sizes.module.scss';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Loader/Spinner',
  component: Spinner,
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      {Object.values(LOADER_SIZE).map(size => (
        <Spinner key={size} size={size} />
      ))}
    </div>
  ),
};
