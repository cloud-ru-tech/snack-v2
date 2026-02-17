// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BoldTextSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-bold-text';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.47 4.47 3.24 5.7v12.6l1.23 1.23 1.23 1.23h12.6l1.23-1.23 1.23-1.23V5.7l-1.23-1.23-1.23-1.23H5.7zm14 1.06.77.769v11.4l-.77.771-.769.77H6.299l-.769-.77-.77-.771V6.301l.77-.771.769-.77h11.4zm-9.59 6.467v4.763l2.01-.001c2.146-.001 2.575-.028 3.13-.201.927-.289 1.524-.897 1.768-1.803.086-.322.096-1.158.017-1.475-.13-.518-.464-1.061-.818-1.328l-.173-.13.151-.241c.253-.407.363-.801.386-1.386.018-.461.01-.538-.087-.877-.239-.832-.731-1.458-1.412-1.795-.502-.249-.546-.253-2.862-.272l-2.11-.018zm4.303-3.13c.176.094.418.341.511.521.032.062.089.218.126.347.123.422-.019 1.002-.303 1.241-.283.238-.299.241-1.767.255l-1.35.014V8.756l1.31.012c1.257.012 1.317.016 1.473.099m.169 3.956c.748.152 1.044.536 1 1.298-.032.544-.234.808-.772 1.008-.23.086-.304.09-1.71.103l-1.47.013V12.76h1.322c1.044 0 1.386.013 1.63.063'
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
export default BoldTextSVG;
