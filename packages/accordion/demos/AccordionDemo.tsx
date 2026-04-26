import { Accordion } from '@ds/accordion';
import { Switch } from '@ds/toggles';
import { useState } from 'react';

import styles from './AccordionDemo.module.scss';

export function AccordionDemo() {
  const [multiple, setMultiple] = useState(false);
  const selectionMode = multiple ? 'multiple' : 'single';

  return (
    <div className={styles.wrapper}>
      <label className={styles.toggle}>
        <Switch checked={multiple} onChange={e => setMultiple(e)} />
        <span>{selectionMode}</span>
      </label>

      <Accordion key={selectionMode} selectionMode={multiple ? 'multiple' : 'single'}>
        <div className={styles.list}>
          <Accordion.CollapseBlockPrimary id='profile' title='Профиль' subTitle='Имя, аватар, контакты' view='outline'>
            <p className={styles.paragraph}>Основные данные пользователя. Иерархия: раздел → подраздел → детали.</p>
          </Accordion.CollapseBlockPrimary>

          <Accordion.CollapseBlockPrimary
            id='notifications'
            title='Уведомления'
            subTitle='Почта, push, мессенджеры'
            view='outline'
          >
            <p className={styles.paragraph}>Настройки каналов оповещения.</p>
          </Accordion.CollapseBlockPrimary>

          <Accordion.CollapseBlockPrimary
            id='security'
            title='Безопасность'
            subTitle='Пароль, сессии, двухфакторная аутентификация'
            view='outline'
          >
            <p className={styles.paragraph}>
              Переключите режим выше, чтобы увидеть разницу между <code>single</code> и <code>multiple</code>.
            </p>
          </Accordion.CollapseBlockPrimary>
        </div>
      </Accordion>
    </div>
  );
}
