import { APPEARANCE, Button, VIEW as BUTTON_VIEW } from '@ds/button';
import { DownloadSVG } from '@ds/icons';
import { Tooltip } from '@ds/tooltip';
import { MouseEvent, ReactNode } from 'react';

import { TEST_IDS } from '../constants';
import { renderToolbarAfterOverflowButton } from './renderToolbarAfterOverflowButton';
import tooltipStyles from './toolbarTooltipTrigger.module.scss';

type RenderExportToolbarButtonParams = {
  ariaLabel: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  overflow?: boolean;
};

export function renderExportToolbarButton({
  ariaLabel,
  onClick,
  overflow = false,
}: RenderExportToolbarButtonParams): ReactNode {
  if (overflow) {
    return renderToolbarAfterOverflowButton({
      'aria-label': ariaLabel,
      icon: <DownloadSVG />,
      onClick,
      'data-test-id': TEST_IDS.export.overflowTrigger,
    });
  }

  return (
    <Tooltip tip={ariaLabel} triggerClassName={tooltipStyles.trigger} placement='bottom'>
      <Button
        view={BUTTON_VIEW.Function}
        appearance={APPEARANCE.Neutral}
        size='m'
        icon={<DownloadSVG />}
        aria-label={ariaLabel}
        onClick={onClick}
        data-test-id={TEST_IDS.export.trigger}
      />
    </Tooltip>
  );
}
