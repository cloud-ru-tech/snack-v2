import { Droplist, SelectionSingleValueType } from '@ds/list';
import { useUncontrolledProp, useValueControl } from '@ds/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { chipsLocale } from '../../../locale';
import { DROPLIST_SIZE_MAP } from '../constants';
import { useAutoApply, useHandleOnKeyDown, useOptionSearch } from '../hooks';
import { ChipChoiceSingleProps, ContentRenderProps } from '../types';
import { defaultSingleValueFormatter, FlattenOption, kindFlattenOptions, transformOptionsToItems } from '../utils';
import { ChipChoiceBase } from './ChipChoiceBase';

export function ChipChoiceSingle<T extends ContentRenderProps = ContentRenderProps>({
  value: valueProp,
  defaultValue,
  options,
  onChange: onChangeProp,
  valueRender,
  size = SIZE.M,
  label,
  searchable,
  contentRender,
  dropDownClassName,
  disableFuzzySearch,
  autoApply = true,
  onApprove,
  onCancel,
  onClearButtonClick,
  open: openProp,
  onOpenChange,
  widthStrategy = 'gte',
  disabled,
  loading,
  ...rest
}: ChipChoiceSingleProps<T>) {
  const [value, setValue] = useValueControl<SelectionSingleValueType>({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const [deferredValue, setDeferredValue] = useValueControl<SelectionSingleValueType>({
    defaultValue,
  });

  const flattenOptions = useMemo(() => {
    const { flattenOptions } = kindFlattenOptions<T>({ options });

    return flattenOptions;
  }, [options]);

  const { t } = chipsLocale.useTranslations();

  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const flatMapOptions = useMemo(() => Object.values(flattenOptions), [flattenOptions]);

  const dropListSelection = useMemo(() => (autoApply ? value : deferredValue), [autoApply, deferredValue, value]);

  const selectedOption = useMemo(
    () => (value ? flattenOptions[value] : ({} as FlattenOption<T>)),
    [flattenOptions, value],
  );

  const [searchValue, setSearchValue] = useState<string>('');

  const valueToRender = valueRender
    ? valueRender(selectedOption)
    : defaultSingleValueFormatter({ label: selectedOption?.label, allLabel: t('allLabel') });

  const optionSearch = useOptionSearch({ options, flatMapOptions, disableFuzzySearch });

  const result = useMemo(
    () => (!searchable || valueToRender === searchValue ? options : optionSearch(searchValue)),
    [optionSearch, options, searchValue, searchable, valueToRender],
  );
  const items = useMemo(() => transformOptionsToItems<T>(result, contentRender), [contentRender, result]);

  const chipRef = useRef<HTMLDivElement>(null);

  const handleSelectionChange = useCallback(
    (newValue?: SelectionSingleValueType) => {
      if (newValue !== undefined) {
        chipRef.current?.focus();

        if (autoApply) {
          setOpen(false);
          setSearchValue('');
          setValue(newValue);
        } else {
          setDeferredValue(newValue);
        }
      }
    },
    [autoApply, setOpen, setValue, setDeferredValue],
  );

  const handleOnCancelClick = useCallback(() => {
    onCancel && onCancel();

    setDeferredValue(value);
    setOpen(false);
  }, [onCancel, setDeferredValue, setOpen, value]);

  const handleOnApproveClick = useCallback(() => {
    onApprove && onApprove();

    setValue(deferredValue);
    setOpen(false);
  }, [deferredValue, onApprove, setOpen, setValue]);

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

  const { footer: footerNode, footerActiveElementsRefs, footerDivider } = renderFooter();

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
        mode: 'single',
      }}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      size={DROPLIST_SIZE_MAP[size]}
      trigger='click'
      triggerElemRef={chipRef}
      placement='bottom-start'
      label={label}
      className={dropDownClassName}
      closeDroplistOnItemClick={autoApply}
      widthStrategy={widthStrategy}
      open={disabled || loading ? false : open}
      onOpenChange={handleOpenChange}
      scroll
      headerDivider={searchable}
      search={
        searchable
          ? {
              value: searchValue,
              onChange: setSearchValue,
            }
          : undefined
      }
      footer={footerNode}
      footerDivider={footerDivider}
      footerActiveElementsRefs={footerActiveElementsRefs}
    >
      <ChipChoiceBase
        {...rest}
        loading={loading}
        disabled={disabled}
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
