import { Accordion } from '@ds/accordion';

import styles from './styles.module.scss';
export function BasicAccordion() {
  return (
    <div className={styles.wrapper}>
      <Accordion expandedDefault='profile'>
        <Accordion.CollapseBlockPrimary id='profile' title='Профиль' subTitle='Контакты и предпочтения' view='outline'>
          Имя, email, аватар.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='security' title='Безопасность' view='outline'>
          Пароль, сессии, 2FA.
        </Accordion.CollapseBlockPrimary>
      </Accordion>
    </div>
  );
}
