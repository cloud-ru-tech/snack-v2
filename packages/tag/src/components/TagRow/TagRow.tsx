import { memo, useMemo } from 'react';

import { SIZE } from '../../constants';
import { TagRowSimple, TagRowTruncated } from '../../helperComponents';
import { TagRowProps } from '../../types';
import { mapTagRowItem } from './utils';

function TagRowInner({ items, rowLimit, size = SIZE.Xs, ...props }: TagRowProps) {
  const coloredItems = useMemo(() => items.map(mapTagRowItem), [items]);

  if (rowLimit) {
    return <TagRowTruncated items={coloredItems} rowLimit={rowLimit} size={size} {...props} />;
  }

  return <TagRowSimple items={coloredItems} size={size} {...props} />;
}

export const TagRow = memo(TagRowInner);
