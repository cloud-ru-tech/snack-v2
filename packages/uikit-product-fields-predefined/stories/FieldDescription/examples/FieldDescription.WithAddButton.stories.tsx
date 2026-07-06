import { FieldDescription } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../../src/constants';
import styles from '../styles.module.scss';

const meta: Meta<typeof FieldDescription> = {
  title: 'Uikit Product/FieldsPredefined/FieldDescription/Examples/WithAddButton',
  component: FieldDescription,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof FieldDescription>;

export const WithAddButton: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>WithAddButton</DemoTitle>
        <DemoHint>
          Опциональное поле в режиме `addButton`: вместо textarea показывается кнопка «Добавить описание», клик по ней
          раскрывает поле.
        </DemoHint>
        <DemoActions align='center'>
          <div className={styles.panel}>
            <FieldDescription addButton data-test-id={TEST_IDS.fieldDescription} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  // Раскрытие поля по клику проверяется в tests/FieldDescription.InteractionTest — пример
  // остаётся в исходном состоянии (кнопка «Добавить описание»).
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldDescriptionAddButton)).toBeVisible();
  },
};
