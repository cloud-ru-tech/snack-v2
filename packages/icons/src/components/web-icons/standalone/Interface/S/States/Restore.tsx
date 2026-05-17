// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const RestoreSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-restore';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.04 3.806a8.8 8.8 0 0 0-5.134 2.39q-1.695 1.637-2.323 3.817a8.51 8.51 0 0 0 1.409 7.507c.314.415 1.024 1.138 1.541 1.571l.434.361-.893.894-.893.894H9.76v-4.579l-.87.866-.87.867-.5-.431c-1.161-1.001-1.781-1.823-2.257-2.989-.549-1.347-.653-2.92-.287-4.365.188-.744.611-1.643 1.095-2.329.319-.451 1.061-1.212 1.509-1.546 1.316-.983 2.759-1.459 4.42-1.459s3.104.476 4.42 1.459c.446.332 1.189 1.093 1.511 1.546.308.434.815 1.428.967 1.896.485 1.493.447 3.269-.099 4.648-1.07 2.701-3.46 4.43-6.409 4.636l-.39.027v1.473l.35-.001c1.055-.002 2.421-.347 3.55-.897a8.75 8.75 0 0 0 4-4.002 8.47 8.47 0 0 0 .517-6.047c-.974-3.382-3.978-5.86-7.531-6.212a11.5 11.5 0 0 0-1.846.005m.2 6.187v2.674l1.959 1.926c1.077 1.06 1.976 1.927 1.996 1.927s.262-.234.537-.521l.499-.521-1.226-1.209a617 617 0 0 0-1.735-1.707l-.51-.498V7.32h-1.52z'
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
export default RestoreSVG;
