import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { Switch } from '@ds/toggles';
import { QuestionTooltip } from '@ds/tooltip';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';
import styles from './styles.module.scss';

const PERIOD_ITEMS = [
  { value: 'day', label: 'День' },
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
];

/**
 * Реальный сценарий «Фильтры»: back-кнопка + заголовок с подсказкой, sticky-зона chips
 * над контентом (subHeadline), форма с SegmentControl и переключателями в теле и пара
 * действий «Применить / Сбросить» в футере.
 */
export function Filters() {
  const [open, setOpen] = useState(false);
  const [period, setPeriod] = useState('week');
  const [onlyFavourite, setOnlyFavourite] = useState(true);
  const [withArchived, setWithArchived] = useState(false);
  const [chips, setChips] = useState(['Активные', 'За месяц']);

  return (
    <MobilePreview>
      <Button label='Открыть фильтры' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Фильтры'
        onBackButtonClick={() => setOpen(false)}
        slotAfterHeadline={<QuestionTooltip tip='Настройте параметры выборки' />}
        subHeadline={
          <div className={styles.chipRow}>
            {chips.map(chip => (
              <Tag
                key={chip}
                label={chip}
                appearance='primary'
                size='s'
                onDelete={() => setChips(prev => prev.filter(c => c !== chip))}
              />
            ))}
          </div>
        }
        content={
          <div className={styles.column}>
            <SegmentControl items={PERIOD_ITEMS} value={period} onChange={setPeriod} width='full' />
            <div className={styles.switchRow}>
              <span>Только избранное</span>
              <Switch checked={onlyFavourite} onChange={setOnlyFavourite} />
            </div>
            <div className={styles.switchRow}>
              <span>Показывать архив</span>
              <Switch checked={withArchived} onChange={setWithArchived} />
            </div>
          </div>
        }
        approveButton={{ label: 'Применить', onClick: () => setOpen(false) }}
        cancelButton={{
          label: 'Сбросить',
          onClick: () => {
            setPeriod('week');
            setOnlyFavourite(false);
            setWithArchived(false);
            setChips([]);
          },
        }}
      />
    </MobilePreview>
  );
}
