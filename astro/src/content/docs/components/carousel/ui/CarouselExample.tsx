import { Carousel } from '@design-system/carousel';

import styles from './styles.module.scss';

export function StoryCard({ title }: { title: string }) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
    </div>
  );
}

export function CarouselExample() {
  return (
    <Carousel showItems={2} scrollBy={2} controlsVisibility='always'>
      <StoryCard title='Слайд 1' />
      <StoryCard title='Слайд 2' />
      <StoryCard title='Слайд 3' />
      <StoryCard title='Слайд 4' />
    </Carousel>
  );
}
