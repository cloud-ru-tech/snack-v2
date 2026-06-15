import { ItemProps as Item, List } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../stories.module.scss';

const meta: Meta<typeof List> = {
  title: 'Components/List/List/Examples/Virtualized',
  component: List,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof List>;

function VirtualizedScenario() {
  const items: Item[] = useMemo(
    () =>
      Array.from({ length: 10000 }, (_, i) => ({
        id: `item-${i}`,
        content: { option: `Item ${i + 1}`, description: `Description for row ${i + 1}` },
      })),
    [],
  );
  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Virtualized</DemoTitle>
        <DemoHint>10 000 items + scroll + virtualized — рендерится только viewport.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.listFrame}>
            <List
              data-test-id={TEST_IDS.list.virtualizedScenario}
              items={items}
              size='m'
              scroll
              virtualized
              limitedScrollHeight
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Virtualized: Story = {
  tags: ['dev', 'test'],
  render: () => <VirtualizedScenario />,
};
