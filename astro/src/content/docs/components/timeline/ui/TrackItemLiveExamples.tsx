import { Typography } from '@design-system/typography';
import { TrackItem } from '@packages/timeline/src/components/TrackItem';

import { ExampleContainer } from '#astro/components/mdx';

import styles from './styles.module.scss';

export function TrackItemBasicExample() {
  return (
    <div className={styles.wrapper}>
      <ExampleContainer>
        <div className={styles.trackDemo}>
          <TrackItem
            // eslint-disable-next-line jsx-a11y/aria-role
            role='start'
            lineStyle='solid'
            dotVariant='default'
            dotAppearance='primary'
            showLines
            content={
              <>
                <Typography variant='title' size='m'>
                  Заголовок
                </Typography>
                <Typography variant='body' size='m'>
                  Описание пункта
                </Typography>
              </>
            }
          />
        </div>
      </ExampleContainer>
    </div>
  );
}

export function TrackItemWithOppositeExample() {
  return (
    <div className={styles.wrapper}>
      <ExampleContainer>
        <div className={styles.trackDemo}>
          <TrackItem
            // eslint-disable-next-line jsx-a11y/aria-role
            role='center'
            lineStyle='dashed'
            dotVariant='default'
            dotAppearance='neutral'
            showLines
            opposite={
              <Typography variant='body' size='m'>
                Слева
              </Typography>
            }
            content={
              <>
                <Typography variant='title' size='m'>
                  Контент справа
                </Typography>
                <Typography variant='body' size='m'>
                  При alternate пустая колонка тоже резервируется.
                </Typography>
              </>
            }
          />
        </div>
      </ExampleContainer>
    </div>
  );
}
