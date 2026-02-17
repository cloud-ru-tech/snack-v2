// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const LocationSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-location';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.34 2.28c-2.758.198-5.31 1.749-6.785 4.124a9.43 9.43 0 0 0-1.054 2.513c-.319 1.267-.327 2.81-.019 4.1.189.794.66 1.961.967 2.395.091.129 7.494 6.548 7.551 6.548.037 0 7.049-6.048 7.392-6.376.271-.259.686-1.118.962-1.989.834-2.636.33-5.579-1.341-7.823-1.376-1.848-3.509-3.114-5.773-3.427a10.429 10.429 0 0 0-1.9-.065m1.892 1.576a7.25 7.25 0 0 1 3.883 2.029 7.103 7.103 0 0 1 2.113 5.375c-.04 1.103-.233 1.899-.693 2.864l-.184.385-3.159 2.735C13.454 18.749 12.018 19.98 12 19.98c-.018 0-1.454-1.231-3.193-2.736l-3.16-2.735-.201-.425c-.724-1.526-.88-3.265-.446-4.964.623-2.438 2.723-4.519 5.18-5.134a9.155 9.155 0 0 1 1.12-.203c.266-.037 1.615.014 1.932.073M11.29 7.282c-.455.081-1.101.361-1.51.655a4.037 4.037 0 0 0-1.194 1.407c-.301.614-.402 1.065-.398 1.776.003.404.024.577.108.9.465 1.78 2.087 2.983 3.895 2.889 1.682-.088 3.085-1.244 3.514-2.894.119-.458.145-1.21.059-1.655a4.003 4.003 0 0 0-1.544-2.425c-.258-.187-.932-.511-1.24-.595-.285-.078-1.369-.116-1.69-.058m1.173 1.481c.42.076.798.289 1.158.653.367.37.508.608.62 1.047a2.33 2.33 0 0 1-.62 2.277c-.47.469-.963.674-1.621.674s-1.151-.205-1.621-.674a2.33 2.33 0 0 1-.62-2.277c.112-.439.253-.677.62-1.047.477-.482.932-.68 1.584-.692.144-.002.369.015.5.039'
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
export default LocationSVG;
