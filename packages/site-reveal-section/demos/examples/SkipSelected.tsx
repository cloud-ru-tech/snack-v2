import { RevealSections } from '@ds/site-reveal-section';

import styles from '../styles.module.scss';

export function SkipSelected() {
  return (
    <div className={styles.viewport}>
      <div className={styles.sections}>
        <RevealSections skipFirst={false} shouldSkip={(_child, index) => index === 1} duration={400} offset={16}>
          <section className={styles.section}>
            <h2 className={styles.title}>Возможности</h2>
            <p className={styles.description}>Первая секция тоже получает анимацию.</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.title}>Специальное предложение</h2>
            <p className={styles.description}>Вторая секция исключена по индексу и отображается без обёртки.</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.title}>Тарифы</h2>
            <p className={styles.description}>Общие параметры анимации применяются к оставшимся секциям.</p>
          </section>
        </RevealSections>
      </div>
    </div>
  );
}
