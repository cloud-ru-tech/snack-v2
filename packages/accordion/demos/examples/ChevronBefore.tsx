import { Accordion } from '@ds/accordion';

import styles from './styles.module.scss';
export function ChevronBefore() {
  return (
    <div className={styles.wrapper}>
      <Accordion>
        <Accordion.CollapseBlockSecondary
          id='summary'
          view='outline'
          title='Итого'
          chevron='before'
          afterTitle='1 200 ₽'
        >
          Разбивка платежа по позициям.
        </Accordion.CollapseBlockSecondary>
        <Accordion.CollapseBlockSecondary
          id='delivery'
          view='outline'
          title='Доставка'
          chevron='before'
          afterTitle='бесплатно'
        >
          Курьер по Москве, 2–3 дня.
        </Accordion.CollapseBlockSecondary>
      </Accordion>
    </div>
  );
}
