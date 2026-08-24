import { Button } from '@ds/button';
import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons/interface/system';
import { Typography } from '@ds/typography';

import { LinksGroupTitle } from '../../../../../types';
import styles from '../styles.module.scss';
import { SortableGroupDragHandle, SortableGroupDragHandleProps } from './SortableGroupDragHandle';

export type SortableGroupHeaderProps = {
  label: LinksGroupTitle;
  isExpanded?: boolean;
  enableServiceDrag?: boolean;
  isMobile?: boolean;
} & SortableGroupDragHandleProps;

export function SortableGroupHeader({
  label,
  isExpanded,
  enableServiceDrag,
  attributes,
  listeners,
  isMobile,
}: SortableGroupHeaderProps) {
  return (
    <div className={styles.header} data-expanded={isExpanded || undefined}>
      <Typography variant='title' size='m' className={styles.headerTitle}>
        {label.text}
      </Typography>

      {(enableServiceDrag || !isMobile) && (
        <div className={styles.headerActions} data-always-visible={isMobile || undefined}>
          {enableServiceDrag && <SortableGroupDragHandle attributes={attributes} listeners={listeners} />}

          {!isMobile && (
            <Button
              view='elevated'
              appearance='neutral'
              size='s'
              icon={isExpanded ? <ChevronUpSVG /> : <ChevronDownSVG />}
              data-test-id='header__drawer-menu__group-card-collapse'
            />
          )}
        </div>
      )}
    </div>
  );
}
