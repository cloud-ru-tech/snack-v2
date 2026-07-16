import { FileSVG, FolderSVG, HomeSVG, SettingsSVG, StarSVG } from '@ds/icons/interface/system';
import { ItemProps as Item, List, TEST_IDS as INTERNAL_TEST_IDS } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../stories.module.scss';

// Figma reference — list / listItem.expandable + submenu via privatePopover (next-list).
// Узел: https://www.figma.com/design/wKxqVGm5YH01EgQMBK4a3G/list?node-id=27832-59174.
const FIGMA_SUBMENU_URL = 'https://www.figma.com/design/wKxqVGm5YH01EgQMBK4a3G/list?node-id=27832-59174';

const meta: Meta<typeof List> = {
  title: 'Components/List/List/Examples/Submenu',
  component: List,
  parameters: { layout: 'fullscreen', design: { type: 'figma', url: FIGMA_SUBMENU_URL } },
};

export default meta;
type Story = StoryObj<typeof List>;

const items: Item[] = [
  { id: 'home', beforeContent: <HomeSVG />, content: { label: 'Home' } },
  {
    id: 'workspace',
    type: 'next-list',
    beforeContent: <FolderSVG />,
    content: { label: 'Workspace' },
    items: [
      { id: 'w-overview', content: { label: 'Overview' } },
      { id: 'w-analytics', content: { label: 'Analytics' } },
      {
        id: 'w-projects',
        type: 'next-list',
        beforeContent: <FileSVG />,
        content: { label: 'Projects' },
        items: [
          { id: 'p-frontend', content: { label: 'Frontend' } },
          { id: 'p-backend', content: { label: 'Backend' } },
        ],
      },
    ],
  },
  // Sublist в состоянии загрузки: при открытии вместо элементов рендерится спиннер
  // (NextListItem.loading → ListPrivate). Имитирует ленивую подгрузку вложенных данных.
  {
    id: 'reports',
    type: 'next-list',
    beforeContent: <FileSVG />,
    content: { label: 'Reports (loading)' },
    loading: true,
    items: [{ id: 'r-pending', content: { label: 'Pending…' } }],
  },
  { id: 'favourites', beforeContent: <StarSVG />, content: { label: 'Favourites' } },
  { id: 'settings', beforeContent: <SettingsSVG />, content: { label: 'Settings' } },
];

export const Submenu: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Submenu (next-list)</DemoTitle>
        <DemoHint>Hover «Workspace» — открывается вложенный список (NextListItem → Dropdown).</DemoHint>
        <DemoActions align='center'>
          <div className={styles.listFrame}>
            <List data-test-id={TEST_IDS.list.submenuScenario} items={items} size='m' />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.list.submenuScenario);
    await step('hover root item with submenu (opens NextListItem)', async () => {
      const items = root.querySelectorAll(`[data-test-id^="${INTERNAL_TEST_IDS.baseItem}"]`);
      if (items[1]) await userEvent.hover(items[1] as HTMLElement);
    });
  },
};
