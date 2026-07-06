import { Button } from '@ds/button';
import { FieldDescriptionRHF } from '@ds/uikit-product-fields-predefined';
import { FormProvider, useForm } from 'react-hook-form';

type FormValues = { description: string };

export function FieldDescriptionRHFExample() {
  const methods = useForm<FormValues>({ defaultValues: { description: '' }, mode: 'onBlur' });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(values => alert(`description: ${values.description}`))}
        style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 360 }}
      >
        <FieldDescriptionRHF controllerProps={{ name: 'description' }} />
        <Button type='submit' label='Отправить' />
      </form>
    </FormProvider>
  );
}
