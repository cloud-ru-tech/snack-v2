// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const LogsSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-logs';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.24 6.12V9h1.52V4.76h8.94l1.77 1.77 1.77 1.77V9h1.52V7.7l-2.23-2.23-2.23-2.23H4.24zm6.58 3.704c-.755.156-1.442.696-1.805 1.418-.242.483-.255.595-.255 2.275 0 1.723.014 1.839.274 2.343.176.341.6.775.969.991.141.083.401.199.577.259.291.097.375.107.92.107s.629-.01.92-.107c.888-.299 1.556-.98 1.755-1.793.054-.218.065-.519.065-1.8 0-1.392-.007-1.562-.076-1.804-.277-.969-1.057-1.702-2.012-1.892a3.919 3.919 0 0 0-1.332.003m6.001-.019c-.75.109-1.452.552-1.774 1.121-.266.47-.287.65-.287 2.522 0 1.591.004 1.687.083 1.923.149.442.319.713.678 1.074.28.282.404.374.68.506.917.438 1.94.386 2.859-.146.318-.183.811-.686.948-.965.208-.424.232-.606.232-1.748V13.04h-2.76v1.48h1.28v.17c-.001.406-.188.693-.575.882-.731.358-1.529.138-1.845-.509l-.105-.215.012-1.494c.012-1.364.019-1.506.087-1.634.144-.271.36-.383.847-.438.771-.087 1.421.177 1.52.618.063.284-.01.26.802.26h.737l-.001-.17c-.003-1.044-.938-1.989-2.162-2.188a5.386 5.386 0 0 0-1.256.003M3.76 13.62v3.62h4.76v-1.48H5.24V10H3.76zm8.098-2.319c.228.037.426.149.599.341.281.311.282.314.296 1.725.013 1.395-.011 1.644-.183 1.89-.239.341-.813.553-1.279.473-.312-.053-.661-.223-.8-.388-.23-.272-.231-.281-.231-1.822 0-1.584-.004-1.561.283-1.878.189-.209.394-.316.689-.359.226-.033.322-.03.626.018M4.24 19.38v1.38h15.52V18h-1.52v1.24H5.76V18H4.24z'
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
export default LogsSVG;
