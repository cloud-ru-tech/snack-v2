import { SheetBodyProps, useOverlayBodyHeightAuto } from '@ds/bottom-sheet';
import { Scroll } from '@ds/scroll';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import styles from './styles.module.scss';

export type DrawerBodyProps = SheetBodyProps;

/** Body дровера (desktop): `Scroll`; высота-по-контенту — из overlay-контекста. */
export function DrawerBody({ content, children, bodyPadding = true, className, ...rest }: DrawerBodyProps) {
  const heightAutoVertical = useOverlayBodyHeightAuto();

  return (
    <Scroll
      size='m'
      barHideStrategy='never'
      className={cn(styles.body, heightAutoVertical && styles.bodyHeightAuto, className)}
      data-no-padding={bodyPadding === false || undefined}
      {...extractSupportProps(rest)}
    >
      {children ?? content}
    </Scroll>
  );
}
