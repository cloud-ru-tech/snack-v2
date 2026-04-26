import { Carousel } from '@ds/carousel';

import styles from './CarouselDemo.module.scss';

export function CarouselDemo() {
  return (
    <div className={styles.root}>
      <Carousel showItems={1}>
        <div className={`${styles.slide} ${styles.slide1}`}>Slide 1</div>
        <div className={`${styles.slide} ${styles.slide2}`}>Slide 2</div>
        <div className={`${styles.slide} ${styles.slide3}`}>Slide 3</div>
      </Carousel>
    </div>
  );
}
