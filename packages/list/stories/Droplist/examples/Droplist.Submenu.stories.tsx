import { Button } from '@ds/button';
import { FileSVG, FolderSVG, HomeSVG, SettingsSVG, StarSVG } from '@ds/icons/interface/system';
import { Droplist, DroplistProps, ItemProps as Item } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const items: Item[] = [
  { id: 'home', beforeContent: <HomeSVG />, content: { option: 'Home' } },
  {
    id: 'workspace',
    type: 'next-list',
    beforeContent: <FolderSVG />,
    content: { option: 'Workspace' },
    items: [
      { id: 'w-overview', content: { option: 'Overview' } },
      { id: 'w-analytics', content: { option: 'Analytics' } },
      {
        id: 'w-projects',
        type: 'next-list',
        beforeContent: <FileSVG />,
        content: { option: 'Projects' },
        items: [
          { id: 'p-frontend', content: { option: 'Frontend' } },
          { id: 'p-backend', content: { option: 'Backend' } },
        ],
      },
    ],
  },
  { id: 'favourites', beforeContent: <StarSVG />, content: { option: 'Favourites' } },
  { id: 'settings', beforeContent: <SettingsSVG />, content: { option: 'Settings' } },
];

const meta: Meta<DroplistProps> = {
  title: 'Components/List/Droplist/Examples/Submenu',
  component: Droplist,
  parameters: { layout: 'fullscreen' },
  args: { items, size: 'm', placement: 'bottom-start', trigger: 'click', marker: true },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Droplist with nested next-list</DemoTitle>
        <DemoHint>Workspace и Projects — вложенные next-list, открываются по hover.</DemoHint>
        <DemoActions align='center'>
          <Droplist {...args}>
            <Button
              data-test-id={TEST_IDS.droplist.triggerOpen}
              label='Open droplist'
              view='outline'
              appearance='neutral'
              size='m'
            />
          </Droplist>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<DroplistProps>;

export const Submenu: Story = { tags: ['dev', 'test'] };
