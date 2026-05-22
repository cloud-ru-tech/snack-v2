import { HomeSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties, useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Breadcrumbs, BreadcrumbsProps } from '../../src';
import { SIZE } from '../../src/constants';
import { longTrailItems } from './fixtures';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

type ContainerWidthPreset = 'full' | 'wide' | 'medium' | 'narrow';
// Может быть именованным пресетом или произвольной CSS-шириной (`'680px'`) — последнее
// используется e2e specs, чтобы проверять truncation на ровно нужной ширине.
type ContainerWidth = ContainerWidthPreset | (string & {});

type StoryProps = BreadcrumbsProps & {
  storyUrl: boolean;
  storyIcon: boolean;
  storyOnClick: boolean;
  storyContainerWidth: ContainerWidth;
};

const widthClass: Partial<Record<ContainerWidth, string>> = {
  full: styles.widthFull,
  wide: styles.widthWide,
  medium: styles.widthMedium,
  narrow: styles.widthNarrow,
};

const meta: Meta<StoryProps> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'fullscreen' },
  args: {
    items: longTrailItems,
    size: SIZE.S,
    separator: '›',
    firstItemIconOnly: false,
    inactiveLastItem: false,
    storyUrl: false,
    storyIcon: false,
    storyOnClick: false,
    storyContainerWidth: 'full',
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Breadcrumb segments (id, label, optional href, onClick, shortLabel, icon)',
    },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Typography size',
    },
    separator: {
      control: 'text',
      description: 'Character(s) between segments',
    },
    firstItemIconOnly: {
      control: 'boolean',
      description: 'Show only the icon on the first item when an icon is set',
    },
    inactiveLastItem: {
      control: 'boolean',
      description: 'Strip href/onClick from the last item so it is not clickable',
    },
    storyUrl: {
      name: '[story] url',
      description: 'Передать href для каждого элемента',
    },
    storyOnClick: {
      name: '[story] onClick',
      description: 'Передать обработчик клика для каждого элемента',
    },
    storyIcon: {
      name: '[story] icon',
      description: 'Показать иконку в первом элементе',
    },
    storyContainerWidth: {
      name: `[story] container width`,
      control: 'select',
      options: ['full', 'wide', 'medium', 'narrow'] satisfies ContainerWidthPreset[],
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID for automated tests',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

type PlaygroundRenderProps = Omit<StoryProps, 'data-test-id'> & { 'data-test-id'?: string };

function PlaygroundRender({
  storyIcon,
  items: storyItems,
  storyUrl,
  storyOnClick,
  storyContainerWidth,
  ...args
}: PlaygroundRenderProps) {
  const [lastClickedCrumb, setLastClickedCrumb] = useState('');

  const items: BreadcrumbsProps['items'] = storyItems.map((item, index) => ({
    ...item,
    id: item.id ?? `id${index}`,
    href: storyUrl ? `https://yandex.ru/search?text=${encodeURIComponent(item.label)}` : item.href,
    onClick: storyOnClick ? () => setLastClickedCrumb(item.label) : undefined,
  }));

  if (storyIcon) {
    items[0].icon = HomeSVG;
  }

  // Width — preset (`full`/`wide`/`medium`/`narrow`) via className либо произвольная
  // px-строка через URL-args (используется e2e specs для проверки truncation на ровно
  // нужной ширине). Произвольная px-ширина пробрасывается через CSS-переменную в
  // styles.module.scss, чтобы избежать inline-style на DOM.
  const presetClass = widthClass[storyContainerWidth];
  const widthVarStyle: CSSProperties | undefined = presetClass
    ? undefined
    : ({ '--breadcrumbs-story-width': storyContainerWidth } as CSSProperties);

  return (
    <DemoPage>
      <DemoPanel width='fluid'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Хлебные крошки с настраиваемым размером, разделителем и шириной контейнера.</DemoHint>
        <DemoActions block>
          <div>
            <div className={`${styles.narrowFrame} ${presetClass ?? styles.widthCustom}`} style={widthVarStyle}>
              <Breadcrumbs {...args} items={items} />
            </div>
            <div className={styles.crumbClickHolder} data-test-id={TEST_IDS.clickHolder}>
              {lastClickedCrumb}
            </div>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
};
