import { Button } from '@ds/button';
import { FieldNameRHF } from '@ds/uikit-product-fields-predefined';
import { FormProvider, useForm } from 'react-hook-form';

type FormValues = { serviceName: string };

export function FieldNameRHFExample() {
  const methods = useForm<FormValues>({ defaultValues: { serviceName: '' }, mode: 'onBlur' });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(values => alert(`name: ${values.serviceName}`))}
        style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}
      >
        <FieldNameRHF controllerProps={{ name: 'serviceName' }} />
        <Button type='submit' label='Отправить' />
      </form>
    </FormProvider>
  );
}
