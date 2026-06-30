import { Card } from '@ds/card';

import styles from './HomeCard.module.scss';

type HomeCardProps = {
  href: string;
  title: string;
  description?: string;
};

/** Карточка-ссылка на главной — DS-компонент `@ds/card` (`as='a'`) как anchor. */
export function HomeCard({ href, title, description }: HomeCardProps) {
  return (
    <Card as='a' href={href} view='outline' radius='m' className={styles.card}>
      <span className={styles.title}>{title}</span>
      {description && <span className={styles.desc}>{description}</span>}
    </Card>
  );
}
