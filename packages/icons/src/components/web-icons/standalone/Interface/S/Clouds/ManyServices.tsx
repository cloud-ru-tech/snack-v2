// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ManyServicesSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-many-services';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.52 3.282a5.74 5.74 0 0 0-4.598 3.043c-.305.58-.446 1.01-.625 1.905-.012.058-.048.09-.099.09-.362 0-1.258.285-1.83.581-1.571.815-2.64 2.241-3.011 4.019-.07.334-.088.555-.088 1.08s.018.746.088 1.08c.245 1.176.77 2.16 1.587 2.976.806.807 1.763 1.321 2.956 1.589.399.09.413.09 4.75.105l4.35.014V18.24h-2.24v-6.7c0-6.614.001-6.7.078-6.7.043 0 .227.047.41.105A4.26 4.26 0 0 1 15.81 7.14c.308.621.43 1.201.43 2.05v.57h.55c.303 0 .716.027.919.06.962.156 1.907.699 2.564 1.473l.13.153.6-.448c.528-.396.593-.456.547-.513-.631-.769-1.196-1.227-2.027-1.644a5.9 5.9 0 0 0-1.48-.488c-.274-.043-.329-.064-.342-.132-.165-.846-.32-1.32-.623-1.896a5.5 5.5 0 0 0-1.023-1.381 5.69 5.69 0 0 0-4.535-1.662m-.28 8.258v6.7H7.76v-4.81c0-4.183.008-4.857.063-5.168.267-1.526 1.396-2.829 2.857-3.294l.32-.103a1 1 0 0 1 .15-.022l.09-.003zm-5 2.46c0 4.056-.002 4.16-.076 4.16-.041 0-.199-.038-.35-.084-1.573-.481-2.714-1.754-2.991-3.338-.327-1.868.604-3.695 2.317-4.548.154-.077.397-.177.54-.222L6 9.865c.033-.01.1-.02.15-.022l.09-.003zm12 .12v1.12H16v1.52h2.24V19h1.52v-2.24H22v-1.52h-2.24V13h-1.52z'
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
export default ManyServicesSVG;
