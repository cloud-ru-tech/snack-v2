import { PROGRESS_BAR_SIZE } from '../../constants';
import { ProgressBarPrivate, ProgressBarPrivateProps } from '../ProgressBarPrivate';

export type ProgressBarProps = Omit<ProgressBarPrivateProps, 'animationDuration'>;

export function ProgressBar({ size = PROGRESS_BAR_SIZE.S, ...props }: ProgressBarProps) {
  return <ProgressBarPrivate {...props} size={size} animationDuration={0} />;
}
