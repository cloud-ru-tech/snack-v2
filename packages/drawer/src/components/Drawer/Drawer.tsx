import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import { DrawerCustom } from '../DrawerCustom';
import { NESTED_DRAWER_PUSH_DISTANCE } from './constants';
import styles from './styles.module.scss';
import { DrawerProps } from './types';

/**
 * Drawer компонент
 */
export function Drawer({
  content,
  media,
  title,
  slotAfterHeadline,
  subtitle,
  onBackButtonClick,
  footer,
  nestedDrawer,
  className,
  ...rest
}: DrawerProps) {
  const showHeader = Boolean(title || subtitle || slotAfterHeadline);

  return (
    <DrawerCustom
      {...rest}
      className={cn(styles.drawer, className)}
      push={Boolean(nestedDrawer) && { distance: NESTED_DRAWER_PUSH_DISTANCE }}
    >
      {media}

      <div className={styles.safeAreaTop} />

      {showHeader && (
        <DrawerCustom.Header
          title={title}
          slotAfterHeadline={slotAfterHeadline}
          subtitle={subtitle}
          onBackButtonClick={onBackButtonClick}
          data-test-id={TEST_IDS.header}
        />
      )}

      <DrawerCustom.Body data-test-id={TEST_IDS.body} content={content} />

      <div className={styles.safeAreaBottom} />

      {footer && <DrawerCustom.Footer data-test-id={TEST_IDS.footer}>{footer}</DrawerCustom.Footer>}
    </DrawerCustom>
  );
}
