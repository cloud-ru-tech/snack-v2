// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CheckListSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-check-list';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M6.55 5.2c-.522.418-.962.76-.979.76-.016 0-.255-.225-.531-.5l-.501-.5L4 5.5l-.539.54.986.987.986.986 1.518-1.214L8.47 5.585l-.459-.572c-.253-.315-.471-.573-.485-.573s-.453.342-.976.76M10 6.48v.76h11V5.72H10zm-3.404 4.665-.988.788c-.04.031-.177-.083-.561-.466l-.508-.507-.529.53-.53.531.97.969c.534.534.984.97 1.001.97.045 0 2.989-2.363 2.989-2.399 0-.022-.807-1.058-.898-1.152-.006-.006-.432.325-.946.736M10 12v.76h11v-1.52H10zm-5 6v.762l.75-.011.75-.011v-1.48l-.75-.011-.75-.011zm5 0v.76h11v-1.52H10z'
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
export default CheckListSVG;
