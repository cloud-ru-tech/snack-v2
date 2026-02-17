// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const AdministrationSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-administration';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M11.24 4.12v1.12h-4v3h-4v12.52H11v-1.52H4.76V9.76h14.48V11h1.52V8.24h-4v-3h-4V3h-1.52zm4 3.38v.74H8.76V6.76h6.48zm-7.991 5.01.011.99h1.48l.011-.99.01-.99H7.239zm4 0 .011.99h1.48l.011-.99.01-.99h-1.522zm3.321.78c-.022.027-.548.932-1.169 2.01a577.804 577.804 0 0 1-1.201 2.08l-.071.12 1.226 2.12 1.226 2.12h4.918l1.192-2.06 1.225-2.12c.025-.043-.312-.659-1.191-2.18l-1.226-2.12-2.444-.01c-1.926-.008-2.453 0-2.485.04m4.846 2.83c.431.747.784 1.368.784 1.379 0 .01-.353.631-.785 1.38l-.786 1.361h-3.178l-.785-1.359a60.588 60.588 0 0 1-.786-1.382c0-.012.353-.633.784-1.381l.785-1.358h3.182zm-12.167.39.011.99h1.48l.011-.99.01-.99H7.239zm9.54-.228c-.351.058-.691.322-.876.678-.077.15-.093.24-.093.54.001.312.015.387.107.563.111.21.347.451.541.55.478.246 1.137.125 1.486-.273.246-.279.305-.444.305-.84 0-.312-.014-.387-.106-.563-.262-.497-.792-.752-1.364-.655' />
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
export default AdministrationSVG;
