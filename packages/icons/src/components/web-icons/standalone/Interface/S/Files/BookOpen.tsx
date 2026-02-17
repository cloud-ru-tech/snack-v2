// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BookOpenSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-book-open';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M6.24 9.548v6.872l2.665 1.6c1.466.88 2.677 1.605 2.691 1.61.014.006.106-.125.204-.29.098-.165.188-.3.2-.3.012 0 .102.135.2.3.098.165.19.296.204.29.014-.005 1.225-.73 2.691-1.61l2.665-1.6V9.548c0-3.78-.014-6.865-.03-6.856-.017.009-1.312.785-2.88 1.724L12 6.124 9.15 4.416c-1.567-.939-2.863-1.715-2.88-1.724-.016-.009-.03 3.076-.03 6.856M9.523 6.39l1.717 1.03v5.11c0 2.81-.011 5.11-.023 5.11-.013 0-.796-.463-1.74-1.03L7.76 15.58v-5.11c0-2.81.011-5.11.023-5.11.013 0 .796.463 1.74 1.03m6.717 4.08v5.11l-1.717 1.03a83.375 83.375 0 0 1-1.74 1.03c-.012 0-.023-2.3-.023-5.11V7.42l1.71-1.028a76.127 76.127 0 0 1 1.74-1.03c.017-.001.03 2.298.03 5.108m-13 2.91v6.38H7v-1.52H4.76V7H3.24zm16-.76v5.62H17v1.52h3.76V7h-1.52z'
      />
    </svg>
  ).props.children;
  const style = isCustomSize
    ? {
        ...(props.style || {}),
        width: sizePx,
        height: sizePx,
      }
    : props.style;
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={sizePx}
      height={sizePx}
      fill='currentColor'
      viewBox='0 0 24 24'
      data-test-id={'icon' + testId}
      style={style}
      {...props}
    >
      {children}
    </svg>
  );
});
export default BookOpenSVG;
