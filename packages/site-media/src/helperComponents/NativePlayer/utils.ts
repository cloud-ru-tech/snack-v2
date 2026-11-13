import { VideoPlayerProps } from '../../types';
import { getSourceType } from '../../utils';

/** Управление рисует DS; video.js отвечает за загрузку и воспроизведение медиа. */
export function getVideoPlayerOptions({
  src,
  poster,
  autoPlay = false,
  muted = false,
  loop = false,
}: VideoPlayerProps) {
  return {
    sources: [{ src, type: getSourceType(src) }],
    poster,
    autoplay: autoPlay,
    muted: muted || autoPlay,
    loop,
    preload: autoPlay ? 'auto' : 'metadata',
    playsinline: true,
    fill: true,
    controls: false,
    children: ['mediaLoader', 'liveTracker'],
  };
}

/** Запрет autoplay и отмена запроса не делают источник недоступным. */
export function isPlaybackInterrupted(error: unknown) {
  return error instanceof Error && (error.name === 'NotAllowedError' || error.name === 'AbortError');
}
