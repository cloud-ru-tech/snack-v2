import type { Decorator } from '@storybook/react';

import styles from './styles.module.scss';

/** Storybook-only: trigger aligned to the right edge of the canvas. */
export const quotaWidgetStoryDecorator: Decorator = Story => (
  <div className={styles.storyWrapper}>
    <Story />
  </div>
);
