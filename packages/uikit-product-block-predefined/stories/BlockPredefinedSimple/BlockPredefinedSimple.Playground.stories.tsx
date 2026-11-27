import { BlockPredefinedSimple } from '@ds/uikit-product-block-predefined';
import type { Meta, StoryObj } from '@storybook/react';

import { actions } from './actions';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof BlockPredefinedSimple> = {
  title: 'Uikit Product/BlockPredefined/Simple',
  component: BlockPredefinedSimple,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <div className={styles.preview}>
      <BlockPredefinedSimple {...args} />
    </div>
  ),
  argTypes: {
    maxVisibleActionsItems: {
      control: { type: 'range', min: 0, max: 2, step: 1 },
      if: { global: 'layoutType', eq: 'mobile' },
    },
  },
  args: {
    title: 'Участники проекта',
    children: 'В проекте три участника.',
    actions,
    maxVisibleActionsItems: 1,
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
export const Playground: StoryObj<typeof BlockPredefinedSimple> = {
  args: {
    maxVisibleActionsItems: 1,
  },
};
