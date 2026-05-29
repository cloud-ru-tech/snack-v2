import type { Decorator } from '@storybook/react';

import styles from './styles.module.scss';

/** Figma card width — only on single-card stories (not VisualMatrix: shared meta decorators apply to all stories). */
export const withCardWidth: Decorator = Story => (
  <div className={styles.cardWidth}>
    <Story />
  </div>
);
