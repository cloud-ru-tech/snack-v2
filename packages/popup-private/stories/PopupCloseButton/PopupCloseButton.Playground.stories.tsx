import { PopupCloseButton, PopupCloseButtonProps } from '@ds/popup-private';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import frame from '../frame.module.scss';
import { SLOT_TEST_IDS } from '../testIds';

const meta: Meta<PopupCloseButtonProps> = {
  title: 'Components/PopupPrivate/PopupCloseButton',
  component: PopupCloseButton,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    onClick: fn(),
    'aria-label': 'close popup',
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Единая кнопка закрытия overlay-слоя (крестик). Рассчитана на onColor-поверхность (blackout-подложка).
        </DemoHint>
        <div className={frame.blackout}>
          <PopupCloseButton {...args} />
        </div>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<PopupCloseButtonProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SLOT_TEST_IDS.closeButton)).toBeVisible();
  },
};
