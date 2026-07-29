import { extractSupportProps, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { ElementType, MouseEventHandler } from 'react';

import { APPEARANCE, SIZE } from '../../constants';
import { TagLinkProps } from '../../types';
import styles from '../TagBase/styles.module.scss';

const TARGET_BLANK = '_blank';

export function TagLink<T extends ElementType = 'a'>({
  label,
  size = SIZE.S,
  appearance = APPEARANCE.Neutral,
  className,
  tabIndex,
  as,
  innerRef,
  ...rest
}: TagLinkProps<T>) {
  const Component: ElementType = as ?? 'a';

  const baseProps = {
    ref: innerRef,
    ...extractSupportProps(rest),
    className: cn(styles.tag, className),
    'data-tag-link': true,
    'data-size': size,
    'data-appearance': appearance,
    tabIndex,
  };

  if (Component === 'a') {
    const { href, target, onClick, ...anchorRest } = rest as {
      href?: string;
      target?: string;
      onClick?: MouseEventHandler<HTMLAnchorElement>;
    };
    return (
      <a
        {...baseProps}
        {...anchorRest}
        href={href ?? '#'}
        target={target}
        rel={target === TARGET_BLANK ? 'noopener noreferrer' : undefined}
        onClick={onClick}
      >
        <span className={styles.textWrapper}>
          <span className={styles.label}>{label}</span>
        </span>
      </a>
    );
  }

  return (
    <Component {...baseProps} {...rest}>
      <span className={styles.textWrapper}>
        <span className={styles.label}>{label}</span>
      </span>
    </Component>
  );
}

withInnerRefSupport(TagLink);
