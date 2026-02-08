import React from 'react';
import { addons, types } from 'storybook/manager-api';

import { ADDON_ID, TOOL_ID } from './src/constants';
import { ThemeControlsToolbar } from './src/toolbar/ThemeControlsToolbar';

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Тема / Бренд / Платформа',
    match: ({ tabId, viewMode }: { tabId?: string; viewMode?: string }) => !tabId && viewMode === 'story',
    render: () => <ThemeControlsToolbar />,
  });
});
