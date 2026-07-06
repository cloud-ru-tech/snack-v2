import { FieldName } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldNameBasic() {
  const [value, setValue] = useState('');

  return <FieldName value={value} onChange={setValue} />;
}
