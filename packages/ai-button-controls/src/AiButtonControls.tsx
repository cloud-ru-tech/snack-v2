import { ChevronDownSVG, ChevronLeftSVG, ChevronRightSVG } from '@ds/icons/interface/system';
import cn from 'classnames';
import { ReactElement } from 'react';

import { DIRECTION, TEST_IDS } from './constants';
import { aiButtonControlsLocale } from './locale';
import styles from './styles.module.scss';
import { AiButtonControlsProps } from './types';

const ICONS = {
  [DIRECTION.Left]: ChevronLeftSVG,
  [DIRECTION.Right]: ChevronRightSVG,
  [DIRECTION.Down]: ChevronDownSVG,
} as const;

export function AiButtonControls({
  direction,
  disabled = false,
  className,
  onClick,
  'aria-label': ariaLabel,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiButtonControlsProps): ReactElement {
  const { t } = aiButtonControlsLocale.useTranslations();
  const Icon = ICONS[direction];

  return (
    <button
      {...rest}
      type='button'
      className={cn(styles.root, className)}
      disabled={disabled}
      data-direction={direction}
      data-disabled={disabled || undefined}
      data-test-id={dataTestId}
      aria-label={ariaLabel ?? t(direction)}
      onClick={onClick}
    >
      <Icon size={24} aria-hidden />
    </button>
  );
}
