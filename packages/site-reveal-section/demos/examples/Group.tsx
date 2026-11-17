import { RevealSections } from '@ds/site-reveal-section';

import styles from '../styles.module.scss';

export function Group() {
  return (
    <div className={styles.viewport}>
      <div className={styles.sections}>
        <RevealSections>
          <section className={styles.section}>
            <h2 className={styles.title}>Облачная платформа</h2>
            <p className={styles.description}>Первая секция отображается сразу: skipFirst=true по умолчанию.</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.title}>Возможности</h2>
            <p className={styles.description}>Каждая следующая секция появляется независимо от остальных.</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.title}>Тарифы</h2>
            <p className={styles.description}>Повторная прокрутка не запускает анимацию заново.</p>
          </section>
        </RevealSections>
      </div>
    </div>
  );
}
