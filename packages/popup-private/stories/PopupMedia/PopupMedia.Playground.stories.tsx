import { MEDIA_KIND, PopupMedia, PopupMediaProps } from '@ds/popup-private';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import frame from '../frame.module.scss';
import { SLOT_TEST_IDS } from '../testIds';

// Self-contained нейтральный плейсхолдер (data-URI) — visual regression не тянет внешние ассеты.
const IMAGE_SRC =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="360" height="184"><rect width="360" height="184" fill="#c9ccd4"/></svg>',
  );
const ICON_SRC =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><circle cx="28" cy="28" r="28" fill="#c9ccd4"/></svg>',
  );

const meta: Meta<PopupMediaProps> = {
  title: 'Components/PopupPrivate/PopupMedia',
  component: PopupMedia,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    src: IMAGE_SRC,
    alt: 'Media',
    kind: MEDIA_KIND.Image,
  },
  argTypes: {
    kind: { control: 'radio', options: Object.values(MEDIA_KIND) },
    src: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Media-блок над содержимым окна: kind=image (баннер во всю ширину) или kind=icon.</DemoHint>
        <div className={frame.frame}>
          <PopupMedia {...args} src={args.kind === MEDIA_KIND.Icon ? ICON_SRC : IMAGE_SRC} />
          <div className={frame.bodyStub}>
            <span className={frame.bodyLine} />
            <span className={frame.bodyLine} />
          </div>
        </div>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<PopupMediaProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SLOT_TEST_IDS.media)).toBeVisible();
  },
};
