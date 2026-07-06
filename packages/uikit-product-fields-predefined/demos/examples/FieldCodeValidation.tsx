import { FieldCode, useFieldCodeValidate } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

const CODE_LENGTH = 6;

export function FieldCodeValidation() {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const validateCode = useFieldCodeValidate({ codeLength: CODE_LENGTH });

  const handleChange = (next: string) => {
    setValue(next);
    setTouched(true);
  };

  return (
    <FieldCode
      codeLength={CODE_LENGTH}
      label='Код подтверждения'
      value={value}
      onChange={handleChange}
      error={touched ? validateCode(value) : undefined}
      showEmptyChars={touched}
    />
  );
}
