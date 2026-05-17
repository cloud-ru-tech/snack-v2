// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DaySVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-day';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m11.249 4.25.011 1.25h1.48l.011-1.25.01-1.25h-1.522zM5.62 5.64l-.519.52.929.93.93.93.53-.53.529-.53-.919-.92c-.506-.506-.929-.92-.94-.92a10 10 0 0 0-.54.52m11.28.4-.919.92.529.53.53.53.93-.93.929-.93-.519-.52a10 10 0 0 0-.54-.52c-.011 0-.434.414-.94.92m-5.356 1.243c-1.944.172-3.617 1.589-4.127 3.496a4.74 4.74 0 0 0 .617 3.821c.286.441.925 1.08 1.366 1.366a4.73 4.73 0 0 0 5.2 0c.441-.286 1.08-.925 1.366-1.366 1.211-1.871.99-4.275-.541-5.871a4.63 4.63 0 0 0-3.029-1.448 9 9 0 0 0-.476-.035c-.011.003-.18.019-.376.037m1.37 1.595c.508.146.893.372 1.321.78.446.425.733.89.894 1.45.129.45.129 1.334 0 1.784-.167.582-.458 1.042-.941 1.492-.633.588-1.319.856-2.188.856s-1.555-.268-2.188-.856c-.483-.45-.774-.91-.941-1.492-.129-.45-.129-1.334 0-1.784.152-.53.375-.91.787-1.343a3.1 3.1 0 0 1 1.775-.967c.321-.058 1.152-.013 1.481.08M3 12v.761l1.25-.01 1.25-.011v-1.48l-1.25-.011-1.25-.01zm15.498-.709c-.011.029-.015.366-.009.75l.011.699 1.25.011 1.25.01V11.24h-1.241c-.974 0-1.246.011-1.261.051M6.04 16.9l-.939.94.529.53.53.53.94-.94.94-.941-.53-.529-.531-.53zm10.45-.41-.53.531.94.939.94.939.53-.529.53-.53-.94-.94-.941-.94zm-5.25 3.27V21h1.52v-2.48h-1.52z'
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
export default DaySVG;
