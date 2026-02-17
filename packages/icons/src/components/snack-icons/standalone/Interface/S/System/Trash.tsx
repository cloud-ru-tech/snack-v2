// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const TrashSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-trash';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8.666 3.284c-.669.098-1.197.608-1.364 1.32-.047.198-.061.526-.061 1.446L7.24 7.24H4v1.52h1.24v9.54l1.23 1.23 1.23 1.23h8.6l1.23-1.23 1.23-1.23V8.76H20V7.24h-3.24l-.001-1.21c0-1.323-.027-1.551-.229-1.92-.223-.41-.752-.755-1.27-.829-.344-.048-6.259-.046-6.594.003m6.511 1.539c.054.054.063.223.063 1.24V7.24H8.76V6.063c0-1.017.009-1.186.063-1.24.056-.056.399-.063 3.177-.063s3.121.007 3.177.063m2.063 8.407v4.469l-.77.771-.769.77h-7.4l-.771-.77-.77-.769V8.76h10.48z'
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
export default TrashSVG;
