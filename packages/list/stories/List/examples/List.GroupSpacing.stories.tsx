import { HomeSVG, PlaceholderSVG, TableSVG } from '@ds/icons/interface/system';
import { ItemProps as Item, List } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from './List.GroupSpacing.module.scss';

// Figma reference — dropdownM «Платформы» из FF-8692 navigation: listItemGroup (44px)
// над тремя listItem (по 32px), ширина контейнера 208px.
const FIGMA_URL = 'https://www.figma.com/design/te3bVXwakjuUc3QTOfu9Mm/FF-8692--navigation-?node-id=11151-37480';

const meta: Meta<typeof List> = {
  title: 'Components/List/List/Examples/GroupSpacing',
  component: List,
  parameters: { layout: 'fullscreen', design: { type: 'figma', url: FIGMA_URL } },
};

export default meta;
type Story = StoryObj<typeof List>;

// Иконки-глифы продуктов в DS отсутствуют — берём системные того же размера (24),
// на геометрию строки это не влияет.
const items: Item[] = [
  {
    type: 'group-select',
    id: 'group-platforms',
    label: 'Платформы',
    selectButtonLabel: 'Выбрать все',
    items: [
      { id: 'evolution', beforeContent: <PlaceholderSVG />, content: { label: 'Evolution', caption: '3' } },
      { id: 'advanced', beforeContent: <HomeSVG />, content: { label: 'Advanced', caption: '0' } },
      { id: 'vmware', beforeContent: <TableSVG />, content: { label: 'Облако VMWare', caption: '0' } },
    ],
  },
];

function GroupSpacingScenario() {
  const [value, setValue] = useState<Array<string | number>>([]);

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Group spacing</DemoTitle>
        <DemoHint>
          Геометрия по макету: заголовок группы — 44px (padding-top 10, контент 32, padding-bottom 2), строка — 32px.
        </DemoHint>
        <DemoActions align='center'>
          <div className={styles.dropdown}>
            <List
              data-test-id={TEST_IDS.list.groupSpacingScenario}
              size='s'
              items={items}
              selection={{ mode: 'multiple', value, onChange: setValue }}
            />
          </div>

          <div className={styles.dropdown}>
            <List
              data-test-id={TEST_IDS.list.groupSpacingScenario}
              size='m'
              items={items}
              // selection={{ mode: 'multiple', value, onChange: setValue }}
            />
          </div>

          <div className={styles.dropdown}>
            <List
              data-test-id={TEST_IDS.list.groupSpacingScenario}
              size='m'
              items={items}
              selection={{ mode: 'multiple', value, onChange: setValue }}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const GroupSpacing: Story = {
  tags: ['dev'],
  render: () => <GroupSpacingScenario />,
};
