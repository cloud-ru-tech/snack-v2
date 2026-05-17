// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const NumberedListSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-numbered-list';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M5.72 4.061c-.228.103-2.386 1.744-2.461 1.872-.356.603.21 1.328.86 1.101.073-.025.345-.205.607-.4.261-.195.483-.354.493-.354s.023.898.03 1.996l.011 1.997.122.153c.142.179.421.334.599.334.22 0 .528-.186.65-.394l.109-.186v-5.6l-.091-.17c-.174-.326-.613-.491-.929-.349M8.92 6v.76H20V5.24H8.92zm0 6v.76H20v-1.52H8.92zm-3.936.824a3 3 0 0 0-.56.226c-.576.302-1.193 1.007-1.277 1.458-.033.178.07.495.202.621.215.206.545.284.798.189.149-.057.362-.263.454-.441.164-.319.59-.597.913-.597.303 0 .386.088.386.407 0 .418-.123.608-1.378 2.128-.614.745-1.137 1.409-1.16 1.476a.75.75 0 0 0 .494.97c.159.047.479.059 1.601.058.818-.001 1.478-.018 1.582-.042.462-.107.714-.569.539-.988a.8.8 0 0 0-.358-.403c-.094-.052-.272-.07-.834-.086l-.714-.02.594-.727c.634-.775.804-1.025.963-1.419.438-1.085.084-2.216-.831-2.659a2.06 2.06 0 0 0-1.414-.151M8.92 18v.76H20v-1.52H8.92z' />
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
export default NumberedListSVG;
