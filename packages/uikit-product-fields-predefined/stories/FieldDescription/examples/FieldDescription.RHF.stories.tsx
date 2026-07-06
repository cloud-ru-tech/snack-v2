import { Button } from '@ds/button';
import { FieldDescriptionRHF } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../../src/constants';
import styles from '../styles.module.scss';

type FormValues = { description: string };

/**
 * Сценарий формы react-hook-form: FieldDescriptionRHF регистрируется в форме через Controller,
 * встроенная yup-валидация (required + длина до 255) блокирует submit невалидной формы,
 * при валидном значении handleSubmit получает данные формы.
 */
function RHFScenario() {
  const methods = useForm<FormValues>({ defaultValues: { description: '' }, mode: 'onBlur' });
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleSubmit = methods.handleSubmit(({ description }) => setSubmitted(description));

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>React Hook Form</DemoTitle>
        <DemoHint>
          Поле «Описание» в форме react-hook-form: ошибка валидации показывается по blur и блокирует отправку; при
          валидном значении «Отправить» проходит, и форма получает значение поля.
        </DemoHint>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <FieldDescriptionRHF
              required
              controllerProps={{ name: 'description' }}
              data-test-id={TEST_IDS.fieldDescription}
            />
            <DemoActions align='start'>
              <Button type='submit' label='Отправить' data-test-id='field-description-submit' />
            </DemoActions>
            {submitted !== null && <span data-test-id='field-description-submitted'>Отправлено: {submitted}</span>}
          </form>
        </FormProvider>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldDescriptionRHF> = {
  title: 'Uikit Product/FieldsPredefined/FieldDescription/Examples/RHF',
  component: FieldDescriptionRHF,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FieldDescriptionRHF>;

export const RHF: Story = {
  tags: ['dev', 'test'],
  render: () => <RHFScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldDescription)).toBeVisible();
  },
};
