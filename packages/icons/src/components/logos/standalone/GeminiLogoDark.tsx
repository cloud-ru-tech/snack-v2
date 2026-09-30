// DO NOT EDIT MANUALLY
import { createStandaloneIcon } from '../../../factory/createStandaloneIcon';
const GeminiLogoDarkSVG = createStandaloneIcon({
  testId: '-gemini-logo-dark',
  nativeWidth: 24,
  nativeHeight: 24,
  preserveColor: true,
  rootFill: 'none',
  children: (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none'>
      <g clipPath='url(#GeminiLogoDark_svg__a)'>
        <path
          fill='url(#GeminiLogoDark_svg__b)'
          d='M12.023.22c.38 6.32 5.438 11.376 11.756 11.757v.046c-6.318.38-11.375 5.438-11.756 11.756h-.046C11.597 17.461 6.54 12.404.221 12.023v-.046C6.539 11.597 11.596 6.54 11.977.221z'
        />
      </g>
      <defs>
        <linearGradient
          id='GeminiLogoDark_svg__b'
          x1={8.632}
          x2={18.808}
          y1={15.896}
          y2={5.365}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#217BFE' />
          <stop offset={0.14} stopColor='#1485FC' />
          <stop offset={0.27} stopColor='#078EFB' />
          <stop offset={0.52} stopColor='#548FFD' />
          <stop offset={0.78} stopColor='#A190FF' />
          <stop offset={0.89} stopColor='#AF94FE' />
          <stop offset={1} stopColor='#BD99FE' />
        </linearGradient>
        <clipPath id='GeminiLogoDark_svg__a'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  ).props.children,
});
export default GeminiLogoDarkSVG;
