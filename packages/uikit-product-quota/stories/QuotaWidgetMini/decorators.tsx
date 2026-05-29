import type { Decorator } from '@storybook/react';

import styles from './styles.module.scss';

export const withMiniWidth: Decorator = Story => (
  <div className={styles.miniWidth}>
    <Story />
  </div>
);
