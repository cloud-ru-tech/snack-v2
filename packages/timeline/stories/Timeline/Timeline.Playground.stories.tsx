import type { Meta, StoryObj } from '@storybook/react';

import timelineReadme from '../../README.md?raw';
import { Timeline, type TimelineProps } from '../../src';
import { DemoComponent } from '../helperComponents/DemoComponent/DemoComponent';
import styles from '../styles.module.scss';

type StoryProps = TimelineProps & {
  showOpposite: boolean;
  itemsCount: number;
};

const figmaDesignUrl =
  'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=8976-201&m=dev';

const meta: Meta<StoryProps> = {
  title: 'Components/Timeline/Timeline',
  component: Timeline,
  parameters: {
    readme: { content: timelineReadme },
    design: {
      type: 'figma',
      url: figmaDesignUrl,
    },
  },
  args: {
    alternate: false,
    fullWidth: false,
    showOpposite: false,
    itemsCount: 4,
    contentPosition: 'right',
    className: undefined,
    'data-test-id': 'timeline-track',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS-класс на контейнере `.timeline`',
      table: { category: 'Styling' },
    },
    showOpposite: {
      name: '[Story]: Show opposite content',
      type: 'boolean',
    },
    itemsCount: {
      name: '[Story]: Amount of items',
      control: { type: 'range', min: 1, max: 4, step: 1 },
    },
    contentPosition: {
      control: 'radio',
      options: ['right', 'left'],
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

const Opposite = () => <span>Opposite</span>;

const items: TimelineProps['items'] = [
  {
    content: <DemoComponent title='Start' description='Description' />,
    dotAppearance: 'primary',
  },
  {
    content: <DemoComponent title='Center' description='Description' />,
    lineStyle: 'dashed',
  },
  {
    content: <DemoComponent title='Sub Center' description='Some very long description compared to others' />,
    lineStyle: 'dashed',
    dotVariant: 'subEvent',
    dotAppearance: 'red',
  },
  {
    content: <DemoComponent title='End' description='Description' />,
  },
];

const itemsWithOpposite = items.map(item => ({ ...item, opposite: <Opposite /> }));

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: ({ showOpposite, contentPosition, fullWidth, alternate, itemsCount, ...args }) => {
    const calculatedItems = (showOpposite ? itemsWithOpposite : items).slice(0, itemsCount);

    return (
      <div className={styles.wrapper}>
        <Timeline
          {...args}
          contentPosition={contentPosition}
          items={calculatedItems}
          fullWidth={fullWidth}
          alternate={alternate}
        />
      </div>
    );
  },
};
