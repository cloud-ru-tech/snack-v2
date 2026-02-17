// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DwdmSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-dwdm';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 12v8.76h17.52V3.24H3.24zm11-4v3.24h-2.06l1.41 1.41L15 14.06l1.41-1.41 1.41-1.41h-2.06V4.76h3.48v14.48h-1.5c-.825 0-1.5-.009-1.5-.02 0-.011.441-.902.98-1.98.539-1.078.98-1.969.98-1.98 0-.011-1.899-.02-4.22-.02H9.76V8.76h2.06l-1.41-1.41L9 5.94 7.59 7.35 6.18 8.76h2.06v6.48H7.02c-.671 0-1.22.009-1.22.02 0 .011.441.902.98 1.98.539 1.078.98 1.969.98 1.98 0 .011-.675.02-1.5.02h-1.5V4.76h9.48zm1.52 8.78c0 .011-.274.569-.61 1.24l-.609 1.22H9.459l-.609-1.22a52.538 52.538 0 0 1-.61-1.24c0-.011 1.692-.02 3.76-.02 2.068 0 3.76.009 3.76.02'
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
export default DwdmSVG;
