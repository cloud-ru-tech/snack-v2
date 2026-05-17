// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BackupCheckSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-backup-check';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.34 3.28c-3.024.218-5.769 2.016-7.133 4.671-1.586 3.087-1.174 6.738 1.064 9.409.357.427.7.76 1.229 1.196.198.163.387.321.419.351.051.047-.063.176-.84.954l-.898.899H9.76v-4.579l-.856.855-.856.855-.432-.355c-.598-.492-.845-.726-1.168-1.107-.748-.883-1.323-2.041-1.543-3.111a7.1 7.1 0 0 1 .2-3.638 7.22 7.22 0 0 1 5.088-4.697c.649-.162.987-.2 1.807-.2s1.158.038 1.807.2a7.24 7.24 0 0 1 5.07 4.633c.473 1.352.48 3.034.018 4.424a7.2 7.2 0 0 1-5.028 4.681c-.555.145-1.173.239-1.567.239H12v1.52h.17c.722-.001 1.817-.194 2.625-.464 4.342-1.451 6.809-5.918 5.682-10.288-.683-2.649-2.637-4.832-5.251-5.868-1.153-.457-2.598-.673-3.886-.58m1.62 7.7a82 82 0 0 1-1.52 1.5c-.011 0-.459-.351-.996-.781a28 28 0 0 0-.986-.77c-.091.094-.898 1.13-.898 1.152 0 .036 2.945 2.399 2.99 2.399.017 0 .921-.891 2.01-1.98l1.979-1.98-.519-.52a10 10 0 0 0-.54-.52c-.011 0-.695.675-1.52 1.5'
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
export default BackupCheckSVG;
