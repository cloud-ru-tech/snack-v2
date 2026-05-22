import { APPEARANCE, SIZE, TagRow } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const meta: Meta<typeof TagRow> = {
  title: 'Components/Tag/TagRow',
  component: TagRow,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Ряд тегов с переносом строк и опциональным ограничением rowLimit.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.rowContainer}>
            <TagRow {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    size: SIZE.Xs,
    items: [
      { id: '1', label: 'Frontend', appearance: APPEARANCE.Blue },
      { id: '2', label: 'Backend', appearance: APPEARANCE.Green },
      { id: '3', label: 'Design', appearance: APPEARANCE.Violet },
      { id: '4', label: 'Mobile', appearance: APPEARANCE.Orange },
    ],
    'data-test-id': TEST_IDS.tagRow.root,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    rowLimit: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof TagRow>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByTestId(TEST_IDS.tagRow.root)).toBeVisible();
  },
};
