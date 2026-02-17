// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const HandLikeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-hand-like';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.613 3.284c-1.085.126-1.916.863-2.259 2.003-.082.271-.09.392-.104 1.62l-.016 1.327-2.067.014c-2.039.014-2.071.015-2.327.106-.649.23-1.134.744-1.419 1.5-.212.562-.217.438.175 4.589l.356 3.784.146.436c.35 1.048.912 1.659 1.842 2.003.191.071.511.074 7.51.085l7.31.01V11.24h-4.3l-2-4-2-4-.28.005c-.154.003-.409.02-.567.039M13.41 8.5l1.83 3.66v7.08h-4.424c-4.067 0-4.435-.005-4.566-.067-.173-.082-.375-.28-.518-.505-.12-.19-.292-.667-.292-.812v-.096H8v-1.52H5.288l-.024-.19a63.647 63.647 0 0 1-.103-1.09 59.42 59.42 0 0 0-.101-1.05l-.021-.15H8V12.241l-1.549-.011-1.55-.01-.071-.74c-.04-.407-.063-.817-.052-.91.023-.19.147-.462.277-.604.193-.213.097-.206 3.002-.206h2.7l.012-2.05.011-2.05.143-.26c.142-.258.464-.559.597-.56.04 0 .679 1.238 1.89 3.66m5.83 7.5v3.24h-2.48v-6.48h2.48z'
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
export default HandLikeSVG;
