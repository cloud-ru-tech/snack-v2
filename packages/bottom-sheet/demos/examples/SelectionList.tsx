import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { Checkbox } from '@ds/toggles';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';
import styles from './styles.module.scss';

const OPTIONS = [
  { id: 'compute', label: 'Compute' },
  { id: 'storage', label: 'Object Storage' },
  { id: 'network', label: 'Networking' },
  { id: 'database', label: 'Managed Databases' },
];

/**
 * Сценарий выбора из списка: заголовок, чекбокс «Выбрать все» c indeterminate-состоянием
 * для частичного выбора, список строк-опций и действие «Готово» в футере.
 */
export function SelectionList() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(['compute']);

  const allChecked = selected.length === OPTIONS.length;
  const someChecked = selected.length > 0 && !allChecked;

  const toggle = (id: string) => setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  const toggleAll = () => setSelected(allChecked ? [] : OPTIONS.map(o => o.id));

  return (
    <MobilePreview>
      <Button label='Выбрать сервисы' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Сервисы'
        withDividers
        content={
          <div className={styles.column}>
            {/* htmlFor связывает подпись с нативным input'ом внутри Checkbox — клик по тексту переключает чекбокс. */}
            <label className={styles.checkRow} htmlFor='sel-all'>
              <Checkbox id='sel-all' checked={allChecked} indeterminate={someChecked} onChange={toggleAll} />
              <span>Выбрать все</span>
            </label>
            {OPTIONS.map(option => (
              <label key={option.id} className={styles.checkRow} htmlFor={`sel-${option.id}`}>
                <Checkbox
                  id={`sel-${option.id}`}
                  checked={selected.includes(option.id)}
                  onChange={() => toggle(option.id)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        }
        approveButton={{ label: `Готово (${selected.length})`, onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
