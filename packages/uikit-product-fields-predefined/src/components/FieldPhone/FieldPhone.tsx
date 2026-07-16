import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { FieldText, FieldTextProps } from '@ds/fields';
import { Item, ItemId } from '@ds/list';
import { useValueControl } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { ClipboardEventHandler, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useIMask } from 'react-imask';

import { TEST_IDS } from '../../constants';
import { PLACEHOLDER_CHAR, REFOCUS_AFTER_COUNTRY_DELAY_MS } from './constants';
import { useCountries } from './hooks';
import styles from './styles.module.scss';
import { CountrySettings, FieldPhoneOptionsProps, MaskOptions } from './types';
import { detectCountryByPhone, handleAutoInsert } from './utils';

export type FieldPhoneProps = Omit<
  FieldTextProps,
  | 'prefix'
  | 'prefixIcon'
  | 'postfix'
  | 'placeholder'
  | 'allowMoreThanMaxLength'
  | 'elementBefore'
  | 'elementAfter'
  | 'inputMode'
> & {
  /** Скролл с ограничением высоты для списка стран. По умолчанию включён. */
  scrollList?: boolean;
  onChange?(value: string): void;
  /** Плейсхолдер поля поиска в выпадающем списке стран */
  searchPlaceholder?: string;
  onChangeCountry?(country: FieldPhoneOptionsProps): void;
  /** Конфигурация для изменения стандартного списка стран */
  options?: CountrySettings;
};

export const FieldPhone = forwardRef<HTMLInputElement, FieldPhoneProps>(function FieldPhone(
  {
    value: valueProp,
    onChangeCountry,
    onChange: onChangeProp,
    showClearButton = true,
    searchPlaceholder,
    onPaste,
    scrollList,
    options: optionsProp,
    className,
    autoFocus,
    ...rest
  },
  ref,
) {
  const localRef = useRef<HTMLInputElement>(null);

  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);

  const options = useCountries(optionsProp);
  const isOnlyOneCountryAvailable = options.length === 1;

  const rawInsertRef = useRef('');
  const insertSwitchRef = useRef(false);

  const [country, setCountry] = useValueControl<FieldPhoneOptionsProps>({
    defaultValue: options[0],
    onChange: onChangeCountry,
  });

  const [dropdownSearch, setDropDownSearch] = useState('');

  const filteredOptions = useMemo(() => {
    if (dropdownSearch.length) {
      return options.filter(opt =>
        [opt.content.label, opt.content.caption].some(val =>
          String(val).toLowerCase().includes(dropdownSearch.toLowerCase()),
        ),
      );
    }

    return options;
  }, [options, dropdownSearch]);

  const items = useMemo<Item[]>(
    () =>
      filteredOptions.map(opt => ({
        id: opt.id,
        beforeContent: opt.beforeContent,
        content: { label: opt.content.label, caption: opt.content.caption },
      })),
    [filteredOptions],
  );

  const maskOptions = useMemo<MaskOptions>(
    () => ({
      mask: country?.mask,
      lazy: false,
      placeholderChar: PLACEHOLDER_CHAR,
      definitions: {
        X: /[0-9]/,
      },
      prepare: (str: string) => {
        if (str.replace(/\D/g, '').length > 1) {
          rawInsertRef.current = str;
        }
        return str;
      },
    }),
    [country?.mask],
  );

  const clearRaw = () => {
    rawInsertRef.current = '';
  };
  const markSwitchRef = () => {
    insertSwitchRef.current = true;
  };

  const {
    ref: iMaskRef,
    value: iMaskValue,
    setValue,
    unmaskedValue,
  } = useIMask<HTMLInputElement>(maskOptions, {
    onAccept: (_: string, maskRef) => {
      const unmasked = maskRef.unmaskedValue;

      const requiredSymbols = country?.mask.replace(/[\D]/g, '');

      const value = unmasked.length ? `${country?.content.caption}${requiredSymbols}${unmasked}` : '';

      if (value !== valueProp) {
        onChangeProp?.(value);
      }

      if (insertSwitchRef.current) {
        insertSwitchRef.current = false;
        return;
      }
      handleAutoInsert({
        raw: rawInsertRef.current,
        onValueChange: value => {
          setTimeout(() => setValue(value), 0);
        },
        onCountryChange: country => {
          markSwitchRef();
          clearRaw();
          setCountry(country);
        },
        country,
        options,
      });
    },
  });

  useEffect(() => {
    const requiredSymbols = country?.mask.replace(/[\D]/g, '');
    const normalizedValue = valueProp?.replace((country?.content.caption ?? '') + requiredSymbols, '');

    if (normalizedValue !== undefined && normalizedValue !== unmaskedValue) {
      setValue(normalizedValue);
    }
    // нужно реагировать только на изменение valueProp
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp]);

  const updateMaskView = (value?: string) => {
    setValue(value?.replaceAll(/\w/g, ' ') ?? '');
  };

  const handlePaste: ClipboardEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    const text = e.clipboardData?.getData('text') || '';

    const newCountry = detectCountryByPhone(text, options);
    const isCountryChanged = newCountry && newCountry.id !== country?.id;

    const currentCountry = isCountryChanged ? newCountry : country;

    const prefixNumber = (currentCountry?.content.caption ?? '').replace('+', '');
    const prefixNumberWithOptionalPlus = RegExp(`^(\\+?${prefixNumber})`);
    const valueWithoutPrefix = text.replace(prefixNumberWithOptionalPlus, '');

    // костыль, чтобы всегда срабатывала маска
    const newValue = `+${valueWithoutPrefix}`;
    if (isCountryChanged) {
      setCountry(newCountry);
      updateMaskView(newCountry.mask);

      setTimeout(() => setValue(newValue), 0);
    } else {
      setValue(newValue);
    }

    onPaste?.(e);
  };

  const handleChangeSelection = (selectedOption: ItemId) => {
    const selectedId = String(selectedOption);
    if (selectedId && selectedId !== country?.id) {
      const selectedCountry = options.find(opt => opt.id === selectedId);

      updateMaskView(selectedCountry?.mask);
      setCountry(selectedCountry);

      // Desktop: вернуть каретку в поле после выбора; на mobile не фокусим — откроется клавиатура.
      if (!isMobile) {
        setTimeout(() => localRef.current?.focus(), REFOCUS_AFTER_COUNTRY_DELAY_MS);
      }
    }
  };

  const handleChange = (value: string) => {
    // нужно только для сброса значения по клику на кнопку очистки
    if (unmaskedValue && !value) {
      updateMaskView(country?.mask);
      // На mobile автофокус запрещён — он принудительно открывает экранную клавиатуру.
      if (!isMobile) {
        localRef.current?.focus();
      }
    }
  };

  const showClear = showClearButton && Boolean(unmaskedValue);

  return (
    <FieldText
      {...rest}
      inputMode='tel'
      type='tel'
      ref={mergeRefs(ref, localRef, iMaskRef)}
      className={cn(className, styles.fieldPhone)}
      data-empty={!unmaskedValue || undefined}
      autoFocus={autoFocus}
      value={iMaskValue}
      onChange={handleChange}
      onPaste={handlePaste}
      showClearButton={showClear}
      prefix={country?.content.caption}
      elementBefore={
        isOnlyOneCountryAvailable
          ? undefined
          : {
              action: country?.beforeContent,
              'data-test-id': TEST_IDS.fieldPhoneCountrySelect,
              droplist: {
                items,
                selection: { mode: 'single', onChange: handleChangeSelection, value: country?.id },
                // Скролл включён по умолчанию — иначе список из ~158 стран рендерится без ограничения
                // высоты (Droplist форсит limitedScrollHeight, но контейнер-скролл появляется только при scroll).
                scroll: scrollList ?? true,
                scrollToSelectedItem: true,
                search: {
                  value: dropdownSearch,
                  onChange: setDropDownSearch,
                  placeholder: searchPlaceholder,
                },
              },
            }
      }
    />
  );
});
