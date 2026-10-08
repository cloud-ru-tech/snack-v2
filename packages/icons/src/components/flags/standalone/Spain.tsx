// DO NOT EDIT MANUALLY
import { createStandaloneIcon } from '../../../factory/createStandaloneIcon';
const SpainSVG = createStandaloneIcon({
  testId: '-spain',
  nativeWidth: 24,
  nativeHeight: 18,
  preserveColor: true,
  rootFill: 'none',
  children: (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={18} fill='none'>
      <g clipPath='url(#Spain_svg__a)'>
        <mask id='Spain_svg__c' fill='#fff'>
          <path d='M0 2C0 .9.9 0 2 0h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z' />
        </mask>
        <g clipPath='url(#Spain_svg__b)'>
          <path fill='#ad1519' d='M24 0H0v18h24z' />
          <path fill='#000' d='M24 18H0V0h24zM0 18h24V0H0z' />
          <path fill='#fabd00' d='M24 4.5H0v9h24z' />
          <path fill='#000' d='M24 13.5H0v-9h24zm-24 0h24v-9H0z' />
        </g>
      </g>
      <path
        fill='#dee1e8'
        d='M2 0v.5h20v-1H2zm22 2h-.5v14h1V2zm-2 16v-.5H2v1h20zM0 16h.5V2h-1v14zm2 2v-.5A1.5 1.5 0 0 1 .5 16h-1A2.5 2.5 0 0 0 2 18.5zm22-2h-.5c0 .83-.67 1.5-1.5 1.5v1a2.5 2.5 0 0 0 2.5-2.5zM22 0v.5c.83 0 1.5.67 1.5 1.5h1A2.5 2.5 0 0 0 22-.5zM2 0v-.5A2.5 2.5 0 0 0-.5 2h1C.5 1.17 1.17.5 2 .5z'
        mask='url(#Spain_svg__c)'
      />
      <defs>
        <clipPath id='Spain_svg__a'>
          <path fill='#fff' d='M0 2C0 .9.9 0 2 0h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z' />
        </clipPath>
        <clipPath id='Spain_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ).props.children,
});
export default SpainSVG;
