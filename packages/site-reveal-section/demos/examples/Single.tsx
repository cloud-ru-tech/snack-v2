import { RevealSection } from '@ds/site-reveal-section';

import styles from '../styles.module.scss';

export function Single() {
  return (
    <div className={styles.viewport}>
      <div className={styles.spacer}>Прокрутите вниз</div>
      <RevealSection>
        <section className={styles.section}>
          <h2 className={styles.title}>Возможности платформы</h2>
          <p className={styles.description}>Секция появляется при прокрутке и остаётся видимой.</p>
        </section>
      </RevealSection>
      <div className={styles.spacer} />
    </div>
  );
}
