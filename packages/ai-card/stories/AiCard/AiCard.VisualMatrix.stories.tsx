import { AiCard } from '@ds/ai-card';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiCard> = {
  title: 'AI/Card',
  component: AiCard,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiCard>;

const checkedStates = [false, true] as const;
const enabledRows = [
  { key: 'default', extra: {} as const },
  { key: 'disabled', extra: { disabled: true } as const },
] as const;
const slotRows = [
  { key: 'title-and-content', label: 'title + content', extra: { title: 'Card title', children: 'Default content' } },
  { key: 'title-only', label: 'title only', extra: { title: 'Card title', children: undefined } },
  { key: 'content-only', label: 'content only', extra: { title: undefined, children: 'Default content' } },
  {
    key: 'long-title',
    label: 'long title (ellipsis)',
    extra: { title: 'A really long card title that overflows the available space', children: 'Default content' },
  },
] as const;

function renderCell(props: Parameters<typeof AiCard>[0], testId: string): ReactElement {
  return (
    <div className={styles.cardCell}>
      <AiCard {...props} data-test-id={testId} />
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='State × Checked'
        firstColumnHeader='State'
        columnHeaders={checkedStates.map(c => (c ? 'CHECKED' : 'UNCHECKED'))}
        rows={enabledRows.map(({ key, extra }) => ({
          variantLabel: key,
          cells: checkedStates.map(checked =>
            renderCell(
              { ...extra, checked, title: 'Card title', children: 'Default content' },
              `${TEST_IDS.root}-state-${key}-${checked ? 'checked' : 'unchecked'}`,
            ),
          ),
        }))}
      />

      <StoryTable
        sectionTitle='Slots × Checked'
        firstColumnHeader='Slots'
        columnHeaders={checkedStates.map(c => (c ? 'CHECKED' : 'UNCHECKED'))}
        rows={slotRows.map(({ key, label, extra }) => ({
          variantLabel: label,
          cells: checkedStates.map(checked =>
            renderCell({ ...extra, checked }, `${TEST_IDS.root}-slots-${key}-${checked ? 'checked' : 'unchecked'}`),
          ),
        }))}
      />
    </div>
  ),
};
