import { type BackgroundPredefinedFill, backgroundPredefinedFillToAcrylic } from '../../../src';
import { Square } from '../Square';
import styles from './styles.module.scss';

export type BackgroundPredefinedDemoProps = {
  /** Instance swap слота backgroundPredefined в Figma (material/…). */
  slotFill: BackgroundPredefinedFill;
};

/**
 * Слот backgroundPredefined: подложка `sn.theme.color.neutral.background`, blur 1Level и acrylic только из допустимых fill.
 */
export function BackgroundPredefinedDemo({ slotFill }: BackgroundPredefinedDemoProps) {
  const { appearance, level } = backgroundPredefinedFillToAcrylic(slotFill);

  return (
    <Square>
      <div className={styles.slot} data-acrylic-appearance={appearance} data-acrylic-level={level}>
        <div className={styles.acrylic} />
      </div>
    </Square>
  );
}
