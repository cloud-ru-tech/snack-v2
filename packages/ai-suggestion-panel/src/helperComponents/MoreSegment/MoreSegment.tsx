import { Droplist, DroplistProps } from '@ds/list';
import { RefObject, useMemo, useRef, useState } from 'react';

import { AiSuggestionPanelItem, Size } from '../../AiSuggestionPanel';
import { TEST_IDS } from '../../constants';
import { aiSuggestionPanelLocale } from '../../locale';
import { Segment } from '../Segment';

export type MoreSegmentProps = {
  /** Вопросы, не поместившиеся в полосу. */
  items: AiSuggestionPanelItem[];
  size: Size;
  mobile?: boolean;
  onItemClick(value: string): void;
};

export function MoreSegment({ items, size, mobile, onItemClick }: MoreSegmentProps) {
  const { t } = aiSuggestionPanelLocale.useTranslations();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const droplistItems = useMemo<DroplistProps['items']>(
    () =>
      items.map(({ value, label, disabled, loading }) => ({
        id: value,
        content: { label },
        // У пункта списка нет вида Loading, а повторно отправлять вопрос нельзя.
        disabled: disabled || loading,
        onClick: () => onItemClick(value),
        'data-test-id': TEST_IDS.moreListItem,
      })),
    [items, onItemClick],
  );

  return (
    <Droplist
      items={droplistItems}
      size='s'
      trigger='click'
      placement='bottom-end'
      open={open}
      onOpenChange={setOpen}
      closeDroplistOnItemClick
      disableSpanWrapper
      triggerElemRef={triggerRef as RefObject<HTMLElement>}
      data-test-id={TEST_IDS.moreList}
    >
      {({ onKeyDown }) => (
        <Segment
          innerRef={triggerRef}
          label={`+${items.length}`}
          size={size}
          mobile={mobile}
          open={open}
          aria-label={t('more', { count: items.length })}
          aria-expanded={open}
          data-test-id={TEST_IDS.more}
          onKeyDown={onKeyDown}
        />
      )}
    </Droplist>
  );
}
