import { APPEARANCE, Button, VIEW } from '@ds/button';
import { Drawer, POSITION, WIDTH } from '@ds/drawer';
import { Modal } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { LONG_BODY_TEXT } from '../constants';

const IN_MODAL_IDS = TEST_IDS.drawer.inModal;

function InModalScenario() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InModal</DemoTitle>
        <DemoHint>
          Drawer открывается поверх модального окна: у каждой поверхности свой scroll-lock, поэтому длинное тело дровера
          прокручивается, пока модалка остаётся под ним.
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={IN_MODAL_IDS.modal.triggerOpen}
            label='Открыть модалку'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setModalOpen(true)}
          />
        </DemoActions>
      </DemoPanel>

      <Modal
        data-test-id={IN_MODAL_IDS.modal.root}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title='Модальное окно'
        subtitle='Из него открывается Drawer с длинным содержимым'
        content={
          <Button
            data-test-id={IN_MODAL_IDS.drawer.triggerOpen}
            label='Открыть Drawer'
            view={VIEW.Outline}
            appearance={APPEARANCE.Primary}
            onClick={() => setDrawerOpen(true)}
          />
        }
      />

      <Drawer
        data-test-id={IN_MODAL_IDS.drawer.root}
        open={drawerOpen}
        showBlackout={false}
        onClose={() => setDrawerOpen(false)}
        position={POSITION.Right}
        width={WIDTH.M}
        title='Drawer поверх модалки'
        content={LONG_BODY_TEXT}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer/Drawer/Examples/InModal',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const InModal: Story = {
  tags: ['dev', 'test'],
  render: () => <InModalScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(IN_MODAL_IDS.modal.triggerOpen)).toBeVisible();
  },
};
