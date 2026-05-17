// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const EquipmentSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-equipment';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M13.496 3.281a2.9 2.9 0 0 0-.915.248c-.571.291-1.053.885-1.245 1.533-.061.209-.072.479-.085 2.242l-.016 2.004-.228.05c-.95.21-1.777.829-2.26 1.693-.19.338-.41 1.005-.464 1.402-.068.494-.057 4.72.013 5.147.139.848.494 1.515 1.135 2.127.712.68 1.563 1.01 2.589 1.006.428-.002.59-.021.917-.107a3.54 3.54 0 0 0 1.676-.941 3.77 3.77 0 0 0 1.034-1.769c.086-.325.089-.414.104-2.696.011-1.684.002-2.463-.032-2.72-.15-1.126-.726-2.09-1.591-2.662a3.7 3.7 0 0 0-1.139-.48l-.231-.051.011-1.947.011-1.946.121-.197a.83.83 0 0 1 .34-.317l.219-.12 3.27-.011L20 4.758V3.24l-3.11.005c-1.71.003-3.238.019-3.394.036M3.24 14v6.76H7v-1.52H4.76V8.76H8V7.24H3.24zM16 8v.76h3.24v10.48H17v1.52h3.76V7.24H16zm-3.387 2.819c.429.091.683.228.982.53.514.52.645.949.645 2.113v.778H9.76v-.778c0-.874.044-1.154.252-1.582.163-.338.58-.764.883-.903.457-.209 1.167-.274 1.718-.158M11.24 12.26V13h1.52v-1.48h-1.52zm3 4.278c0 .428-.02.873-.044.99-.157.75-.844 1.449-1.624 1.652a2.9 2.9 0 0 1-1.15-.001c-.778-.203-1.461-.9-1.618-1.651-.024-.117-.044-.562-.044-.99v-.778h4.48z'
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
export default EquipmentSVG;
