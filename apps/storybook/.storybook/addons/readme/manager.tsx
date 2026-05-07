import { addons, types } from 'storybook/manager-api';

import { ADDON_ID, PANEL_ID } from './constants';
import { ReadmePanel } from './Panel';

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Readme',
    // `paramKey` позволяет скрыть панель на конкретной story/meta:
    // `parameters: { readme: { disable: true } }`.
    paramKey: 'readme',
    match: ({ viewMode }: { viewMode?: string }) => viewMode === 'story',
    render: ({ active }) => (active ? <ReadmePanel /> : null),
  });
});
