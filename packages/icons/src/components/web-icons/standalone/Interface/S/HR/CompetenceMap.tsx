// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CompetenceMapSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-competence-map';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.4 6.382 3.162 9.433l-.099.073.209.286c.114.158.208.295.208.305s-.153.068-.34.129-.34.121-.34.133c0 .019 3.161 9.673 3.218 9.829.013.035.117.015.368-.07A9 9 0 0 1 6.748 20c.006 0 .012.171.012.38v.38h10.48v-.38c0-.209.006-.38.012-.38.007 0 .17.053.362.118.251.085.355.105.367.07.063-.174 3.219-9.811 3.219-9.829 0-.012-.153-.072-.34-.133s-.34-.119-.34-.129.09-.142.2-.293.2-.284.2-.294c0-.021-8.424-6.085-8.472-6.098-.015-.005-.116.117-.224.27s-.209.278-.224.278-.116-.125-.224-.278a2 2 0 0 0-.216-.279c-.011 0-1.883 1.341-4.16 2.979m3.825 5.406c-.009.009-1.376-.421-3.038-.956-1.721-.554-3.007-.987-2.988-1.007a476 476 0 0 1 3.028-2.187l2.993-2.152.01 3.143c.006 1.729.003 3.151-.005 3.159m4.655-4.075a351 351 0 0 1 2.908 2.101c.037.035-.664.275-2.934 1.006-1.641.528-3.008.966-3.038.973-.048.011-.056-.469-.056-3.153V5.475l.13.092c.072.05 1.417 1.016 2.99 2.146m-8.134 4.55c1.625.521 2.967.96 2.984.975.028.024-3.653 5.077-3.712 5.094-.021.006-2.338-6.977-2.338-7.046 0-.008.025-.005.056.007s1.386.448 3.01.97m11.574-.973c-.001.07-2.314 7.035-2.336 7.034-.034 0-3.699-4.983-3.714-5.049-.006-.026 1.263-.456 2.99-1.015 2.94-.952 3.06-.99 3.06-.97m-5.42 5.412 1.85 2.518-1.875.01c-1.031.006-2.719.006-3.75 0l-1.875-.01 1.86-2.532c1.022-1.392 1.878-2.525 1.9-2.518s.873 1.147 1.89 2.532'
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
export default CompetenceMapSVG;
