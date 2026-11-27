import { Actions } from '@ds/uikit-product-actions';
import { useState } from 'react';

export function BasicActions() {
  const [message, setMessage] = useState('Выберите действие');
  const handleAdd = () => setMessage('Выбрано: Добавить');
  const handleExport = () => setMessage('Выбрано: Экспортировать');
  return (
    <div>
      <Actions
        items={[
          { id: 'add', label: 'Добавить', onClick: handleAdd },
          { id: 'export', label: 'Экспортировать', variant: 'outline', onClick: handleExport },
        ]}
      />
      <p role='status'>{message}</p>
    </div>
  );
}
