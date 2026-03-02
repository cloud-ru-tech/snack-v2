import { INPUT_MODE } from '@design-system/input-private';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

import searchprivateReadme from '../../README.md?raw';
import { SearchPrivate, SearchPrivateProps } from '../../src';
import { SIZE } from '../../src/constants';
import styles from './styles.module.scss';

const meta: Meta<SearchPrivateProps> = {
  title: 'Components/SearchPrivate',
  component: SearchPrivate,
  parameters: {
    readme: { content: searchprivateReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=6313-50902&m=dev',
    },
  },
  args: {},
  argTypes: {
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;

type StoryProps = SearchPrivateProps;
type Story = StoryObj<SearchPrivateProps>;

// TODO: удалить как только появится компонент Search

const Template: StoryFn<StoryProps> = args => {
  const [{ value }, updateArgs] = useArgs<StoryProps>();

  return (
    <div className={styles.wrapper} data-size={args.size}>
      <SearchPrivate {...args} value={value} onChange={updatedValue => updateArgs({ value: updatedValue })} />
    </div>
  );
};

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
  render: Template,
  args: {
    size: SIZE.S,
    loading: false,
    value: '',
    placeholder: undefined,
    inputMode: 'search',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер',
    },
    placeholder: {
      control: 'text',
    },
    inputMode: {
      control: 'select',
      options: Object.values(INPUT_MODE),
    },
  },
};
