import { FieldText } from '@ds/fields';
import { ItemId } from '@ds/list';
import { FieldSelectCreate } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldSelectCreateBasic() {
  const [items, setItems] = useState([
    { id: '1', content: { option: 'Production' } },
    { id: '2', content: { option: 'Staging' } },
  ]);
  const [value, setValue] = useState<ItemId>();
  const [name, setName] = useState('');

  const submitHandler = () => {
    const id = String(items.length + 1);
    setItems(prev => [...prev, { id, content: { option: name.trim() || `Окружение ${id}` } }]);
    setName('');
    return Promise.resolve(id);
  };

  return (
    <div style={{ width: 320 }}>
      <FieldSelectCreate
        entityName={{ single: 'Окружение', plural: 'Окружения' }}
        selectProps={{ label: 'Окружение', items, value, onChange: setValue }}
        createLayoutProps={{
          title: 'Создание окружения',
          content: <FieldText label='Название' value={name} onChange={setName} />,
        }}
        submitHandler={submitHandler}
      />
    </div>
  );
}
