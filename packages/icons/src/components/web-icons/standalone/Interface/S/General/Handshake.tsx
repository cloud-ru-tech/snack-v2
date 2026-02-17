// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const HandshakeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-handshake';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M9.747 6.19 7.24 8.14v3.62h3.492l.828-.62c.455-.341.844-.62.864-.62.02 0 1.269 1.233 2.776 2.74L17.939 16l-.719.72-.719.72-1.991-1.99-1.99-1.99-.53.53-.53.53 1.99 1.99 1.991 1.991-.371.369-.372.37h-.878l-1.89-1.89-1.89-1.889L9.5 16l-.54.539 1.35 1.351 1.35 1.35H9.275l-2.248-1.999-2.247-1.999-.51-.001-.51-.001V8.76H5V7.24H2.24v9.52H4.225l2.25 2 2.25 2H15.3l2.38-2.38L20.06 16l-3.745-3.745-3.744-3.744-1.152.865-1.152.864H8.76V8.86l1.99-1.549 1.99-1.549 1.755-.001 1.755-.001 1.25 1 1.25 1h1.49V14h1.52V6.24h-2.51l-1.25-1-1.25-1h-4.496z'
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
export default HandshakeSVG;
