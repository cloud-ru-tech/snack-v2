import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { MouseEventHandler, ReactNode } from 'react';

import { renderExportToolbarButton } from '../../helpers';
import { tableLocale } from '../../locale';

export type ExportToolbarSlotParams = {
  enabled?: boolean;
  onExport?: MouseEventHandler<HTMLElement>;
};

export type ExportToolbarSlotResult = {
  afterContent: ReactNode;
};

/** Слот экспорта в тулбаре: иконка на desktop, пункт меню «⋯» на mobile. */
export function useExportToolbarSlot({ enabled = true, onExport }: ExportToolbarSlotParams): ExportToolbarSlotResult {
  const { t } = tableLocale.useTranslations();
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);

  if (!enabled || !onExport) {
    return { afterContent: null };
  }

  return {
    afterContent: renderExportToolbarButton({
      ariaLabel: t('export'),
      onClick: onExport,
      overflow: isMobile,
    }),
  };
}
