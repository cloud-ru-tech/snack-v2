import { FieldChat } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldChatBasic() {
  const [value, setValue] = useState('');

  return <FieldChat value={value} onChange={setValue} handleSubmit={() => setValue('')} />;
}
