import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const VenezuelaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Venezuela_svg__a)'>
        <path fill='#CF142B' d='M0 0h24v18H0z' />
        <path fill='#00247D' d='M0 0h24v12H0z' />
        <path fill='#FC0' d='M0 0h24v6H0z' />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='m13.266 7.956-.377-.4-.49.247.263-.482-.387-.391.54.101.253-.488.07.545.542.09-.496.235zm1.405-.31.404-.372-.12.536.478.27-.546.05-.109.54-.217-.505-.546.063.412-.363-.228-.497-.001-.002zm1.185.788.348.424.507-.211-.296.462.358.417-.532-.139-.285.469-.033-.548-.535-.127.512-.2zm1.192 1.57.182.518.549-.025-.437.333.194.514-.452-.312-.43.343.158-.527-.459-.302.55-.013zm-10.584 1.34.194-.514-.436-.333.548.025.182-.518.145.53.55.012-.46.302.158.527-.429-.343zm.764-1.818.357-.417-.296-.462.507.211.348-.424-.044.547.511.2-.534.127-.032.547-.286-.468zM8.567 8.08l.478-.269-.12-.535.404.371.473-.28-.23.5.412.362h.001l-.545-.063-.218.504-.109-.538zm1.753-.901.542-.09.07-.545.253.488.54-.101-.387.391.263.481v.001l-.49-.246-.377.4.082-.544z'
          clipRule='evenodd'
        />
      </g>
      <rect
        width={23.5}
        height={17.5}
        x={0.25}
        y={0.25}
        stroke='#DDE0EA'
        strokeWidth={0.5}
        rx={1.75}
        style={{
          fillOpacity: 0,
        }}
      />
      <defs>
        <clipPath id='Venezuela_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);
