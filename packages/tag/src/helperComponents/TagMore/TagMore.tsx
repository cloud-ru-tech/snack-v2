import { Dropdown } from '@design-system/dropdown';
import { Scroll } from '@design-system/scroll';
import type { Ref } from 'react';

import { TAG_ROW_TEST_IDS } from '../../components/TagRow/constants';
import { SIZE } from '../../constants';
import type { Size, TagRowItemInner } from '../../types';
import { TagRowSimple } from '../TagRowSimple';
import styles from './styles.module.scss';

type TagMoreProps = {
  items: TagRowItemInner[];
  size: Size;
  text?: string;
  buttonRef?: Ref<HTMLButtonElement>;
  onItemRemove?(item: string): void;
};

export function TagMore({ items, text = '', size = SIZE.Xs, buttonRef, onItemRemove }: TagMoreProps) {
  return (
    <Dropdown
      placement='bottom-end'
      trigger='hoverAndFocusVisible'
      content={
        <div className={styles.tagRowDroplistContainer} data-size={size}>
          <Scroll className={styles.tagRowDroplistScroll} size='s' barHideStrategy='move'>
            <TagRowSimple
              items={items}
              size={size}
              onItemRemove={onItemRemove}
              data-test-id={TAG_ROW_TEST_IDS.droplistTagsWrapper}
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
        data-test-id={TAG_ROW_TEST_IDS.moreButton}
      >
        <div className={styles.textWrapper}>{`${text}${items.length}`}</div>
      </button>
    </Dropdown>
  );
}
