// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const PuzzleSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-puzzle';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 12v8.76h17.52V3.24H3.24zm6-5.744v1.496l.53.015c.491.014.547.024.764.132.283.143.556.434.642.688.082.239.082.587 0 .826-.087.256-.37.559-.648.694-.207.1-.277.112-.758.126l-.53.015v4.512h3.141l.073.21c.244.698.919 1.383 1.594 1.618.614.214 1.29.214 1.904 0 .675-.235 1.35-.92 1.594-1.618l.073-.21h1.621v4.48H4.76V4.76h4.48zM19.24 9v4.24h-2.992l-.015.53c-.015.502-.022.543-.142.775-.232.448-.62.695-1.091.695s-.877-.261-1.101-.706c-.108-.217-.118-.273-.132-.764l-.015-.53H10.76v-1.621l.21-.073c.491-.171 1.066-.631 1.378-1.101.479-.721.533-1.84.128-2.665-.134-.273-.429-.635-.707-.866-.19-.159-.849-.514-.953-.514-.046 0-.056-.144-.056-.82v-.82h8.48z'
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
export default PuzzleSVG;
