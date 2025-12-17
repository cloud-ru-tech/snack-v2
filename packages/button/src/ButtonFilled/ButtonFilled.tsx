import cn from 'classnames';
import { forwardRef } from 'react';

import { APPEARANCE, HTML_TYPE, SIZE, TARGET } from '../constants';
import { ButtonPrivate } from '../helperComponents/ButtonPrivate';
import { CommonButtonProps } from '../types';
import { extractCommonButtonProps } from '../utils';
import styles from './styles.module.scss';

export type ButtonFilledProps = Omit<CommonButtonProps, 'iconPosition'>;

export const ButtonFilled = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonFilledProps>(
  (
    {
      className,
      size = SIZE.S,
      target = TARGET.Blank,
      type = HTML_TYPE.Button,
      appearance = APPEARANCE.Primary,
      tabIndex,
      fullWidth = false,
      ...rest
    },
    ref,
  ) => (
    <ButtonPrivate
      {...extractCommonButtonProps(rest)}
      className={cn(styles.button, className)}
      iconClassName={styles.icon}
      labelClassName={styles.label}
      size={size}
      fullWidth={fullWidth}
      target={target}
      type={type}
      appearance={appearance}
      tabIndex={tabIndex}
      ref={ref}
    />
  ),
);

ButtonFilled.displayName = 'ButtonFilled';

