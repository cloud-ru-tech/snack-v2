import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { QuestionTooltip } from '@ds/tooltip';
import type { Meta, StoryObj } from '@storybook/react';

import { Accordion, type CollapseBlockPrimaryProps } from '../../src';
import { CHEVRON, VIEW } from '../../src/constants';
import styles from '../styles.module.scss';

type PlaygroundArgs = CollapseBlockPrimaryProps & { showAfterTitleSlot: boolean };

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Accordion/CollapseBlockPrimary',
  component: Accordion.CollapseBlockPrimary,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=6764-5128',
    },
  },
  args: {
    id: 'collapseBlockPrimary1',
    title: 'CollapseBlock',
    showAfterTitleSlot: true,
    subTitle: 'CollapseBlock subtitle',
    children: 'CollapseBlock content',
    view: 'simple',
    chevron: 'after',
    backgroundPredefined: BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
    keepMounted: false,
  },
  argTypes: {
    view: {
      control: 'select',
      options: Object.values(VIEW),
    },
    chevron: {
      control: 'select',
      options: Object.values(CHEVRON),
    },
    backgroundPredefined: {
      control: 'select',
      options: Object.values(BACKGROUND_PREDEFINED_FILL),
      description: 'Предопределённый fill для акрила.',
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
        <Accordion.CollapseBlockPrimary
          {...props}
          afterTitle={
            showAfterTitleSlot ? (
              <QuestionTooltip size='s' tip='Подсказка к заголовку аккордеона' triggerLabel='Подсказка к заголовку' />
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
