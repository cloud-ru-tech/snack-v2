import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

import { APPEARANCE, SIZE, TEST_IDS } from './constants';
import styles from './styles.module.scss';
import { Appearance, Size } from './types';
import { getLayerState } from './utils';

export type AiSuggestionSimpleProps = WithSupportProps<{
  /** Текст подсказки */
  label?: string;
  /** Иконка слева от текста */
  icon?: ReactNode;
  /** Внешний вид (Figma: Primary On/Off) */
  appearance?: Appearance;
  /** Размер (Figma: Mobile Off → `s`, Mobile On → `m`) */
  size?: Size;
  /** Блокирует взаимодействие */
  disabled?: boolean;
  /** Дополнительный CSS-класс */
  className?: string;
}> &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'tabIndex' | 'onClick'>;

export function AiSuggestionSimple({
  label = 'Label text',
  icon,
  appearance = APPEARANCE.Neutral,
  size = SIZE.S,
  disabled = false,
  tabIndex,
  onClick,
  className,
  ...rest
}: AiSuggestionSimpleProps) {
  const layerState = getLayerState(appearance);
  const rootTestId = rest['data-test-id'] ?? TEST_IDS.root;

  return (
    <button
      type='button'
      className={cn(styles.chip, className)}
      {...extractSupportProps(rest)}
      data-size={size}
      data-appearance={appearance}
      data-disabled={disabled || undefined}
      data-test-id={rootTestId}
      disabled={disabled}
      tabIndex={tabIndex}
      onClick={disabled ? undefined : onClick}
    >
      <span className={styles.stateLayer} aria-hidden data-state={layerState} />

      <span className={styles.content}>
        {icon && (
          <span className={styles.icon} data-test-id={TEST_IDS.icon}>
            {icon}
          </span>
        )}

        {label && (
          <span className={styles.labelContainer}>
            <span className={styles.label} data-test-id={TEST_IDS.label}>
              {label}
            </span>
          </span>
        )}
      </span>
    </button>
  );
}
