// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const LocalNetworkSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-local-network';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.36 3.281c-1.702.114-3.264.715-4.407 1.696l-.306.263H3.24v11.52h8v2.48H7.08v1.52h9.84v-1.52h-4.16v-2.48h8V5.24h-3.407l-.306-.264c-.83-.713-2.076-1.309-3.203-1.532a9.81 9.81 0 0 0-2.484-.163m1.472 1.522a6.268 6.268 0 0 1 2.188.627c.616.309.982.585 1.387 1.046l.251.284h2.582v8.48H4.76V6.76h2.582l.251-.284c.405-.461.771-.737 1.387-1.046a6.469 6.469 0 0 1 2.14-.626 9.987 9.987 0 0 1 1.712-.001m-1.303 2.478a4.213 4.213 0 0 0-2.591 1.217c-.378.377-.692.805-.632.862.018.018.312.187.652.375l.617.341.098-.148c.253-.383.784-.799 1.237-.968.57-.214 1.35-.256 1.9-.104.308.085.762.312 1.021.512.186.144.476.464.566.626.024.043.176-.028.667-.313.35-.203.642-.375.65-.382.035-.033-.358-.549-.611-.802a4.308 4.308 0 0 0-2.183-1.15 5.394 5.394 0 0 0-1.391-.066M11.24 12v.8h1.52v-1.6h-1.52z'
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
export default LocalNetworkSVG;
