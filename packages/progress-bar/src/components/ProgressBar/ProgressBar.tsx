import { PROGRESS_BAR_SIZE } from '../../constants';
import { ProgressBarPrivate, type ProgressBarPrivateProps } from '../ProgressBarPrivate';

export type ProgressBarProps = Omit<ProgressBarPrivateProps, 'animationDuration'>;

export function ProgressBar({ size = PROGRESS_BAR_SIZE.XS, ...props }: ProgressBarProps) {
  return <ProgressBarPrivate {...props} size={size} animationDuration={0} />;
}
