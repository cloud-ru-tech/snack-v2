import { isValidElement } from 'react';

import { EmbedPlayer } from '../../helperComponents/EmbedPlayer';
import { NativePlayer } from '../../helperComponents/NativePlayer';
import { PlayerError } from '../../helperComponents/PlayerError';
import { withPlayerClassName } from '../../hocs/withPlayerClassName';
import { getEmbedSource, isVideoPlayerContent } from '../../utils';
import type { SiteVideoProps } from './SiteVideo';
import styles from './styles.module.scss';

type VideoContentProps = Pick<SiteVideoProps, 'video' | 'onPlay' | 'onError'>;

export function VideoContent({ video, onPlay, onError }: VideoContentProps) {
  if (isVideoPlayerContent(video)) {
    const embed = getEmbedSource(video.src);

    if (embed) {
      return <EmbedPlayer key={video.src} video={video} source={embed} onFirstPlay={onPlay} onError={onError} />;
    }

    return <NativePlayer key={video.src} video={video} onFirstPlay={onPlay} onError={onError} />;
  }

  if (isValidElement(video)) {
    return withPlayerClassName(video, styles.customPlayer);
  }

  return <PlayerError />;
}
