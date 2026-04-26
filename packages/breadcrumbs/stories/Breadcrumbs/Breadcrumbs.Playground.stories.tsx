import { HomeSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { action } from 'storybook/actions';

import { Breadcrumbs, BreadcrumbsProps } from '../../src';
import { SIZE } from '../../src/constants';
import { longTrailItems } from './fixtures';
import styles from './styles.module.scss';

type ContainerWidth = 'full' | 'wide' | 'medium' | 'narrow';

type StoryProps = BreadcrumbsProps & {
  storyUrl: boolean;
  storyIcon: boolean;
  storyOnClick: boolean;
  storyContainerWidth: ContainerWidth;
};

const widthClass: Record<ContainerWidth, string> = {
  full: styles.widthFull,
  wide: styles.widthWide,
  medium: styles.widthMedium,
  narrow: styles.widthNarrow,
};

const meta: Meta<StoryProps> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'padded' },
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
      description: 'Передать урлы для айтемов',
    },
    storyOnClick: {
      name: '[story] onClick',
      description: 'Передать обработчики кликов для айтемов',
    },
    storyIcon: {
      name: '[story] icon',
      description: 'Передать иконку в первый айтем',
    },
    storyContainerWidth: {
      name: `[story] container width`,
      control: 'select',
      options: ['full', 'wide', 'medium', 'narrow'] satisfies ContainerWidth[],
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

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: ({ storyIcon, items: storyItems, storyUrl, storyOnClick, storyContainerWidth, ...args }) => {
    const onClick = action('onClick');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [lastClickedCrumb, setLastClickedCrumb] = useState('');

    const items: BreadcrumbsProps['items'] = storyItems.map((item, index) => ({
      ...item,
      id: item.id ?? `id${index}`,
      href: storyUrl ? `https://yandex.ru/search?text=${encodeURIComponent(item.label)}` : item.href,
      onClick: storyOnClick
        ? (...args) => {
            setLastClickedCrumb(item.label);
            onClick(...args);
          }
        : undefined,
    }));

    if (storyIcon) {
      items[0].icon = HomeSVG;
    }

    return (
      <div>
        <div className={`${styles.narrowFrame} ${widthClass[storyContainerWidth]}`}>
          <Breadcrumbs {...args} items={items} />
        </div>
        <div className={styles.crumbClickHolder} data-test-id='last-clicked-crumb'>
          {lastClickedCrumb}
        </div>
      </div>
    );
  },
};
