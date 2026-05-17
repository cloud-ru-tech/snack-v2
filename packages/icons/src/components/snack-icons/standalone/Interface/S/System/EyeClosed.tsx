// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const EyeClosedSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-eye-closed';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m2.98 3-.519.52L4.08 5.142 5.7 6.764l-.1.082-1.73 1.447-1.63 1.365v4.689l3.248 2.707 3.248 2.706h6.533l.905-.78c.498-.429.919-.78.936-.78s.777.747 1.69 1.66l1.659 1.66.531-.53.531-.529-8.991-8.991C7.586 6.526 3.531 2.48 3.519 2.48s-.254.234-.539.52M9 5v.76l2.87.001h2.87l2.749 2.29 2.749 2.289.001 1.661.001 1.661-.599.499c-.329.274-.599.513-.6.531s.209.282.466.588c.463.551.467.555.555.486.049-.039.451-.375.893-.747l.805-.677V9.66l-3.25-2.71-3.25-2.709h-3.13L9 4.24zM7.636 8.696l.856.856-.122.198q-.553.899-.598 2.07c-.043 1.126.249 2.051.908 2.873.588.734 1.389 1.228 2.359 1.456.427.101 1.499.1 1.931-.002a5 5 0 0 0 1.241-.487l.244-.145.797.797.797.798-.654.564-.655.564-2.742.001-2.742.001-2.748-2.29-2.748-2.289V10.34l1.49-1.249a85 85 0 0 1 1.51-1.25c.012 0 .406.384.876.855m3.858 3.858 1.873 1.873-.194.083c-.423.181-.656.226-1.173.227-.41 0-.554-.016-.8-.092a2.6 2.6 0 0 1-1.164-.686 2.67 2.67 0 0 1-.701-1.239c-.086-.346-.087-1.059-.001-1.392.072-.276.221-.648.261-.648.014 0 .868.843 1.899 1.874'
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
export default EyeClosedSVG;
