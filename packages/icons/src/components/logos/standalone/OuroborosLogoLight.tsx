// DO NOT EDIT MANUALLY
import { createStandaloneIcon } from '../../../factory/createStandaloneIcon';
const OuroborosLogoLightSVG = createStandaloneIcon({
  testId: '-ouroboros-logo-light',
  nativeWidth: 24,
  nativeHeight: 24,
  preserveColor: true,
  rootFill: 'none',
  children: (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none'>
      <g clipPath='url(#OuroborosLogoLight_svg__a)'>
        <path fill='#020830' d='M23.988.012H.012v23.976h23.976z' />
        <path fill='url(#OuroborosLogoLight_svg__b)' d='M23.988.012H.012v23.976h23.976z' />
        <path
          fill='#fff'
          d='M12.657 18.083a6.184 6.184 0 1 0-4.228-1.11.82.82 0 0 1 .354.658c0 .698-.721 1.155-1.293.753a7.877 7.877 0 1 1 5.167 1.4z'
        />
        <path fill='#fff' d='m13.428 20.602-2.833-.945V17.77l2.833-.944.78 1.194v1.42z' />
        <path
          fill='#020830'
          d='M12.065 19.329s.277-.22.53-.152c.251.068.382.396.382.396s-.278.219-.53.151c-.251-.067-.382-.396-.382-.396M12.065 18.062s.277.219.53.151c.251-.067.382-.396.382-.396s-.277-.218-.53-.15c-.251.066-.382.395-.382.395'
        />
      </g>
      <defs>
        <radialGradient
          id='OuroborosLogoLight_svg__b'
          cx={0}
          cy={0}
          r={1}
          gradientTransform='matrix(0 24 -16.0109 0 12 0)'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#362CF3' />
          <stop offset={1} stopColor='#362CF3' stopOpacity={0} />
        </radialGradient>
        <clipPath id='OuroborosLogoLight_svg__a'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  ).props.children,
});
export default OuroborosLogoLightSVG;
