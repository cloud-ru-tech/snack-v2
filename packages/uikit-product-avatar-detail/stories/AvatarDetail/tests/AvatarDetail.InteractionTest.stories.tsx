import { AvatarDetail } from '@ds/uikit-product-avatar-detail';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AvatarDetail> = {
  title: 'Uikit Product/AvatarDetail/Tests/Interaction',
  component: AvatarDetail,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof AvatarDetail>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    name: 'John Doe',
    contactData: 'jdoe@example.com',
    description: 'Some text about the user',
    'data-test-id': TEST_IDS.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по кнопке контактных данных копирует значение в буфер обмена.</DemoHint>
        <DemoActions align='center'>
          <AvatarDetail {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const root = within(canvasElement).getByTestId(TEST_IDS.root);
    const contactButton = within(canvasElement).getByTestId(TEST_IDS.contactData);

    await step('root is visible', async () => {
      await expect(root).toBeVisible();
    });

    await step('contact data button is visible with label', async () => {
      await expect(contactButton).toBeVisible();
      await expect(contactButton).toHaveTextContent('jdoe@example.com');
    });

    await step('click: contact data button is clickable', async () => {
      await userEvent.click(contactButton);
    });

    await step('keyboard: Tab focuses the contact data button', async () => {
      contactButton.blur();
      await userEvent.tab();
      await expect(contactButton).toHaveFocus();
    });

    await step('keyboard: Enter activates the contact data button', async () => {
      await userEvent.keyboard('{Enter}');
    });
  },
};
