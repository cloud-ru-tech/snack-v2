import { FieldDecorator, TEST_IDS } from '@ds/fields';
import { InputPrivate } from '@ds/input-private';
import { PortalContextProvider } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ResizableWrapper } from '../../_shared';

const meta: Meta<typeof FieldDecorator> = {
  title: 'Components/Fields/FieldDecorator/Examples/WithInput',
  component: FieldDecorator,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FieldDecorator>;

const MAX_LENGTH = 32;

function WithInputDemo() {
  const [value, setValue] = useState('');

  return (
    <PortalContextProvider>
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>FieldDecorator + InputPrivate</DemoTitle>
          <DemoHint>
            Декоратор оборачивает любой input: label / required / tooltip / hint / живой счётчик длины.
          </DemoHint>
          <DemoActions align='center'>
            <ResizableWrapper>
              <FieldDecorator
                data-test-id={TEST_IDS.fieldDecorator}
                label='Идентификатор'
                required
                labelTooltip={{ tip: 'Уникальный идентификатор ресурса. Наведите на иконку рядом с заголовком.' }}
                hint='Подсказка к заголовку выводится через иконку вопроса'
                length={{ current: value.length, max: MAX_LENGTH }}
              >
                <InputPrivate value={value} onChange={setValue} maxLength={MAX_LENGTH} placeholder='res-id' />
              </FieldDecorator>
            </ResizableWrapper>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    </PortalContextProvider>
  );
}

export const WithInput: Story = {
  tags: ['dev', 'test'],
  render: () => <WithInputDemo />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldDecorator)).toBeVisible();
  },
};
