// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CarSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-car';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 6.62V9h1.52V5.76l3.449.01 3.449.01 2.131 2.711a278 278 0 0 1 2.131 2.73c0 .011-2.853.019-6.34.019H3.24v7.52h2.14l.075.184c.155.375.65.885 1.045 1.077a2.38 2.38 0 0 0 2 0c.395-.192.89-.702 1.045-1.077l.075-.184h4.76l.075.184c.155.375.65.885 1.045 1.077a2.38 2.38 0 0 0 2 0c.395-.192.89-.702 1.045-1.077l.075-.184h2.14v-7.52h-2.903l-2.75-3.5-2.75-3.5H3.24zm16 8.38v2.24h-.62l-.077-.187c-.163-.397-.589-.827-1.043-1.054a2.16 2.16 0 0 0-2 0c-.454.227-.88.657-1.043 1.054l-.077.187H9.62l-.077-.187c-.082-.199-.328-.522-.573-.753-.194-.183-.731-.45-1.005-.5a2.25 2.25 0 0 0-1.465.199c-.454.227-.88.657-1.043 1.054l-.077.187h-.62v-4.48h14.48zm-11.4 2.342c.137.07.306.255.357.391a.75.75 0 0 1-.15.762c-.131.141-.386.263-.547.263-.259 0-.604-.242-.697-.491a.86.86 0 0 1 .011-.559c.067-.16.31-.379.457-.411.06-.013.127-.03.149-.037.065-.022.312.027.42.082m9 0c.137.07.306.255.357.391a.75.75 0 0 1-.15.762c-.131.141-.386.263-.547.263-.259 0-.604-.242-.697-.491a.86.86 0 0 1 .011-.559c.067-.16.31-.379.457-.411.06-.013.127-.03.149-.037.065-.022.312.027.42.082'
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
export default CarSVG;
