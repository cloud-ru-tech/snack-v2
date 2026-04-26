import { Accordion } from '@ds/accordion';

import styles from './styles.module.scss';
export function NestedLevels() {
  return (
    <div className={styles.wrapper}>
      <Accordion>
        <Accordion.CollapseBlockPrimary id='root' title='Платежи' view='outline'>
          <Accordion>
            <Accordion.CollapseBlockSecondary id='sub-cards' view='outline' title='Карты'>
              <Accordion>
                <Accordion.CollapseBlockTertiary id='visa' title='Visa •••• 4242'>
                  Основная карта, истекает 09/28.
                </Accordion.CollapseBlockTertiary>
                <Accordion.CollapseBlockTertiary id='mir' title='МИР •••• 7781'>
                  Зарплатная карта.
                </Accordion.CollapseBlockTertiary>
              </Accordion>
            </Accordion.CollapseBlockSecondary>
            <Accordion.CollapseBlockSecondary id='sub-invoices' view='outline' title='Счета'>
              История операций и выставленные счета.
            </Accordion.CollapseBlockSecondary>
          </Accordion>
        </Accordion.CollapseBlockPrimary>
      </Accordion>
    </div>
  );
}
