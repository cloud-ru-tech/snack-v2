import { APPEARANCE, CONTENT_POSITION, POSITION, STYLE, TrackItem, TrackItemProps, VARIANT } from '@ds/timeline';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { DemoComponent } from '../helperComponents/DemoComponent/DemoComponent';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

type StoryProps = Omit<TrackItemProps, 'alternateMode'> & {
  contentTitle?: string;
  contentDescription?: string;
  showOpposite?: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Timeline/TimelineItem',
  component: TrackItem,
  parameters: { layout: 'fullscreen' },
  args: {
    contentPosition: 'right',
    position: 'start',
    lineStyle: 'solid',
    dotVariant: 'default',
    dotAppearance: 'primary',
    contentTitle: 'Content title',
    contentDescription: 'Description',
    showOpposite: false,
    showLines: true,
    'data-test-id': TEST_IDS.timelineItem.root,
  },
  argTypes: {
    contentTitle: {
      name: '[Story]: Content title',
      type: 'string',
    },
    contentDescription: {
      name: '[Story]: Content description',
      type: 'string',
    },
    showOpposite: {
      name: '[Story]: Show opposite',
      type: 'boolean',
    },
    contentPosition: {
      control: 'radio',
      options: Object.values(CONTENT_POSITION),
    },
    position: {
      control: 'radio',
      options: Object.values(POSITION),
    },
    lineStyle: {
      control: 'radio',
      options: Object.values(STYLE),
    },
    dotVariant: {
      control: 'radio',
      options: Object.values(VARIANT),
    },
    dotAppearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: { category: 'HTML Attributes' },
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.timelineItem.root)).toBeVisible();
  },
  render: ({ contentTitle, contentDescription, showOpposite, ...args }) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Отдельный элемент таймлайна с настраиваемой точкой и линией.</DemoHint>
        <DemoActions align='start'>
          <div className={styles.wrapper}>
            <TrackItem
              {...args}
              content={<DemoComponent title={contentTitle} description={contentDescription} />}
              opposite={showOpposite ? <DemoComponent title='Opposite' description='Description' /> : undefined}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
