import { CheckSVG } from '@ds/icons/interface/system';
import { LOADER_SIZE, Spinner } from '@ds/loader';
import { useUncontrolledProp } from '@ds/utils';
import cn from 'classnames';
import { useState } from 'react';

import { MODE, NATIVE_INPUT_SUFFIX, SIZE } from '../../constants';
import { ToggleProps } from '../../types';
import { getIconSize, getVisualStateAttributes } from '../../utils';
import styles from './styles.module.scss';

export type SwitchProps = ToggleProps & {
  /** Показывать ли иконку внутри ползунка. Спиннер в состоянии `loading` показывается независимо */
  showIcon?: boolean;
};

const SPINNER_SIZE_MAP = {
  [SIZE.XS]: LOADER_SIZE.XS,
  [SIZE.S]: LOADER_SIZE.S,
};

function Icon({ size, loading }: Required<Pick<SwitchProps, 'loading' | 'size'>>) {
  if (loading) {
    return <Spinner size={SPINNER_SIZE_MAP[size]} className={styles.spinner} />;
  }

  const iconSize = getIconSize(size);

  return <CheckSVG aria-hidden className={styles.icon} size={iconSize} />;
}

export function Switch({
  inputRef,
  checked: checkedProp,
  defaultChecked,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  loading = false,
  showIcon = false,
  size = SIZE.S,
  className,
  'data-test-id': dataTestId,
  ...otherProps
}: SwitchProps) {
  const [checked, setChecked] = useUncontrolledProp(checkedProp, Boolean(defaultChecked), onChange);
  const [focusVisible, setFocusVisible] = useState(false);

  const stateDataAttributes = getVisualStateAttributes({
    loading,
    disabled,
    checked,
  });

  return (
    <span
      className={cn(styles.root, className)}
      role={MODE.Checkbox}
      data-size={size}
      {...stateDataAttributes}
      data-focusvisible={focusVisible || undefined}
      data-test-id={dataTestId || undefined}
    >
      <div className={styles.container}>
        <div className={styles.framing} {...stateDataAttributes}>
          <div className={styles.backgroundStateLayer} data-state='emptyDarkOnAccent' />
          <div className={styles.flag}>
            <div className={styles.surface} {...stateDataAttributes}>
              {(showIcon || loading) && <Icon size={size} loading={Boolean(loading)} />}
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
