import { DragPreview } from '@ds/drag-and-drop';

import styles from './demo.module.scss';

export function PreviewSurface() {
  return (
    <DragPreview className={styles.entity}>
      <div className={styles.row}>ListItem 2</div>
    </DragPreview>
  );
}
