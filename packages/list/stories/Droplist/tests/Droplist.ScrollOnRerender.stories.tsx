import { Button } from '@ds/button';
import { Droplist, ItemProps as Item } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const ITEMS_COUNT = 60;
const RERENDER_INTERVAL_MS = 200;

const items: Item[] = Array.from({ length: ITEMS_COUNT }, (_, index) => ({
  id: `item-${index + 1}`,
  content: { label: `Item ${index + 1}` },
}));

const meta: Meta<typeof Droplist> = {
  title: 'Components/List/Droplist/Tests/ScrollOnRerender',
  component: Droplist,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Droplist>;

// Родитель перерисовывается по таймеру при открытом списке: прокрутка не должна возвращаться
// к выбранному пункту (`scrollToSelectedItem` срабатывает только при открытии и смене выбора).
function ScrollOnRerenderScenario() {
  const [value, setValue] = useState<string>('item-1');
  const [rerenderCount, setRerenderCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRerenderCount(count => count + 1), RERENDER_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Scroll on parent rerender</DemoTitle>
        <DemoHint data-test-id={TEST_IDS.droplist.rerenderCount}>Перерисовок родителя: {rerenderCount}</DemoHint>
        <DemoActions align='center'>
          <Droplist
            items={items}
            size='m'
            placement='bottom-start'
            scroll
            scrollToSelectedItem
            selection={{ mode: 'single', value, onChange: id => setValue(String(id)) }}
          >
            <Button
              data-test-id={TEST_IDS.droplist.scrollOnRerenderTrigger}
              label='Trigger'
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

export const ScrollOnRerender: Story = {
  tags: ['dev', 'test'],
  render: () => <ScrollOnRerenderScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.droplist.scrollOnRerenderTrigger)).toBeVisible();
  },
};
