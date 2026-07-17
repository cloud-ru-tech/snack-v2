import { LAYOUT_TYPE, withLayoutType } from '@ds/adaptive';
import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons/interface/system';
import { Droplist, DroplistProps } from '@ds/list';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useMemo, useState } from 'react';

import { TEST_IDS } from '../../../../constants';
import { useItemsContent, useSearchFilter, useSelectedItem } from './hooks';
import styles from './styles.module.scss';
import { SidebarItem } from './types';

export type SidebarSelectProps = WithSupportProps<{
  items: SidebarItem[];
  footerItems?: SidebarItem[];
  selected?: string | number;
  onSelect?(id: string | number): void;
  className?: string;
  collapse?: DroplistProps['collapse'];
  hasSearch?: boolean;
}>;

function SidebarSelectBase({
  className,
  items,
  footerItems = [],
  selected,
  onSelect,
  collapse,
  hasSearch,
  ...otherProps
}: SidebarSelectProps) {
  const [searchValue, setSearchValue] = useState('');
  const { filteredList, searchCollapseState } = useSearchFilter(items, searchValue);
  const list = useItemsContent(filteredList, onSelect);
  const footerList = useItemsContent(footerItems);
  const [isOpen, setIsOpen] = useState(false);
  const selectedItem = useSelectedItem(items, selected);

  const selectedCollapsedState = useMemo(() => {
    if (selectedItem.item) {
      return { defaultValue: selectedItem.path };
    }
  }, [selectedItem.item, selectedItem.path]);

  const handleSelect = (value: string | number) => {
    if (value) {
      onSelect?.(value);
    }

    setIsOpen(false);
  };

  const allItems = useMemo(() => [...list, ...footerList], [list, footerList]);

  const shouldShowSearch = hasSearch ?? (allItems.length > 15 || Boolean(searchValue));

  return (
    <Droplist
      size='m'
      selection={{ mode: 'single', value: selected, onChange: handleSelect }}
      items={allItems}
      open={isOpen}
      onOpenChange={setIsOpen}
      collapse={searchValue ? searchCollapseState : collapse || selectedCollapsedState}
      search={shouldShowSearch ? { value: searchValue, onChange: setSearchValue } : undefined}
      scrollToSelectedItem
    >
      <div
        role='button'
        tabIndex={0}
        className={cn(styles.wrapper, className)}
        data-test-id={TEST_IDS.sidebarSelect.trigger}
        {...extractSupportProps(otherProps)}
      >
        <TruncateString className={styles.triggerText} text={selectedItem.item?.label || ''} />

        {selectedItem.item?.afterContent}

        {isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}
      </div>
    </Droplist>
  );
}

/**
 * Мобильный select-сайдбар. Форсирует `mobile`-раскладку через `withLayoutType`, чтобы адаптивный
 * `Droplist` всегда открывал `BottomSheet` (мобильный паттерн сайдбара), независимо от провайдера.
 */
export const SidebarSelect = withLayoutType(SidebarSelectBase, LAYOUT_TYPE.Mobile);
