import { FileSVG, StarSVG } from '@ds/icons';
import { ItemProps as Item, List } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../stories.module.scss';

const meta: Meta<typeof List> = {
  title: 'Components/List/List/Examples/Polymorphic',
  component: List,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof List>;

// itemWrapRender оборачивает отрендеренный item в произвольный узел — типичный кейс:
// проксирование в навигационную ссылку (<a> / Link роутера) или Tooltip.
const items: Item[] = [
  {
    id: 'docs',
    beforeContent: <FileSVG />,
    content: { option: 'Documentation' },
    itemWrapRender: node => <a href='https://cloud.ru/docs'>{node}</a>,
  },
  {
    id: 'external',
    beforeContent: <StarSVG />,
    content: { option: 'External link' },
    itemWrapRender: node => (
      <a href='https://cloud.ru/' target='_blank' rel='noopener noreferrer'>
        {node}
      </a>
    ),
  },
];

export const Polymorphic: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Polymorphic items (itemWrapRender)</DemoTitle>
        <DemoHint>Каждый item обёрнут в навигационную ссылку; внешняя — с target=_blank + rel.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.listFrame}>
            <List data-test-id={TEST_IDS.list.polymorphicScenario} items={items} size='m' />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.list.polymorphicScenario)).toBeVisible();
  },
};
