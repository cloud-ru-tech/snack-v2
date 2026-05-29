import cn from 'classnames';
import { CSSProperties } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type TreeLineProps = {
  className?: string;
  /** Доп. инлайн-стили для контейнера (height/width передаются здесь, а не отдельными пропами). */
  style?: CSSProperties;
  halfWidth?: boolean;
  visible?: boolean;
  horizontal?: boolean;
};

export function TreeLine({ className, style, halfWidth, horizontal, visible }: TreeLineProps) {
  return (
    <div
      className={cn(styles.treeLine, className)}
      style={style}
      data-horizontal={horizontal || undefined}
      data-half-width={halfWidth || undefined}
      data-visible={visible || undefined}
      data-test-id={TEST_IDS.line}
    />
  );
}
