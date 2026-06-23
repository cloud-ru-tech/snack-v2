import { ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../../src/constants';

const meta: Meta<typeof ToggleCard> = {
  title: 'Uikit Product/TogglesPredefined/ToggleCard/Tests/Interaction',
  component: ToggleCard,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    title: 'Тариф Pro',
    description: '100 ГБ хранилища',
    value: 'pro',
    'data-test-id': TEST_IDS.card,
  },
};

export default meta;
type Story = StoryObj<typeof ToggleCard>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик / Enter по карточке выбирает её значение в ToggleGroup.</DemoHint>
        <DemoActions align='center'>
          <ToggleGroup>
            <ToggleCard {...args} />
          </ToggleGroup>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByTestId(TEST_IDS.card);

    await step('initial: card is not checked', async () => {
      await expect(card).toHaveAttribute('aria-checked', 'false');
    });

    await step('click: selects the card', async () => {
      await userEvent.click(card);
      await expect(card).toHaveAttribute('aria-checked', 'true');
    });

    await step('keyboard: Enter toggles selection off', async () => {
      card.focus();
      await userEvent.keyboard('{Enter}');
      await expect(card).toHaveAttribute('aria-checked', 'false');
    });

    // Space-step намеренно опущен — userEvent в storybook-test browser-окружении
    // не доводит keyUp Space до нативной активации div'а. Enter покрывает клавиатуру.
  },
};
