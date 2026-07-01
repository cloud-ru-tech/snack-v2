import { Divider } from '@ds/divider';
import { PopoverPrivate } from '@ds/popover-private';
import { excludeSupportProps, extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import styles from '../../styles.module.scss';
import { DropdownProps } from '../../types';
import { DropdownBody } from '../DropdownBody';

/**
 * Desktop-поверхность Dropdown'а: popover (`PopoverPrivate`) с topBar / body / bottomBar.
 * Internal — наружу не реэкспортится; рендерится адаптивным `Dropdown` по контексту раскладки.
 */
export function DesktopDropdown({
  className,
  children,
  content,
  headline,
  headlineHint,
  search,
  footer,
  headerDivider,
  footerDivider,
  state,
  bodyPadding,
  trigger = 'click',
  placement = 'bottom-start',
  triggerRef,
  widthStrategy = 'gte',
  triggerClassName,
  ...rest
}: DropdownProps) {
  if (!children && !triggerRef) {
    return null;
  }

  const hasTopBar = Boolean(headline || headlineHint || search);

  return (
    <PopoverPrivate
      placement={placement}
      popoverContent={
        <div
          className={cn(styles.root, className)}
          {...extractSupportProps(rest)}
          data-acrylic-appearance='neutral'
          data-acrylic-level='2Level'
        >
          <div className={styles.acrylic} />
          <div className={styles.dropdownContent}>
            {hasTopBar && (
              <div className={styles.topBar}>
                {(headline || headlineHint) && (
                  <div className={styles.headlineWrapper}>
                    {headline}
                    {headlineHint}
                  </div>
                )}
                {search}
              </div>
            )}
            {hasTopBar && headerDivider && <Divider className={styles.dividerWrapper} />}
            <DropdownBody state={state} bodyPadding={bodyPadding}>
              {content}
            </DropdownBody>
            {footer && footerDivider && <Divider className={styles.dividerWrapper} />}
            {footer && <div className={styles.bottomBar}>{footer}</div>}
          </div>
        </div>
      }
      trigger={trigger}
      triggerRef={triggerRef}
      hasArrow={false}
      widthStrategy={widthStrategy}
      triggerClassName={cn(styles.defaultTriggerClassName, triggerClassName)}
      {...excludeSupportProps(rest)}
    >
      {children}
    </PopoverPrivate>
  );
}
