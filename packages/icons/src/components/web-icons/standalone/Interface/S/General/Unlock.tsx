// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const UnlockSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-unlock';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8.1 3.281c-.877.118-1.613.813-1.8 1.699-.042.203-.059.553-.059 1.27l-.001.99h-2v13.52h15.52V7.24h-12v-.981c0-1.103.014-1.174.263-1.364l.151-.115 3.723-.012c2.048-.006 3.783 0 3.855.013.192.034.44.296.473.498l.025.161H17.769l-.028-.229a2.227 2.227 0 0 0-1.501-1.862l-.26-.088-3.82-.006c-2.101-.004-3.928.008-4.06.026M18.24 14v5.24H5.76V8.76h12.48zm-6.623-2.717c-.585.069-1.098.328-1.552.781a2.687 2.687 0 0 0-.693 1.116c-.091.277-.105.387-.105.82 0 .433.014.543.105.82.146.44.357.781.692 1.116.335.335.676.546 1.116.692.277.091.387.105.82.105.433 0 .543-.014.82-.105.44-.146.781-.357 1.116-.692.335-.335.546-.676.692-1.116.091-.277.105-.387.105-.82 0-.432-.014-.543-.105-.82-.425-1.294-1.642-2.06-3.011-1.897m.911 1.59c.239.117.481.359.599.599.133.27.133.787 0 1.057-.464.943-1.795.943-2.252 0a1.425 1.425 0 0 1-.074-.871c.097-.348.43-.703.785-.838.232-.088.708-.061.942.053'
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
export default UnlockSVG;
