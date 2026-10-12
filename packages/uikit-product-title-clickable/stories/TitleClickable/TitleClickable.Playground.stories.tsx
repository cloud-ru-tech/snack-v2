import { APPEARANCE, SHAPE, SIZE } from '@ds/avatar';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable, TitleClickableProps } from '@ds/uikit-product-title-clickable';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

type StoryProps = Omit<TitleClickableProps, 'content' | 'title'> &
  Pick<TitleClickable.SimpleTitleProps, 'title' | 'titleTag'> &
  Pick<
    TitleClickable.UserTitleProps,
    'name' | 'subtitle' | 'src' | 'size' | 'shape' | 'appearance' | 'showTwoSymbols'
  > & {
    contentType: 'SimpleTitle' | 'UserTitle' | 'custom';
    showIcon: boolean;
    customText: string;
    customTag: 'span' | 'strong' | 'em';
  };

function PlaygroundTitle({
  contentType,
  title,
  titleTag,
  showIcon,
  name,
  subtitle,
  src,
  size,
  shape,
  appearance,
  showTwoSymbols,
  customText,
  customTag: CustomTag,
  ...args
}: StoryProps) {
  let content: ReactNode;

  switch (contentType) {
    case 'SimpleTitle':
      content = (
        <TitleClickable.SimpleTitle
          title={title}
          titleTag={titleTag}
          icon={showIcon ? <PlaceholderSVG /> : undefined}
        />
      );
      break;
    case 'UserTitle':
      content = (
        <TitleClickable.UserTitle
          name={name}
          subtitle={subtitle}
          src={src}
          size={size}
          shape={shape}
          appearance={appearance}
          showTwoSymbols={showTwoSymbols}
        />
      );
      break;
    case 'custom':
      content = <CustomTag>{customText}</CustomTag>;
      break;
    default:
      content = null;
  }

  return <TitleClickable {...args} content={content} />;
}

const simpleTitleControls = {
  if: { arg: 'contentType', eq: 'SimpleTitle' },
  table: { category: 'content', subcategory: 'SimpleTitle' },
};

const userTitleControls = {
  if: { arg: 'contentType', eq: 'UserTitle' },
  table: { category: 'content', subcategory: 'UserTitle' },
};

const customControls = {
  if: { arg: 'contentType', eq: 'custom' },
  table: { category: 'content', subcategory: 'custom' },
};

const meta: Meta<StoryProps> = {
  title: 'Uikit Product/TitleClickable',
  component: PlaygroundTitle,
  parameters: { layout: 'fullscreen' },
  args: {
    href: '#',
    target: '_self',
    fullWidth: true,
    showArrow: true,
    contentType: 'SimpleTitle',
    title: 'Title',
    titleTag: 'span',
    showIcon: false,
    name: 'John Doe',
    subtitle: 'jdoe@example.com',
    src: '',
    size: SIZE.M,
    shape: SHAPE.Rounded,
    appearance: APPEARANCE.Neutral,
    showTwoSymbols: false,
    customText: 'Custom content',
    customTag: 'span',
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    contentType: {
      name: '[stories] content',
      control: 'select',
      options: ['SimpleTitle', 'UserTitle', 'custom'],
    },
    href: { control: 'text', table: { category: 'TitleClickable' } },
    target: {
      control: 'radio',
      options: ['_self', '_blank', '_parent', '_top'],
      table: { category: 'TitleClickable' },
    },
    fullWidth: { control: 'boolean', table: { category: 'TitleClickable' } },
    showArrow: { control: 'boolean', table: { category: 'TitleClickable' } },
    onClick: { action: 'onClick', table: { category: 'TitleClickable' } },
    title: { control: 'text', ...simpleTitleControls },
    titleTag: { control: 'select', options: ['span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], ...simpleTitleControls },
    showIcon: { name: 'icon', control: 'boolean', ...simpleTitleControls },
    name: { control: 'text', ...userTitleControls },
    subtitle: { control: 'text', ...userTitleControls },
    src: { control: 'text', ...userTitleControls },
    size: { control: 'select', options: Object.values(SIZE), ...userTitleControls },
    shape: { control: 'radio', options: Object.values(SHAPE), ...userTitleControls },
    appearance: { control: 'select', options: Object.values(APPEARANCE), ...userTitleControls },
    showTwoSymbols: { control: 'boolean', ...userTitleControls },
    customText: { name: 'text', control: 'text', ...customControls },
    customTag: { name: 'tag', control: 'select', options: ['span', 'strong', 'em'], ...customControls },
    innerRef: { table: { disable: true } },
    className: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Выберите тип содержимого и настройте его в соответствующей группе контролов.</DemoHint>
        <DemoActions align='center'>
          <PlaygroundTitle {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
