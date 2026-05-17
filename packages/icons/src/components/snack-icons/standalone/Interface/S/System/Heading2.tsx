// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const Heading2SVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-heading2';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.24 12v7h1.52v-6.24h6.48V19h1.52V5h-1.52v6.24H6.76V5H5.24zm12.56.282c-.31.042-.67.161-.902.297-.254.149-.527.474-.598.712-.098.331-.148.309.697.309h.757l-.034.12c-.033.116-.031.119.073.09.059-.016.26-.03.447-.03.282 0 .364.015.483.089a.483.483 0 0 1 .141.71c-.053.069-.382.323-.73.563-.849.586-1.334 1.062-1.567 1.538-.206.421-.297.77-.303 1.16-.005.384.103.599.393.778l.197.122 1.573.012 1.573.011V17.24h-1c-.56 0-1-.016-1-.036 0-.07.473-.472.892-.757.931-.633 1.287-.992 1.469-1.478.18-.482.142-1.085-.102-1.594-.376-.783-1.4-1.239-2.459-1.093'
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
export default Heading2SVG;
