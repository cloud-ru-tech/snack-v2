import { Button } from '@ds/button';
import { Droplist, DroplistProps, ItemProps as Item } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

// satisfies сохраняет литеральный тип элементов: фильтр читает `content.label` без кастов.
const SHORT_LIST = [
  { id: 'overview', content: { label: 'Overview' } },
  { id: 'analytics', content: { label: 'Analytics' } },
  { id: 'billing', content: { label: 'Billing' } },
  { id: 'settings', content: { label: 'Settings' } },
  { id: 'members', content: { label: 'Members' } },
] satisfies Item[];

const LONG_LIST = [
  ...SHORT_LIST,
  { id: 'projects', content: { label: 'Projects' } },
  { id: 'teams', content: { label: 'Teams' } },
  { id: 'roles', content: { label: 'Roles' } },
  { id: 'audit', content: { label: 'Audit log' } },
  { id: 'reports', content: { label: 'Reports' } },
  { id: 'notifications', content: { label: 'Notifications' } },
  { id: 'integrations', content: { label: 'Integrations' } },
] satisfies Item[];

function SearchRender({ options, ...args }: DroplistProps & { options: typeof SHORT_LIST }) {
  const [query, setQuery] = useState('');

  const items = options.filter(item => item.content.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Droplist with search</DemoTitle>
        <DemoHint>Search-field в шапке дроплиста фильтрует items.</DemoHint>
        <DemoActions align='center'>
          <Droplist {...args} items={items} search={{ value: query, onChange: setQuery, placeholder: 'Поиск' }}>
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
  );
}

const meta: Meta<DroplistProps> = {
  title: 'Components/List/Droplist/Examples/Search',
  component: Droplist,
  parameters: { layout: 'fullscreen' },
  args: { size: 'm', placement: 'bottom-start', trigger: 'click', marker: true },
  render: args => <SearchRender {...args} options={SHORT_LIST} />,
};

export default meta;
type Story = StoryObj<DroplistProps>;

export const Search: Story = {
  tags: ['dev', 'test'],
  args: { layoutPresets: { mobile: { alwaysShowSearch: true } } },
};

export const LongList: Story = {
  tags: ['dev', 'test'],
  globals: { layoutType: 'mobile' },
  render: args => <SearchRender {...args} options={LONG_LIST} />,
};
