import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { KebabSVG } from '@ds/icons/interface/system';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';
import styles from './styles.module.scss';

const MENU_ACTIONS = ['Поделиться', 'Дублировать', 'Удалить'];

/**
 * `actionButton` — слот в правом верхнем углу header'а. Здесь это kebab-кнопка, открывающая
 * Dropdown со списком действий; выбранное действие отражается в теле sheet'а. Back-button слева
 * появляется автоматически по `onBackButtonClick`.
 */
export function WithActionButton() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <MobilePreview>
      <Button label='Открыть с действиями' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Detail view'
        onBackButtonClick={() => setOpen(false)}
        actionButton={
          // TODO: заменить на дроплист
          <Dropdown
            open={menuOpen}
            onOpenChange={setMenuOpen}
            placement='bottom-end'
            content={
              <div className={styles.menu}>
                {MENU_ACTIONS.map(action => (
                  <button
                    key={action}
                    type='button'
                    className={styles.menuItem}
                    onClick={() => {
                      setLastAction(action);
                      setMenuOpen(false);
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            }
          >
            <Button view='function' appearance='neutral' icon={<KebabSVG />} aria-label='Действия' />
          </Dropdown>
        }
        content={
          <p>
            Кнопка-меню в правом верхнем углу открывает список действий.
            {lastAction ? ` Выбрано: «${lastAction}».` : ''}
          </p>
        }
        approveButton={{ label: 'Готово', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
