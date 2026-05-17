// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const PercentSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-percent';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M7.6 5.716 3.26 8.273l-.01 6.243-.01 6.244h17.52l-.01-6.243-.01-6.244-4.32-2.543c-2.376-1.398-4.356-2.549-4.4-2.556-.05-.009-1.683.93-4.42 2.542m8.026 1.29 3.614 2.125V19.24H4.76V9.131l3.61-2.124a642 642 0 0 1 3.626-2.126c.009-.001 1.642.956 3.63 2.125M9.277 9.282c-.776.126-1.241 1.005-.91 1.721a1.24 1.24 0 0 0 2.266 0c.08-.172.104-.287.104-.503 0-.775-.684-1.345-1.46-1.218m2.193 3.188-2.99 2.991.53.529.531.53 2.999-3 2.999-3-.519-.52a10 10 0 0 0-.54-.52c-.011 0-1.366 1.346-3.01 2.99m2.807 1.812c-.776.126-1.241 1.005-.91 1.721a1.24 1.24 0 0 0 2.266 0c.08-.172.104-.287.104-.503 0-.775-.684-1.345-1.46-1.218' />
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
export default PercentSVG;
