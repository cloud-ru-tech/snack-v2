import { FunctionSettingsSVG } from '@ds/icons/interface/system';
import { MouseEvent, ReactNode } from 'react';

import { TEST_IDS } from '../constants';
import { renderToolbarAfterOverflowButton } from './renderToolbarAfterOverflowButton';

type RenderColumnsSettingsOverflowButtonParams = {
  ariaLabel: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
};

export function renderColumnsSettingsOverflowButton({
  ariaLabel,
  onClick,
}: RenderColumnsSettingsOverflowButtonParams): ReactNode {
  return renderToolbarAfterOverflowButton({
    'aria-label': ariaLabel,
    icon: <FunctionSettingsSVG />,
    onClick,
    'data-test-id': TEST_IDS.columnSettings.overflowTrigger,
  });
}
