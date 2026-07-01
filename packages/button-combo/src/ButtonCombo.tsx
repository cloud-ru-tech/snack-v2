import { Button } from '@ds/button';
import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons';
import { Droplist, ItemId } from '@ds/list';
import { extractSupportProps, useValueControl } from '@ds/utils';
import cn from 'classnames';
import { useCallback, useMemo } from 'react';

import { TEST_IDS } from './constants';
import styles from './styles.module.scss';
import { ButtonComboProps } from './types';
import { extractDroplistItemProps } from './utils';

export function ButtonCombo({
  view = 'filled',
  appearance = 'primary',
  size = 'm',
  defaultLabel = '',
  className,
  dropdownClassName,
  optionClassName,
  dropdownTriggerClassName,
  defaultValue,
  items,
  tabIndex,
  fullWidth,
  disabled,
  loading,
  value: valueProp,
  open: openProp,
  onOpenChange,
  onChange,
  ...rest
}: ButtonComboProps) {
  const [open, setOpen] = useValueControl<boolean>({ value: openProp, onChange: onOpenChange });
  const [value, setValue] = useValueControl<ItemId>({ value: valueProp, defaultValue, onChange });

  const droplistItems = useMemo(
    () => items.map(extractDroplistItemProps).map(item => ({ ...item, id: item?.id, content: item?.label })),
    [items],
  );

  const activeOption = useMemo(() => items.find(item => item?.id === value), [items, value]);

  const handleSelectionChange = useCallback(
    (selectionValue: ItemId) => {
      if (selectionValue) {
        const option = items.find(item => item?.id === selectionValue);

        option && setValue(selectionValue);
      }
    },
    [items, setValue],
  );

  return (
    <div
      {...extractSupportProps(rest)}
      className={cn(styles.buttonComboWrapper, className)}
      tabIndex={tabIndex}
      data-view={view}
      data-size={size}
      data-full-width={fullWidth || undefined}
    >
      <Button
        view={view}
        appearance={appearance}
        size={size}
        label={activeOption?.label ?? defaultLabel}
        onClick={activeOption?.onClick}
        className={cn(styles.optionButton, optionClassName)}
        fullWidth={fullWidth}
        disabled={disabled}
        loading={loading}
        data-test-id={TEST_IDS.option}
      />

      <Droplist
        items={droplistItems}
        open={open}
        onOpenChange={setOpen}
        selection={{ defaultValue, mode: 'single', onChange: handleSelectionChange }}
        className={dropdownClassName}
        triggerClassName={styles.trigger}
        size={size}
        placement='bottom-end'
        closeDroplistOnItemClick
        data-test-id={TEST_IDS.dropdown}
      >
        <Button
          view={view}
          appearance={appearance}
          size={size}
          className={cn(styles.dropdownButton, dropdownTriggerClassName)}
          disabled={disabled}
          loading={loading}
          icon={open ? <ChevronUpSVG /> : <ChevronDownSVG />}
          data-test-id={TEST_IDS.dropdownTrigger}
        />
      </Droplist>
    </div>
  );
}
