import { FieldText } from '@ds/fields';
import { TEST_IDS as MODAL_TEST_IDS } from '@ds/modal';
import { CREATE_LAYOUT_TYPE, FieldSelectCreate } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../../src/constants';

const ITEMS = [
  { id: '1', content: { option: 'Production' } },
  { id: '2', content: { option: 'Staging' } },
];

const meta: Meta<typeof FieldSelectCreate> = {
  title: 'Uikit Product/FieldsPredefined/FieldSelectCreate/Tests/Interaction',
  component: FieldSelectCreate,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    submitHandler: fn(async () => undefined),
  },
};

export default meta;
type Story = StoryObj<typeof FieldSelectCreate>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по «Создать» открывает форму создания; подтверждение вызывает submitHandler.</DemoHint>
        <DemoActions block>
          <FieldSelectCreate
            {...args}
            entityName={{ single: 'Окружение', plural: 'Окружения' }}
            selectProps={{ label: 'Окружение', items: ITEMS }}
            createLayoutType={CREATE_LAYOUT_TYPE.Modal}
            createLayoutProps={{ title: 'Создание окружения', content: <FieldText label='Название' /> }}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('click: «Создать» под полем открывает модалку', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.fieldSelectCreateButton));
      await waitFor(() => expect(body.getByTestId(MODAL_TEST_IDS.body)).toBeVisible());
    });

    await step('submit: подтверждение вызывает submitHandler', async () => {
      await userEvent.click(body.getByTestId(MODAL_TEST_IDS.footerApprove));
      await waitFor(() => expect(args.submitHandler).toHaveBeenCalledTimes(1));
    });
  },
};
