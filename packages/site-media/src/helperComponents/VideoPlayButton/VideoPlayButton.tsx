import { useAdaptiveLayout } from '@ds/adaptive';
import { PausePlayerSVG, PlayPlayerSVG } from '@ds/icons/interface/web';
import { KeyboardEvent, MouseEvent } from 'react';

import { TEST_IDS } from '../../constants';
import { siteMediaLocale } from '../../locale';
import styles from './styles.module.scss';

type VideoPlayButtonProps = {
  playing: boolean;
  visible: boolean;
  compact?: boolean;
  onClick(event: MouseEvent<HTMLButtonElement>): void;
  onKeyDown?(event: KeyboardEvent<HTMLButtonElement>): void;
};

export function VideoPlayButton({ playing, visible, compact = false, onClick, onKeyDown }: VideoPlayButtonProps) {
  const { layoutType } = useAdaptiveLayout();
  const { t } = siteMediaLocale.useTranslations();
  const Icon = playing ? PausePlayerSVG : PlayPlayerSVG;

  return (
    <button
      type='button'
      className={styles.surface}
      data-layout-type={layoutType}
      data-visible={visible}
      data-compact={compact}
      data-test-id={TEST_IDS.playButton}
      aria-label={playing ? t('pause') : t('play')}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <span className={styles.circle} aria-hidden>
        <Icon className={styles.icon} />
      </span>
    </button>
  );
}
