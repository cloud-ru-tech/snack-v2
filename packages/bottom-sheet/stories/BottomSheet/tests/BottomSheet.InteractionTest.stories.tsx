import { BottomSheet, TEST_IDS as PUBLIC_TEST_IDS } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

type StoryArgs = {
  onClose: () => void;
  onBackButtonClick: () => void;
  onApprove: () => void;
  onCancel: () => void;
};

function InteractionRender(args: StoryArgs) {
  const [open, setOpen] = useState(false);
  const portalRoot = usePortalContext();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Interaction test</DemoTitle>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Open'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>

      <BottomSheet
        open={open}
        onClose={() => {
          args.onClose();
          setOpen(false);
        }}
        container={portalRoot.current || undefined}
        title='Interaction test'
        onBackButtonClick={args.onBackButtonClick}
        content={<p>Test content</p>}
        approveButton={{ label: 'Подтвердить', onClick: args.onApprove }}
        cancelButton={{ label: 'Отмена', onClick: args.onCancel }}
      />
    </DemoPage>
  );
}

const meta: Meta<StoryArgs> = {
  title: 'Components/BottomSheet/Tests/Interaction',
  globals: { density: 'comfort' },
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    onClose: fn(),
    onBackButtonClick: fn(),
    onApprove: fn(),
    onCancel: fn(),
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => <InteractionRender {...args} />,
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    // sheet рендерится в portal вне canvasElement — адресуем по document.body через getByTestId.
    const portal = within(document.body);

    await step('opens via trigger', async () => {
      const trigger = canvas.getByTestId(TEST_IDS.triggerOpen);
      await userEvent.click(trigger);
      await waitFor(() => expect(portal.getByTestId(PUBLIC_TEST_IDS.title)).toBeVisible());
    });

    await step('click on back-button calls onBackButtonClick', async () => {
      const backBtn = portal.getByTestId(PUBLIC_TEST_IDS.backButton);
      await userEvent.click(backBtn);
      expect(args.onBackButtonClick).toHaveBeenCalledTimes(1);
    });

    await step('footer buttons fire their onClick', async () => {
      await userEvent.click(portal.getByTestId(PUBLIC_TEST_IDS.footerApprove));
      expect(args.onApprove).toHaveBeenCalledTimes(1);
      await userEvent.click(portal.getByTestId(PUBLIC_TEST_IDS.footerCancel));
      expect(args.onCancel).toHaveBeenCalledTimes(1);
    });
  },
};
