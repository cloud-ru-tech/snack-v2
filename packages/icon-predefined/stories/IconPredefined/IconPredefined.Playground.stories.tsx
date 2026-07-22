import { APPEARANCE, IconPredefined, IconPredefinedProps, SIZE } from '@ds/icon-predefined';
import { HeartSVG, PlaceholderSVG, StarFilledSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const iconMap = {
  Placeholder: PlaceholderSVG,
  Heart: HeartSVG,
  StarFilled: StarFilledSVG,
} as const;

type PlaygroundArgs = IconPredefinedProps & { iconKey: keyof typeof iconMap };

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/IconPredefined',
  component: IconPredefined,
  parameters: { layout: 'fullscreen' },
  args: {
    iconKey: 'Placeholder',
    appearance: APPEARANCE.Primary,
    size: SIZE.M,
    shape: 'rounded',
    background: true,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    iconKey: {
      name: 'icon',
      control: 'radio',
      options: Object.keys(iconMap),
      description: 'JSX иконки',
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Внешний вид',
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
      description: 'Размер',
    },
    shape: {
      control: 'radio',
      options: ['rounded', 'squared'],
      description: 'Форма: круглая или квадратная',
    },
    background: {
      control: 'boolean',
      description: 'Наличие цветной подложки',
    },
    className: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => {
    const { iconKey, ...rest } = args;
    const IconComponent = iconMap[iconKey];
    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Иконка с предустановленной цветной подложкой и формой rounded или squared.</DemoHint>
          <DemoActions align='center'>
            <IconPredefined {...rest} icon={IconComponent} />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};
