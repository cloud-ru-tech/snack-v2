import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Droplist } from '@ds/list';
import { KeyboardEvent, ReactElement, Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { useAiFieldInputContext } from '../../context';
import { aiFieldInputLocale } from '../../locale';
import {
  AiFieldInputActionListItem,
  AiFieldInputFooterButtonTooltip,
  AiFieldInputFooterMenuProps,
  SearchTrigger,
} from '../../types';
import { FooterTooltip } from '../FooterTooltip';
import { useActionListLevels } from '../shared';
import styles from './styles.module.scss';
import { assignRef, filterMenuItems, toDroplistItems } from './utils';

export type FooterMenuRenderParams = {
  pressed: boolean;
  ref(node: HTMLButtonElement | null): void;
  onKeyDown?(event: KeyboardEvent<HTMLElement>): void;
};

export type FooterMenuProps = AiFieldInputFooterMenuProps & {
  tooltip?: AiFieldInputFooterButtonTooltip;
  triggerRef?: Ref<HTMLButtonElement>;
  disabled: boolean;
  searchable?: boolean;
  children(params: FooterMenuRenderParams): ReactElement;
};

export function FooterMenu({
  items,
  onSelect,
  tooltip,
  triggerRef,
  disabled,
  searchable = false,
  children,
}: FooterMenuProps) {
  const { t } = aiFieldInputLocale.useTranslations();
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);
  const { hostActionList, pickActionListItem } = useAiFieldInputContext();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listTriggerRef = useRef<SearchTrigger | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const isOpen = open && !disabled;

  const setButtonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node;
      assignRef(triggerRef, node);
    },
    [triggerRef],
  );

  const handlePick = useCallback(
    (item: AiFieldInputActionListItem) => {
      const trigger = listTriggerRef.current;
      setOpen(false);
      if (trigger) pickActionListItem?.(item, trigger);
    },
    [pickActionListItem],
  );

  const levels = useActionListLevels(handlePick);
  const { open: openLevel, reset: resetLevels } = levels;

  useEffect(() => {
    if (!open) resetLevels();
  }, [open, resetLevels]);

  const handleOpenChange = useCallback((value: boolean) => {
    setOpen(value);

    if (!value) {
      setQuery('');
    }
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      if (!isMobile) {
        onSelect?.(id);
        return;
      }

      let opened = false;

      hostActionList?.({
        open: (listItems, trigger) => {
          opened = true;
          listTriggerRef.current = trigger;
          openLevel({ label: t('back'), items: listItems });
        },
      });
      onSelect?.(id);
      hostActionList?.(null);

      if (!opened) handleOpenChange(false);
    },
    [isMobile, onSelect, hostActionList, openLevel, handleOpenChange, t],
  );

  const droplistItems = useMemo(() => {
    if (levels.isOpen) return levels.listItems;
    return items ? toDroplistItems(filterMenuItems(items, query), handleSelect) : [];
  }, [levels.isOpen, levels.listItems, items, query, handleSelect]);

  if (!items) {
    return <FooterTooltip tooltip={tooltip}>{children({ pressed: false, ref: setButtonRef })}</FooterTooltip>;
  }

  return (
    <>
      <Droplist
        items={droplistItems}
        open={isOpen}
        onOpenChange={handleOpenChange}
        trigger='click'
        placement='top-start'
        size='m'
        scroll
        closeDroplistOnItemClick={!isMobile}
        triggerElemRef={buttonRef}
        search={searchable ? { value: query, onChange: setQuery, placeholder: t('menuSearch') } : undefined}
        className={isMobile ? undefined : styles.menu}
        data-test-id={TEST_IDS.menu}
      >
        {({ onKeyDown }) => children({ pressed: isOpen, ref: setButtonRef, onKeyDown })}
      </Droplist>

      <FooterTooltip tooltip={tooltip} triggerRef={buttonRef} hidden={isOpen} />
    </>
  );
}
