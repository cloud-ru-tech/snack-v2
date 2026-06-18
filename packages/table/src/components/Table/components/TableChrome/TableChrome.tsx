import { forwardRef, ReactNode } from 'react';

import { ControlsAcrylicAttrs, ControlsChrome } from '../../../../helperComponents';
import styles from '../../styles.module.scss';

type TableChromeProps = {
  children: ReactNode;
  acrylic?: ControlsAcrylicAttrs | null;
  variant: 'header' | 'footer';
};

/** Sticky toolbar/pagination chrome — ref нужен для измерения высоты тулбара (`TABLE_CSS_VARS.stickyToolbarOffset`). */
export const TableChrome = forwardRef<HTMLDivElement, TableChromeProps>(function TableChrome(
  { children, acrylic, variant },
  ref,
) {
  const className = variant === 'header' ? styles.toolbarWrapper : styles.stickyFooter;

  if (acrylic) {
    return (
      <ControlsChrome ref={ref} className={className} acrylic={acrylic}>
        {children}
      </ControlsChrome>
    );
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
});
