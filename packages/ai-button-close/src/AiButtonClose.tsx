import { CrossSVG } from '@ds/icons/interface/system';
import cn from 'classnames';
import { ReactElement } from 'react';

import { SIZE, TEST_IDS } from './constants';
import { aiButtonCloseLocale } from './locale';
import styles from './styles.module.scss';
import { AiButtonCloseProps } from './types';

const ICON_SIZE = {
  [SIZE.Xs]: 16,
  [SIZE.S]: 24,
  [SIZE.M]: 32,
} as const;

export function AiButtonClose({
  size = SIZE.S,
  outline = false,
  disabled = false,
  className,
  onClick,
  'aria-label': ariaLabel,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiButtonCloseProps): ReactElement {
  const { t } = aiButtonCloseLocale.useTranslations();
  const hasOutline = size === SIZE.Xs || (outline && size !== SIZE.M);

  return (
    <button
      {...rest}
      type='button'
      className={cn(styles.root, className)}
      disabled={disabled}
      data-size={size}
      data-outline={hasOutline || undefined}
      data-disabled={disabled || undefined}
      data-test-id={dataTestId}
      aria-label={ariaLabel ?? t('close')}
      onClick={onClick}
    >
      <CrossSVG size={ICON_SIZE[size]} aria-hidden />
    </button>
  );
}
