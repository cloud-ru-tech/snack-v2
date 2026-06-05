import { Button } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons';
import { PortalContextProvider } from '@ds/portal-context';
import { Toolbar } from '@ds/toolbar';
import { useRef, useState } from 'react';

export function WithDataView() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative', width: '100%', maxWidth: 720 }}>
        <Toolbar
          search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
          onRefresh={() => setSearch('')}
          after={
            <Button
              view='function'
              appearance='neutral'
              icon={<PlaceholderSVG />}
              size='m'
              aria-label='Дополнительное действие'
              onClick={() => undefined}
            />
          }
          dataView={{ show: true }}
          moreActions={[{ content: { option: 'Ещё' }, onClick: () => undefined }]}
        />
      </div>
    </PortalContextProvider>
  );
}
