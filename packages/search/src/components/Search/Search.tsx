import { Divider } from '@ds/divider';
import { SearchPrivate, SearchPrivateProps } from '@ds/search-private';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { forwardRef, useState } from 'react';

import { SIZE } from '../../constants';
import { ButtonField, ButtonFieldProps } from '../../helperComponents/ButtonField';
import styles from './styles.module.scss';

export type SearchProps = Omit<SearchPrivateProps, 'onKeyDown'> & {
  /** Деактивирован ли компонент */
  disabled?: boolean;
  /**
   * Наличие фона
   * @default true
   */
  background?: boolean;
  /** Дополнительный слот справа от поля */
  buttonField?: Omit<ButtonFieldProps, 'variant'>;
  /**
   * Наличие разделителя между input и buttonField
   * @default true
   */
  outline?: boolean;
};

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  {
    value,
    onChange,
    onBlur,
    onFocus,
    loading,
    disabled,
    background = true,
    outline = true,
    buttonField: buttonFieldProps,
    placeholder,
    onSubmit,
    className,
    tabIndex,
    size = SIZE.S,
    inputMode,
    ...rest
  },
  ref,
) {
  const [focusVisible, setFocusVisible] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div
      className={cn(styles.root, className)}
      data-size={size}
      data-loading={loading || undefined}
      data-disabled={disabled || undefined}
      data-withbackground={background || undefined}
      data-focusvisible={focusVisible}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.backgroundWrapper}>
        <div
          className={styles.materialLayer}
          data-acrylic-appearance='neutral'
          data-acrylic-level={!loading && (hover || focusVisible) ? '2Level' : '1Level'}
        >
          <div className={styles.acrylic} />
        </div>
        <div className={styles.borderStateLayer} data-state='regularBorder' />
        <div className={styles.focusLayer} />
      </div>
      <div className={styles.fieldContainer}>
        <SearchPrivate
          className={styles.search}
          ref={ref}
          size={size}
          value={value}
          placeholder={placeholder}
          loading={loading}
          disabled={disabled}
          onChange={onChange}
          onFocus={event => {
            setFocusVisible(event.target.matches(':focus-visible'));
            onFocus?.(event);
          }}
          onBlur={event => {
            setFocusVisible(false);
            onBlur?.(event);
          }}
          onSubmit={onSubmit}
          tabIndex={tabIndex}
          inputMode={inputMode}
          showClearButton={!disabled}
          {...extractSupportProps(rest)}
        />
      </div>
      {buttonFieldProps && (
        <div className={styles.elementWrapperAfter}>
          <div className={styles.lineWrapper} data-outline={outline}>
            <Divider orientation='vertical' variant='regular' />
          </div>
          <ButtonField
            {...buttonFieldProps}
            disabled={loading || disabled || buttonFieldProps.disabled}
            variant='after'
          />
        </div>
      )}
    </div>
  );
});
