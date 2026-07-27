import { HeartFilledSVG, HeartSVG, StarFilledSVG, StarSVG } from '@ds/icons/interface/system';
import { LOADER_SIZE, Spinner } from '@ds/loader';
import { useUncontrolledProp } from '@ds/utils';
import cn from 'classnames';
import { KeyboardEventHandler, useState } from 'react';

import { FAVOURITE_ICON, MODE, NATIVE_INPUT_SUFFIX, SIZE } from '../../constants';
import { FavouriteIcon, ToggleProps } from '../../types';
import { getIconSize } from '../../utils';
import styles from './styles.module.scss';

export type FavouriteProps = ToggleProps & {
  /** Вариант иконки: звезда или сердце */
  icon?: FavouriteIcon;
  /** Обработчик keyup */
  onKeyUp?: KeyboardEventHandler<HTMLSpanElement>;
};

const SPINNER_SIZE_MAP = {
  [SIZE.XS]: LOADER_SIZE.XS,
  [SIZE.S]: LOADER_SIZE.S,
};

const ICONS = {
  [FAVOURITE_ICON.Star]: { checked: StarFilledSVG, unchecked: StarSVG },
  [FAVOURITE_ICON.Heart]: { checked: HeartFilledSVG, unchecked: HeartSVG },
} as const;

function Icon({
  size,
  checked,
  loading,
  variant,
  disabled,
}: Required<Pick<FavouriteProps, 'checked' | 'loading' | 'size' | 'disabled'>> & { variant: FavouriteIcon }) {
  if (loading) {
    return <Spinner size={SPINNER_SIZE_MAP[size]} />;
  }

  const iconSize = getIconSize(size);
  const IconComponent = checked ? ICONS[variant].checked : ICONS[variant].unchecked;

  return (
    <IconComponent
      className={styles.icon}
      size={iconSize}
      data-checked={checked}
      data-variant={variant}
      data-disabled={disabled || undefined}
    />
  );
}

export function Favourite({
  inputRef,
  checked: checkedProp,
  defaultChecked,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  loading = false,
  size = SIZE.S,
  className,
  'data-test-id': dataTestId,
  icon = FAVOURITE_ICON.Heart,
  ...otherProps
}: FavouriteProps) {
  const [checked, setChecked] = useUncontrolledProp(checkedProp, Boolean(defaultChecked), onChange);
  const [focusVisible, setFocusVisible] = useState(false);

  return (
    <span
      className={cn(styles.root, className)}
      role={MODE.Checkbox}
      data-size={size}
      data-icon={icon}
      data-loading={loading}
      data-disabled={disabled}
      data-checked={checked}
      data-focusvisible={focusVisible || undefined}
      data-test-id={dataTestId}
    >
      <div className={styles.container}>
        <div className={styles.framing}>
          <div className={styles.flag}>
            <div className={styles.surface} data-text-opacity={(!loading && !disabled) || undefined}>
              <Icon size={size} checked={checked} variant={icon} loading={loading} disabled={disabled} />
            </div>
          </div>
        </div>

        {!loading && (
          <input
            {...otherProps}
            data-test-id={dataTestId ? `${dataTestId}${NATIVE_INPUT_SUFFIX}` : undefined}
            ref={inputRef}
            type={MODE.Checkbox}
            className={styles.inputPrivate}
            checked={checked}
            disabled={disabled}
            onChange={e => setChecked(e.target.checked)}
            onFocus={event => {
              setFocusVisible(event.target.matches(':focus-visible'));
              onFocus?.(event);
            }}
            onBlur={event => {
              setFocusVisible(false);
              onBlur?.(event);
            }}
          />
        )}
      </div>
    </span>
  );
}
