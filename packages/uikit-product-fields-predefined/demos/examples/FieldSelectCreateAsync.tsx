import { ItemId } from '@ds/list';
import { FieldSelectCreate } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldSelectCreateAsync() {
  const [value, setValue] = useState<ItemId>();
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState(true);

  const load = () => {
    setDataError(false);
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div style={{ width: 320 }}>
      <FieldSelectCreate
        entityName={{ single: 'Окружение', plural: 'Окружения' }}
        selectProps={{
          label: 'Окружение',
          items: [{ id: '1', content: { label: 'Production' } }],
          value,
          onChange: setValue,
          loading,
          dataError,
        }}
        onRefetch={load}
        createLayoutProps={{ title: 'Создание окружения', content: 'Форма создания' }}
        submitHandler={() => Promise.resolve('1')}
      />
    </div>
  );
}
