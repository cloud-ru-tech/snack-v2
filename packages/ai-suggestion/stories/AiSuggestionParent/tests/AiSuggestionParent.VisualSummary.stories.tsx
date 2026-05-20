import { AiSuggestionParent, AiSuggestionParentProps, CHILD_TYPE, SIZE } from '@ds/ai-suggestion';
import { PlaceholderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const interactionItems: AiSuggestionParentProps['items'] = [
  { label: 'Suggestion 1', icon: <PlaceholderSVG /> },
  { label: 'Suggestion 2', icon: <PlaceholderSVG /> },
];

const exclusiveItems: AiSuggestionParentProps['items'] = [
  {
    type: CHILD_TYPE.Parent,
    key: 'group-a',
    label: 'Group A',
    icon: <PlaceholderSVG />,
    items: [{ label: 'A 1' }],
  },
  {
    type: CHILD_TYPE.Parent,
    key: 'group-b',
    label: 'Group B',
    icon: <PlaceholderSVG />,
    items: [{ label: 'B 1' }],
  },
  {
    type: CHILD_TYPE.Parent,
    key: 'group-c',
    label: 'Group C',
    icon: <PlaceholderSVG />,
    items: [{ label: 'C 1' }],
  },
];

const deepNestedItems: AiSuggestionParentProps['items'] = [
  {
    key: 'level-1',
    label: 'Level 1',
    items: [
      {
        key: 'level-2',
        label: 'Level 2',
        items: [
          {
            key: 'level-3',
            label: 'Level 3',
            items: [{ label: 'Level 4 suggestion' }],
          },
        ],
      },
    ],
  },
];

const nestedGroupsItems: AiSuggestionParentProps['items'] = [
  { label: 'Suggestion 1', icon: <PlaceholderSVG /> },
  {
    key: 'nested-b',
    label: 'Nested group B',
    icon: <PlaceholderSVG />,
    items: [
      { label: 'Nested B 1' },
      {
        key: 'nested-b-level-2',
        label: 'Nested group B.2',
        items: [{ label: 'Nested B 2.1' }],
      },
    ],
  },
];

const meta: Meta<AiSuggestionParentProps> = {
  title: 'AI/AiSuggestion/AiSuggestionParent/Tests/VisualSummary',
  component: AiSuggestionParent,
  parameters: { layout: 'padded', controls: { disable: true } },
  args: {
    label: 'Label text',
    icon: <PlaceholderSVG />,
    size: SIZE.S,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>VisualSummary</DemoTitle>
        <DemoHint>Сводная страница со всеми визуальными состояниями AiSuggestionParent.</DemoHint>
        <DemoActions align='start'>
          <div className={styles.summaryRows}>
            <div className={styles.summaryRow}>
              <div className={styles.summaryLabel}>Interaction test expanded</div>
              <div className={cn(styles.case, styles.caseNarrow)}>
                <AiSuggestionParent
                  {...args}
                  items={interactionItems}
                  data-test-id={`${TEST_IDS.root}-visual-summary-interaction-test`}
                />
              </div>
            </div>
            <div className={styles.summaryRow}>
              <div className={styles.summaryLabel}>Exclusive nested (single open child)</div>
              <div className={cn(styles.case, styles.caseMedium)}>
                <AiSuggestionParent
                  {...args}
                  items={exclusiveItems}
                  data-test-id={`${TEST_IDS.root}-visual-summary-exclusive`}
                />
              </div>
            </div>
            <div className={styles.summaryRow}>
              <div className={styles.summaryLabel}>Deep nesting expanded to level 4</div>
              <div className={cn(styles.case, styles.caseWide)}>
                <AiSuggestionParent
                  {...args}
                  items={deepNestedItems}
                  data-test-id={`${TEST_IDS.root}-visual-summary-deep`}
                />
              </div>
            </div>
            <div className={styles.summaryRow}>
              <div className={styles.summaryLabel}>Nested groups: B and B.2</div>
              <div className={cn(styles.case, styles.caseMedium)}>
                <AiSuggestionParent
                  {...args}
                  items={nestedGroupsItems}
                  data-test-id={`${TEST_IDS.root}-visual-summary-nested`}
                />
              </div>
            </div>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<AiSuggestionParentProps>;

export const VisualSummary: Story = {
  tags: ['test', 'dev'],
};
