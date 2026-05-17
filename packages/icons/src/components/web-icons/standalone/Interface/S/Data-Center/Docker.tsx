// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DockerSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-docker';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.24 6.24v2H3.234l.017 2.87c.017 3.038.021 3.112.223 4.032.68 3.096 3.004 5.207 6.146 5.58.46.054 1.521.024 2.18-.063 1.729-.229 3.206-.829 4.588-1.865.471-.353 1.333-1.204 1.695-1.674.752-.973 1.258-1.963 1.507-2.945l.105-.415H22v-1.52h-2.24V10h-1.52v2.24h-1.48v-8H7.24zm4 .76v1.24H8.76V5.76h2.48zm4 0v1.24h-2.48V5.76h2.48zm-8 4v1.24H4.76V9.76h2.48zm4 0v1.24H8.76V9.76h2.48zm4 0v1.24h-2.48V9.76h2.48zm2.854 2.97c-.312 1.062-1.113 2.293-2.04 3.136a8 8 0 0 1-4.094 2.014c-.719.126-1.956.156-2.525.061-2.028-.337-3.655-1.715-4.295-3.635a7.5 7.5 0 0 1-.325-1.497l-.026-.289h13.367z'
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
export default DockerSVG;
