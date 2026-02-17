// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const EraserSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-eraser';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8.04 9.122c-3.333 3.388-6.06 6.175-6.06 6.193 0 .017 1.197 1.249 2.66 2.737l2.66 2.705 6.85.002 6.85.001v-1.52l-4.033-.01-4.033-.01 4.312-4.38 4.312-4.38-.953-.96c-.524-.528-2.183-2.211-3.687-3.74-1.504-1.529-2.753-2.784-2.776-2.79-.023-.005-2.769 2.763-6.102 6.152m10.361.284 1.041 1.066-3.038 3.087c-1.671 1.697-3.049 3.086-3.062 3.085-.038-.003-5.282-5.333-5.282-5.368 0-.018 1.368-1.421 3.039-3.12l3.04-3.088 1.611 1.636c.886.9 2.079 2.116 2.651 2.702m-8.765 5.638 2.643 2.685-.725.755-.726.756-1.464-.003-1.464-.004L6 17.296c-1.045-1.065-1.906-1.953-1.913-1.974-.01-.031 2.856-2.962 2.895-2.962.006 0 1.2 1.208 2.654 2.684'
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
export default EraserSVG;
