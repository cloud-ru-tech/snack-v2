import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { ElementType } from 'react';

import { APPEARANCE, ROLE_APPEARANCE, TARGET } from './constants';
import styles from './styles.module.scss';
import { LinkProps } from './types';

/**
 * Link компонент
 */
export function Link<T extends ElementType = 'a'>({
  label = '',
  className,
  roleAppearance = ROLE_APPEARANCE.Regular,
  appearance = APPEARANCE.Primary,
  insideText = false,
  underlined = false,
  truncateVariant,
  as,
  innerRef,
  ...rest
}: LinkProps<T>) {
  const Component = as || 'a';

  const target = rest.target ?? TARGET.Blank;

  /**
   * Обратно совместимые изменения с предыдущей версией.
   */
  const fallbackProps =
    Component === 'a'
      ? Object.assign(
          {
            target,
            href: rest.href ?? undefined,
            download: rest.download,
            onClick: rest.onClick,
            rel: target === TARGET.Blank ? 'noopener noreferrer' : undefined,
          },
          extractSupportProps(rest),
        )
      : rest;

  return (
    <Component
      ref={innerRef}
      className={cn(styles.link, className)}
      {...fallbackProps}
      data-role-appearance={roleAppearance}
      data-appearance={appearance}
      data-inside-text={insideText || undefined}
      data-underlined={underlined || undefined}
    >
      <div className={styles.content}>
        <span className={styles.opacityLayer} data-text-opacity>
          {insideText ? label : <TruncateString text={label} maxLines={1} variant={truncateVariant} />}
        </span>
      </div>
    </Component>
  );
}

withInnerRefSupport(Link);
