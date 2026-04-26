import { addons, types } from 'storybook/manager-api';

import { ADDON_ID, TOOL_ID } from './src/constants';
import { ThemeControlsToolbar } from './src/toolbar/ThemeControlsToolbar';

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    // В SB 10 `TOOL` — левая группа (меню + remount); `TOOLEXTRA` — правая, рядом с viewport / a11y.
    type: types.TOOL,
    title: 'Тема / Бренд / Платформа',
    match: ({ viewMode, tabId }: { tabId?: string; viewMode?: string }) =>
      Boolean(viewMode && /^(story|docs)$/.test(viewMode)) && (tabId == null || tabId === 'canvas'),
    render: () => <ThemeControlsToolbar />,
  });
});
