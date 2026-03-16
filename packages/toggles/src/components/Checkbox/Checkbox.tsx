import { CheckSVG, MinusSVG } from '@design-system/icons';
import { LOADER_SIZE, Spinner } from '@design-system/loader';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { MODE, SIZE } from '../../constants';
import { ToggleProps } from '../../types';
import { getIconSize, getVisualStateAttributes } from '../../utils';
import styles from './styles.module.scss';

export type CheckboxProps = ToggleProps & {
  /** Состояние частичного выбора */
  indeterminate?: boolean;
  /** Состояние частичного выбора по-умолчанию */
  indeterminateDefault?: boolean;
};

const SPINNER_SIZE_MAP = {
  [SIZE.XS]: LOADER_SIZE.XS,
  [SIZE.S]: LOADER_SIZE.S,
};

function Icon({
  size,
  checked,
  indeterminate,
  loading,
}: Required<Pick<CheckboxProps, 'checked' | 'indeterminate' | 'loading' | 'size'>>) {
  if (loading) {
    return <Spinner size={SPINNER_SIZE_MAP[size]} />;
  }

  const iconSize = getIconSize(size);

  if (checked) {
    return <CheckSVG className={styles.icon} size={iconSize} />;
  }

  if (indeterminate) {
    return <MinusSVG className={styles.icon} size={iconSize} />;
  }

  return null;
}

export function Checkbox({
  inputRef,
  checked: checkedProp,
  defaultChecked,
  indeterminate: indeterminateProp,
  indeterminateDefault,
  onChange: onChangeProp,
  onBlur,
  onFocus,
  disabled = false,
  loading = false,
  size = SIZE.XS,
  className,
  'data-test-id': dataTestId,
  ...otherProps
}: CheckboxProps) {
  const localRef = useRef<HTMLInputElement>(null);
  const ref = mergeRefs<HTMLInputElement>(localRef, inputRef);

  const [indeterminate, setIndeterminate] = useUncontrolledProp(indeterminateProp, indeterminateDefault);
  const [checked, setChecked] = useUncontrolledProp(checkedProp, Boolean(defaultChecked), onChangeProp);
  const [focusVisible, setFocusVisible] = useState(false);

  const onChange = useCallback(
    (checked: boolean) => {
      setChecked?.(checked);
      setIndeterminate(false);
    },
    [setChecked, setIndeterminate],
  );

  useEffect(() => {
    if (localRef.current) {
      localRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [localRef, indeterminate]);

  const stateDataAttributes = getVisualStateAttributes({
    loading,
    disabled,
    checked: indeterminate || checked,
  });

  return (
    <span
      className={cn(styles.root, className)}
      role={MODE.Checkbox}
      data-size={size}
      {...stateDataAttributes}
      data-indeterminate={indeterminate || undefined}
      data-test-id={dataTestId || undefined}
    >
      <div className={styles.container}>
        <div className={styles.framing} {...stateDataAttributes} data-focusvisible={focusVisible || undefined}>
          <div className={styles.backgroundStateLayer} data-state='regularBackground' />
          <div className={styles.flag}>
            <div
              className={styles.surface}
              {...stateDataAttributes}
              data-text-opacity={indeterminate || checked || undefined}
            >
              <Icon size={size} loading={Boolean(loading)} indeterminate={Boolean(indeterminate)} checked={checked} />
            </div>
          </div>
        </div>

        {!loading && (
          <input
            {...otherProps}
            data-test-id={dataTestId ? `${dataTestId}-native-input` : undefined}
            ref={ref}
            type={MODE.Checkbox}
            className={styles.inputPrivate}
            checked={checked}
            disabled={disabled}
            onChange={e => onChange(e.target.checked)}
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
