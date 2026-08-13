import { Button } from '@ds/button';
import { openToast, toaster, TOASTER_TYPE, ToasterContainer } from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const containerId = 'toast-user-action-timer-phase';

// Кольцо отсчёта показывает фактическое состояние авто-close таймера, поэтому
// вне контейнера оно всегда полное. Чтобы увидеть промежуточную фазу, тост
// открывается в настоящем контейнере на 4 секунды: наведение курсора ставит
// отсчёт на паузу, и кольцо замирает на текущей четверти.
const AUTO_CLOSE_MS = 4000;

function TimerPhaseRender() {
  useEffect(() => () => toaster.userAction.dismiss({ containerId }), []);

  const open = () =>
    openToast({
      type: TOASTER_TYPE.UserAction,
      toasterProps: { label: 'Изменения сохранены', timer: true },
      containerProps: { type: TOASTER_TYPE.UserAction, containerId },
      toastOptions: { autoClose: AUTO_CLOSE_MS },
    });

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>TimerPhase</DemoTitle>
        <DemoHint>
          Отсчёт идёт 4 секунды. Наведите курсор на карточку — таймер встанет на паузу, и кольцо останется на текущей
          фазе: через секунду это ровно три четверти и цифра 3.
        </DemoHint>
        <DemoActions align='center'>
          <Button label='Показать тост' onClick={open} data-test-id={TEST_IDS.timerPhase.triggerOpen} />
        </DemoActions>
      </DemoPanel>

      <ToasterContainer type={TOASTER_TYPE.UserAction} containerId={containerId} autoClose={AUTO_CLOSE_MS} />
    </DemoPage>
  );
}

const meta: Meta<typeof ToasterContainer> = {
  title: 'Components/Toaster/ToastUserAction/Examples/TimerPhase',
  component: ToasterContainer,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <TimerPhaseRender />,
};

export default meta;

type Story = StoryObj<typeof ToasterContainer>;

export const TimerPhase: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId(TEST_IDS.timerPhase.triggerOpen));

    // Тост въезжает анимацией, поэтому ждём не появления в DOM, а видимости.
    const toast = await waitFor(() => within(document.body).getByTestId(TEST_IDS.userActionRoot));
    await waitFor(() => expect(toast).toBeVisible());
  },
};
