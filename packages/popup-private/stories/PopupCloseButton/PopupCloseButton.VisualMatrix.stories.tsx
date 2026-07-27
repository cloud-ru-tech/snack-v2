import { PopupCloseButton, PopupCloseButtonProps, PopupMedia } from '@ds/popup-private';
import { Meta, StoryObj } from '@storybook/react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import frame from '../frame.module.scss';

// Нейтральный серый баннер (data-URI) — крестик поверх media-картинки.
const IMAGE_SRC =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="360" height="184"><rect width="360" height="184" fill="#c9ccd4"/></svg>',
  );

const meta: Meta<PopupCloseButtonProps> = {
  title: 'Components/PopupPrivate/PopupCloseButton',
  component: PopupCloseButton,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
};

export default meta;
type Story = StoryObj<PopupCloseButtonProps>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>PopupCloseButton</DemoTitle>
        <DemoHint>
          onColor-крестик закрытия в правом верхнем углу overlay-слоя — над blackout-подложкой и над media-баннером.
          Hover/pressed — клиентские состояния, снимаются в visual.spec (interaction-states), в статике не показываются.
        </DemoHint>
        <div className={frame.grid}>
          <figure className={frame.item}>
            <figcaption className={frame.caption}>on blackout</figcaption>
            <div className={frame.blackout}>
              <span className={frame.closeButtonWrapper}>
                <PopupCloseButton onClick={() => {}} />
              </span>
            </div>
          </figure>
          <figure className={frame.item}>
            <figcaption className={frame.caption}>on media image</figcaption>
            <div className={`${frame.frame} ${frame.mediaCloseFrame}`}>
              <PopupMedia src={IMAGE_SRC} alt='Media' />
              <span className={frame.closeButtonWrapper}>
                <PopupCloseButton onClick={() => {}} />
              </span>
              <div className={frame.bodyStub}>
                <span className={frame.bodyLine} />
                <span className={frame.bodyLine} />
              </div>
            </div>
          </figure>
        </div>
      </DemoPanel>
    </DemoPage>
  ),
};
