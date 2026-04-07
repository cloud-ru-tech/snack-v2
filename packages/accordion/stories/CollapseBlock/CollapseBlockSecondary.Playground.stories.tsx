import { QuestionTooltip } from '@design-system/tooltip';
import type { Meta, StoryObj } from '@storybook/react';

import accordionReadme from '../../README.md?raw';
import { Accordion, type CollapseBlockSecondaryProps } from '../../src';
import { APPEARANCE, CHEVRON, VIEW } from '../../src/constants';
import styles from '../styles.module.scss';

type PlaygroundArgs = CollapseBlockSecondaryProps & { showAfterTitleSlot: boolean };

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Accordion/CollapseBlockSecondary',
  component: Accordion.CollapseBlockSecondary,
  parameters: {
    readme: { content: accordionReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=6764-5128',
    },
  },
  args: {
    id: 'collapseBlockSecondary1',
    title: 'CollapseBlock',
    showAfterTitleSlot: true,
    subTitle: 'CollapseBlock subtitle',
    children: 'CollapseBlock content',
    view: 'simple',
    chevron: 'after',
    appearance: 'neutral',
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
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
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
        <Accordion.CollapseBlockSecondary
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
