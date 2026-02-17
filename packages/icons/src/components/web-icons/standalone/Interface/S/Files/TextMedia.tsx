// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const TextMediaSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-text-media';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 10.789v7.674l4.21 1.111c2.316.612 4.245 1.115 4.287 1.119.065.006.092-.045.16-.303.045-.17.091-.31.103-.31.012 0 .058.14.103.31.068.258.095.309.16.303.042-.004 1.971-.507 4.287-1.119l4.21-1.111v-7.674c0-7.29-.004-7.673-.07-7.654-.038.011-2.01.312-4.38.668L12 4.452l-4.31-.649a522.231 522.231 0 0 1-4.38-.668c-.066-.019-.07.364-.07 7.654M7.965 5.36c1.746.264 3.197.48 3.225.48.04 0 .05 1.343.05 6.58 0 5.086-.011 6.58-.048 6.58-.042 0-5.884-1.534-6.282-1.649l-.15-.044v-6.213c0-3.418.007-6.214.015-6.214s1.443.216 3.19.48m11.275 5.735v6.214l-.23.064c-.787.216-6.165 1.627-6.203 1.627-.036 0-.047-1.604-.047-6.573V5.854l1.15-.173 3.17-.483c1.111-.17 2.052-.311 2.09-.314.066-.004.07.317.07 6.211M6 8.199c-.097.395-.168.725-.158.734.032.027 3.96.998 3.974.982.033-.04.351-1.401.332-1.421a69.525 69.525 0 0 0-1.996-.517l-1.974-.496s-.081.322-.178.718m9.24 4.031v2.309l1.16-1.159 1.16-1.159-1.15-1.151a91.56 91.56 0 0 0-1.16-1.15c-.005 0-.01 1.039-.01 2.31m-9.236-.527c-.098.393-.159.717-.139.734.037.033 3.939 1.014 3.955.994.026-.033.354-1.43.338-1.443-.02-.018-3.899-.988-3.949-.988-.017 0-.11.316-.205.703m.178 2.814a21.436 21.436 0 0 0-.342 1.376c0 .042.518.187 1.94.542 1.067.267 1.963.485 1.991.485.054 0 .419-1.383.376-1.426-.042-.042-3.948-1.005-3.965-.977'
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
export default TextMediaSVG;
