import { BottomSheet, TEST_IDS as PUBLIC_TEST_IDS } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

type StoryArgs = {
  onClose: () => void;
};

/**
 * Controlled-режим: parent держит `open` в state, но **не закрывает** sheet при `onClose` —
 * только инкрементит счётчик. Это демонстрирует, что click на backdrop вызывает `onClose`,
 * но фактическое закрытие — обязанность потребителя в controlled-режиме.
 */
function ControlledRender(args: StoryArgs) {
  const [open, setOpen] = useState(false);
  const portalRoot = usePortalContext();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Controlled</DemoTitle>
        <DemoHint>
          Backdrop-click вызывает <code>onClose</code>, но parent не закрывает sheet — проверяем, что закрытие в
          controlled-режиме под полным контролем потребителя.
        </DemoHint>
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
          // НЕ закрываем — controlled-режим под управлением parent'а.
        }}
        container={portalRoot.current || undefined}
        title='Controlled mode'
        content={<p>Sheet остаётся открытым после backdrop-click.</p>}
      />
    </DemoPage>
  );
}

const meta: Meta<StoryArgs> = {
  title: 'Components/BottomSheet/Tests/Controlled',
  globals: { density: 'comfort' },
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    onClose: fn(),
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Controlled: Story = {
  tags: ['test', 'dev'],
  render: args => <ControlledRender {...args} />,
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    // sheet рендерится в portal вне canvasElement — адресуем по document.body через getByTestId.
    const portal = within(document.body);

    await step('opens via trigger', async () => {
      const trigger = canvas.getByTestId(TEST_IDS.triggerOpen);
      await userEvent.click(trigger);
      await waitFor(() => expect(portal.getByTestId(PUBLIC_TEST_IDS.title)).toBeVisible());
    });

    await step('backdrop click calls onClose but does not close the sheet (controlled)', async () => {
      const backdrop = portal.getByTestId(PUBLIC_TEST_IDS.backdrop);
      await userEvent.click(backdrop);
      expect(args.onClose).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(portal.getByTestId(PUBLIC_TEST_IDS.title)).toBeVisible());
    });
  },
};
