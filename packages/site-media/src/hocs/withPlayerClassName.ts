import cn from 'classnames';
import { cloneElement, isValidElement, ReactNode } from 'react';

/** Добавляет класс прямым элементам video и iframe, сохраняя классы пользователя. */
export function withPlayerClassName(video: ReactNode, className: string): ReactNode {
  if (!isValidElement<{ className?: string }>(video) || (video.type !== 'video' && video.type !== 'iframe')) {
    return video;
  }

  return cloneElement(video, { className: cn(video.props.className, className) });
}
