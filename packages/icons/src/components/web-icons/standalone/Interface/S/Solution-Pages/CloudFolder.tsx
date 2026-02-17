// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CloudFolderSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-cloud-folder';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.24 7.02V9.8h1.52V5.76h3.02l1.5 1 1.5 1h6.46v2.479l-2.87.011-2.87.01v1.48l4.274.01c3.391.008 4.271.021 4.256.06-.009.028-.376 1.486-.813 3.24l-.796 3.19H15v1.52h5.58l1.176-4.71c.647-2.591 1.185-4.732 1.195-4.76.014-.039-.32-.05-1.587-.05H19.76v-4H12.227l-1.515-1-1.514-1H4.24zm3.394 4.063c-1.312.14-2.438 1.166-2.792 2.542-.041.158-.053.168-.312.255-.538.18-.918.429-1.356.89-.351.37-.573.738-.732 1.215-.452 1.356-.103 2.757.925 3.712.419.389.961.67 1.516.784.352.073.558.078 3.117.078 3.075 0 3.155-.006 3.77-.29 1.612-.745 2.362-2.547 1.785-4.289a3.076 3.076 0 0 0-.729-1.21c-.438-.461-.818-.71-1.356-.89-.259-.087-.271-.097-.312-.255a3.422 3.422 0 0 0-.982-1.685c-.445-.429-1.152-.779-1.696-.839-.437-.048-.545-.051-.846-.018m1.07 1.636c.523.257.932.83 1.015 1.421.022.154.04.463.04.687l.001.407.591.013c.573.013.599.017.853.142.784.386 1.209 1.371.976 2.263-.139.534-.517 1.014-.974 1.238l-.266.13H5.06l-.266-.13a2.05 2.05 0 0 1-.815-.813 2.201 2.201 0 0 1-.174-1.405c.11-.519.521-1.052.991-1.283.254-.125.28-.129.853-.142l.591-.013.001-.407c.001-.837.155-1.322.548-1.732.38-.396.749-.543 1.302-.52.297.013.392.035.613.144'
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
export default CloudFolderSVG;
