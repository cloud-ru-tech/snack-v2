import { SheetBodyProps, useOverlayBodyHeightAuto } from '@ds/bottom-sheet';
import { Scroll } from '@ds/scroll';
import { extractSupportProps, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';

import styles from './styles.module.scss';

export type DrawerBodyProps = SheetBodyProps;

/** Body дровера (desktop): `Scroll`; высота-по-контенту — из overlay-контекста. */
export function DrawerBody({ content, children, bodyPadding = true, innerRef, className, ...rest }: DrawerBodyProps) {
  const heightAutoVertical = useOverlayBodyHeightAuto();

  return (
    <Scroll
      ref={innerRef}
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

withInnerRefSupport(DrawerBody);
