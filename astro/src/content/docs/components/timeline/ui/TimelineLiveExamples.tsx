import { Typography } from '@design-system/typography';
import { Timeline, type TimelineProps } from '@packages/timeline/src';

import { ExampleContainer } from '#astro/components/mdx';

import styles from './styles.module.scss';

function demoItem(
  title: string,
  description: string,
  extra?: Partial<TimelineProps['items'][number]>,
): TimelineProps['items'][number] {
  return {
    content: (
      <>
        <Typography variant='title' size='m'>
          {title}
        </Typography>
        <Typography variant='body' size='m'>
          {description}
        </Typography>
      </>
    ),
    ...extra,
  };
}

const baseItems: TimelineProps['items'] = [
  demoItem('Start', 'Описание шага', { dotAppearance: 'primary' }),
  demoItem('Center', 'Описание', { lineStyle: 'dashed' }),
  demoItem('Sub Center', 'Более длинное описание для переноса строки', {
    lineStyle: 'dashed',
    dotVariant: 'subEvent',
    dotAppearance: 'red',
  }),
  demoItem('End', 'Описание'),
];

export function TimelineBasicExample() {
  return (
    <div className={styles.wrapper}>
      <ExampleContainer>
        <div className={styles.timelineDemo}>
          <Timeline items={baseItems} />
        </div>
      </ExampleContainer>
    </div>
  );
}

export function TimelineAlternateExample() {
  return (
    <div className={styles.wrapper}>
      <ExampleContainer>
        <div className={styles.timelineDemo}>
          <Timeline items={baseItems} alternate contentPosition='right' />
        </div>
      </ExampleContainer>
    </div>
  );
}

export function TimelineFullWidthExample() {
  return (
    <div className={styles.wrapper}>
      <ExampleContainer>
        <div className={styles.timelineDemo}>
          <Timeline items={baseItems.slice(0, 3)} fullWidth />
        </div>
      </ExampleContainer>
    </div>
  );
}

/** Сценарии из Best practices: один пункт (без линий между шагами), многострочный контент. */
export function TimelineBestPracticesExample() {
  const singleItem: TimelineProps['items'] = [
    demoItem('Единственный шаг', 'Линии между шагами не рисуются — только маркер.', {
      dotAppearance: 'primary',
    }),
  ];

  const longTextItems: TimelineProps['items'] = [
    demoItem('Короткий блок', 'Одна строка описания.'),
    demoItem(
      'Блок с длинным текстом',
      'Допускается несколько предложений: высота строки задаётся контентом, вертикальный трек растягивается вместе с ней. Повторим текст для переноса на несколько строк в узкой колонке документации.',
      { lineStyle: 'dashed' },
    ),
  ];

  return (
    <div className={styles.wrapper}>
      <ExampleContainer>
        <div className={styles.examplesBlock}>
          <div className={styles.exampleSection}>
            <Typography variant='label' size='m' className={styles.exampleLabel}>
              Один пункт
            </Typography>
            <div className={styles.timelineDemo}>
              <Timeline items={singleItem} />
            </div>
          </div>
          <div className={styles.exampleSection}>
            <Typography variant='label' size='m' className={styles.exampleLabel}>
              Несколько шагов с длинным текстом
            </Typography>
            <div className={styles.timelineDemo}>
              <Timeline items={longTextItems} />
            </div>
          </div>
        </div>
      </ExampleContainer>
    </div>
  );
}
