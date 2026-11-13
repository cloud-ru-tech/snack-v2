import { CONTAINER, MEDIA_TYPE, MediaType, SectionMedia, SectionMediaProps } from '@ds/site-section';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, within } from 'storybook/test';

import { DemoPage, DemoPanel } from '#storybook/components';

import { DESCRIPTION, FILTERS, POSTER, SOURCES, TABS, TITLE } from './fixtures';
import { TEST_IDS } from './testIds';

type StoryProps = SectionMediaProps & {
  mediaType: MediaType;
  source: keyof typeof SOURCES;
  src?: string;
  poster: string;
  alt: string;
  controls: boolean;
  autoPlay: boolean;
  muted: boolean;
  loop: boolean;
  showTabs: boolean;
  showFilters: boolean;
  showPagination: boolean;
  showMoreButton: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Site/Section/SectionMedia',
  component: SectionMedia,
  parameters: { layout: 'fullscreen' },
  args: {
    container: CONTAINER.New,
    title: TITLE,
    description: DESCRIPTION,
    mediaType: MEDIA_TYPE.Video,
    source: 'mp4',
    poster: POSTER,
    alt: 'Интерфейс облачной платформы',
    controls: true,
    autoPlay: false,
    muted: false,
    loop: false,
    showTabs: false,
    showFilters: false,
    showPagination: false,
    showMoreButton: false,
    onPlay: fn(),
    onError: fn(),
    onTabBarChange: fn(),
    'data-test-id': TEST_IDS.section,
  },
  argTypes: {
    container: { control: 'radio', options: Object.values(CONTAINER) },
    mediaType: { name: '[Stories]: media.type', control: 'radio', options: Object.values(MEDIA_TYPE) },
    source: {
      name: '[Stories]: media.src preset',
      control: 'select',
      options: Object.keys(SOURCES),
      if: { arg: 'mediaType', eq: MEDIA_TYPE.Video },
    },
    src: { name: '[Stories]: media.src', control: 'text' },
    poster: { name: '[Stories]: media.poster', control: 'text', if: { arg: 'mediaType', eq: MEDIA_TYPE.Video } },
    alt: { name: '[Stories]: media.alt', control: 'text', if: { arg: 'mediaType', eq: MEDIA_TYPE.Image } },
    controls: { name: '[Stories]: media.controls', control: 'boolean', if: { arg: 'mediaType', eq: MEDIA_TYPE.Video } },
    autoPlay: { name: '[Stories]: media.autoPlay', control: 'boolean', if: { arg: 'mediaType', eq: MEDIA_TYPE.Video } },
    muted: { name: '[Stories]: media.muted', control: 'boolean', if: { arg: 'mediaType', eq: MEDIA_TYPE.Video } },
    loop: { name: '[Stories]: media.loop', control: 'boolean', if: { arg: 'mediaType', eq: MEDIA_TYPE.Video } },
    showTabs: { name: '[Stories]: showTabs', control: 'boolean' },
    showFilters: { name: '[Stories]: showFilters', control: 'boolean' },
    showPagination: { name: '[Stories]: showPagination', control: 'boolean' },
    showMoreButton: { name: '[Stories]: showMoreButton', control: 'boolean' },
    media: { table: { disable: true } },
    tabBarItems: { table: { disable: true } },
    tabBarValue: { table: { disable: true } },
    filterItems: { table: { disable: true } },
    pagination: { table: { disable: true } },
    moreButton: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<StoryProps>;

const onMoreButtonClick = fn();

function PlaygroundRender({
  mediaType,
  source,
  src,
  poster,
  alt,
  controls,
  autoPlay,
  muted,
  loop,
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
        <SectionMedia
          {...args}
          tabBarItems={showTabs ? TABS : undefined}
          filterItems={showFilters ? FILTERS : undefined}
          pagination={showPagination ? { total: 5, page, onChange: setPage } : undefined}
          moreButton={showMoreButton ? { label: 'Показать еще', onClick: onMoreButtonClick } : undefined}
          media={
            mediaType === MEDIA_TYPE.Image
              ? { type: MEDIA_TYPE.Image, src: src || POSTER, alt }
              : { type: MEDIA_TYPE.Video, src: src || SOURCES[source], poster, controls, autoPlay, muted, loop }
          }
        />
      </DemoPanel>
    </DemoPage>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.section)).toBeVisible();
  },
};
