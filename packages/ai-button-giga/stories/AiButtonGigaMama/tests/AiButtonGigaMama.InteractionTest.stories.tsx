import { AiButtonGigaMama } from '@ds/ai-button-giga';
import { Meta, StoryObj } from '@storybook/react';
import { FormEvent } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const onClick = fn();
const onSubmit = fn();
function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  onSubmit();
}
const meta: Meta<typeof AiButtonGigaMama> = {
  title: 'AI/ButtonGiga/Mama/Tests/Interaction',
  component: AiButtonGigaMama,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { label: 'Создать ресурс', onClick, 'data-test-id': TEST_IDS.mama.root },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <form onSubmit={handleSubmit}>
          <DemoActions>
            <AiButtonGigaMama {...args} />
            <AiButtonGigaMama {...args} disabled data-test-id={TEST_IDS.mama.disabled} />
            <AiButtonGigaMama {...args} disabled loading type='submit' data-test-id={TEST_IDS.mama.disabledLoading} />
            <AiButtonGigaMama {...args} loading type='submit' data-test-id={TEST_IDS.mama.loading} />
            <AiButtonGigaMama {...args} type='submit' data-test-id={TEST_IDS.mama.submit} />
          </DemoActions>
        </form>
      </DemoPanel>
    </DemoPage>
  ),
};
export default meta;
type Story = StoryObj<typeof AiButtonGigaMama>;
export const InteractionTest: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement, step }) => {
    onClick.mockClear();
    onSubmit.mockClear();
    const canvas = within(canvasElement);
    const button = canvas.getByTestId(TEST_IDS.mama.root);
    const disabled = canvas.getByTestId(TEST_IDS.mama.disabled);
    const loading = canvas.getByTestId(TEST_IDS.mama.loading);
    await step('Клик, Enter и пробел вызывают действие; обычная кнопка не отправляет форму.', async () => {
      await userEvent.click(button);
      button.focus();
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      await expect(onClick).toHaveBeenCalledTimes(3);
      await expect(onSubmit).not.toHaveBeenCalled();
    });
    await step('Недоступная кнопка блокирует действие без индикатора загрузки.', async () => {
      await expect(disabled).toBeDisabled();
      await expect(disabled).not.toHaveAttribute('aria-busy');
      await userEvent.click(disabled, { pointerEventsCheck: 0 });
      await expect(onClick).toHaveBeenCalledTimes(3);
    });
    await step('Загрузка сохраняет фокус и блокирует действие и отправление формы.', async () => {
      await expect(loading).toHaveAttribute('aria-busy', 'true');
      await expect(loading).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(loading);
      loading.focus();
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      await expect(loading).toHaveFocus();
      await expect(onClick).toHaveBeenCalledTimes(3);
      await expect(onSubmit).not.toHaveBeenCalled();
    });
    await step('Загрузка имеет приоритет при disabled=true и блокирует действие и отправление формы.', async () => {
      const combined = canvas.getByTestId(TEST_IDS.mama.disabledLoading);
      await expect(combined).toBeEnabled();
      await expect(combined).toHaveAttribute('aria-busy', 'true');
      await expect(combined).toHaveAttribute('aria-disabled', 'true');
      await expect(combined).not.toHaveAttribute('data-disabled');
      await userEvent.click(combined);
      combined.focus();
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      await expect(combined).toHaveFocus();
      await expect(onClick).toHaveBeenCalledTimes(3);
      await expect(onSubmit).not.toHaveBeenCalled();
    });
    await step('Нативный type=submit отправляет форму.', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.mama.submit));
      await expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  },
};
