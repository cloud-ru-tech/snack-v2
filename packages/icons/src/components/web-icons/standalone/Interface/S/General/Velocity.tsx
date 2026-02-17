// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const VelocitySVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-velocity';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.36 3.279c-2.547.185-4.828 1.393-6.376 3.375-.939 1.203-1.556 2.77-1.703 4.326-.024.263-.041 1.822-.041 3.88v3.44l1.23 1.23 1.23 1.23h12.6l1.23-1.23 1.23-1.23v-3.44c0-3.533-.015-3.956-.164-4.734-.228-1.185-.834-2.517-1.58-3.472a8.798 8.798 0 0 0-5.776-3.309 10.384 10.384 0 0 0-1.88-.066M11.24 5.9V7h1.52V5.9c0-.853.011-1.1.05-1.1.105.001.584.085.93.163 1.127.254 2.35.888 3.199 1.657l.2.181-.832.832-.832.832.52.538.519.537.796-.792.796-.793.142.233c.326.531.609 1.184.759 1.752.17.648.196.898.22 2.11l.022 1.19h-5.428l1.109-1.11 1.11-1.111-.53-.529-.531-.53-1.639 1.64-1.64 1.64H4.751l.022-1.19c.024-1.212.05-1.462.22-2.11.15-.568.433-1.221.759-1.752l.142-.233.783.78.783.78.54-.516.54-.515-.84-.843-.84-.844.2-.179a8.056 8.056 0 0 1 1.78-1.167c.669-.309 1.751-.612 2.31-.646l.09-.005zm8 10.33v1.471l-.77.769-.771.77H6.301l-.771-.77-.77-.769V14.76h14.48z'
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
export default VelocitySVG;
