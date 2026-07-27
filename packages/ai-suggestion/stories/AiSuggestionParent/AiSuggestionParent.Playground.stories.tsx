import { AiSuggestionParent, AiSuggestionParentProps, CHILD_TYPE, SIZE } from '@ds/ai-suggestion';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const defaultItems: AiSuggestionParentProps['items'] = [
  { label: 'Suggestion 1', icon: <PlaceholderSVG /> },
  { label: 'Suggestion 2', icon: <PlaceholderSVG /> },
  {
    type: CHILD_TYPE.Parent,
    key: 'nested-a',
    label: 'Nested group A',
    icon: <PlaceholderSVG />,
    items: [{ label: 'Nested A 1' }, { label: 'Nested A 2' }],
  },
  {
    key: 'nested-b',
    label: 'Nested group B',
    icon: <PlaceholderSVG />,
    items: [
      { label: 'Nested B 1' },
      {
        key: 'nested-b-level-2',
        label: 'Nested group B.2',
        items: [
          { label: 'Nested B 2.1' },
          {
            key: 'nested-b-level-3',
            label: 'Nested group B.2.2',
            items: [{ label: 'Nested B 2.2.1' }, { label: 'Nested B 2.2.2' }],
          },
        ],
      },
    ],
  },
];

const meta: Meta<AiSuggestionParentProps> = {
  title: 'AI/AiSuggestion/AiSuggestionParent',
  component: AiSuggestionParent,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/tCbbB5RUGyJeBRtjF3dt4d/AI-COMPONENTS?node-id=6467-21511',
    },
  },
  args: {
    label: 'Label text',
    icon: <PlaceholderSVG />,
    size: SIZE.S,
    disabled: false,
    items: defaultItems,
    onExpandedChange: fn(),
    onItemClick: fn(),
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    label: { control: 'text', description: 'Текст на триггере' },
    icon: { control: false, description: 'Иконка слева от текста' },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер (Figma: Mobile Off → s, Mobile On → m)',
    },
    disabled: { control: 'boolean', description: 'Блокирует взаимодействие' },
    expanded: { control: 'boolean', description: 'Раскрыт (controlled; без пропа — uncontrolled, свёрнут)' },
    items: { control: false, description: 'Вложенные AiSuggestionSimple и AiSuggestionParent' },
    onExpandedChange: { action: 'expandedChange' },
    onItemClick: { action: 'itemClick' },
  },
};

export default meta;
type Story = StoryObj<AiSuggestionParentProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Parent с chevron раскрывает вложенные подсказки в одну строку.</DemoHint>
        <DemoActions className={styles.playgroundPage} align='start'>
          <AiSuggestionParent {...args} label='Label text 1' />
          <AiSuggestionParent {...args} label='Label text 2' />
          <AiSuggestionParent {...args} label='Label text 3' />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const root = within(canvasElement).getAllByTestId(TEST_IDS.root)[0];
    await expect(root).toBeVisible();
    await expect(within(root).getAllByTestId(TEST_IDS.trigger)[0]).toBeVisible();
  },
};

const childLabels = ['Vision', 'Search', 'Code', 'Image', 'Audio'];

const multiGroups: Array<{ label: string; children: string[] }> = [
  { label: 'Models', children: ['GPT-4', 'Claude', 'Gemini'] },
  { label: 'Tools', children: ['Search', 'Calc', 'Code', 'Image'] },
  { label: 'Sources', children: ['Web', 'Docs'] },
  { label: 'Format', children: ['Markdown', 'JSON', 'PDF', 'Audio'] },
  { label: 'Style', children: ['Concise', 'Detailed', 'Formal'] },
];

export const SingleGroup: Story = {
  tags: ['dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Single group</DemoTitle>
        <DemoHint>Один parent с дочерними чипами — анимация из коробки.</DemoHint>
        <div className={styles.wrap}>
          <AiSuggestionParent {...args} items={childLabels.map(label => ({ label, icon: <PlaceholderSVG /> }))} />
        </div>
      </DemoPanel>
    </DemoPage>
  ),
};

export const MultiGroup: Story = {
  tags: ['dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Multi group</DemoTitle>
        <DemoHint>Несколько parent&apos;ов в одном flex-wrap — layout spring переставляет соседей при toggle.</DemoHint>
        <div className={`${styles.wrap} ${styles.wrapNarrow}`}>
          {multiGroups.map(group => (
            <AiSuggestionParent
              key={group.label}
              {...args}
              label={group.label}
              items={group.children.map(label => ({ label, icon: <PlaceholderSVG /> }))}
            />
          ))}
        </div>
      </DemoPanel>
    </DemoPage>
  ),
};
