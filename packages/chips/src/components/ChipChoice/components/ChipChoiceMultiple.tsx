import { Droplist, SelectionSingleValueType } from '@ds/list';
import { useLocale } from '@ds/locale';
import { useValueControl } from '@ds/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { DROPLIST_SIZE_MAP } from '../constants';
import { useAutoApply, useHandleOnKeyDown, useOptionSearch } from '../hooks';
import { ChipChoiceMultipleProps, ContentRenderProps } from '../types';
import { defaultMultiValueLabelFormatter, FlattenOption, kindFlattenOptions, transformOptionsToItems } from '../utils';
import { ChipChoiceBase } from './ChipChoiceBase';

export function ChipChoiceMultiple<T extends ContentRenderProps = ContentRenderProps>({
  value: valueProp,
  defaultValue,
  options,
  onChange: onChangeProp,
  valueRender,
  size = SIZE.S,
  label,
  searchable,
  contentRender,
  dropDownClassName,
  onClearButtonClick,
  autoApply = true,
  disableFuzzySearch = false,
  onApprove,
  onCancel,
  open: openProp,
  onOpenChange,
  widthStrategy = 'gte',
  disabled,
  loading,
  ...rest
}: ChipChoiceMultipleProps<T>) {
  const [value, setValue] = useValueControl<SelectionSingleValueType[]>({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const [deferredValue, setDeferredValue] = useValueControl<SelectionSingleValueType[]>({
    defaultValue,
  });

  const flattenOptions = useMemo(() => {
    const { flattenOptions } = kindFlattenOptions<T>({ options });

    return flattenOptions;
  }, [options]);

  const [searchValue = '', setSearchValue] = useState<string>('');

  const { t } = useLocale('Chips');

  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const flatMapOptions = useMemo(() => Object.values(flattenOptions), [flattenOptions]);

  const dropListSelection = useMemo(() => (autoApply ? value : deferredValue), [autoApply, deferredValue, value]);

  const selectedOptions = useMemo(
    () => (value && value.length ? value.map(id => flattenOptions[id]).filter(Boolean) : ([] as FlattenOption<T>[])),
    [flattenOptions, value],
  );

  const valueToRender = valueRender
    ? valueRender(selectedOptions)
    : defaultMultiValueLabelFormatter({
        value: selectedOptions ?? [],
        total: Object.keys(flattenOptions).length,
        allLabel: t('allLabel'),
      });

  const optionSearch = useOptionSearch({ options, flatMapOptions, disableFuzzySearch });

  const result = useMemo(
    () => (!searchable || valueToRender === searchValue ? options : optionSearch(searchValue)),
    [optionSearch, options, searchValue, searchable, valueToRender],
  );

  const items = useMemo(() => transformOptionsToItems<T>(result, contentRender), [contentRender, result]);

  const chipRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLElement>(null);

  const handleSelectionChange = useCallback(
    (newValue?: SelectionSingleValueType[]) => {
      if (newValue !== undefined) {
        if (autoApply) {
          setValue(newValue);
        } else {
          setDeferredValue(newValue);
        }

        if (searchValue) {
          listRef.current?.focus();
        }
      }
    },
    [autoApply, searchValue, setValue, setDeferredValue],
  );

  const handleOnCancelClick = useCallback(() => {
    onCancel && onCancel();

    setDeferredValue(value);
    setOpen(false);
  }, [onCancel, setDeferredValue, value, setOpen]);

  const handleOnApproveClick = useCallback(() => {
    onApprove && onApprove();

    setValue(deferredValue);
    setOpen(false);
  }, [onApprove, setValue, deferredValue, setOpen]);

  const handleOpenChange = (open: boolean) => {
    if (disabled || loading) {
      setOpen(false);
      return;
    }

    if (!open) {
      !autoApply && setDeferredValue(value);
      setSearchValue('');
    }

    setOpen(open);
  };

  const renderFooter = useAutoApply({
    autoApply,
    size,
    onApprove: handleOnApproveClick,
    onCancel: handleOnCancelClick,
  });

  useEffect(() => {
    if (searchValue && !open) {
      setSearchValue('');
    }
  }, [searchable, open, searchValue]);

  useEffect(() => {
    setDeferredValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Droplist
      {...rest}
      loading={loading}
      items={items}
      selection={{
        value: dropListSelection,
        onChange: handleSelectionChange,
        mode: 'multiple',
      }}
      trigger='click'
      triggerElemRef={chipRef}
      placement='bottom-start'
      widthStrategy={widthStrategy}
      listRef={listRef}
      size={DROPLIST_SIZE_MAP[size]}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      open={disabled || loading ? false : open}
      onOpenChange={handleOpenChange}
      scroll
      className={dropDownClassName}
      search={
        searchable
          ? {
              value: searchValue,
              onChange: setSearchValue,
            }
          : undefined
      }
      pinBottom={renderFooter()}
    >
      <ChipChoiceBase
        {...rest}
        disabled={disabled}
        loading={loading}
        ref={chipRef}
        onClearButtonClick={onClearButtonClick}
        value={value}
        valueToRender={valueToRender}
        label={label}
        size={size}
        onKeyDown={handleOnKeyDown()}
      />
    </Droplist>
  );
}
