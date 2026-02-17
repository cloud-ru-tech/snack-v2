// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const PhotoSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-photo';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m7.7 5.24-.999 1H3.24v13.52h17.52V6.24H17.299l-.999-1-.999-1H8.699zm8 1.52.999 1h2.541v10.48H4.76V7.76h2.541l.999-1 .999-1h5.402zm-4.105 2.522c-.46.05-.773.142-1.215.357-1.06.514-1.74 1.36-2.03 2.521a4.03 4.03 0 0 0 0 1.68c.183.733.493 1.287 1.008 1.802.73.73 1.606 1.092 2.642 1.092 1.036 0 1.912-.362 2.642-1.092.73-.73 1.092-1.606 1.092-2.642 0-1.589-.926-2.924-2.441-3.515-.441-.173-1.171-.26-1.698-.203m.961 1.54c.378.089.707.281 1.024.598.454.454.659.945.659 1.58 0 .635-.205 1.126-.659 1.58-.456.456-.944.66-1.58.66-.636 0-1.124-.204-1.58-.66-.454-.454-.659-.945-.659-1.58 0-.635.205-1.126.659-1.58.31-.31.646-.509 1.005-.597a2.87 2.87 0 0 1 1.131-.001'
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
export default PhotoSVG;
