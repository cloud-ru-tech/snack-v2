// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const RubleSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-ruble';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.47 4.47 3.24 5.7v12.6l1.23 1.23 1.23 1.23h12.6l1.23-1.23 1.23-1.23V5.7l-1.23-1.23-1.23-1.23H5.7zm14 1.06.77.769v11.4l-.77.771-.769.77H6.299l-.769-.77-.77-.771V6.301l.77-.771.769-.77h11.4zM9.24 9.237v2.003H8v1.52h1.24v1.48H8v1.52h1.24V17h1.52v-1.24H14v-1.52h-3.24v-1.48h1.27c1.266-.001 1.606-.026 1.962-.146.411-.138.63-.276.973-.614.558-.551.771-1.103.771-2 0-.578-.067-.896-.286-1.36-.206-.437-.667-.89-1.13-1.111a4 4 0 0 0-.54-.211c-.14-.034-.855-.054-2.37-.067l-2.17-.018zm4.42-.371c.199.108.344.261.465.494.083.159.094.235.094.64s-.011.481-.094.64a1.1 1.1 0 0 1-.465.494c-.154.083-.215.086-1.53.098l-1.37.012V8.756l1.37.012c1.315.012 1.376.015 1.53.098'
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
export default RubleSVG;
