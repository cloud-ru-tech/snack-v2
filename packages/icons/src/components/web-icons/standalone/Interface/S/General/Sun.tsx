// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SunSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-sun';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.24 5.476v2.475l-.15.028c-.26.048-.687.213-1.039.4-.187.1-.345.181-.352.181S7.157 5.658 6.476 4.868l-.096-.112-.542.472c-.298.26-.546.49-.55.512s.735.893 1.642 1.936a128 128 0 0 1 1.663 1.93c.007.018-.05.137-.127.264a5 5 0 0 0-.468 1.145l-.051.225H3v1.52h4.947l.051.228c.067.296.314.898.474 1.152l.126.2-1.799 1.8L5 17.941l.53.529.531.53 1.797-1.798 1.797-1.797.163.099c.327.202.96.459 1.272.517l.15.028V21h1.52v-4.951l.15-.028c.326-.061.86-.281 1.312-.541l.162-.093 1.998 1.752 2.078 1.822c.078.069.091.058.573-.491.471-.538.489-.566.42-.631-.04-.037-.959-.845-2.043-1.795-1.083-.95-1.97-1.74-1.97-1.756a.7.7 0 0 1 .094-.169c.168-.247.427-.893.487-1.21l.028-.149H21v-1.52h-4.951l-.028-.149c-.061-.326-.307-.931-.505-1.243l-.118-.186 1.941-1.941 1.941-1.942-.53-.529-.531-.53-1.935 1.936-1.936 1.936-.368-.196c-.376-.201-.803-.367-1.07-.417l-.15-.028V3h-1.52zm1.422 3.984c.446.113.807.327 1.179.699.548.549.759 1.059.759 1.841s-.211 1.293-.759 1.841c-.549.548-1.087.775-1.841.775s-1.292-.227-1.841-.775c-.372-.372-.586-.733-.699-1.179-.078-.311-.078-1.013 0-1.324.219-.865.998-1.65 1.86-1.875.297-.078 1.039-.079 1.342-.003'
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
export default SunSVG;
