import { Button } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Toolbar } from '@ds/toolbar';
import { useState } from 'react';

export function WithDataView() {
  const [search, setSearch] = useState('');

  return (
    <div style={{ width: '100%', maxWidth: 720 }}>
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
  );
}
