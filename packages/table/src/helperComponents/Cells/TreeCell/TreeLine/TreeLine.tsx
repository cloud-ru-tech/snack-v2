import cn from 'classnames';

import styles from './styles.module.scss';

export type TreeLineProps = {
  halfHeight?: boolean;
  visible?: boolean;
  horizontal?: boolean;
  /** У листа без chevron: отвод через слот chevron с gap до cellToggles */
  extended?: boolean;
  className?: string;
};

export function TreeLine({ halfHeight, horizontal, visible, extended, className }: TreeLineProps) {
  return (
    <div
      className={cn(styles.treeLine, className)}
      data-horizontal={horizontal || undefined}
      data-extended={extended || undefined}
      data-half-height={halfHeight || undefined}
      data-visible={visible || undefined}
    />
  );
}
