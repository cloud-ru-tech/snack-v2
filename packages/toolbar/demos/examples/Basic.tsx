import { Toolbar } from '@ds/toolbar';
import { useState } from 'react';

export function Basic() {
  const [search, setSearch] = useState('');

  return (
    <div style={{ width: '100%', maxWidth: 720 }}>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
        onRefresh={() => setSearch('')}
        moreActions={[
          { content: { option: 'Экспорт' }, onClick: () => undefined },
          { content: { option: 'Настройки' }, onClick: () => undefined },
        ]}
      />
    </div>
  );
}
