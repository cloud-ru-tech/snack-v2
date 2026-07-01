import { TagRow } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';

const meta: Meta<typeof TagRow> = {
  title: 'Components/Tag/TagRow/Examples/Truncated',
  component: TagRow,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof TagRow>;

const items = [
  { id: '1', label: 'Frontend', appearance: 'blue' as const },
  { id: '2', label: 'Backend', appearance: 'green' as const },
  { id: '3', label: 'Design', appearance: 'violet' as const },
  { id: '4', label: 'DevOps', appearance: 'orange' as const },
  { id: '5', label: 'Mobile', appearance: 'pink' as const },
  { id: '6', label: 'Data', appearance: 'yellow' as const },
];

export const Truncated: Story = {
  tags: ['dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Truncated</DemoTitle>
        <DemoHint>TagRow с ограничением в одну строку и кнопкой раскрытия.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.rowNarrow}>
            <TagRow items={items} rowLimit={1} moreButtonLabel='+' data-test-id={TEST_IDS.tagRow.root} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    expect(canvasElement.firstElementChild).toBeTruthy();
  },
};
