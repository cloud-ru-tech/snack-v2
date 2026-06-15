import { Button } from '@ds/button';
import { KebabSVG } from '@ds/icons';
import { BaseItem } from '@ds/list';
import { Tag } from '@ds/tag';
import { extractSupportProps, LAYOUT_TYPE, WithSupportProps } from '@ds/utils';
import { MouseEvent, ReactNode, useRef, useState } from 'react';

import { TEST_IDS } from '../../testIds';
import { LayoutType } from '../../types';
import { AdaptiveDroplist } from '../AdaptiveDroplist';
import styles from './styles.module.scss';

export type Action = {
  tagLabel?: string;
  icon?: ReactNode;
  'data-test-id'?: string;
} & Pick<BaseItem, 'content' | 'disabled' | 'onClick'>;

export type MoreActionsProps = WithSupportProps<{
  /** Элементы выпадающего списка кнопки с действиями */
  moreActions: Action[];
  /** Режим отображения: desktop (по умолчанию) или mobile */
  layoutType?: LayoutType;
}>;

export function MoreActions({
  moreActions,
  layoutType = LAYOUT_TYPE.Desktop,
  'data-test-id': dataTestId,
  ...rest
}: MoreActionsProps) {
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
    <AdaptiveDroplist
      triggerClassName={styles.trigger}
      layoutType={layoutType}
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
    </AdaptiveDroplist>
  );
}
