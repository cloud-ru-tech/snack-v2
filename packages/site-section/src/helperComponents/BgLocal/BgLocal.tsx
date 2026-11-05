import { SECTION_BACKGROUND_FILL, SECTION_CONTAINER_BACKGROUND_TYPE, TEST_IDS } from '../../constants';
import { SectionContainerBackground } from '../../types';
import { BackgroundLayer } from '../BackgroundLayer';
import styles from './styles.module.scss';

export type BgLocalProps = {
  /** Фон блока. */
  background: SectionContainerBackground;
};

/** Фон блока по ширине `container` (Figma `bgLocal`): подложка, картинка или акцентный цвет. Декоративный слой. */
export function BgLocal({ background }: BgLocalProps) {
  switch (background.type) {
    case SECTION_CONTAINER_BACKGROUND_TYPE.Image:
      return <img className={styles.image} src={background.src} alt='' data-test-id={TEST_IDS.containerBackground} />;
    case SECTION_CONTAINER_BACKGROUND_TYPE.Accent:
      return <span className={styles.accent} aria-hidden data-test-id={TEST_IDS.containerBackground} />;
    default:
      return (
        <BackgroundLayer
          fill={background.fill ?? SECTION_BACKGROUND_FILL.NeutralBackground}
          data-test-id={TEST_IDS.containerBackground}
        />
      );
  }
}
