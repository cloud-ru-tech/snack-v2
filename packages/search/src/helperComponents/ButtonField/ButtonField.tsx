import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons/interface/system';
import { Droplist, DroplistProps } from '@ds/list';
import { Sun, SUN_SIZE } from '@ds/loader';
import { extractSupportProps, useValueControl, WithSupportProps } from '@ds/utils';
import { type KeyboardEvent, ReactNode, useCallback, useMemo, useState } from 'react';

import { SIZE } from './constants';
import styles from './styles.module.scss';
import { Size, Variant } from './types';
import { getIconSize } from './utils';

/**
 * Конфигурация встроенного выпадающего списка (действия / выбор) на `@ds/list` `Droplist`.
 */
export type ButtonFieldDroplistProps = Pick<
  DroplistProps,
  | 'items'
  | 'pinTop'
  | 'pinBottom'
  | 'selection'
  | 'search'
  | 'scroll'
  | 'scrollToSelectedItem'
  | 'placement'
  | 'widthStrategy'
  | 'virtualized'
  | 'closeDroplistOnItemClick'
  | 'data-test-id'
> & {
  /** Контролируемое состояние раскрытия */
  open?: boolean;
  /** Колбек смены состояния раскрытия */
  onOpenChange?(open: boolean): void;
};

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
  /** Отображение шеврона. По умолчанию `true` если передан `droplist`" */
  showDroplistChevron?: boolean;
  /**
   * Пропсы выпадающего списка (`Droplist`). Если переданы — кнопка открывает `Droplist`
   * и показывает шеврон, иначе рендерится без выпадающего списка.
   */
  droplist?: ButtonFieldDroplistProps;
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
  droplist,
  showDroplistChevron = Boolean(droplist),
  variant = 'after',
  action,
  ...rest
}: ButtonFieldProps) {
  const [stateLayerPressed, setStateLayerPressed] = useState(false);
  const iconSize = useMemo(() => getIconSize(size), [size]);

  const [open = false, setOpen] = useValueControl<boolean>({
    value: droplist?.open,
    defaultValue: false,
    onChange: droplist?.onOpenChange,
  });

  const handleListToggleClick = useCallback(() => {
    setOpen((prevOpen: boolean) => !prevOpen);
    onClick();
  }, [onClick, setOpen]);

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

  const button = (
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
      data-pressed={stateLayerPressed || undefined}
      {...extractSupportProps(rest)}
    >
      <span className={styles.backgroundStateLayer} data-state='regularFilled' />
      <span className={styles.elementWrapper}>
        {loading && !disabled ? <Sun size={SUN_SIZE_MAP[size]} /> : action}

        {droplist && showDroplistChevron && (
          <span className={styles.chevron}>
            {open ? <ChevronUpSVG size={iconSize} /> : <ChevronDownSVG size={iconSize} />}
          </span>
        )}
      </span>
    </button>
  );

  if (!droplist) {
    return button;
  }

  return (
    <Droplist
      trigger='click'
      {...droplist}
      size={size}
      open={open}
      onOpenChange={setOpen}
      triggerClassName={styles.trigger}
    >
      {button}
    </Droplist>
  );
}
