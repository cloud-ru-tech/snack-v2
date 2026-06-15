import { FieldDecorator } from '@ds/fields';
import { InputPrivate } from '@ds/input-private';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

export function DecoratorLabelTooltip() {
  const [value, setValue] = useState('');
  return (
    <PortalContextProvider>
      <FieldDecorator
        label='Идентификатор'
        required
        labelTooltip={{ tip: 'Уникальный идентификатор ресурса. Наведите на иконку рядом с заголовком.' }}
        hint='Подсказка к заголовку выводится через иконку вопроса'
      >
        <InputPrivate value={value} onChange={setValue} placeholder='res-id' />
      </FieldDecorator>
    </PortalContextProvider>
  );
}
