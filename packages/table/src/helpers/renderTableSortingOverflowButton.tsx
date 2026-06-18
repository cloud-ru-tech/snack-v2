import { ArrowDownSVG, ArrowUpSVG, ProductIcons } from '@ds/icons';
import { ComponentType, MouseEvent, ReactNode } from 'react';

import { TEST_IDS } from '../constants';
import { renderToolbarAfterOverflowButton } from './renderToolbarAfterOverflowButton';

type RenderTableSortingOverflowButtonParams = {
  ariaLabel: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  selectedSortId?: string;
  currentSortDesc?: boolean;
};

export function renderTableSortingOverflowButton({
  ariaLabel,
  onClick,
  selectedSortId,
  currentSortDesc,
}: RenderTableSortingOverflowButtonParams): ReactNode {
  let SortIcon: ComponentType = ProductIcons.SortSVG;

  if (selectedSortId) {
    SortIcon = currentSortDesc ? ArrowDownSVG : ArrowUpSVG;
  }

  return renderToolbarAfterOverflowButton({
    'aria-label': ariaLabel,
    icon: <SortIcon />,
    onClick,
    'data-test-id': TEST_IDS.viewSort.overflowTrigger,
  });
}
