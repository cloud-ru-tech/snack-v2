import { APPEARANCE, Appearance, SIZE, TagRow, TagRowItem, TagRowProps } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const LABEL_POOL = [
  'Frontend',
  'Backend',
  'Design',
  'Mobile',
  'Data',
  'DevOps',
  'QA',
  'Security',
  'Platform',
  'Analytics',
  'Infrastructure',
  'Docs',
  'Research',
  'Growth',
  'Finance',
  'Legal',
];

const APPEARANCE_POOL = Object.values(APPEARANCE);

// Story-only контролы (префикс `[Stories]:`) — генерят `items` и включают ветви
// API (onItemRemove, href), которые нельзя выразить обычным arg'ом массива.
type StoryProps = TagRowProps & {
  itemCount: number;
  removable: boolean;
  asLinks: boolean;
};

function buildItems(count: number, asLinks: boolean): TagRowItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: String(index + 1),
    label: index < LABEL_POOL.length ? LABEL_POOL[index] : `${LABEL_POOL[index % LABEL_POOL.length]} ${index + 1}`,
    appearance: APPEARANCE_POOL[index % APPEARANCE_POOL.length] as Appearance,
    ...(asLinks ? { href: '#' } : {}),
  }));
}

function PlaygroundRender({ itemCount, removable, asLinks, ...rowProps }: StoryProps) {
  const [items, setItems] = useState<TagRowItem[]>(() => buildItems(itemCount, asLinks));

  useEffect(() => {
    setItems(buildItems(itemCount, asLinks));
  }, [itemCount, asLinks]);

  const handleItemRemove = (label: string) => setItems(prev => prev.filter(item => item.label !== label));

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Контролами регулируется число тегов, максимум строк (rowLimit → кнопка «+N»), закрытие тегов и режим
          тегов-ссылок. Контейнер можно тянуть за нижний-правый угол — перенос строк и сворачивание в «+N»
          пересчитываются вживую.
        </DemoHint>
        <DemoActions align='center'>
          <DemoResizable width={480}>
            <TagRow {...rowProps} items={items} onItemRemove={removable ? handleItemRemove : undefined} />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<StoryProps> = {
  title: 'Components/Tag/TagRow',
  component: TagRow,
  parameters: { layout: 'fullscreen' },
  render: args => <PlaygroundRender {...args} />,
  args: {
    size: SIZE.Xs,
    itemCount: 15,
    rowLimit: 1,
    removable: false,
    asLinks: false,
    moreButtonLabel: '+',
    'data-test-id': TEST_IDS.tagRow.root,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    rowLimit: {
      control: { type: 'range', min: 0, max: 6 },
      description: 'Максимум строк до сворачивания в «+N». 0 — без ограничения (перенос всех тегов).',
    },
    moreButtonLabel: { control: 'text' },
    itemCount: { name: '[Stories]: itemCount', control: { type: 'range', min: 1, max: 20, step: 1 } },
    removable: { name: '[Stories]: removable', control: 'boolean' },
    asLinks: { name: '[Stories]: asLinks', control: 'boolean' },
    items: { table: { disable: true } },
    onItemRemove: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByTestId(TEST_IDS.tagRow.root)).toBeVisible();
  },
};
