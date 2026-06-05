import { CheckSVG, CopySVG, CrossSVG } from '@ds/icons';
import { PortalContextProvider } from '@ds/portal-context';
import { Toolbar } from '@ds/toolbar';
import { useRef, useState } from 'react';

export function BulkActions() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(true);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative', width: '100%', maxWidth: 720 }}>
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
    </PortalContextProvider>
  );
}
