import { RepeatSVG } from '@ds/icons/interface/product';
import {
  FullScreenSVG,
  NormalScreenSVG,
  PausePlayerSVG,
  PlayPlayerSVG,
  RewindAheadSVG,
  RewindSVG,
  SoundOffSVG,
  SoundOnSVG,
} from '@ds/icons/interface/web';
import { Slider } from '@ds/slider';
import { Typography } from '@ds/typography';

import { SEEK_STEP, TEST_IDS } from '../../constants';
import { siteMediaLocale } from '../../locale';
import { formatTime } from '../../utils';
import { SpeedSelect } from '../SpeedSelect';
import styles from './styles.module.scss';
import type { ToolbarProps } from './Toolbar';
import { ToolbarButton } from './ToolbarButton';
import { restart, seek, setVolume, toggleMute } from './utils';

type PlaybackControlsProps = Omit<ToolbarProps, 'frames' | 'visible'> & { compact: boolean };

export function PlaybackControls({
  player,
  state,
  compact,
  fullscreen,
  onTogglePlay,
  onToggleFullscreen,
  onPlaybackError,
}: PlaybackControlsProps) {
  const { t } = siteMediaLocale.useTranslations();
  const { isPlaying, isMuted, volume, currentTime, duration, rate } = state;

  return (
    <div className={styles.controls}>
      <ToolbarButton
        label={isPlaying ? t('pause') : t('play')}
        showTooltip
        icon={isPlaying ? <PausePlayerSVG /> : <PlayPlayerSVG />}
        onClick={onTogglePlay}
        testId={TEST_IDS.play}
      />
      <ToolbarButton
        label={isMuted ? t('unmute') : t('mute')}
        showTooltip
        icon={isMuted ? <SoundOffSVG /> : <SoundOnSVG />}
        onClick={() => toggleMute(player, isMuted, volume)}
        testId={TEST_IDS.mute}
      />
      {!compact && (
        <>
          <div className={styles.volume} data-test-id={TEST_IDS.volume}>
            <Slider
              value={isMuted ? 0 : volume}
              min={0}
              max={100}
              step={1}
              onChange={value => setVolume(player, value)}
              ariaLabelForHandle={t('volume')}
            />
          </div>
          <ToolbarButton
            label={t('rewind')}
            icon={<RewindSVG />}
            onClick={() => seek(player, currentTime, duration, -SEEK_STEP)}
            testId={TEST_IDS.rewind}
          />
        </>
      )}
      <Typography as='span' variant='label' size='s' className={styles.time} data-test-id={TEST_IDS.time}>
        {formatTime(currentTime) + ' / ' + formatTime(duration)}
      </Typography>
      {!compact && (
        <>
          <ToolbarButton
            label={t('forward')}
            icon={<RewindAheadSVG />}
            onClick={() => seek(player, currentTime, duration, SEEK_STEP)}
            testId={TEST_IDS.forward}
          />
          <ToolbarButton
            label={t('restart')}
            icon={<RepeatSVG />}
            onClick={() => restart(player, onPlaybackError)}
            testId={TEST_IDS.restart}
          />
        </>
      )}
      <span className={styles.spacer} />
      <SpeedSelect player={player} rate={rate} />
      <ToolbarButton
        label={fullscreen ? t('exitFullscreen') : t('enterFullscreen')}
        showTooltip
        icon={fullscreen ? <NormalScreenSVG /> : <FullScreenSVG />}
        onClick={onToggleFullscreen}
        testId={TEST_IDS.fullscreen}
      />
    </div>
  );
}
