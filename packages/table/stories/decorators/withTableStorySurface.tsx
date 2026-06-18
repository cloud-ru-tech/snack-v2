import { AdaptiveProvider, LayoutType } from '@ds/adaptive';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { TableStickyControlsBackgroundPredefined } from '@ds/table';
import { Decorator } from '@storybook/react';

import { TableStorySurfaceSync } from '../components/TableStorySurfaceSync';

type TableStorySurfaceArgs = {
  stickyControlsEnabled?: boolean;
  stickyControlsBackgroundPredefined?: TableStickyControlsBackgroundPredefined;
};

export const withTableStorySurface: Decorator = (Story, { args, globals }) => {
  const {
    stickyControlsEnabled,
    stickyControlsBackgroundPredefined = BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
  } = args as TableStorySurfaceArgs;
  const layoutType = globals.layoutType as LayoutType | undefined;

  return (
    <AdaptiveProvider layoutType={layoutType}>
      <TableStorySurfaceSync
        stickyControlsEnabled={stickyControlsEnabled}
        stickyControlsBackgroundPredefined={stickyControlsBackgroundPredefined}
      >
        <Story />
      </TableStorySurfaceSync>
    </AdaptiveProvider>
  );
};
