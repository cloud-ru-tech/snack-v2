import {
  CONTAINER,
  SECTION_BACKGROUND_FILL,
  SECTION_CONTAINER_BACKGROUND_TYPE,
  SectionBackgroundFill,
  SectionBasic,
  SectionBasicProps,
  SectionContainerBackground,
  SectionContainerBackgroundType,
} from '@ds/site-section';
import { COLOR_SCHEME, ColorScheme } from '@ds/theme';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, within } from 'storybook/test';

import { DemoPage, DemoPanel } from '#storybook/components';

import { ContentPlaceholder, DESCRIPTION, FILTERS, SAMPLE_IMAGE, TABS, TITLE } from './fixtures';
import { TEST_IDS } from './testIds';

type StoryProps = SectionBasicProps & {
  backgroundColorScheme?: ColorScheme;
  backgroundFill: SectionBackgroundFill;
  containerColorScheme?: ColorScheme;
  containerType: SectionContainerBackgroundType;
  containerFill: SectionBackgroundFill;
  showTabs: boolean;
  showFilters: boolean;
  showPagination: boolean;
  showMoreButton: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Site/SectionBasic',
  component: SectionBasic,
  parameters: { layout: 'fullscreen' },
  args: {
    container: CONTAINER.New,
    backgroundFill: SECTION_BACKGROUND_FILL.NeutralBackground,
    containerType: SECTION_CONTAINER_BACKGROUND_TYPE.Bg,
    containerFill: SECTION_BACKGROUND_FILL.NeutralBackground,
    title: TITLE,
    description: DESCRIPTION,
    showTabs: true,
    showFilters: true,
    showPagination: true,
    showMoreButton: true,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    // Слои фона собираются из плоских контролов: тема и заливка на каждый слой, как в Figma.
    backgroundColorScheme: {
      name: '[Stories]: background.theme.colorScheme',
      control: 'select',
      options: Object.values(COLOR_SCHEME),
    },
    backgroundFill: {
      name: '[Stories]: background.fill',
      control: 'select',
      options: Object.values(SECTION_BACKGROUND_FILL),
    },
    containerColorScheme: {
      name: '[Stories]: containerBackground.theme.colorScheme',
      control: 'select',
      options: Object.values(COLOR_SCHEME),
    },
    containerType: {
      name: '[Stories]: containerBackground.type',
      control: 'radio',
      options: Object.values(SECTION_CONTAINER_BACKGROUND_TYPE),
    },
    containerFill: {
      name: '[Stories]: containerBackground.fill',
      control: 'select',
      options: Object.values(SECTION_BACKGROUND_FILL),
      if: { arg: 'containerType', eq: SECTION_CONTAINER_BACKGROUND_TYPE.Bg },
    },
    background: { table: { disable: true } },
    containerBackground: { table: { disable: true } },
    showTabs: { name: '[Stories]: showTabs', control: 'boolean' },
    showFilters: { name: '[Stories]: showFilters', control: 'boolean' },
    showPagination: { name: '[Stories]: showPagination', control: 'boolean' },
    showMoreButton: { name: '[Stories]: showMoreButton', control: 'boolean' },
    tabBarItems: { table: { disable: true } },
    tabBarValue: { table: { disable: true } },
    onTabBarChange: { table: { disable: true } },
    filterItems: { table: { disable: true } },
    pagination: { table: { disable: true } },
    moreButton: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

const onMoreButtonClick = fn();

function getContainerBackground(
  type: SectionContainerBackgroundType,
  fill: SectionBackgroundFill,
  colorScheme?: ColorScheme,
): SectionContainerBackground {
  const theme = colorScheme ? { colorScheme } : undefined;

  switch (type) {
    case SECTION_CONTAINER_BACKGROUND_TYPE.Image:
      return { type, src: SAMPLE_IMAGE, theme };
    case SECTION_CONTAINER_BACKGROUND_TYPE.Accent:
      return { type, theme };
    default:
      return { type: SECTION_CONTAINER_BACKGROUND_TYPE.Bg, fill, theme };
  }
}

function PlaygroundRender({
  backgroundColorScheme,
  backgroundFill,
  containerColorScheme,
  containerType,
  containerFill,
  showTabs,
  showFilters,
  showPagination,
  showMoreButton,
  ...args
}: StoryProps) {
  const [page, setPage] = useState(1);

  return (
    <DemoPage>
      <DemoPanel width='fluid'>
        <SectionBasic
          {...args}
          background={{
            fill: backgroundFill,
            theme: backgroundColorScheme ? { colorScheme: backgroundColorScheme } : undefined,
          }}
          containerBackground={getContainerBackground(containerType, containerFill, containerColorScheme)}
          tabBarItems={showTabs ? TABS : undefined}
          filterItems={showFilters ? FILTERS : undefined}
          pagination={showPagination ? { total: 10, page, onChange: setPage } : undefined}
          moreButton={showMoreButton ? { onClick: onMoreButtonClick } : undefined}
        >
          <ContentPlaceholder />
        </SectionBasic>
      </DemoPanel>
    </DemoPage>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
