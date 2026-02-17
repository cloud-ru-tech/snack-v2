// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MonitorCloudSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-monitor-cloud';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.96 3.265a2.799 2.799 0 0 0-1.916 1.014c-.271.326-.404.56-.532.941-.075.222-.13.324-.18.334-.151.03-.553.218-.747.349a3.815 3.815 0 0 0-.848.844c-.336.506-.47.968-.473 1.633-.003.515.041.754.214 1.181.274.676.904 1.315 1.557 1.58.53.215.661.224 3.306.209 2.715-.016 2.612-.006 3.219-.301.234-.114.384-.23.684-.528.411-.409.579-.665.741-1.127a3.11 3.11 0 0 0-.231-2.504c-.162-.284-.627-.776-.914-.967-.218-.146-.631-.343-.774-.369-.053-.01-.1-.097-.166-.305-.292-.922-1.185-1.755-2.06-1.922a3.985 3.985 0 0 0-.88-.062M13 4v.76h6.24v10.48H4.76V13H3.24v3.76h8v2.48H7v1.52h10v-1.52h-4.24v-2.48h8V3.24H13zm-4.261.879c.57.278.82.798.821 1.707v.366l.55.015c.501.014.568.025.75.121.269.142.512.401.648.692.098.21.112.288.112.62 0 .333-.014.41-.113.624a1.63 1.63 0 0 1-.667.703l-.18.093H5.74l-.18-.093a1.63 1.63 0 0 1-.667-.703c-.099-.214-.113-.291-.113-.624 0-.332.014-.41.112-.62.136-.291.379-.55.648-.692.182-.096.249-.107.75-.121l.55-.015v-.366c.001-.651.092-.996.353-1.339.119-.156.387-.348.598-.428.233-.089.705-.059.948.06'
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
export default MonitorCloudSVG;
