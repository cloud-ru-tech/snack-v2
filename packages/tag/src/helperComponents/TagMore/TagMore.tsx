import { Dropdown } from '@ds/dropdown';
import { Scroll } from '@ds/scroll';
import { Ref } from 'react';

import { SIZE, TEST_IDS } from '../../constants';
import { Size, TagRowItemInner } from '../../types';
import { TagRowSimple } from '../TagRowSimple';
import styles from './styles.module.scss';

type TagMoreProps = {
  items: TagRowItemInner[];
  size: Size;
  text?: string;
  buttonRef?: Ref<HTMLButtonElement>;
  onItemRemove?(item: string): void;
};

export function TagMore({ items, text = '', size = SIZE.S, buttonRef, onItemRemove }: TagMoreProps) {
  return (
    // TODO: replace with Popover
    <Dropdown
      placement='bottom-end'
      trigger='hoverAndFocusVisible'
      triggerClassName={styles.moreTrigger}
      content={
        <div className={styles.tagRowDroplistContainer} data-size={size}>
          <Scroll className={styles.tagRowDroplistScroll} size='s' barHideStrategy='move'>
            <TagRowSimple
              items={items}
              size={size}
              onItemRemove={onItemRemove}
              data-test-id={TEST_IDS.tagRow.droplistTagsWrapper}
            />
          </Scroll>
        </div>
      }
    >
      <button
        type='button'
        className={styles.button}
        ref={buttonRef}
        data-size={size}
        data-test-id={TEST_IDS.tagRow.moreButton}
      >
        <div className={styles.textWrapper}>{`${text}${items.length}`}</div>
      </button>
    </Dropdown>
  );
}
