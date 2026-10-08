// DO NOT EDIT MANUALLY
import { createStandaloneIcon } from '../../../factory/createStandaloneIcon';
const NorwaySVG = createStandaloneIcon({
  testId: '-norway',
  nativeWidth: 24,
  nativeHeight: 18,
  preserveColor: true,
  rootFill: 'none',
  children: (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={18} fill='none'>
      <g clipPath='url(#Norway_svg__a)'>
        <mask id='Norway_svg__b' fill='#fff'>
          <path d='M0 2C0 .9.9 0 2 0h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z' />
        </mask>
        <path fill='#ed2939' d='M0 0h24v18H0z' />
        <path fill='#fff' d='M6.75 0h4.5v18h-4.5z' />
        <path fill='#fff' d='M0 6.75h24v4.5H0z' />
        <path fill='#002664' d='M7.88 0h2.25v18H7.87z' />
        <path fill='#002664' d='M0 7.88h24v2.25H0z' />
      </g>
      <path
        fill='#dee1e8'
        d='M2 0v.5h20v-1H2zm22 2h-.5v14h1V2zm-2 16v-.5H2v1h20zM0 16h.5V2h-1v14zm2 2v-.5A1.5 1.5 0 0 1 .5 16h-1A2.5 2.5 0 0 0 2 18.5zm22-2h-.5c0 .83-.67 1.5-1.5 1.5v1a2.5 2.5 0 0 0 2.5-2.5zM22 0v.5c.83 0 1.5.67 1.5 1.5h1A2.5 2.5 0 0 0 22-.5zM2 0v-.5A2.5 2.5 0 0 0-.5 2h1C.5 1.17 1.17.5 2 .5z'
        mask='url(#Norway_svg__b)'
      />
      <defs>
        <clipPath id='Norway_svg__a'>
          <path fill='#fff' d='M0 2C0 .9.9 0 2 0h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z' />
        </clipPath>
      </defs>
    </svg>
  ).props.children,
});
export default NorwaySVG;
