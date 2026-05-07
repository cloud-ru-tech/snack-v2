import { addons, types } from 'storybook/manager-api';

import { ADDON_ID, PANEL_ID } from './constants';
import { FigmaPanel } from './Panel';

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Figma',
    // `paramKey` позволяет скрыть панель на конкретной story/meta:
    // `parameters: { figma: { disable: true } }`.
    paramKey: 'figma',
    match: ({ viewMode }: { viewMode?: string }) => viewMode === 'story',
    render: ({ active }) => (active ? <FigmaPanel /> : null),
  });
});
