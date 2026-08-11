import { SearchSVG } from '@ds/icons/interface/system';
import {
  InputPrivate,
  InputPrivateProps,
  moveCursorToEnd,
  useButtonNavigation,
  useClearButton,
} from '@ds/input-private';
import { LOADER_SIZE, Sun } from '@ds/loader';
import { extractSupportProps, useValueControl, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, ReactNode, useCallback, useMemo, useRef } from 'react';

import { PRIVATE_SEARCH_TEST_IDS, SIZE } from './constants';
import { searchPrivateLocale } from './locale';
import styles from './styles.module.scss';
import { Size } from './types';
import { getIconSize } from './utils';

export type SearchPrivateProps = WithSupportProps<
  {
    /** Размер */
    size?: Size;
    /** Состояние загрузки */
    loading?: boolean;
    /** Деактивирован ли компонент */
    disabled?: boolean;
    /** Колбек на подтверждение поиска по строке */
    onSubmit?(value: string): void;
    /** CSS-класс */
    className?: string;
    /**
     * Отображение кнопки Очистки поля
     * @default true
     */
    showClearButton?: boolean;
    /**
     * Слот справа от строки ввода — после кнопки очистки, внутри поля.
     *
     * Типовое наполнение — иконочная кнопка того же размера, что поле:
     * `<Button size={size} view='function' appearance='neutral' icon={…} />`.
     */
    afterContent?: ReactNode;
    tabIndex?: number;
  } & Pick<
    Partial<InputPrivateProps>,
    'value' | 'onChange' | 'placeholder' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'inputMode'
  >
>;

const LOADER_SIZE_MAP = {
  [SIZE.S]: LOADER_SIZE.XS,
  [SIZE.M]: LOADER_SIZE.S,
  [SIZE.L]: LOADER_SIZE.S,
};

export const SearchPrivate = forwardRef<HTMLInputElement, SearchPrivateProps>(function SearchPrivate(
  {
    size = SIZE.M,
    value: valueProp = '',
    onChange: onChangeProp,
    showClearButton: showClearButtonProp = true,
    loading,
    disabled,
    placeholder,
    onKeyDown,
    onFocus,
    onBlur,
    onSubmit,
    afterContent,
    className,
    tabIndex,
    inputMode = 'search',
    ...rest
  },
  ref,
) {
  const [value = '', onValueChange] = useValueControl<string>({
    value: valueProp,
    defaultValue: '',
    onChange: onChangeProp,
  });

  const localRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const { t } = searchPrivateLocale.useTranslations();

  const showClearButton = Boolean(showClearButtonProp && value);

  const onClear = () => {
    onValueChange('');

    localRef.current?.focus();
  };

  const clearButtonSettings = useClearButton({
    clearButtonRef,
    showClearButton,
    size,
    onClear,
    disabled: disabled || loading,
  });

  const { postfixButtons, inputTabIndex, onInputKeyDown } = useButtonNavigation({
    inputRef: localRef,
    postfixButtons: useMemo(() => [clearButtonSettings], [clearButtonSettings]),
    readonly: false,
    submitKeys: ['Enter', 'Space'],
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown && onKeyDown(e);
      onInputKeyDown(e);

      if (e.key === 'Enter' && localRef.current?.value) {
        onSubmit && onSubmit(localRef.current.value);
      }
    },
    [onInputKeyDown, onKeyDown, onSubmit],
  );

  const handleOnFocus = useCallback(
    (e: FocusEvent<HTMLInputElement, Element>) => {
      onFocus && onFocus(e);
      moveCursorToEnd(localRef.current);
    },
    [onFocus],
  );

  return (
    <div
      className={cn(styles.container, className)}
      {...extractSupportProps(rest)}
      data-size={size}
      data-disabled={disabled || undefined}
    >
      <span className={styles.prefix}>
        {!disabled && loading ? (
          <Sun data-test-id={PRIVATE_SEARCH_TEST_IDS.iconSun} size={LOADER_SIZE_MAP[size]} />
        ) : (
          <SearchSVG data-test-id={PRIVATE_SEARCH_TEST_IDS.iconSearch} size={getIconSize(size)} />
        )}
      </span>

      <InputPrivate
        className={styles.input}
        inputMode={inputMode}
        value={value}
        onChange={onValueChange}
        onKeyDown={handleKeyDown}
        onFocus={handleOnFocus}
        onBlur={onBlur}
        tabIndex={tabIndex ?? inputTabIndex}
        ref={mergeRefs(ref, localRef)}
        placeholder={placeholder || t('placeholder')}
        disabled={disabled || loading}
        type='text'
        data-test-id={PRIVATE_SEARCH_TEST_IDS.input}
      />

      <span className={styles.postfix}>{postfixButtons}</span>

      {afterContent && <span className={styles.afterContent}>{afterContent}</span>}
    </div>
  );
});
