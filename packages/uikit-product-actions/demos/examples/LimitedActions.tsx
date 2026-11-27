import { Actions } from '@ds/uikit-product-actions';
import { useState } from 'react';

export function LimitedActions() {
  const [message, setMessage] = useState('Откройте меню дополнительных действий');
  const handleAdd = () => setMessage('Выбрано: Добавить');
  const handleExport = () => setMessage('Выбрано: Экспортировать');
  const handleRefresh = () => setMessage('Выбрано: Обновить');

  return (
    <div>
      <Actions
        maxVisibleItems={1}
        items={[
          { id: 'add', label: 'Добавить', onClick: handleAdd },
          { id: 'export', variant: 'outline', label: 'Экспортировать', onClick: handleExport },
          { id: 'refresh', variant: 'function', label: 'Обновить', onClick: handleRefresh },
        ]}
      />
      <p role='status'>{message}</p>
    </div>
  );
}
