import { SearchPrivate, SearchPrivateProps, SIZE } from '@ds/search-private';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const Template: StoryFn<SearchPrivateProps> = args => {
  const [{ value }, updateArgs] = useArgs<SearchPrivateProps>();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Приватная база поискового инпута без декора.</DemoHint>
        <DemoActions align='center'>
          <SearchPrivate {...args} value={value ?? ''} onChange={next => updateArgs({ value: next })} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

const meta: Meta<typeof SearchPrivate> = {
  title: 'Components/SearchPrivate',
  component: SearchPrivate,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  render: Template,
  args: {
    size: SIZE.S,
    value: '',
    placeholder: 'Поиск',
    disabled: false,
    loading: false,
    showClearButton: true,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
    // ReactNode-слот: object-контрол для него бесполезен, наполнение показано в VisualMatrix.
    afterContent: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onKeyDown: { table: { disable: true } },
    onSubmit: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof SearchPrivate>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
