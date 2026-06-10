import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';
import styles from './styles.module.scss';

const RESOURCES = Array.from({ length: 14 }, (_, i) => `vm-${String(i + 1).padStart(2, '0')} — ru-moscow-1a`);

/**
 * Non-modal sheet: фон не затемняется (`showBackdrop={false}`) и не блокируется
 * (`lockScroll={false}`) — страница под подсказкой остаётся видимой, скроллится и кликается.
 * Свайп отключён (`swipeEnabled={false}`), потому что подсказку закрывают кнопкой, а не жестом.
 */
export function NonModal() {
  const [open, setOpen] = useState(true);

  return (
    <MobilePreview>
      {/* Контент «страницы» под подсказкой. Список длиннее экрана — фон под non-modal sheet'ом
          можно прокручивать, пока окно открыто (он не затемнён и не заблокирован). */}
      <div className={styles.nonModalPage}>
        <p>Регион: ru-moscow-1 — список виртуальных машин. Прокрутите его, пока подсказка открыта.</p>
        <Button label='Показать подсказку' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
        {RESOURCES.map(name => (
          <p key={name}>{name}</p>
        ))}
      </div>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        showBackdrop={false}
        lockScroll={false}
        swipeEnabled={false}
        title='Совет'
        content={<p>Откройте «Расширенные настройки», чтобы выбрать зону доступности вручную.</p>}
        approveButton={{ label: 'Понятно', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
