import { Skeleton } from '@ds/skeleton';
import cn from 'classnames';
import { CSSProperties } from 'react';

import { DefaultColumns, TEST_IDS } from '../../../constants';
import { RowActionsButton } from '../../../helperComponents/Cells/RowActionsCell/components';
import rowActionsStyles from '../../../helperComponents/Cells/RowActionsCell/styles.module.scss';
import selectionStyles from '../../../helperComponents/Cells/SelectionCell/styles.module.scss';
import statusStyles from '../../../helperComponents/Cells/StatusCell/styles.module.scss';
import { TREE_CELL_ID } from '../../../helperComponents/Cells/TreeCell/constants';
import treeStyles from '../../../helperComponents/Cells/TreeCell/styles.module.scss';
import { ColumnDefinition } from '../../../types';
import styles from '../styles.module.scss';

const TOGGLE_SKELETON_SIZE = 16;

type LoadingCellSkeletonProps = {
  className?: string;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
};

function renderLoadingCellSkeleton({ className, width = '100%', height }: LoadingCellSkeletonProps = {}) {
  return (
    <Skeleton
      className={cn(styles.skeleton, className)}
      width={width}
      height={height}
      loading
      data-test-id={TEST_IDS.loadingCellSkeleton}
    />
  );
}

function renderPinnedPaddingSkeleton() {
  return <div className={styles.skeletonPinnedWrapper}>{renderLoadingCellSkeleton()}</div>;
}

function renderSelectionCellSkeleton() {
  return (
    <div className={selectionStyles.selectionCell}>
      {renderLoadingCellSkeleton({ width: TOGGLE_SKELETON_SIZE, height: TOGGLE_SKELETON_SIZE })}
    </div>
  );
}

function renderTreeCellSkeleton({ withToggle }: { withToggle?: boolean }) {
  const skeleton = renderLoadingCellSkeleton({ className: styles.skeletonTree, width: '100%' });

  return (
    <div className={treeStyles.treeCellContainer}>
      {withToggle ? (
        <>
          <div className={treeStyles.cellToggles}>
            {renderLoadingCellSkeleton({ width: TOGGLE_SKELETON_SIZE, height: TOGGLE_SKELETON_SIZE })}
          </div>
          {skeleton}
        </>
      ) : (
        skeleton
      )}
    </div>
  );
}

function renderStatusCellSkeleton({ indicatorOnly }: { indicatorOnly: boolean }) {
  return (
    <div className={statusStyles.statusCell} data-no-label={indicatorOnly || undefined}>
      {renderLoadingCellSkeleton({
        width: indicatorOnly ? TOGGLE_SKELETON_SIZE : '100%',
        height: TOGGLE_SKELETON_SIZE,
      })}
    </div>
  );
}

function renderRowActionsCellSkeleton() {
  return (
    <div className={rowActionsStyles.rowActionsCellWrap}>
      <RowActionsButton variant='placeholder' />
    </div>
  );
}

export function getLoadingCell<TData>(column: ColumnDefinition<TData>): ColumnDefinition<TData>['cell'] {
  const { id, noBodyCellPadding, noHeaderCellPadding, header } = column;

  if (id === DefaultColumns.Selection) {
    return () => renderSelectionCellSkeleton();
  }

  if (id === TREE_CELL_ID) {
    return () => renderTreeCellSkeleton({ withToggle: noHeaderCellPadding });
  }

  if (id === DefaultColumns.Status) {
    return () => renderStatusCellSkeleton({ indicatorOnly: !header });
  }

  if (id === DefaultColumns.RowActions) {
    return () => renderRowActionsCellSkeleton();
  }

  if (noBodyCellPadding) {
    return () => renderPinnedPaddingSkeleton();
  }

  return () => renderLoadingCellSkeleton();
}
