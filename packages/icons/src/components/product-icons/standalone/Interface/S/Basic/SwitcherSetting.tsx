// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SwitcherSettingSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-switcher-setting';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M14.617 4.283a2.61 2.61 0 0 0-1.522.747c-.299.291-.541.648-.661.977l-.085.233H4v1.52h8.349l.085.233c.186.51.673 1.082 1.171 1.378.14.083.399.199.575.257.277.091.387.105.82.105.433 0 .543-.014.82-.105a3.53 3.53 0 0 0 .575-.257c.498-.296.985-.868 1.171-1.378l.085-.233H20V6.24h-2.349l-.085-.233c-.239-.656-.9-1.322-1.553-1.566a3.025 3.025 0 0 0-1.396-.158m.911 1.59c.239.117.481.359.599.599.133.27.133.787 0 1.057-.464.943-1.795.943-2.252 0a1.425 1.425 0 0 1-.074-.871c.097-.348.43-.703.785-.838.232-.088.708-.061.942.053m-6.911 8.41a2.61 2.61 0 0 0-1.522.747c-.299.291-.541.648-.661.977l-.085.233H4v1.52h2.349l.085.233c.186.51.673 1.082 1.171 1.378.14.083.399.199.575.257.277.091.387.105.82.105.433 0 .543-.014.82-.105a3.53 3.53 0 0 0 .575-.257c.498-.296.985-.868 1.171-1.378l.085-.233H20v-1.52h-8.349l-.085-.233c-.239-.656-.9-1.322-1.553-1.566a3.025 3.025 0 0 0-1.396-.158m.911 1.59c.239.117.481.359.599.599.133.27.133.787 0 1.057-.464.943-1.795.943-2.252 0a1.425 1.425 0 0 1-.074-.871c.097-.348.43-.703.785-.838.232-.088.708-.061.942.053'
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
export default SwitcherSettingSVG;
