import { CheckSVG, CrossSVG } from '@ds/icons';
import { Checkbox } from '@ds/toggles';
import { LAYOUT_TYPE, Toolbar } from '@ds/toolbar';
import { useId, useState } from 'react';

import { MobilePreview } from '../MobilePreview';

export function MobileLayout() {
  const selectionToggleId = useId();
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <label
        htmlFor={selectionToggleId}
        style={{ display: 'inline-flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}
      >
        <Checkbox id={selectionToggleId} size='s' checked={checked} onChange={setChecked} />
        <span>Есть выбранные строки таблицы</span>
      </label>
      <MobilePreview>
        <Toolbar
          layoutType={LAYOUT_TYPE.Mobile}
          search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
          onRefresh={() => setSearch('')}
          moreActions={[{ content: { option: 'Действие' }, onClick: () => undefined }]}
          checked={checked}
          onCheck={() => setChecked(value => !value)}
          selectedCount={checked ? 12 : 0}
          totalCount={100}
          bulkActions={[
            { label: 'Подтвердить', icon: CheckSVG, onClick: () => undefined },
            { label: 'Отклонить', icon: CrossSVG, onClick: () => undefined },
          ]}
        />
      </MobilePreview>
    </div>
  );
}
