import { FooterActions, PopupFooter, PopupFooterProps } from '@ds/popup-private';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import frame from '../frame.module.scss';
import { SLOT_TEST_IDS } from '../testIds';

const meta: Meta<PopupFooterProps> = {
  title: 'Components/PopupPrivate/PopupFooter',
  component: PopupFooter,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Нижняя action-зона overlay-слоя. Рендерит переданные children в bottomBar-секции.</DemoHint>
        <div className={frame.frame}>
          <div className={frame.bodyStub}>
            <span className={frame.bodyLine} />
            <span className={frame.bodyLine} />
          </div>
          <PopupFooter {...args}>
            <FooterActions
              approveButton={{ label: 'Применить' }}
              cancelButton={{ label: 'Отмена' }}
              testIds={{
                approve: SLOT_TEST_IDS.footerApprove,
                cancel: SLOT_TEST_IDS.footerCancel,
                additional: SLOT_TEST_IDS.footerAdditional,
              }}
            />
          </PopupFooter>
        </div>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<PopupFooterProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SLOT_TEST_IDS.footer)).toBeVisible();
  },
};
