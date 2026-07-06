import { forwardRef, Ref, SVGProps } from 'react';

type FlagProps = SVGProps<SVGSVGElement> & {
  /** Размер флага в пикселях (выставляет width и height). */
  size?: number;
};

export const AustraliaSVG = forwardRef<SVGSVGElement, FlagProps>(
  ({ size = 24, style, ...props }, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 18'
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      {...props}
    >
      <g clipPath='url(#Australia_svg__a)'>
        <path fill='#00008B' d='M0 0h24v18H0z' />
        <path
          fill='#fff'
          d='m19.762 14.876-.768.098.082.768-.555-.54-.551.544.075-.769-.769-.09.649-.42-.409-.656.735.244.259-.731.266.727.731-.251-.401.66.652.416zm-.139-4.395.102-.487-.368-.338.495-.056.206-.454.207.454.495.056-.368.338.102.487-.436-.247zm-3.903-2.25-.761.083.067.76-.54-.543-.555.529.09-.761-.758-.102.65-.405-.395-.656.724.255.27-.716.252.724.727-.237-.409.65.641.42zm7.642-1.23-.784.101.087.784-.566-.551-.563.555.079-.788-.784-.09.664-.43-.417-.672.75.251.263-.742.27.742.746-.259-.412.675zM19.76 3.87l-.777.086.072.78-.552-.555-.566.54.09-.776-.776-.105.663-.413-.4-.67.738.258.274-.731.255.738.742-.243-.416.66zM8.775 14.464l-1.718.202.173 1.721L6 15.172 4.762 16.38l.184-1.721-1.717-.218 1.458-.93-.9-1.477 1.635.562.593-1.627.581 1.63 1.639-.55-.911 1.47 1.455.94z'
        />
        <path fill='#00008B' d='M0 0h12v9H0z' />
        <path
          fill='#fff'
          d='m1.406 0 4.575 3.394L10.538 0H12v1.163L7.5 4.518 12 7.856V9h-1.5L6 5.644 1.519 9H0V7.875l4.481-3.338L0 1.2V0z'
        />
        <path
          fill='red'
          d='M7.95 5.269 12 8.25V9L6.919 5.269zm-3.45.375.112.656-3.6 2.7H0zM12 0v.056L7.331 3.581l.038-.825L11.063 0zM0 0l4.481 3.3H3.356L0 .788z'
        />
        <path fill='#fff' d='M4.519 0v9h3V0zM0 3v3h12V3z' />
        <path fill='red' d='M0 3.619v1.8h12v-1.8zM5.119 0v9h1.8V0z' />
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
        <clipPath id='Australia_svg__a'>
          <rect width={24} height={18} fill='#fff' rx={2} />
        </clipPath>
      </defs>
    </svg>
  ),
);
