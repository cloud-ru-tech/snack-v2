import { Button } from '@ds/button';
import { ChipChoiceRow, FiltersState } from '@ds/chips';
import { UpdateSVG } from '@ds/icons';
import { extractSupportProps, getThemeClassnames, LAYOUT_TYPE } from '@ds/utils';
import cn from 'classnames';
import { useMemo, useRef } from 'react';

import { BulkActions, DataView, FilterButton, MoreActions, Search, Separator } from '../../helperComponents';
import { toolbarLocale } from '../../locale';
import { TEST_IDS } from '../../testIds';
import { extractBulkActionsProps, isBulkActionsProps } from './helpers';
import { useFilters, usePersistState } from './hooks';
import styles from './styles.module.scss';
import { ToolbarProps } from './types';
import { buildMobileOverflowActions } from './utils/buildMobileOverflowActions';

export function Toolbar<TState extends FiltersState = Record<string, unknown>>({
  className,
  after,
  dataView,
  outline = true,
  layoutType = LAYOUT_TYPE.Desktop,
  moreActions,
  onRefresh,
  search,
  filterRow: filterRowProps,
  persist,
  ...rest
}: ToolbarProps<TState>) {
  const { t } = toolbarLocale.useTranslations();
  const supportProps = extractSupportProps(rest);
  const needsBulkActions = isBulkActionsProps(rest);
  const isMobile = layoutType === LAYOUT_TYPE.Mobile;
  const containerWrapperRef = useRef<HTMLDivElement>(null);

  const { filterButton, filterRow } = useFilters<TState>({ filterRow: filterRowProps, layoutType });

  usePersistState({ persist, filter: filterRow?.value, search: search?.value });

  const mobileOverflowActions = useMemo(
    () =>
      isMobile
        ? buildMobileOverflowActions({
            onRefresh,
            after,
            moreActions,
            refreshLabel: t('refresh'),
          })
        : undefined,
    [isMobile, onRefresh, after, moreActions, t],
  );

  const effectiveMoreActions = isMobile ? mobileOverflowActions : moreActions;
  const showMoreActionsMenu = Boolean(effectiveMoreActions?.length);
  const showRefreshButton = Boolean(onRefresh) && !isMobile;
  const showAfterSlot = Boolean(after) && !isMobile;
  const hasLeftSideElements = showRefreshButton;
  const showDataView = Boolean(dataView?.show);
  const hasRightSideElements = Boolean(showAfterSlot || showDataView || showMoreActionsMenu || filterRowProps);

  const showSeparatorAfterExtra = Boolean(showAfterSlot && (showDataView || filterButton || showMoreActionsMenu));

  return (
    <div
      className={cn(
        isMobile ? getThemeClassnames({ density: 'comfort' }) : getThemeClassnames({ density: 'compact' }),
        styles.containerWrapper,
      )}
      ref={containerWrapperRef}
      {...supportProps}
      data-test-id={supportProps['data-test-id'] ?? TEST_IDS.main}
    >
      <div className={cn(styles.container, className)} data-acrylic-appearance='neutral' data-acrylic-level='1Level'>
        <div className={styles.acrylic} aria-hidden />

        {outline && <div className={styles.border} aria-hidden />}

        <div className={styles.content}>
          {hasLeftSideElements && (
            <div className={styles.beforeSearch}>
              <Button
                view='function'
                appearance='neutral'
                icon={<UpdateSVG />}
                size='m'
                className={styles.updateButton}
                onClick={onRefresh}
                data-test-id={TEST_IDS.refreshButton}
              />
            </div>
          )}

          {hasLeftSideElements && <Separator />}

          <div className={styles.searchWrapper}>{search && <Search {...search} />}</div>

          {hasRightSideElements && (
            <>
              <Separator />

              {showAfterSlot && (
                <div data-test-id={TEST_IDS.after} className={styles.slot}>
                  {after}
                </div>
              )}

              {showSeparatorAfterExtra && <Separator />}

              {showDataView && dataView && (
                <div data-test-id={TEST_IDS.dataView} className={styles.slot}>
                  <DataView
                    value={dataView.value}
                    defaultValue={dataView.defaultValue}
                    onChange={dataView.onChange}
                    items={dataView.items}
                  />
                </div>
              )}

              {filterButton && (
                <div className={styles.slot}>
                  <FilterButton {...filterButton} />
                </div>
              )}

              {showMoreActionsMenu && effectiveMoreActions && (
                <div className={styles.slot}>
                  <MoreActions moreActions={effectiveMoreActions} layoutType={layoutType} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {filterRow && <ChipChoiceRow<TState> {...filterRow} size='s' data-test-id={TEST_IDS.filterRow} />}

      {needsBulkActions && (
        <BulkActions
          {...extractBulkActionsProps(rest)}
          layoutType={layoutType}
          resizingContainerRef={containerWrapperRef}
        />
      )}
    </div>
  );
}
