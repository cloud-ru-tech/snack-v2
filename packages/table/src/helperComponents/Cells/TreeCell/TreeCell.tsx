import { APPEARANCE, Button, VIEW } from '@ds/button';
import { ChevronRightSVG, FileSVG, FolderOpenSVG, FolderSVG } from '@ds/icons';
import { Checkbox, Radio } from '@ds/toggles';
import { TruncateString } from '@ds/truncate-string';
import { CellContext, HeaderContext } from '@tanstack/react-table';
import { MouseEvent, ReactNode, useCallback, useEffect, useMemo } from 'react';

import { RowAppearance } from '../../../components/types';
import { COLUMN_PIN_POSITION, TEST_IDS } from '../../../constants';
import { useCellResize } from '../../../contexts';
import { renderMasterSelectionToggle } from '../../../helpers';
import { ColumnDefinition } from '../../../types';
import { TREE_CELL_ID } from './constants';
import styles from './styles.module.scss';
import { TreeLine } from './TreeLine';

type BaseTreeColumnDef = {
  /** Имя ключа соответствующее полю в data */
  accessorKey: string;
  /** Показывать линии-направляющие вложенности (вертикальные и горизонтальные) */
  showLines?: boolean;
  /** Иконка элемента-родителя в открытом состоянии */
  expandedIcon?: ReactNode;
  /** Иконка элемента-родителя в закрытом состоянии */
  collapsedIcon?: ReactNode;
  /** Иконка дочернего */
  icon?: ReactNode;
  /** Иконка дочернего элемента */
  showToggle?: boolean;
  /** Минимальный размер ячейки */
  minSize?: number;
};

type TreeColumnDef = BaseTreeColumnDef & {
  header?: never;
  cell?: never;
};

type TreeColumnDefWithDescription<TData> = BaseTreeColumnDef & {
  /** Заголовок колонки */
  cell?(ctx: CellContext<TData, unknown>): ReactNode;
  /** Рендер функция заголовка колонки */
  header?: ColumnDefinition<TData>['header'];
};

export type TreeColumnDefinitionProps<TData> = TreeColumnDef | TreeColumnDefWithDescription<TData>;

type TreeColDefProps<TData> = TreeColumnDefinitionProps<TData> & {
  enableSelection?: boolean;
  rowSelectionAppearance?: RowAppearance;
  isAllRowsMode?: boolean;
};

function renderTreeHeaderLabel(headerContent: ReactNode) {
  if (typeof headerContent === 'string') {
    return <TruncateString text={headerContent} />;
  }

  return headerContent;
}

function resolveUserHeader<TData>(userHeader: TreeColDefProps<TData>['header'], ctx: HeaderContext<TData, unknown>) {
  if (userHeader === undefined) {
    return null;
  }

  if (typeof userHeader === 'function') {
    return userHeader(ctx);
  }

  return userHeader;
}

function renderTreeColumnHeader<TData>(
  userHeader: TreeColDefProps<TData>['header'],
  {
    enableSelection,
    showToggle,
    isAllRowsMode = false,
  }: Pick<TreeColDefProps<TData>, 'enableSelection' | 'showToggle' | 'isAllRowsMode'>,
): ColumnDefinition<TData>['header'] {
  if (!enableSelection || !showToggle) {
    return userHeader;
  }

  function treeColumnHeader(ctx: HeaderContext<TData, unknown>) {
    const headerContent = resolveUserHeader(userHeader, ctx);

    const masterToggle = renderMasterSelectionToggle({
      table: ctx.table,
      isAllRowsMode,
    });

    if (!masterToggle) {
      return headerContent;
    }

    return (
      <div className={styles.treeHeaderContainer}>
        <div className={styles.treeHeader}>
          <div tabIndex={-1} className={styles.cellToggles}>
            {masterToggle}
          </div>
          <div className={styles.treeHeaderContent}>{renderTreeHeaderLabel(headerContent)}</div>
        </div>
      </div>
    );
  }

  return treeColumnHeader;
}

export function renderTreeColumnLoadingHeader<TData>(
  userHeader: TreeColDefProps<TData>['header'],
  { enableSelection, showToggle }: Pick<TreeColDefProps<TData>, 'enableSelection' | 'showToggle'>,
): ColumnDefinition<TData>['header'] {
  if (!enableSelection || !showToggle) {
    return userHeader;
  }

  function treeColumnLoadingHeader(ctx: HeaderContext<TData, unknown>) {
    const headerContent = resolveUserHeader(userHeader, ctx);

    return (
      <div className={styles.treeHeaderContainer}>
        <div className={styles.treeHeader}>
          <div tabIndex={-1} className={styles.cellToggles} aria-hidden />
          <div className={styles.treeHeaderContent}>{renderTreeHeaderLabel(headerContent)}</div>
        </div>
      </div>
    );
  }

  return treeColumnLoadingHeader;
}

/** Вспомогательная функция для создания ячейки со статусом */
export function getTreeColumnDef<TData>({
  showToggle = false,
  showLines = true,
  icon = <FileSVG size={24} />,
  expandedIcon = <FolderOpenSVG size={24} />,
  collapsedIcon = <FolderSVG size={24} />,
  header,
  accessorKey,
  cell: renderCell,
  enableSelection,
  rowSelectionAppearance,
  minSize,
  isAllRowsMode,
}: TreeColDefProps<TData>): ColumnDefinition<TData> {
  const cell = function TreeCell(ctx: CellContext<TData, unknown>) {
    const { row, cell } = ctx;

    const isExpanded = row.getIsExpanded();
    const isExpandable = row.getCanExpand();
    const isMultiSelect = row.getCanMultiSelect();
    const parent = row.getParentRow();
    const isRowsSelectionEnabled = row.getCanSelect();
    const isAllSubRowsSelected = row.getIsAllSubRowsSelected();
    const isSomeSubRowSelected = row.getIsSomeSelected();
    const isRowSelected = row.getIsSelected();
    const isLastChildRow = parent?.subRows.at(-1)?.id === row.id;
    const depth = row.depth;
    const shouldExtendHorizontalLine = Boolean(parent) && !isExpandable;

    const { ref } = useCellResize(TREE_CELL_ID, cell);

    const isToggleHidden = !isRowsSelectionEnabled && rowSelectionAppearance === RowAppearance.HideToggler;

    const linesVisibilityByIndex = useMemo(() => {
      const parents: (typeof row | undefined)[] = [];

      for (let i = depth; i >= 0; i--) {
        parents[i] = i === depth ? row : parents.at(i + 1)?.getParentRow();
      }

      return parents.map((parent, index) => {
        if (!parent || parents.length === index + 1) {
          return true;
        }

        const child = parents[index + 1];

        return child?.id !== parent.subRows.at(-1)?.id || row?.id === child?.id;
      });
    }, [row, depth]);

    const lines = useMemo(
      () =>
        Array.from({ length: depth }, (_, index) => (
          <TreeLine
            key={index}
            visible={showLines && linesVisibilityByIndex.at(index)}
            halfHeight={index === depth - 1 && isLastChildRow}
          />
        )),
      [depth, linesVisibilityByIndex, isLastChildRow],
    );

    useEffect(() => {
      if (!isMultiSelect || !isExpandable || !isRowsSelectionEnabled) {
        return;
      }

      if (isAllSubRowsSelected && !isRowSelected) {
        row.toggleSelected(true, { selectChildren: false });
        return;
      }

      // TODO: сделать одинаково в дереве, таблице и листе
      if (isRowSelected && !isAllSubRowsSelected) {
        row.toggleSelected(false, { selectChildren: false });
        return;
      }
    }, [
      isAllSubRowsSelected,
      isSomeSubRowSelected,
      row,
      isRowSelected,
      isMultiSelect,
      isExpandable,
      isRowsSelectionEnabled,
    ]);

    const toggleClickHandler = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

        if (enableSelection) {
          if (isMultiSelect) {
            const shouldToggleOn = !isAllSubRowsSelected && !isRowSelected;
            const selectChildren = isAllSubRowsSelected || isSomeSubRowSelected || shouldToggleOn;
            row.toggleSelected(shouldToggleOn, { selectChildren });
            return;
          }

          row.toggleSelected(!isRowSelected, { selectChildren: false });
        }
      },
      [isMultiSelect, row, isAllSubRowsSelected, isSomeSubRowSelected, isRowSelected],
    );

    const chevronClickHandler = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        row.toggleExpanded();
      },
      [row],
    );

    const value =
      typeof cell.row.original === 'object' && Object.hasOwn(cell.row.original as object, accessorKey)
        ? (cell.row.original as Record<string, ReactNode>)[accessorKey]
        : (cell.getValue() as ReactNode);

    return (
      <div
        role='presentation'
        data-test-id={TEST_IDS.tree.node}
        className={styles.treeCellContainer}
        ref={ref}
        onClick={toggleClickHandler}
      >
        <div className={styles.treeCell}>
          {lines}
          {Boolean(parent) && <TreeLine horizontal visible={showLines} extended={shouldExtendHorizontalLine} />}
          {isExpandable && (
            <Button
              view={VIEW.Function}
              appearance={APPEARANCE.Neutral}
              size='s'
              data-test-id={TEST_IDS.tree.chevron}
              icon={<ChevronRightSVG />}
              onClick={chevronClickHandler}
              className={styles.cellExpandButton}
              data-expanded={isExpanded || undefined}
            />
          )}
          {showToggle && !isToggleHidden && (
            <div tabIndex={-1} className={styles.cellToggles}>
              {isMultiSelect ? (
                <Checkbox
                  size='xs'
                  disabled={!isRowsSelectionEnabled}
                  checked={isRowSelected}
                  data-test-id={TEST_IDS.tree.checkbox}
                  indeterminate={isSomeSubRowSelected && !isAllSubRowsSelected}
                />
              ) : (
                <Radio
                  size='xs'
                  disabled={!isRowsSelectionEnabled}
                  data-test-id={TEST_IDS.tree.radio}
                  checked={isRowSelected}
                />
              )}
            </div>
          )}
          <div
            className={styles.treeNodeContent}
            data-disabled={!isRowsSelectionEnabled || undefined}
            data-selected={isRowSelected || undefined}
            data-multiselect={isMultiSelect || undefined}
          >
            <div
              role='presentation'
              onClick={isExpandable ? chevronClickHandler : undefined}
              className={styles.cellUserToggleIcon}
            >
              {isExpandable && isExpanded && expandedIcon}
              {isExpandable && !isExpanded && collapsedIcon}
              {!isExpandable && icon}
            </div>
            <div role='presentation' className={styles.userContent}>
              {renderCell ? renderCell(ctx) : <TruncateString text={String(value ?? '')} />}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return {
    id: TREE_CELL_ID,
    pinned: COLUMN_PIN_POSITION.Left,
    accessorKey,
    noBodyCellPadding: true,
    noHeaderCellPadding: Boolean(enableSelection && showToggle),
    enableResizing: true,
    minSize,
    size: 150,
    maxSize: Number.MAX_SAFE_INTEGER,
    meta: {
      skipOnExport: false,
    },
    enableSorting: false,
    header: renderTreeColumnHeader(header, { enableSelection, showToggle, isAllRowsMode }),
    cell,
  };
}
