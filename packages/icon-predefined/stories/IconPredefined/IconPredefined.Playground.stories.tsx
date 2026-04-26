import { APPEARANCE, IconPredefined, type IconPredefinedProps, SIZE } from '@ds/icon-predefined';
import { HeartSVG, PlaceholderSVG, StarFilledSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';

const iconMap = {
  Placeholder: PlaceholderSVG,
  Heart: HeartSVG,
  StarFilled: StarFilledSVG,
} as const;

type PlaygroundArgs = IconPredefinedProps & { iconKey: keyof typeof iconMap };

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/IconPredefined',
  component: IconPredefined,
  args: {
    iconKey: 'Placeholder',
    appearance: APPEARANCE.Primary,
    size: SIZE.M,
    shape: 'round',
    decor: true,
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
      options: ['round', 'square'],
      description: 'Форма: круглая или квадратная',
    },
    decor: {
      control: 'boolean',
      description: 'Наличие цветной подложки',
    },
    className: {
      control: 'text',
      description: 'CSS-класс',
    },
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => {
    const IconComponent = iconMap[args.iconKey];
    return (
      <IconPredefined
        icon={IconComponent}
        appearance={args.appearance}
        size={args.size}
        shape={args.shape}
        decor={args.decor}
        className={args.className}
      />
    );
  },
};
