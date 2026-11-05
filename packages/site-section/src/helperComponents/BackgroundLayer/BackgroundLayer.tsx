import { extractSupportProps, WithSupportProps } from '@ds/utils';

import { SectionBackgroundFill } from '../../types';
import styles from './styles.module.scss';
import { sectionBackgroundFillToAcrylic } from './utils';

export type BackgroundLayerProps = WithSupportProps<{
  /** Подложка. */
  fill: SectionBackgroundFill;
}>;

/** Слой-подложка секции (Figma `sectionBackground`): материал из `SECTION_BACKGROUND_FILL`, растянутый на родителя. */
export function BackgroundLayer({ fill, ...rest }: BackgroundLayerProps) {
  const { appearance, level } = sectionBackgroundFillToAcrylic(fill);

  return (
    <span
      className={styles.backgroundLayer}
      data-acrylic-appearance={appearance}
      data-acrylic-level={level}
      aria-hidden
      {...extractSupportProps(rest)}
    >
      <span className={styles.acrylic} />
    </span>
  );
}
