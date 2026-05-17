// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BugSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-bug';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m5.25 4.93.01 1.93 1.48 1.235 1.48 1.236.011.454.012.455H3.24V14h1.52v-2.24h3.48v.94l-1.5 1.5-1.5 1.5V21h1.52v-4.701l.74-.739.74-.739v.479l1.23 1.23 1.23 1.23h2.6l1.23-1.23 1.23-1.23v-.479l.74.739.74.739V21h1.52v-5.3l-1.5-1.5-1.5-1.5v-.94h3.48V14h1.52v-3.76h-5.003l.012-.455.011-.454 1.48-1.236 1.48-1.235.01-1.93.011-1.93H17.24v3.159l-1.23 1.026-1.23 1.026-.023-1.096c-.026-1.201-.053-1.368-.285-1.805a2.1 2.1 0 0 0-.401-.49c-.516-.478-1.07-.612-2.351-.568-.725.025-1.001.08-1.357.27-.489.261-.798.63-.989 1.182-.106.306-.11.35-.132 1.411L9.22 8.211 7.99 7.185 6.76 6.159V3H5.239zm7.721.921c.242.158.248.189.261 1.337l.013 1.052H10.76v-.987c0-.914.006-1 .082-1.157a.5.5 0 0 1 .25-.254c.157-.08.22-.084.97-.074.686.01.817.022.909.083m1.269 6.379v2.469l-.77.771-.769.77h-1.402l-.769-.77-.77-.771V9.76h4.48z'
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
export default BugSVG;
