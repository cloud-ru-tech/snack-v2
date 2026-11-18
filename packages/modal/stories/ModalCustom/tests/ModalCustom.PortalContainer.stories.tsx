import { AdaptiveProvider } from '@ds/adaptive';
import { Button } from '@ds/button';
import { ModalCustom, TEST_IDS as MODAL_TEST_IDS } from '@ds/modal';
import { PortalContextProvider } from '@ds/portal-context';
import { COLOR_SCHEME, useThemeClassnames } from '@ds/theme';
import { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const M = TEST_IDS.modalCustom;

function PortalContainerRender() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);
  const themeClassName = useThemeClassnames({ colorScheme: COLOR_SCHEME.Dark });

  return (
    <AdaptiveProvider layoutType='desktop'>
      <div ref={rootRef} className={themeClassName} data-test-id='modal-themed-root'>
        <PortalContextProvider root={rootRef}>
          <DemoPage>
            <DemoPanel>
              <DemoTitle>PortalContainer</DemoTitle>
              <DemoHint>Модальное окно открыто при монтировании тематического контейнера.</DemoHint>
              <DemoActions>
                <Button data-test-id={M.triggerOpen} label='Открыть повторно' onClick={() => setOpen(true)} />
              </DemoActions>
            </DemoPanel>
          </DemoPage>
          <ModalCustom open={open} onClose={() => setOpen(false)} data-test-id={M.root}>
            <ModalCustom.Header title='Локальная тема' />
            <ModalCustom.Body>Окно наследует тему контейнера портала.</ModalCustom.Body>
          </ModalCustom>
        </PortalContextProvider>
      </div>
    </AdaptiveProvider>
  );
}

const meta: Meta = {
  title: 'Components/Modal/ModalCustom/Tests/PortalContainer',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;

type Story = StoryObj;

export const PortalContainer: Story = {
  tags: ['test', 'dev'],
  render: () => <PortalContainerRender />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const themedRoot = canvas.getByTestId('modal-themed-root');
    const body = within(document.body);

    await step('initially open modal uses the parent portal container', async () => {
      await waitFor(() => expect(themedRoot).toContainElement(body.getByTestId(M.root)));
      await expect(within(themedRoot).getByTestId(M.root)).toBeVisible();
    });

    await step('reopening keeps the modal inside the portal container', async () => {
      await userEvent.click(body.getByTestId(MODAL_TEST_IDS.closeButton));
      await waitFor(() => expect(body.queryByTestId(M.root)).not.toBeInTheDocument());
      await userEvent.click(canvas.getByTestId(M.triggerOpen));
      await waitFor(() => expect(within(themedRoot).getByTestId(M.root)).toBeVisible());
    });
  },
};
