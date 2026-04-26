import { useNProgress } from '@tanem/react-nprogress';
import cn from 'classnames';

import { ProgressBarPrivate, type ProgressBarPrivateProps } from '../ProgressBarPrivate';
import styles from './styles.module.scss';

export type ProgressBarPageProps = Omit<ProgressBarPrivateProps, 'size' | 'progress'> & {
  /** Включен/выключен */
  inProgress: boolean;
  /** Время между прогрессом */
  incrementDuration?: number;
  /** Минимальное значение прогресс бара от 0 до 1 */
  minimum?: number;
};

export function ProgressBarPage({
  inProgress,
  animationDuration = 200,
  incrementDuration = 800,
  minimum,
  ...props
}: ProgressBarPageProps) {
  const {
    progress,
    isFinished,
    animationDuration: animation,
  } = useNProgress({
    animationDuration,
    incrementDuration,
    isAnimating: inProgress,
    minimum,
  });

  if (isFinished) {
    return null;
  }

  return (
    <ProgressBarPrivate
      {...props}
      size='xs'
      progress={progress * 100}
      animationDuration={animation}
      className={cn(styles.progressBarPageContainer, props.className)}
    />
  );
}
