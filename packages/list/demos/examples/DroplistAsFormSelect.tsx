import { Button } from '@ds/button';
import { Droplist } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function DroplistAsFormSelect() {
  const [value, setValue] = useState<string | number | undefined>('m');

  const options = [
    { id: 's', content: { option: 'Small (1 vCPU, 2 GB RAM)' } },
    { id: 'm', content: { option: 'Medium (2 vCPU, 4 GB RAM)' } },
    { id: 'l', content: { option: 'Large (4 vCPU, 8 GB RAM)' } },
    { id: 'xl', content: { option: 'X-Large (8 vCPU, 16 GB RAM)' } },
  ];
  const label = options.find(o => o.id === value)?.content.option ?? 'Выбрать';

  return (
    <div className={styles.formSelect}>
      <Droplist
        trigger='click'
        placement='bottom-start'
        closeDroplistOnItemClick
        widthStrategy='eq'
        selection={{ mode: 'single', value, onChange: setValue }}
        items={options}
      >
        <Button size='s' appearance='neutral' view='outline' label={label} fullWidth />
      </Droplist>
    </div>
  );
}
