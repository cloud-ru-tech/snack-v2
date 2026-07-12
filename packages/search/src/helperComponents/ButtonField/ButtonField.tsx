import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons';
import { Sun, SUN_SIZE } from '@ds/loader';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import { type KeyboardEvent, ReactNode, useCallback, useMemo, useState } from 'react';

import { SIZE } from './constants';
import styles from './styles.module.scss';
import { Size, Variant } from './types';
import { getIconSize } from './utils';

export type ButtonFieldProps = WithSupportProps<{
  /** Вариант (положение) кнопки */
  variant: Variant;
  /**
   * Размер кнопки
   * @default 'm'
   */
  size?: Size;
  /** Состояние загрузки */
  loading?: boolean;
  /** Деактивирован ли компонент */
  disabled?: boolean;
  /** Слот для кнопки/иконки/аватара */
  action: ReactNode;
  /** Отображение шеврона */
  withDropdownList?: boolean;
  /** Действие при клике */
  onClick(): void;
}>;

const SUN_SIZE_MAP = {
  [SIZE.S]: SUN_SIZE.XS,
  [SIZE.M]: SUN_SIZE.S,
  [SIZE.L]: SUN_SIZE.S,
};

export function ButtonField({
  size = SIZE.M,
  loading = false,
  disabled = false,
  onClick,
  withDropdownList,
  variant = 'after',
  action,
  ...rest
}: ButtonFieldProps) {
  const [isListOpen, setListOpen] = useState<boolean>(false);
  const [stateLayerPressed, setStateLayerPressed] = useState(false);
  const iconSize = useMemo(() => getIconSize(size), [size]);

  const handleListToggleClick = useCallback(() => {
    setListOpen(prevOpen => !prevOpen);
    onClick();
  }, [onClick]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled || loading) {
        return;
      }
      if (event.key === 'Enter' && !event.repeat) {
        setStateLayerPressed(true);
      }
    },
    [disabled, loading],
  );

  const handleKeyUp = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      setStateLayerPressed(false);
    }
  }, []);

  const handleBlur = useCallback(() => {
    setStateLayerPressed(false);
  }, []);

  return (
    <button
      className={styles.buttonContainer}
      onClick={loading || disabled ? undefined : handleListToggleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
      disabled={disabled || loading || undefined}
      data-size={size}
      data-variant={variant}
      data-loading={loading || undefined}
      data-disabled={disabled || undefined}
      data-pressed={stateLayerPressed ? true : undefined}
      {...extractSupportProps(rest)}
    >
      <div className={styles.backgroundStateLayer} data-state='regularFilled' />
      <div className={styles.elementWrapper}>
        {loading && !disabled ? <Sun size={SUN_SIZE_MAP[size]} /> : action}
        {withDropdownList && (
          <div className={styles.chevron}>
            {isListOpen ? <ChevronUpSVG size={iconSize} /> : <ChevronDownSVG size={iconSize} />}
          </div>
        )}
      </div>
    </button>
  );
}
