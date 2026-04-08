import type { Meta, StoryObj } from '@storybook/react';

import timelineReadme from '../../README.md?raw';
import { TrackItem, type TrackItemProps } from '../../src/components/TrackItem';
import { DemoComponent } from '../helperComponents/DemoComponent/DemoComponent';
import styles from '../styles.module.scss';

type StoryProps = Omit<TrackItemProps, 'alternateMode'> & {
  contentTitle?: string;
  contentDescription?: string;
  showOpposite?: boolean;
};

const figmaDesignUrl =
  'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=8934-4234&m=dev';

const meta: Meta<StoryProps> = {
  title: 'Components/Timeline/Timeline Item',
  component: TrackItem,
  parameters: {
    readme: { content: timelineReadme },
    design: {
      type: 'figma',
      url: figmaDesignUrl,
    },
  },
  args: {
    contentPosition: 'right',
    role: 'start',
    lineStyle: 'solid',
    dotVariant: 'default',
    dotAppearance: 'primary',
    contentTitle: 'Content title',
    contentDescription: 'Description',
    showOpposite: false,
    showLines: true,
    'data-test-id': undefined,
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
      options: Object.values(TrackItem.contentPositions),
    },
    role: {
      control: 'radio',
      options: Object.values(TrackItem.roles),
    },
    lineStyle: {
      control: 'radio',
      options: Object.values(TrackItem.lineStyles),
    },
    dotVariant: {
      control: 'radio',
      options: Object.values(TrackItem.dotVariants),
    },
    dotAppearance: {
      control: 'select',
      options: Object.values(TrackItem.dotAppearances),
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
  render: ({ contentTitle, contentDescription, showOpposite, ...args }) => (
    <div className={styles.wrapper}>
      <TrackItem
        {...args}
        content={<DemoComponent title={contentTitle} description={contentDescription} />}
        opposite={showOpposite ? <DemoComponent title='Opposite' description='Description' /> : undefined}
      />
    </div>
  ),
};
