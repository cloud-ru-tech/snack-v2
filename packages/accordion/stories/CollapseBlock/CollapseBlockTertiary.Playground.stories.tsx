import { QuestionTooltip } from '@ds/tooltip';
import type { Meta, StoryObj } from '@storybook/react';

import { Accordion, type CollapseBlockTertiaryProps } from '../../src';
import { CHEVRON } from '../../src/constants';
import styles from '../styles.module.scss';

type PlaygroundArgs = CollapseBlockTertiaryProps & { showAfterTitleSlot: boolean };

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Accordion/CollapseBlockTertiary',
  component: Accordion.CollapseBlockTertiary,
  args: {
    id: 'collapseBlockTertiary1',
    title: 'CollapseBlock',
    showAfterTitleSlot: true,
    subTitle: 'CollapseBlock subtitle',
    children: 'CollapseBlock content',
    chevron: 'after',
    keepMounted: false,
  },
  argTypes: {
    chevron: {
      control: 'select',
      options: Object.values(CHEVRON),
    },
    keepMounted: {
      control: 'boolean',
    },
    afterTitle: {
      table: { disable: true },
      control: false,
    },
    showAfterTitleSlot: {
      name: 'Show after title slot',
      control: 'boolean',
    },
  },
  render: ({ showAfterTitleSlot, ...props }) => (
    <div className={styles.story}>
      <Accordion>
        <Accordion.CollapseBlockTertiary
          {...props}
          afterTitle={
            showAfterTitleSlot ? (
              <QuestionTooltip size='xs' tip='Подсказка к заголовку аккордеона' triggerLabel='Подсказка к заголовку' />
            ) : undefined
          }
        />
      </Accordion>
    </div>
  ),
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
};
