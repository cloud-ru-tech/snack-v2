import { PlaceholderSVG, SearchSVG } from '@ds/icons/interface/system';
import { Search, SIZE } from '@ds/search';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const BUTTON_FIELD_PRESETS = {
  none: undefined,
  search: { action: <SearchSVG />, onClick: () => {}, 'data-test-id': TEST_IDS.buttonField },
  'search+dropdown': {
    action: <SearchSVG />,
    withDropdownList: true,
    onClick: () => {},
    'data-test-id': TEST_IDS.buttonField,
  },
  placeholder: { action: <PlaceholderSVG />, onClick: () => {}, 'data-test-id': TEST_IDS.buttonField },
} as const;

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'fullscreen' },
  args: {
    size: SIZE.S,
    placeholder: 'Поиск',
    background: true,
    disabled: false,
    loading: false,
    outline: true,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    // buttonField — slot-объект, передаётся через mapping-пресеты.
    buttonField: {
      control: 'select',
      options: Object.keys(BUTTON_FIELD_PRESETS),
      mapping: BUTTON_FIELD_PRESETS,
      description: 'Слот справа от поля: none / search / search+dropdown / placeholder',
    },
    // outline визуально проявляется только при наличии buttonField — прячем
    // контрол, когда слот пустой.
    outline: { if: { arg: 'buttonField', neq: 'none' } },
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: { buttonField: 'none' as unknown as undefined },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Поисковая строка с фоновой подложкой и кнопкой поиска.</DemoHint>
        <DemoActions block>
          <Search {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
