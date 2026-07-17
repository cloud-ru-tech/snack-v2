import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Button, VIEW } from '@ds/button';
import { FunctionSettingsSVG } from '@ds/icons/interface/system';
import { Droplist, GroupSelectItemProps, SelectionMultipleState, SIZE } from '@ds/list';
import { Tooltip } from '@ds/tooltip';
import { ReactNode, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { renderColumnsSettingsOverflowButton } from '../../helpers';
import tooltipStyles from '../../helpers/toolbarTooltipTrigger.module.scss';
import { tableLocale } from '../../locale';
import styles from './useColumnsSettingsToolbarSlot.module.scss';

export type ColumnsSettingsProps = {
  enabledColumns: string[];
  setEnabledColumns(enabledColumns: string[]): void;
  columnsSettings: [GroupSelectItemProps];
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
}: ColumnsSettingsToolbarSlotParams): ColumnsSettingsToolbarSlotResult {
  const { t } = tableLocale.useTranslations();
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);
  const [open, setOpen] = useState(false);

  const droplist = (
    <Droplist
      scroll
      className={styles.columnsSettings}
      size={SIZE.M}
      items={columnsSettings}
      selection={
        {
          value: enabledColumns,
          onChange: value => setEnabledColumns(value as string[]),
          mode: 'multiple',
        } satisfies SelectionMultipleState
      }
      placement='bottom-end'
      label={t('settingsHeaderLabel')}
      open={open}
      onOpenChange={setOpen}
      data-test-id={TEST_IDS.columnSettings.droplist}
    >
      {isMobile ? (
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
      )}
    </Droplist>
  );

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
