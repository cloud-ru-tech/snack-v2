import { ItemProps as Item, List, TEST_IDS as INTERNAL_TEST_IDS } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../stories.module.scss';

const itemId = (id: string) => `${INTERNAL_TEST_IDS.baseItem}_${id}`;
// SearchPrivate рендерит нативный input с этим data-test-id (из @ds/search-private).
const SEARCH_INPUT_TEST_ID = 'search__field-input';

const meta: Meta<typeof List> = {
  title: 'Components/List/List/Examples/Search',
  component: List,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof List>;

const items: Item[] = [
  { id: 'a', content: { option: 'Overview' } },
  { id: 'b', content: { option: 'Analytics' } },
  { id: 'c', content: { option: 'Billing' } },
  { id: 'd', content: { option: 'Settings' } },
];

function SearchScenario() {
  const [value, setValue] = useState('');
  const filtered = items.filter(item => {
    const content = 'content' in item ? item.content : undefined;
    if (typeof content === 'object' && content && 'option' in content) {
      return String(content.option).toLowerCase().includes(value.toLowerCase());
    }
    return true;
  });
  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Search</DemoTitle>
        <DemoHint>Контролируемая фильтрация items по значению input.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.listFrame}>
            <List
              data-test-id={TEST_IDS.list.searchScenario}
              items={filtered}
              size='m'
              search={{ placeholder: 'Search', value, onChange: setValue }}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Search: Story = {
  tags: ['dev', 'test'],
  render: () => <SearchScenario />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(SEARCH_INPUT_TEST_ID);

    await step('type filter value narrows the list', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'an');
      await expect(canvas.getByTestId(itemId('b'))).toBeVisible();
      await expect(canvas.queryByTestId(itemId('a'))).toBeNull();
    });
    await step('clear filter restores the full list', async () => {
      await userEvent.clear(input);
      await expect(canvas.getByTestId(itemId('a'))).toBeVisible();
    });
  },
};
