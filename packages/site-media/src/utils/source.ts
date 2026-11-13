import { SiteVideoProps } from '../components';
import { VideoPlayerProps } from '../types';

const HLS_REGEXP = /\.m3u8(?:$|[?#])/i;

export function isHlsLink(link: string) {
  return HLS_REGEXP.test(link);
}

export function getSourceType(link: string) {
  return isHlsLink(link) ? 'application/x-mpegURL' : 'video/mp4';
}

export function isVideoPlayerContent(video: SiteVideoProps['video']): video is VideoPlayerProps {
  return (
    typeof video === 'object' &&
    video !== null &&
    video !== undefined &&
    'src' in video &&
    typeof video.src === 'string'
  );
}
