import { VideoPlayerProps } from '../../types';

export type NativePlayerProps = {
  video: VideoPlayerProps;
  onFirstPlay?(): void;
  onError?(): void;
};
