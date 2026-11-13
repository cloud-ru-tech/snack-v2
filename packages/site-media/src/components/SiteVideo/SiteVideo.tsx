import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import { VideoPlayerProps } from '../../types';
import styles from './styles.module.scss';
import { VideoContent } from './VideoContent';

export type SiteVideoProps = WithSupportProps<{
  /** Параметры видео (src, обложка, управление) или React-элемент собственного плеера. */
  video: VideoPlayerProps | ReactNode;
  /** Вызывается один раз при начале воспроизведения. При смене src может вызваться снова. */
  onPlay?(): void;
  /** Вызывается при ошибке загрузки или воспроизведения видео. */
  onError?(): void;
  /** CSS-класс обёртки плеера. */
  className?: string;
}>;

/** Воспроизводит MP4 и HLS со своей панелью управления, а YouTube и Rutube — во встроенном плеере провайдера. */
export function SiteVideo({ video, onPlay, onError, className, ...rest }: SiteVideoProps) {
  return (
    <div className={cn(styles.videoWrapper, className)} data-test-id={TEST_IDS.root} {...extractSupportProps(rest)}>
      <VideoContent video={video} onPlay={onPlay} onError={onError} />
    </div>
  );
}
