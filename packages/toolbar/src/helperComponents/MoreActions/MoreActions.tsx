import { Button } from '@ds/button';
import { KebabSVG } from '@ds/icons';
import { BaseItem, Droplist } from '@ds/list';
import { Tag } from '@ds/tag';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import { MouseEvent, ReactNode, useRef, useState } from 'react';

import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

export type Action = {
  tagLabel?: string;
  icon?: ReactNode;
  'data-test-id'?: string;
} & Pick<BaseItem, 'content' | 'disabled' | 'onClick'>;

export type MoreActionsProps = WithSupportProps<{
  /** Элементы выпадающего списка кнопки с действиями */
  moreActions: Action[];
}>;

export function MoreActions({ moreActions, 'data-test-id': dataTestId, ...rest }: MoreActionsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const supportProps = extractSupportProps(rest);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function mapMoreActionToDroplistItem(item: Action) {
    return {
      onClick: (event: MouseEvent<HTMLElement>) => {
        item.onClick?.(event);
        setIsOpen(false);
        event.stopPropagation();
      },
      disabled: item.disabled,
      content: item.content,
      beforeContent: item.icon,
      afterContent: item.tagLabel ? <Tag label={item.tagLabel} /> : undefined,
      'data-test-id': item['data-test-id'] ?? TEST_IDS.option,
    };
  }

  return (
    <Droplist
      triggerClassName={styles.trigger}
      trigger='clickAndFocusVisible'
      open={isOpen}
      {...supportProps}
      data-test-id={dataTestId ?? TEST_IDS.droplist}
      onOpenChange={setIsOpen}
      placement='bottom-end'
      scroll
      size='m'
      items={moreActions.map(mapMoreActionToDroplistItem)}
      triggerElemRef={triggerRef}
    >
      {({ onKeyDown }) => (
        <Button
          view='function'
          appearance='neutral'
          icon={<KebabSVG />}
          size='m'
          data-test-id={TEST_IDS.moreActionsButton}
          innerRef={triggerRef}
          onKeyDown={onKeyDown}
        />
      )}
    </Droplist>
  );
}
