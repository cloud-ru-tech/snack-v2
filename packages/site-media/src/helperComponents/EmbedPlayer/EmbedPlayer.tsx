import { useEffect, useRef, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { siteMediaLocale } from '../../locale';
import { VideoPlayerProps } from '../../types';
import { EmbedSource, getEmbedPlaying, parseEmbedMessage } from '../../utils';
import { PlayerError } from '../PlayerError';
import { VideoPlayButton } from '../VideoPlayButton';
import styles from './styles.module.scss';

type EmbedPlayerProps = {
  source: EmbedSource;
  video: VideoPlayerProps;
  onFirstPlay?(): void;
  onError?(): void;
};

export function EmbedPlayer({ source, video, onFirstPlay, onError }: EmbedPlayerProps) {
  const { t } = siteMediaLocale.useTranslations();
  const { controls = true, autoPlay = false, poster, muted = false, loop = false } = video;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const firstPlayRef = useRef(false);
  const callbacksRef = useRef({ onFirstPlay, onError });
  callbacksRef.current = { onFirstPlay, onError };

  const [activated, setActivated] = useState(autoPlay || !controls);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [pageOrigin, setPageOrigin] = useState<string>();

  useEffect(() => {
    setPageOrigin(window.location.origin);
  }, []);

  const url = new URL(source.src);
  url.searchParams.set('autoplay', activated && (controls || autoPlay) ? '1' : '0');
  url.searchParams.set('controls', controls ? '1' : '0');

  if (muted || autoPlay) {
    url.searchParams.set('mute', '1');
  }

  if (loop) {
    url.searchParams.set('loop', '1');

    if (source.provider === 'youtube') {
      url.searchParams.set('playlist', url.pathname.split('/').pop() ?? '');
    }
  }

  if (pageOrigin) {
    url.searchParams.set('origin', pageOrigin);
  }

  const origin = url.origin;

  useEffect(() => {
    const handleMessage = (event: MessageEvent<unknown>) => {
      if (event.source !== iframeRef.current?.contentWindow || event.origin !== origin) {
        return;
      }

      const message = parseEmbedMessage(event.data);

      if (!message) {
        return;
      }

      if (message.event === 'onError' || message.type === 'player:error') {
        setFailed(true);
        callbacksRef.current.onError?.();
      }

      const nextPlaying = getEmbedPlaying(source.provider, message);

      if (nextPlaying !== undefined) {
        setPlaying(nextPlaying);

        if (nextPlaying && !firstPlayRef.current) {
          firstPlayRef.current = true;
          callbacksRef.current.onFirstPlay?.();
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [source.provider, origin]);

  const handleLoad = () => {
    const target = iframeRef.current?.contentWindow;

    if (source.provider === 'youtube') {
      target?.postMessage(JSON.stringify({ event: 'listening' }), origin);
      target?.postMessage(
        JSON.stringify({ event: 'command', func: 'addEventListener', args: ['onStateChange'] }),
        origin,
      );
      target?.postMessage(JSON.stringify({ event: 'command', func: 'addEventListener', args: ['onError'] }), origin);
    }
  };

  const handleToggle = () => {
    if (!activated) {
      setActivated(true);
      return;
    }

    const command =
      source.provider === 'youtube'
        ? { event: 'command', func: playing ? 'pauseVideo' : 'playVideo', args: [] }
        : { type: playing ? 'player:pause' : 'player:play', data: {} };

    iframeRef.current?.contentWindow?.postMessage(JSON.stringify(command), origin);
  };

  const handleError = () => {
    setFailed(true);
    callbacksRef.current.onError?.();
  };

  const handleRetry = () => {
    setFailed(false);
    setPlaying(false);
    setAttempt(value => value + 1);
  };

  const handlePointerEnter = () => {
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className={styles.root}
      data-test-id={TEST_IDS.player}
      data-playing={playing}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {activated && (
        <iframe
          key={attempt}
          ref={iframeRef}
          className={styles.iframe}
          title={t('player')}
          src={url.href}
          allow='autoplay; encrypted-media; picture-in-picture; fullscreen'
          allowFullScreen
          data-test-id={TEST_IDS.embed}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      {!activated && poster && <img className={styles.poster} src={poster} alt='' data-test-id={TEST_IDS.poster} />}
      {failed ? (
        <PlayerError onRetry={handleRetry} />
      ) : (
        controls && (
          <VideoPlayButton
            compact={activated}
            playing={playing}
            visible={!activated || !playing || hovered}
            onClick={handleToggle}
          />
        )
      )}
    </div>
  );
}
