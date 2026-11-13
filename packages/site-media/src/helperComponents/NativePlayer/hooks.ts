import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Player from 'video.js/dist/types/player';

import { TEST_IDS } from '../../constants';
import { usePlayerState } from '../../hooks/usePlayerState';
import styles from './styles.module.scss';
import { NativePlayerProps } from './types';
import { getVideoPlayerOptions, isPlaybackInterrupted } from './utils';

/** Жизненный цикл video.js: создание, готовность, события, повторная попытка и освобождение ресурсов. */
export function useVideoPlayer({ video, onFirstPlay, onError }: NativePlayerProps) {
  const { src, poster, autoPlay = false, muted = false, loop = false } = video;
  const mountRef = useRef<HTMLDivElement>(null);
  const pendingPlayRef = useRef(false);
  const firstPlayRef = useRef(false);
  const errorReportedRef = useRef(false);
  const callbacksRef = useRef({ onFirstPlay, onError });
  callbacksRef.current = { onFirstPlay, onError };

  const [player, setPlayer] = useState<Player | null>(null);
  const [hasError, setHasError] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const state = usePlayerState(player);
  const options = useMemo(
    () => getVideoPlayerOptions({ src, poster, autoPlay, muted, loop }),
    [src, poster, autoPlay, muted, loop],
  );

  const handlePlaybackError = useCallback((error: unknown) => {
    if (isPlaybackInterrupted(error) || errorReportedRef.current) return;
    errorReportedRef.current = true;
    setHasError(true);
    callbacksRef.current.onError?.();
  }, []);

  const handlePlay = useCallback(() => {
    setHasStarted(true);
    if (firstPlayRef.current) return;
    firstPlayRef.current = true;
    callbacksRef.current.onFirstPlay?.();
  }, []);

  const handleReady = useCallback(
    (instance: Player) => {
      setPlayer(instance);
      if (!pendingPlayRef.current) return;
      pendingPlayRef.current = false;
      instance.play()?.catch(handlePlaybackError);
    },
    [handlePlaybackError],
  );

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let instance: Player | undefined;
    let element: HTMLElement | undefined;
    errorReportedRef.current = false;
    setHasError(false);
    setHasStarted(false);
    setPlayer(null);

    const initializePlayer = async () => {
      const { default: videojs } = await import('video.js');
      if (disposed) return;

      element = mount.ownerDocument.createElement('video-js');
      element.className = styles.player;
      mount.appendChild(element);
      const createdPlayer = videojs(element, options);
      instance = createdPlayer;
      createdPlayer.on('play', handlePlay);
      createdPlayer.on('error', () => {
        handlePlaybackError(new Error('Media source error'));
      });
      createdPlayer.ready(() => {
        if (disposed) return;
        const media = mount.querySelector('video');
        media?.classList.add(styles.media);
        media?.setAttribute('data-test-id', TEST_IDS.nativeVideo);
        handleReady(createdPlayer);
      });
    };

    initializePlayer().catch(error => {
      if (!disposed) handlePlaybackError(error);
    });

    return () => {
      disposed = true;
      instance?.dispose();
      element?.remove();
    };
  }, [options, attempt, handlePlay, handleReady, handlePlaybackError]);

  const togglePlay = useCallback(() => {
    if (!player) {
      pendingPlayRef.current = true;
    } else if (player.paused()) {
      player.play()?.catch(handlePlaybackError);
    } else {
      player.pause();
    }
  }, [player, handlePlaybackError]);

  const retry = useCallback(() => {
    pendingPlayRef.current = true;
    setAttempt(value => value + 1);
  }, []);

  return { mountRef, player, state, hasError, hasStarted, togglePlay, retry, handlePlaybackError };
}
