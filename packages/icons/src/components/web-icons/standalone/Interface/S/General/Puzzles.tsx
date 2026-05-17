// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const PuzzlesSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-puzzles';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M3.24 12v8.76h17.52V3.24H3.24zm8-6.144v1.095l-.148.028c-.384.072-.772.395-.954.794-.138.302-.146.7-.021 1.032.146.387.559.746.952.827l.151.032.011.788.011.788H4.76V4.76h6.48zm8 2.145v3.241l-.788-.011-.788-.011-.032-.151c-.075-.361-.38-.737-.742-.915-.161-.08-.251-.094-.59-.094-.356.001-.422.013-.6.107-.357.19-.655.572-.721.925l-.028.148H12.76V4.76h6.48zM6.979 12.908c.041.219.168.45.355.645a1.34 1.34 0 0 0 1.913.038c.204-.199.337-.426.385-.66l.032-.151.788-.011.788-.011v6.482H4.76v-6.48h2.191zM19.24 16v3.24h-6.482l.011-.788.011-.788.151-.032c.359-.074.768-.406.918-.744a1.44 1.44 0 0 0-.027-1.202c-.174-.339-.564-.641-.914-.707l-.148-.028V12.76h6.48z' />
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
export default PuzzlesSVG;
