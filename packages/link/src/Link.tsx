import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ElementType } from 'react';

import { APPEARANCE, ROLE, TARGET } from './constants';
import styles from './styles.module.scss';
import { LinkProps } from './types';

/**
 * Link компонент
 */
export function Link<T extends ElementType = 'a'>({
  text = '',
  className,
  role = ROLE.Regular,
  appearance = APPEARANCE.Primary,
  insideText = false,
  underlined = false,
  truncateVariant,
  as,
  ...rest
}: LinkProps<T>) {
  const Component = as || 'a';

  let fallbackProps;

  if (Component === 'a') {
    /**
     * Обратно совместимые изменения с предыдущей версией.
     */
    fallbackProps = Object.assign(
      {
        target: rest?.target ?? TARGET.Blank,
        href: rest.href ?? undefined,
        download: rest.download,
        onClick: rest.onClick,
      },
      extractSupportProps(rest),
    );
    fallbackProps.rel = fallbackProps.target === TARGET.Blank ? 'noopener noreferrer' : undefined;
  } else {
    fallbackProps = rest;
  }

  return (
    <Component
      className={cn(styles.link, className)}
      {...fallbackProps}
      data-role={role}
      data-appearance={appearance}
      data-inside-text={insideText || undefined}
      data-underlined={underlined || undefined}
    >
      <div className={styles.content}>
        <span className={styles.opacityLayer} data-text-opacity>
          {insideText ? text : <TruncateString text={text} maxLines={1} variant={truncateVariant} />}
        </span>
      </div>
    </Component>
  );
}
