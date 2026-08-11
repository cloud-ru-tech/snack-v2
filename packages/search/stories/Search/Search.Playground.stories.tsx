import { APPEARANCE, Button, VIEW } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Search, SearchProps, SIZE } from '@ds/search';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const AFTER_CONTENT_ICONS = {
  none: undefined,
  placeholder: <PlaceholderSVG />,
} as const;

type AfterContentPreset = keyof typeof AFTER_CONTENT_ICONS;

/**
 * `afterContent` — ReactNode-слот, поэтому в Playground он собирается в render'е:
 * размер кнопки должен совпадать с размером поля, а mapping-пресет статичен и
 * про `args.size` ничего не знает.
 */
type PlaygroundStoryProps = SearchProps & {
  afterContentPreset: AfterContentPreset;
};

function PlaygroundRender({ afterContentPreset, size = SIZE.S, ...args }: PlaygroundStoryProps) {
  const icon = AFTER_CONTENT_ICONS[afterContentPreset];

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Поисковая строка с фоновой подложкой и слотом действия внутри поля.</DemoHint>
        <DemoActions block>
          <Search
            {...args}
            size={size}
            afterContent={
              icon && (
                <Button
                  data-test-id={TEST_IDS.afterContentButton}
                  size={size}
                  view={VIEW.Function}
                  appearance={APPEARANCE.Neutral}
                  icon={icon}
                  minWidth={false}
                  disabled={args.disabled || args.loading}
                  onClick={() => {}}
                />
              )
            }
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<PlaygroundStoryProps> = {
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
    afterContentPreset: 'placeholder',
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    afterContentPreset: {
      name: '[Stories]: afterContent',
      control: 'select',
      options: Object.keys(AFTER_CONTENT_ICONS),
    },
    afterContent: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<PlaygroundStoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
