import { Button } from '@ds/button';
import { FieldNameRHF } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../../src/constants';
import styles from '../styles.module.scss';

type FormValues = { serviceName: string };

function RHFScenario() {
  const methods = useForm<FormValues>({ defaultValues: { serviceName: '' }, mode: 'onBlur' });

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>React Hook Form</DemoTitle>
        <DemoHint>FieldNameRHF внутри FormProvider — валидация интегрирована в форму через Controller.</DemoHint>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(() => undefined)} className={styles.form}>
            <FieldNameRHF controllerProps={{ name: 'serviceName' }} data-test-id={TEST_IDS.fieldName} />
            <DemoActions align='start'>
              <Button type='submit' label='Отправить' data-test-id='field-name-submit' />
            </DemoActions>
          </form>
        </FormProvider>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldNameRHF> = {
  title: 'Uikit Product/FieldsPredefined/FieldName/Examples/RHF',
  component: FieldNameRHF,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FieldNameRHF>;

export const RHF: Story = {
  tags: ['dev', 'test'],
  render: () => <RHFScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldName)).toBeVisible();
  },
};
