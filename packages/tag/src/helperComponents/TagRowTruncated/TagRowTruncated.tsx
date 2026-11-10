import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { memo, MutableRefObject, useEffect, useRef, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { Size, TagRowItemInner } from '../../types';
import { TagList } from '../TagList';
import { TagMore } from '../TagMore';
import { useResizeObserver } from './hooks';
import styles from './styles.module.scss';
import { getGapWidth } from './utils';

type TagRowTruncatedProps = {
  items: TagRowItemInner[];
  rowLimit: number;
  moreButtonLabel?: string;
  size: Size;
  className?: string;
  onItemRemove?(item: string): void;
};

function setTagElement(tag: TagRowItemInner, tagsMapRef: MutableRefObject<Map<TagRowItemInner, HTMLElement | null>>) {
  return (tagElement: HTMLElement | null) => {
    if (tagElement === null) {
      tagsMapRef.current.delete(tag);
    } else {
      tagsMapRef.current.set(tag, tagElement);
    }
  };
}

function TagRowTruncatedInner({
  items,
  rowLimit,
  size,
  moreButtonLabel = '',
  className,
  onItemRemove,
  ...rest
}: TagRowTruncatedProps) {
  const [visibleTags, setVisibleTags] = useState<TagRowItemInner[]>([]);
  const [hiddenTags, setHiddenTags] = useState<TagRowItemInner[]>([]);

  const hiddenRowElementRef = useRef<HTMLDivElement>(null);
  const hiddenMoreButtonRef = useRef<HTMLButtonElement>(null);

  const tagsMapRef = useRef(new Map<TagRowItemInner, HTMLElement | null>());

  const { width: maxWidth } = useResizeObserver(hiddenRowElementRef.current);

  // Ширины тегов доезжают позже монтирования (шрифты, вложенные измерения), поэтому
  // пересчитываем упаковку, пока они меняются, а не по одному первому тегу.
  const [measuredWidths, setMeasuredWidths] = useState('');

  useEffect(() => {
    const observer = new ResizeObserver(() =>
      setMeasuredWidths([...tagsMapRef.current.values()].map(element => element?.offsetWidth ?? 0).join()),
    );

    tagsMapRef.current.forEach(element => element && observer.observe(element));

    if (hiddenMoreButtonRef.current) {
      observer.observe(hiddenMoreButtonRef.current);
    }

    return () => observer.disconnect();
  }, [items]);

  const gapWidth = getGapWidth(hiddenRowElementRef);

  useEffect(() => {
    if (maxWidth < 1) {
      return;
    }

    const newVisibleTags: TagRowItemInner[] = [];
    const newHiddenTags: TagRowItemInner[] = [];

    const moreButtonWidth = hiddenMoreButtonRef.current?.offsetWidth || 0;

    const measuredTags = [...tagsMapRef.current].map(([item, element]) => ({
      item,
      width: element?.offsetWidth || 0,
    }));

    let rowWidth = 0;
    let rowCount = 1;
    let rowItems = 0;

    const allTagsFit = measuredTags.every(({ width }) => {
      const nextWidth = rowWidth + (rowItems ? gapWidth : 0) + width;
      if (rowItems && nextWidth > maxWidth) {
        rowCount++;
        rowWidth = width;
        rowItems = 1;
      } else {
        rowWidth = nextWidth;
        rowItems++;
      }
      return rowCount <= rowLimit && width <= maxWidth;
    });

    rowWidth = 0;
    rowCount = 1;
    rowItems = 0;

    measuredTags.forEach(({ item, width }) => {
      if (allTagsFit) {
        newVisibleTags.push(item);
        return;
      }

      let nextWidth = rowWidth + (rowItems ? gapWidth : 0) + width;
      if (rowCount < rowLimit && rowItems && nextWidth > maxWidth) {
        rowCount++;
        rowWidth = 0;
        rowItems = 0;
        nextWidth = width;
      }

      if (rowCount > rowLimit || (rowCount === rowLimit && nextWidth + gapWidth + moreButtonWidth > maxWidth)) {
        rowCount = rowLimit + 1;
        newHiddenTags.push(item);
        return;
      }

      rowWidth = nextWidth;
      rowItems++;
      newVisibleTags.push(item);
    });

    setVisibleTags(newVisibleTags);
    setHiddenTags(newHiddenTags);
  }, [items, rowLimit, maxWidth, gapWidth, measuredWidths]);

  const setTagRef = (item: TagRowItemInner) => setTagElement(item, tagsMapRef);

  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)} data-size={size}>
      <div className={styles.hiddenRow} ref={hiddenRowElementRef} data-size={size}>
        <TagList items={items} size={size} onItemRemove={onItemRemove} setTagRef={setTagRef} />
      </div>
      <div className={styles.hiddenMoreButton}>
        <TagMore items={items} text={moreButtonLabel} size={size} buttonRef={hiddenMoreButtonRef} />
      </div>
      <div className={styles.visibleRow} data-size={size} data-test-id={TEST_IDS.tagRow.visibleTagsWrapper}>
        <TagList items={visibleTags} size={size} onItemRemove={onItemRemove} />
        {hiddenTags.length > 0 && (
          <TagMore items={hiddenTags} text={moreButtonLabel} size={size} onItemRemove={onItemRemove} />
        )}
      </div>
    </div>
  );
}

export const TagRowTruncated = memo(TagRowTruncatedInner);
