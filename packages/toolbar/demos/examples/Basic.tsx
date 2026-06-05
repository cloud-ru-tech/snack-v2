import { PortalContextProvider } from '@ds/portal-context';
import { Toolbar } from '@ds/toolbar';
import { useRef, useState } from 'react';

export function Basic() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative', width: '100%', maxWidth: 720 }}>
        <Toolbar
          search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
          onRefresh={() => setSearch('')}
          moreActions={[
            { content: { option: 'Экспорт' }, onClick: () => undefined },
            { content: { option: 'Настройки' }, onClick: () => undefined },
          ]}
        />
      </div>
    </PortalContextProvider>
  );
}
