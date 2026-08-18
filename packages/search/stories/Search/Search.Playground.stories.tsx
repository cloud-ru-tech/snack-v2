import { APPEARANCE, Button, VIEW } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Search, SearchProps, SIZE } from '@ds/search';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useArgs, useCallback, useEffect, useState } from 'storybook/preview-api';
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

const Template: StoryFn<PlaygroundStoryProps> = ({ afterContentPreset, size = SIZE.S, ...args }) => {
  const icon = AFTER_CONTENT_ICONS[afterContentPreset];
  const [, updateArgs] = useArgs<SearchProps>();
  const [value, setValue] = useState(args.value ?? '');

  useEffect(() => {
    const next = args.value ?? '';
    const root = document.querySelector(`[data-test-id="${TEST_IDS.root}"]`);

    // Пока поле в фокусе, args могут отставать от updateArgs — не перезаписываем локальный ввод.
    if (root?.contains(document.activeElement)) {
      return;
    }

    setValue(next);
  }, [args.value]);

  const handleChange = useCallback(
    (next: string) => {
      setValue(next);
      updateArgs({ value: next });
    },
    [updateArgs],
  );

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Поисковая строка с фоновой подложкой и слотом действия внутри поля.</DemoHint>
        <DemoActions block>
          <Search
            {...args}
            value={value}
            onChange={handleChange}
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
};

const meta: Meta<PlaygroundStoryProps> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'fullscreen' },
  render: Template,
  args: {
    size: SIZE.S,
    value: '',
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
    // outline визуально проявляется только при наличии afterContent — прячем
    // контрол, когда слот пустой.
    outline: { if: { arg: 'afterContentPreset', neq: 'none' } },
    onChange: { table: { disable: true } },
    onSubmit: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<PlaygroundStoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
