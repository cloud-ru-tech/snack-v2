import { Skeleton, SkeletonText } from '@ds/skeleton';

import { SURFACE, TEST_IDS } from '../../constants';
import { Surface } from '../../types';
import styles from './styles.module.scss';

/** Строки скелетона текста: заголовок и абзацы описания — по структуре типовой новости. */
const TITLE_LINES = 1;
const PARAGRAPH_LINES = [2, 3, 3];

export type NoteItemSkeletonProps = {
  /** Поверхность отображения */
  surface?: Surface;
};

/**
 * Скелетон карточки новости: те же классы сетки и тот же медиа-слот, что и у `NoteItem`,
 * поэтому переход `loading → data` не меняет геометрию.
 */
export function NoteItemSkeleton({ surface = SURFACE.Modal }: NoteItemSkeletonProps) {
  return (
    <div className={styles.root} data-surface={surface} aria-hidden data-test-id={TEST_IDS.releaseNotesSkeleton}>
      <div className={styles.media} data-test-id={TEST_IDS.releaseNotesMedia}>
        <Skeleton loading width='100%' height='100%' />
      </div>

      <div className={styles.content}>
        <SkeletonText loading lines={TITLE_LINES} variant='headline' size='s' />

        {PARAGRAPH_LINES.map((lines, index) => (
          <SkeletonText key={index} loading lines={lines} />
        ))}
      </div>
    </div>
  );
}
