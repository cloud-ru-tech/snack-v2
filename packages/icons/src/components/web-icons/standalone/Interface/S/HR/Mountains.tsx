// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MountainsSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-mountains';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.76 6.681v3.441l-.803 1.243c-.441.684-.797 1.247-.79 1.253.135.104 1.185.755 1.223.758.029.002.29-.363.581-.813.291-.449.547-.818.568-.82.028-.002 4.426 5.953 6.311 8.545.045.062.109.025.64-.369.325-.241.589-.452.589-.469-.001-.016-1.54-2.126-3.42-4.688l-3.419-4.658V8.76l3.377-.01 3.378-.01-1.019-1.358c-.56-.747-1.01-1.381-.999-1.408a171.49 171.49 0 0 1 1.994-2.684c.031-.04-.792-.05-4.086-.05H11.76zm5.2-1.9c0 .012-.19.273-.421.581a10.3 10.3 0 0 0-.442.611c-.011.028.179.315.422.638.242.323.441.597.441.608 0 .012-.837.021-1.86.021h-1.86V4.76h1.86c1.023 0 1.86.01 1.86.021M5.483 15.899c-1.41 1.99-2.563 3.635-2.563 3.656 0 .02.212.185.47.368.259.182.526.373.594.424l.124.093 1.969-2.78c1.083-1.529 1.983-2.78 1.999-2.78.016 0 .909 1.224 1.984 2.72 1.075 1.496 1.966 2.72 1.981 2.72.068 0 1.178-.834 1.168-.878-.015-.066-5.101-7.157-5.136-7.16-.014-.001-1.18 1.626-2.59 3.617'
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
export default MountainsSVG;
