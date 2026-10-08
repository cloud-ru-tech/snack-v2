// DO NOT EDIT MANUALLY
import { createStandaloneIcon } from '../../../factory/createStandaloneIcon';
const GreeceSVG = createStandaloneIcon({
  testId: '-greece',
  nativeWidth: 24,
  nativeHeight: 18,
  preserveColor: true,
  rootFill: 'none',
  children: (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={18} fill='none'>
      <g clipPath='url(#Greece_svg__a)'>
        <mask id='Greece_svg__c' fill='#fff'>
          <path d='M0 2C0 .9.9 0 2 0h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z' />
        </mask>
        <g clipPath='url(#Greece_svg__b)'>
          <path fill='#fff' d='M0 0h24v18H0z' />
          <path
            fill='#0d5eaf'
            d='M4.57 0H0v4.8h4.57zm2.29 0v4.8h4.57v2.4H6.86V12H24V9.6H11.43V7.2H24V4.8H11.43V2.4H24V0zM4.57 7.2H0V12h4.57zM24 14.4H0v2.4h24z'
          />
        </g>
      </g>
      <path
        fill='#dee1e8'
        d='M2 0v.5h20v-1H2zm22 2h-.5v14h1V2zm-2 16v-.5H2v1h20zM0 16h.5V2h-1v14zm2 2v-.5A1.5 1.5 0 0 1 .5 16h-1A2.5 2.5 0 0 0 2 18.5zm22-2h-.5c0 .83-.67 1.5-1.5 1.5v1a2.5 2.5 0 0 0 2.5-2.5zM22 0v.5c.83 0 1.5.67 1.5 1.5h1A2.5 2.5 0 0 0 22-.5zM2 0v-.5A2.5 2.5 0 0 0-.5 2h1C.5 1.17 1.17.5 2 .5z'
        mask='url(#Greece_svg__c)'
      />
      <defs>
        <clipPath id='Greece_svg__a'>
          <path fill='#fff' d='M0 2C0 .9.9 0 2 0h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z' />
        </clipPath>
        <clipPath id='Greece_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ).props.children,
});
export default GreeceSVG;
