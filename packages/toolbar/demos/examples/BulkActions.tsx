import { CheckSVG, CopySVG, CrossSVG } from '@ds/icons/interface/system';
import { Toolbar } from '@ds/toolbar';
import { useState } from 'react';

export function BulkActions() {
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ width: '100%', maxWidth: 720 }}>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
        checked={checked}
        indeterminate={false}
        selectedCount={checked ? 5 : 0}
        totalCount={100}
        onCheck={() => setChecked(value => !value)}
        bulkActions={[
          { label: 'Подтвердить', icon: CheckSVG, onClick: () => undefined },
          { label: 'Отклонить', icon: CrossSVG, onClick: () => undefined },
          { label: 'Копировать', icon: CopySVG, onClick: () => undefined },
        ]}
      />
    </div>
  );
}
