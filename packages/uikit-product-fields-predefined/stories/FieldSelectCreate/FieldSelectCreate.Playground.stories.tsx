import { FieldText } from '@ds/fields';
import { ItemId } from '@ds/list';
import { CREATE_LAYOUT_TYPE, FieldSelectCreate, PERMISSION } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../src/constants';

const meta: Meta<typeof FieldSelectCreate> = {
  title: 'Uikit Product/FieldsPredefined/FieldSelectCreate',
  component: FieldSelectCreate,
  parameters: { layout: 'fullscreen' },
  args: {
    createLayoutType: CREATE_LAYOUT_TYPE.Drawer,
    permission: PERMISSION.CanCreate,
  },
  argTypes: {
    createLayoutType: { control: 'radio', options: Object.values(CREATE_LAYOUT_TYPE) },
    permission: { control: 'radio', options: Object.values(PERMISSION) },
  },
  render: function Render(args) {
    const [items, setItems] = useState([
      { id: '1', content: { option: 'Production' } },
      { id: '2', content: { option: 'Staging' } },
      { id: '3', content: { option: 'Development' } },
    ]);
    const [value, setValue] = useState<ItemId>();

    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>
            Select с действием «Создать»: кнопка под полем и в футере дроплиста; форма создания открывается в дровере
            или модалке.
          </DemoHint>
          <DemoActions block>
            <FieldSelectCreate
              {...args}
              entityName={{ single: 'Окружение', plural: 'Окружения' }}
              selectProps={{ label: 'Окружение', items, value, onChange: setValue }}
              submitHandler={() => {
                const id = String(items.length + 1);
                setItems(prev => [...prev, { id, content: { option: `Окружение ${id}` } }]);
                return Promise.resolve(id);
              }}
              createLayoutProps={{ title: 'Создание окружения', content: <FieldText label='Название' /> }}
            />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof FieldSelectCreate>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldSelectCreate)).toBeVisible();
  },
};
