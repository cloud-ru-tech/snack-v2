import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { QuestionTooltip } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Accordion, CollapseBlockPrimaryProps } from '../../src';
import { CHEVRON_POSITION, VIEW } from '../../src/constants';
import styles from '../styles.module.scss';

type PlaygroundArgs = CollapseBlockPrimaryProps & { showAfterTitleSlot: boolean };

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Accordion/CollapseBlockPrimary',
  component: Accordion.CollapseBlockPrimary,
  parameters: { layout: 'fullscreen' },
  args: {
    id: 'collapseBlockPrimary1',
    title: 'CollapseBlock',
    showAfterTitleSlot: true,
    subTitle: 'CollapseBlock subtitle',
    children: <span className={styles.content}>CollapseBlock content</span>,
    view: 'simple',
    chevronPosition: 'after',
    showChevron: true,
    backgroundPredefined: BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
    keepMounted: false,
  },
  argTypes: {
    view: {
      control: 'select',
      options: Object.values(VIEW),
    },
    chevronPosition: {
      control: 'select',
      options: Object.values(CHEVRON_POSITION),
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
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Раскрывающийся блок первого уровня.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.story}>
            <Accordion>
              <Accordion.CollapseBlockPrimary
                {...props}
                afterTitle={
                  showAfterTitleSlot ? (
                    <QuestionTooltip
                      size='s'
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
