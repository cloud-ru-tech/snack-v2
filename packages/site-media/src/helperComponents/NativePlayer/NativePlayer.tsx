import { KeyboardEvent, MouseEvent, PointerEvent, useEffect, useRef, useState } from 'react';

import { DOUBLE_CLICK_DELAY, SEEK_STEP, TEST_IDS, TOOLBAR_HIDE_DELAY } from '../../constants';
import { useFullscreen } from '../../hooks/useFullscreen';
import { useSpriteFrames } from '../../hooks/useSpriteFrames';
import { siteMediaLocale } from '../../locale';
import { PlayerError } from '../PlayerError';
import { Toolbar } from '../Toolbar';
import { VideoPlayButton } from '../VideoPlayButton';
import { useVideoPlayer } from './hooks';
import styles from './styles.module.scss';
import { NativePlayerProps } from './types';

export function NativePlayer({ video, onFirstPlay, onError }: NativePlayerProps) {
  const { src, poster, controls = true } = video;
  const { t } = siteMediaLocale.useTranslations();

  const rootRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const pointerTypeRef = useRef('mouse');

  const [isPointerActive, setIsPointerActive] = useState(false);

  const { mountRef, player, state, hasError, hasStarted, togglePlay, retry, handlePlaybackError } = useVideoPlayer({
    video,
    onFirstPlay,
    onError,
  });

  const frames = useSpriteFrames(src, controls);
  const { isFullscreen, toggleFullscreen } = useFullscreen(rootRef, player);

  useEffect(
    () => () => {
      clearTimeout(clickTimeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
    },
    [],
  );

  const showToolbar = () => {
    setIsPointerActive(true);
    clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setIsPointerActive(false);
    }, TOOLBAR_HIDE_DELAY);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) {
      togglePlay();
      return;
    }

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = undefined;
      toggleFullscreen();
      return;
    }

    const revealOnly = pointerTypeRef.current !== 'mouse' && state.isPlaying && !isPointerActive;

    clickTimeoutRef.current = setTimeout(() => {
      clickTimeoutRef.current = undefined;

      if (revealOnly) {
        showToolbar();
      } else {
        togglePlay();
      }
    }, DOUBLE_CLICK_DELAY);
  };

  const handlePointerActivity = (event: PointerEvent<HTMLDivElement>) => {
    pointerTypeRef.current = event.pointerType;

    if (event.pointerType === 'mouse' || isPointerActive) {
      showToolbar();
    }
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') {
      setIsPointerActive(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!player) {
      return;
    }

    switch (event.key.toLowerCase()) {
      case 'k':
        togglePlay();
        break;
      case 'arrowleft':
        player.currentTime(Math.max(0, state.currentTime - SEEK_STEP));
        break;
      case 'arrowright':
        player.currentTime(
          state.duration ? Math.min(state.duration, state.currentTime + SEEK_STEP) : state.currentTime,
        );
        break;
      case 'm':
        player.muted(!player.muted());
        break;
      case 'f':
        toggleFullscreen();
        break;
      default:
        return;
    }

    event.preventDefault();
  };

  const visible = !state.isPlaying || isPointerActive;

  return (
    <div
      ref={rootRef}
      className={styles.root}
      role='region'
      aria-label={t('player')}
      aria-busy={!player && !hasError}
      data-test-id={TEST_IDS.player}
      data-playing={state.isPlaying}
      onPointerDown={handlePointerActivity}
      onPointerMove={handlePointerActivity}
      onPointerLeave={handlePointerLeave}
      onContextMenu={event => {
        event.preventDefault();
      }}
    >
      <div ref={mountRef} className={styles.mount} data-test-id={TEST_IDS.mount} />
      {!hasStarted && poster && <img className={styles.poster} src={poster} alt='' data-test-id={TEST_IDS.poster} />}
      {hasError ? (
        <PlayerError onRetry={retry} />
      ) : (
        controls && (
          <>
            <VideoPlayButton
              playing={state.isPlaying}
              visible={visible}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
            />
            {player && hasStarted && (
              <Toolbar
                player={player}
                state={state}
                frames={frames}
                visible={visible}
                fullscreen={isFullscreen}
                onTogglePlay={togglePlay}
                onToggleFullscreen={toggleFullscreen}
                onPlaybackError={handlePlaybackError}
              />
            )}
          </>
        )
      )}
    </div>
  );
}
