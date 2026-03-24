import { PlaceholderSVG } from '@design-system/icons';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import searchReadme from '../../README.md?raw';
import { Search, SearchProps, SIZE, Size } from '../../src';
import { getIconSize } from '../../src/helperComponents/ButtonField/utils';
import styles from './styles.module.scss';

type StoryArgs = SearchProps;

const meta: Meta<StoryArgs> = {
  title: 'Components/Search/VisualMatrix',
  component: Search,
  parameters: {
    readme: { content: searchReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=6313-48734&m=dev',
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

type Story = StoryObj<StoryArgs>;

const sizes = Object.values(SIZE);

function getCommonProps(size: Size): SearchProps {
  return {
    size: size,
    background: true,
    outline: true,
    buttonField: {
      withDropdownList: true,
      action: <PlaceholderSVG size={getIconSize(size)} className={styles.sampleAction} />,
      onClick() {},
    },
  };
}

const Template: StoryFn<StoryArgs> = () => (
  <div className={styles.visualMatrixWrapper}>
    {sizes.map(size => (
      <StoryTable
        key={size}
        sectionTitle={`States (Size ${size})`}
        firstColumnHeader={''}
        columnHeaders={['without value', 'with value']}
        rows={[
          {
            variantLabel: 'Regular',
            cells: [
              <div key='empty' className={styles.wrapper} data-size={size}>
                <Search value={undefined} {...getCommonProps(size)} />
              </div>,
              <div key='withValue' className={styles.wrapper} data-size={size}>
                <Search value='Input value' {...getCommonProps(size)} />
              </div>,
            ],
          },
          {
            variantLabel: 'Disabled',
            cells: [
              <div key='empty' className={styles.wrapper} data-size={size}>
                <Search value={undefined} disabled {...getCommonProps(size)} />
              </div>,
              <div key='withValue' className={styles.wrapper} data-size={size}>
                <Search value='Input value' disabled {...getCommonProps(size)} />
              </div>,
            ],
          },
        ]}
      />
    ))}
  </div>
);

export const VisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: Template,
  args: {},
  argTypes: {},
};
