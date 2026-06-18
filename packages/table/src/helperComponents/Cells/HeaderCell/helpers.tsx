import { ArrowDownSVG, ArrowUpSVG } from '@ds/icons';
import { SortDirection } from '@tanstack/react-table';
import { MouseEventHandler } from 'react';

export function getSortingIcon(sort?: SortDirection | false) {
  switch (sort) {
    case 'asc':
      return <ArrowUpSVG size={16} />;
    case 'desc':
      return <ArrowDownSVG size={16} />;
    default:
      return null;
  }
}

export const stopEventPropagation: MouseEventHandler = e => {
  e.stopPropagation();
};
