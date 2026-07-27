import { PopupHeader, PopupHeaderProps } from '@ds/popup-private';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import frame from '../frame.module.scss';
import { SLOT_TEST_IDS } from '../testIds';

const meta: Meta<PopupHeaderProps> = {
  title: 'Components/PopupPrivate/PopupHeader',
  component: PopupHeader,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    title: 'Заголовок окна',
    subtitle: 'Дополнительная строка под заголовком',
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Шапка overlay-слоя внутри рамки окна.</DemoHint>
        <div className={frame.frame}>
          <PopupHeader {...args} />
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
type Story = StoryObj<PopupHeaderProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SLOT_TEST_IDS.header)).toBeVisible();
  },
};
