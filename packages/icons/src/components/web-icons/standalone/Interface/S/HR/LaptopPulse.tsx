// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const LaptopPulseSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-laptop-pulse';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.24 10.5v6.26H8v-1.52H5.76V5.761l1.87-.011 1.87-.01V4.26l-2.63-.01-2.63-.011zm10.94-6.232a6.3 6.3 0 0 0-3.44 1.246 8 8 0 0 0-.594.522A6.16 6.16 0 0 0 9.281 9.94c-.024.258-.041 1.76-.041 3.63v3.19h3.19c1.87 0 3.372-.017 3.63-.041a6.5 6.5 0 0 0 2.113-.573c1.249-.58 2.393-1.724 2.973-2.973.882-1.898.783-4.049-.265-5.752-.588-.958-1.541-1.892-2.469-2.423-.906-.518-2.077-.783-3.232-.73m1.081 1.551c1.12.181 2.12.795 2.912 1.785.674.842 1.005 1.683 1.054 2.678a4.64 4.64 0 0 1-1.433 3.619c-.556.536-1.067.851-1.774 1.092-.7.24-.81.247-3.665.247H10.76v-2.57c0-2.786.013-2.995.224-3.627.251-.755.595-1.307 1.173-1.886.58-.579 1.13-.922 1.891-1.175.64-.213 1.509-.277 2.213-.163m-.078 4.107-1.754 1.922-.945-.944-.945-.944-.539.54-.539.54 1.5 1.501 1.5 1.5 2.28-2.5c1.253-1.374 2.279-2.513 2.279-2.53 0-.027-.856-.83-1.022-.959-.052-.041-.327.243-1.815 1.874M3 19v.76h18v-1.52H3z'
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
export default LaptopPulseSVG;
