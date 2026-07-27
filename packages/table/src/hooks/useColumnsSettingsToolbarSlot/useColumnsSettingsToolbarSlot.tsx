import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Button, VIEW } from '@ds/button';
import { FunctionSettingsSVG } from '@ds/icons/interface/system';
import { Droplist, ReorderableDroplist, ReorderItem, SelectionMultipleState, Separator, SIZE } from '@ds/list';
import { Tooltip } from '@ds/tooltip';
import { Dispatch, ReactNode, SetStateAction, useCallback, useState } from 'react';

import type { ColumnsSettingsListModel } from '../../components/Table/hooks/useColumnSettings/useColumnSettings';
import {
  collectReorderLeafIds,
  mergeColumnOrderFromSettings,
} from '../../components/Table/hooks/useColumnSettings/utils';
import { TEST_IDS } from '../../constants';
import { renderColumnsSettingsOverflowButton } from '../../helpers';
import tooltipStyles from '../../helpers/toolbarTooltipTrigger.module.scss';
import { tableLocale } from '../../locale';
import styles from './useColumnsSettingsToolbarSlot.module.scss';

export type ColumnsSettingsProps = {
  enabledColumns: string[];
  setEnabledColumns(enabledColumns: string[]): void;
  columnsSettings: ColumnsSettingsListModel;
  setColumnOrder?: Dispatch<SetStateAction<string[]>>;
};

export type ColumnsSettingsToolbarSlotParams = ColumnsSettingsProps & {
  enabled?: boolean;
};

export type ColumnsSettingsToolbarSlotResult = {
  afterContent: ReactNode;
  mobileMount: ReactNode;
};

/** Слот настроек колонок в тулбаре: `afterContent` — в `after`, `mobileMount` — BottomSheet вне строки тулбара. */
export function useColumnsSettingsToolbarSlot({
  enabled = true,
  columnsSettings,
  enabledColumns,
  setEnabledColumns,
  setColumnOrder,
}: ColumnsSettingsToolbarSlotParams): ColumnsSettingsToolbarSlotResult {
  const { t } = tableLocale.useTranslations();
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);
  const [open, setOpen] = useState(false);

  const selection = {
    value: enabledColumns,
    onChange: value => setEnabledColumns(value as string[]),
    mode: 'multiple',
  } satisfies SelectionMultipleState;

  const handleSelectAll = useCallback(() => {
    if (!columnsSettings.enableReorder) {
      return;
    }

    setEnabledColumns(columnsSettings.areAllColumnsEnabled ? [] : columnsSettings.allColumnIds);
  }, [columnsSettings, setEnabledColumns]);

  const handleItemsReorder = useCallback(
    (items: ReorderItem[]) => {
      if (!setColumnOrder) {
        return;
      }

      const settingsOrderedIds = collectReorderLeafIds(items);

      setColumnOrder(prev => mergeColumnOrderFromSettings(prev, settingsOrderedIds));
    },
    [setColumnOrder],
  );

  const trigger = isMobile ? (
    <span className={styles.hiddenTrigger} aria-hidden />
  ) : (
    <Tooltip
      tip={t('settingsHeaderLabel')}
      triggerClassName={tooltipStyles.trigger}
      placement='bottom'
      open={open ? false : undefined}
    >
      <Button
        view={VIEW.Function}
        appearance='neutral'
        size='m'
        data-test-id={TEST_IDS.columnSettings.trigger}
        icon={<FunctionSettingsSVG />}
        aria-label={t('settingsHeaderLabel')}
      />
    </Tooltip>
  );

  // Общая обвязка дроплиста: различаются только модель айтемов и header с «показать/скрыть все».
  // `label` (заголовок поверхности / шапка BottomSheet) — только у плоского дроплиста без Separator'а.
  // У reorderable заголовок несёт Separator внутри списка (мастер columnSettingBottomSheet: showHeader=false),
  // иначе на mobile-листе получается два одинаковых заголовка.
  const commonDroplistProps = {
    scroll: true,
    className: styles.columnsSettings,
    size: SIZE.M,
    selection,
    placement: 'bottom-end',
    open,
    onOpenChange: setOpen,
    'data-test-id': TEST_IDS.columnSettings.droplist,
  } as const;

  function renderReorderableDroplist() {
    if (!columnsSettings.enableReorder) {
      return null;
    }

    const { areAllColumnsEnabled } = columnsSettings;

    return (
      <ReorderableDroplist
        {...commonDroplistProps}
        pinTop={columnsSettings.pinTop}
        items={columnsSettings.items}
        pinBottom={columnsSettings.pinBottom}
        onItemsReorder={handleItemsReorder}
        header={
          <Separator
            label={t('settingsHeaderLabel')}
            selectButton={{
              checked: areAllColumnsEnabled,
              label: areAllColumnsEnabled ? t('groupSelectButton.hide') : t('groupSelectButton.show'),
              onClick: handleSelectAll,
            }}
          />
        }
      >
        {trigger}
      </ReorderableDroplist>
    );
  }

  function renderGroupSelectDroplist() {
    if (columnsSettings.enableReorder) {
      return null;
    }

    return (
      <Droplist {...commonDroplistProps} label={t('settingsHeaderLabel')} items={columnsSettings.items}>
        {trigger}
      </Droplist>
    );
  }

  const droplist = columnsSettings.enableReorder ? renderReorderableDroplist() : renderGroupSelectDroplist();

  if (!enabled) {
    return { afterContent: null, mobileMount: null };
  }

  if (isMobile) {
    return {
      afterContent: renderColumnsSettingsOverflowButton({
        ariaLabel: t('settingsHeaderLabel'),
        onClick: () => setOpen(true),
      }),
      mobileMount: droplist,
    };
  }

  return { afterContent: droplist, mobileMount: null };
}
