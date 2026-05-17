// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const RocketSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-rocket';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m13.18 5.24-2 2h-5L4.07 9.35c-1.161 1.161-2.11 2.128-2.11 2.15s.563.603 1.25 1.29l1.251 1.25.499-.5.499-.5 1.231 1.23 1.23 1.23-1.98 1.98-1.98 1.981.54.539.54.539 1.98-1.979L9 16.58l1.23 1.23 1.229 1.229-.499.501-.499.501 1.269 1.269L13 22.58l2.12-2.12 2.12-2.12v-5l2-2 2-2v-6.1h-6.06zm6.58 1.47v1.95l-4.13 4.13-4.13 4.13-1.96-1.96L7.58 13l4.12-4.12 4.12-4.12h3.94zm-4.081-.432c-.797.107-1.522.694-1.805 1.462-.13.353-.132 1.13-.004 1.5.205.59.743 1.144 1.321 1.361a2.26 2.26 0 0 0 1.104.127c.553-.085.92-.272 1.3-.659.478-.487.625-.857.625-1.569 0-.703-.144-1.073-.607-1.553a2.25 2.25 0 0 0-1.934-.669m.588 1.525a.75.75 0 0 1 .464.697.69.69 0 0 1-.237.547c-.465.44-1.225.1-1.225-.547 0-.3.189-.591.451-.695a.95.95 0 0 1 .547-.002M7.58 10.84l-2.079 2.08-.711-.71-.71-.709 1.37-1.371 1.37-1.37h2.84zm6.801 8.199L13 20.42l-.71-.71-.71-.71 2.08-2.08 2.08-2.08.011 1.409.01 1.41z'
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
export default RocketSVG;
