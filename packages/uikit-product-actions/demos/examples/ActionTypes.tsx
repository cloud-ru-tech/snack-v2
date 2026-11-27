import { Button } from '@ds/button';
import { Action, Actions } from '@ds/uikit-product-actions';
import { useState } from 'react';

import styles from './styles.module.scss';

export function ActionTypes() {
  const [message, setMessage] = useState('Выберите действие или откройте меню');
  const handleSelect = (variant: string) => () => setMessage(`Выбрано: ${variant}`);
  const menuItems = (variant: string) => [{ content: { label: 'Выбрать действие' }, onClick: handleSelect(variant) }];
  const items: Action[] = [
    { variant: 'filled', label: 'Создать', onClick: handleSelect('filled') },
    { variant: 'outline', label: 'Экспортировать', onClick: handleSelect('outline') },
    { variant: 'tonal', label: 'Обновить', onClick: handleSelect('tonal') },
    { variant: 'function', label: 'Настроить', onClick: handleSelect('function') },
    { variant: 'simple', label: 'Подробнее', onClick: handleSelect('simple') },
    {
      variant: 'dropdown',
      label: 'Выбрать',
      items: menuItems('dropdown'),
      closeDroplistOnItemClick: true,
    },
    {
      variant: 'droplist',
      button: { label: 'Действия' },
      list: { items: menuItems('droplist'), closeDroplistOnItemClick: true },
    },
    {
      variant: 'kebab',
      button: { 'aria-label': 'Другие действия' },
      list: { items: menuItems('kebab'), closeDroplistOnItemClick: true },
    },
    {
      variant: 'quota',
      quotas: [{ name: 'vCPU', limit: 10, usage: 3, remains: 7, unitDisplayName: 'шт.' }],
      loading: false,
      error: false,
      onRefresh: handleSelect('Обновление квот'),
      onWidgetOpen: handleSelect('quota'),
      projectName: 'Тестовый проект',
      quotasUrl: '#quota',
      canEditQuota: false,
    },
    {
      variant: 'custom',
      render: () => ({
        default: <Button label='Проверить' onClick={handleSelect('custom')} />,
        asListItem: { content: { label: 'Проверить' }, onClick: handleSelect('custom') },
      }),
    },
  ];

  return (
    <div className={styles.example}>
      <div className={styles.variants}>
        {items.map(item => (
          <div key={item.variant} className={styles.variant} id={item.variant}>
            <code>{item.variant}</code>
            <Actions className={styles.actions} collapse={false} items={[item]} />
          </div>
        ))}
      </div>
      <p role='status'>{message}</p>
    </div>
  );
}
