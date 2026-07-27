import { MEDIA_KIND, MediaKind, PopupMedia, PopupMediaProps } from '@ds/popup-private';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import frame from '../frame.module.scss';

// Self-contained нейтральные плейсхолдеры (data-URI) — visual regression не тянет внешние ассеты,
// цвет — мягкий серый (%23c9ccd4), а не яркий бренд-тон.
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

const CONFIGS: { label: string; kind: MediaKind }[] = [
  { label: 'image (banner)', kind: MEDIA_KIND.Image },
  { label: 'icon', kind: MEDIA_KIND.Icon },
];

const preview = (label: string, kind: MediaKind): ReactNode => (
  <figure key={label} className={frame.item}>
    <figcaption className={frame.caption}>{label}</figcaption>
    <div className={frame.frame}>
      <PopupMedia src={kind === MEDIA_KIND.Image ? IMAGE_SRC : ICON_SRC} alt='Media' kind={kind} />
      <div className={frame.bodyStub}>
        <span className={frame.bodyLine} />
        <span className={frame.bodyLine} />
      </div>
    </div>
  </figure>
);

const meta: Meta<PopupMediaProps> = {
  title: 'Components/PopupPrivate/PopupMedia',
  component: PopupMedia,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
};

export default meta;
type Story = StoryObj<PopupMediaProps>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>PopupMedia</DemoTitle>
        <DemoHint>Media-блок над содержимым окна: image — баннер во всю ширину, icon — иконка по центру.</DemoHint>
        <div className={frame.grid}>{CONFIGS.map(c => preview(c.label, c.kind))}</div>
      </DemoPanel>
    </DemoPage>
  ),
};
