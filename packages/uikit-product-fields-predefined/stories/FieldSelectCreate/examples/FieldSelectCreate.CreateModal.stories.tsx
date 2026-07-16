import { FieldText } from '@ds/fields';
import { ItemId } from '@ds/list';
import { TEST_IDS as MODAL_TEST_IDS } from '@ds/modal';
import { CREATE_LAYOUT_TYPE, FieldSelectCreate } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../../src/constants';

const meta: Meta<typeof FieldSelectCreate> = {
  title: 'Uikit Product/FieldsPredefined/FieldSelectCreate/Examples/CreateModal',
  component: FieldSelectCreate,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof FieldSelectCreate>;

function CreateModalDemo() {
  const [items, setItems] = useState([
    { id: '1', content: { label: 'Production' } },
    { id: '2', content: { label: 'Staging' } },
  ]);
  const [value, setValue] = useState<ItemId>();
  const [name, setName] = useState('');

  const submitHandler = () => {
    const id = String(items.length + 1);
    setItems(prev => [...prev, { id, content: { label: name.trim() || `Окружение ${id}` } }]);
    setName('');
    return Promise.resolve(id);
  };

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>CreateModal</DemoTitle>
        <DemoHint>
          Форма создания открывается в модалке. После подтверждения новая опция добавляется в список и выбирается.
        </DemoHint>
        <DemoActions block>
          <FieldSelectCreate
            entityName={{ single: 'Окружение', plural: 'Окружения' }}
            selectProps={{ label: 'Окружение', items, value, onChange: setValue }}
            createLayoutType={CREATE_LAYOUT_TYPE.Modal}
            createLayoutProps={{
              title: 'Создание окружения',
              content: <FieldText label='Название' value={name} onChange={setName} />,
            }}
            submitHandler={submitHandler}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const CreateModal: Story = {
  tags: ['dev', 'test'],
  render: () => <CreateModalDemo />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('click: «Создать» открывает модалку с формой', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.fieldSelectCreateButton));
      await waitFor(() => expect(body.getByTestId(MODAL_TEST_IDS.body)).toBeVisible());
    });

    await step('submit: подтверждение формы закрывает модалку', async () => {
      await userEvent.click(body.getByTestId(MODAL_TEST_IDS.footerApprove));
      await waitFor(() => expect(body.queryByTestId(MODAL_TEST_IDS.body)).not.toBeInTheDocument());
    });
  },
};
