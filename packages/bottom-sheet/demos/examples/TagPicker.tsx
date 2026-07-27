import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { Search } from '@ds/search';
import { Tag } from '@ds/tag';
import { QuestionTooltip } from '@ds/tooltip';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';
import styles from './styles.module.scss';

const ALL_TAGS = ['Production', 'Staging', 'Dev', 'Backend', 'Frontend', 'Database', 'Network', 'Critical', 'Billing'];

/**
 * Picker тегов: заголовок с подсказкой, поиск в sticky-зоне (subtitle) фильтрует список,
 * сетка тегов в теле переключает выбор по клику, футер подтверждает выбор.
 */
export function TagPicker() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>(['Production']);

  const visible = ALL_TAGS.filter(tag => tag.toLowerCase().includes(query.toLowerCase()));

  const toggle = (tag: string) =>
    setSelected(prev => (prev.includes(tag) ? prev.filter(x => x !== tag) : [...prev, tag]));

  return (
    <MobilePreview>
      <Button label='Выбрать теги' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Теги'
        slotAfterTitle={<QuestionTooltip tip='Отметьте теги, по которым нужно отфильтровать' />}
        slotSecondTitle={<Search value={query} onChange={setQuery} placeholder='Поиск тега' />}
        content={
          <div className={styles.tagGrid}>
            {visible.map(tag => (
              <Tag
                key={tag}
                label={tag}
                size='s'
                appearance={selected.includes(tag) ? 'primary' : 'neutral'}
                onClick={() => toggle(tag)}
              />
            ))}
          </div>
        }
        approveButton={{ label: `Применить (${selected.length})`, onClick: () => setOpen(false) }}
        cancelButton={{ label: 'Отмена', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
