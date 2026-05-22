import { QuestionTooltip } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Accordion, CollapseBlockTertiaryProps } from '../../src';
import { CHEVRON } from '../../src/constants';
import styles from '../styles.module.scss';

type PlaygroundArgs = CollapseBlockTertiaryProps & { showAfterTitleSlot: boolean };

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Accordion/CollapseBlockTertiary',
  component: Accordion.CollapseBlockTertiary,
  parameters: { layout: 'fullscreen' },
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
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Раскрывающийся блок третьего уровня.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.story}>
            <Accordion>
              <Accordion.CollapseBlockTertiary
                {...props}
                afterTitle={
                  showAfterTitleSlot ? (
                    <QuestionTooltip
                      size='xs'
                      tip='Подсказка к заголовку аккордеона'
                      triggerLabel='Подсказка к заголовку'
                    />
                  ) : undefined
                }
              />
            </Accordion>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
};
