import styles from './StoryCard.module.scss';

export function StoryCard({ title }: { title: string }) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
    </div>
  );
}
