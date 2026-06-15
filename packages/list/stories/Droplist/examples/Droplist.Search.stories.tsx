import { Button } from '@ds/button';
import { Droplist, DroplistProps, ItemProps as Item } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

// satisfies сохраняет литеральный тип элементов: фильтр читает `content.option` без кастов.
const ALL_ITEMS = [
  { id: 'overview', content: { option: 'Overview' } },
  { id: 'analytics', content: { option: 'Analytics' } },
  { id: 'billing', content: { option: 'Billing' } },
  { id: 'settings', content: { option: 'Settings' } },
  { id: 'members', content: { option: 'Members' } },
] satisfies Item[];

function SearchRender(args: DroplistProps) {
  const [query, setQuery] = useState('');

  const items = ALL_ITEMS.filter(item => item.content.option.toLowerCase().includes(query.toLowerCase()));

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
  render: args => <SearchRender {...args} />,
};

export default meta;
type Story = StoryObj<DroplistProps>;

export const Search: Story = { tags: ['dev', 'test'] };
