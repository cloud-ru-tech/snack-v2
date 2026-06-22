import { forwardRef, Ref } from 'react';

import { ISvgIconProps } from '../../../../../../types';

const EvolutionComputeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-evolution-compute';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.592 4.613 3.243 7.06 3.242 12v4.94l4.341 2.44c2.388 1.342 4.376 2.44 4.417 2.44s2.029-1.098 4.417-2.44l4.341-2.44V12l-.001-4.94-4.344-2.44c-2.389-1.342-4.373-2.443-4.409-2.447s-2.021 1.094-4.412 2.44m8.063 1.304 3.585 2.018v8.136l-2.675 1.504-3.24 1.822-.565.318v-2.78l1.99-1.119 1.99-1.12V9.309l-2.37-1.333L12 6.642l-1.989 1.119A131 131 0 0 1 8 8.88c-.055 0-2.405-1.344-2.406-1.377-.002-.051 6.332-3.619 6.411-3.61.035.004 1.678.915 3.65 2.024M13.636 9.28l1.602.9.001 1.82.001 1.82-1.207.68c-.664.374-1.222.686-1.24.693-.018.008-.033-.805-.033-1.805v-1.819l-1.599-.895c-.879-.492-1.599-.904-1.6-.916-.001-.029 2.41-1.394 2.446-1.385.014.004.748.412 1.629.907m-7.325.38.927.52.011 2.258.011 2.258 1.99 1.12 1.99 1.119v2.78l-.565-.318-3.24-1.822-2.675-1.504V8.795l.312.173c.172.094.729.406 1.239.692m3.889 2.19 1.02.574.011 1.391c.005.766-.005 1.386-.024 1.379-.018-.008-.576-.32-1.24-.694l-1.207-.68v-2.781l.21.119z'
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

export default EvolutionComputeSVG;
