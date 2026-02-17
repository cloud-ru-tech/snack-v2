// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const PlusRoundSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-plus-round';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.22 3.785c-2.539.264-4.758 1.507-6.236 3.492-2.547 3.423-2.259 8.171.682 11.244 2.386 2.493 5.902 3.357 9.174 2.255.562-.19 1.445-.624 1.96-.964 1.377-.91 2.518-2.244 3.174-3.712 1.304-2.917.942-6.269-.95-8.811a8.8 8.8 0 0 0-5.564-3.412c-.465-.081-1.814-.137-2.24-.092m1.328 1.495a7.187 7.187 0 0 1 3.831 1.452c.404.303 1.096.995 1.39 1.388a7.575 7.575 0 0 1 1.375 3.14c.103.569.103 1.92.001 2.48a7.646 7.646 0 0 1-.971 2.54c-.883 1.441-2.274 2.555-3.848 3.081-2.168.725-4.432.427-6.348-.836a7.526 7.526 0 0 1-1.775-1.685c-1.584-2.088-1.893-4.953-.791-7.34a6.717 6.717 0 0 1 1.466-2.104c1.361-1.365 3.039-2.081 5.042-2.149.077-.003.36.012.628.033m-1.308 5.14v1.34H8.56v1.48h2.68v2.68h1.52v-2.68h2.68v-1.48h-2.68V9.08h-1.52z'
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
export default PlusRoundSVG;
