// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const UserFolderSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-user-folder';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 8.62V13h1.52V5.76h4.02l1.5 1 1.5 1h7.46v10.48H17v1.52h3.76V6.24h-8.561l-1.499-1-1.499-1H3.24zm5.377.663c-.585.069-1.098.328-1.552.781a2.687 2.687 0 0 0-.693 1.116c-.091.277-.105.387-.105.82 0 .433.014.543.105.82.146.44.357.781.692 1.116.335.335.676.546 1.116.692.277.091.387.105.82.105.433 0 .543-.014.82-.105.44-.146.781-.357 1.116-.692.335-.335.546-.676.692-1.116.091-.277.105-.387.105-.82 0-.432-.014-.543-.105-.82-.425-1.294-1.642-2.06-3.011-1.897m.911 1.59c.239.117.481.359.599.599.133.27.133.787 0 1.057-.464.943-1.795.943-2.252 0a1.425 1.425 0 0 1-.074-.871c.097-.348.43-.703.785-.838.232-.088.708-.061.942.053m-5.204 7.049c-.53.925-.964 1.688-.964 1.697 0 .008.29.181.644.383.509.292.652.357.68.313.019-.03.355-.617.746-1.304l.71-1.249h5.72l.71 1.249c.391.687.727 1.274.746 1.304.028.044.171-.021.68-.313.354-.202.644-.373.644-.38 0-.007-.433-.771-.963-1.697l-.963-1.685H5.287z'
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
export default UserFolderSVG;
