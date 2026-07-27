import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Droplist, SelectionSingleValueType } from '@ds/list';
import { useUncontrolledProp, useValueControl } from '@ds/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { chipsLocale } from '../../../locale';
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
  size = SIZE.M,
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

  const { t } = chipsLocale.useTranslations();

  const { layoutType } = useAdaptiveLayout();
  const mobile = isMobileLayout(layoutType);
  const effectiveAutoApply = mobile ? false : autoApply;

  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const flatMapOptions = useMemo(() => Object.values(flattenOptions), [flattenOptions]);

  const dropListSelection = useMemo(
    () => (effectiveAutoApply ? value : deferredValue),
    [effectiveAutoApply, deferredValue, value],
  );

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
        if (effectiveAutoApply) {
          setValue(newValue);
        } else {
          setDeferredValue(newValue);
        }

        if (searchValue) {
          listRef.current?.focus();
        }
      }
    },
    [effectiveAutoApply, searchValue, setValue, setDeferredValue],
  );

  const handleOnResetClick = useCallback(() => {
    setDeferredValue([]);
  }, [setDeferredValue]);

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
      !effectiveAutoApply && setDeferredValue(value);
      setSearchValue('');
    }

    setOpen(open);
  };

  const renderFooter = useAutoApply({
    autoApply: effectiveAutoApply,
    size,
    onApprove: handleOnApproveClick,
    onCancel: handleOnCancelClick,
    mobile,
    selectedCount: dropListSelection?.length ?? 0,
    onReset: handleOnResetClick,
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
        mode: 'multiple',
      }}
      trigger='click'
      triggerElemRef={chipRef}
      placement='bottom-start'
      widthStrategy={widthStrategy}
      label={label}
      listRef={listRef}
      size={DROPLIST_SIZE_MAP[size]}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      open={disabled || loading ? false : open}
      onOpenChange={handleOpenChange}
      scroll
      className={dropDownClassName}
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
