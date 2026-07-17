// DO NOT EDIT MANUALLY
import { createStandaloneIcon } from '../../../factory/createStandaloneIcon';
const DenmarkSVG = createStandaloneIcon({
  testId: '-denmark',
  nativeWidth: 24,
  nativeHeight: 18,
  preserveColor: true,
  rootFill: 'none',
  children: (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={18} fill='none'>
      <g clipPath='url(#Denmark_svg__a)'>
        <mask id='Denmark_svg__c' fill='#fff'>
          <path d='M0 2a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z' />
        </mask>
        <g clipPath='url(#Denmark_svg__b)'>
          <path fill='#C8102E' d='M0 0h24v18H0z' />
          <path
            fill='#fff'
            fillRule='evenodd'
            d='M6.856 10.8H0V7.2h6.856V0h3.428v7.2h13.712v3.6H10.284V18H6.856z'
            clipRule='evenodd'
          />
        </g>
      </g>
      <path
        fill='#DEE1E8'
        d='M2 0v.5h20v-1H2zm22 2h-.5v14h1V2zm-2 16v-.5H2v1h20zM0 16h.5V2h-1v14zm2 2v-.5A1.5 1.5 0 0 1 .5 16h-1A2.5 2.5 0 0 0 2 18.5zm22-2h-.5a1.5 1.5 0 0 1-1.5 1.5v1a2.5 2.5 0 0 0 2.5-2.5zM22 0v.5A1.5 1.5 0 0 1 23.5 2h1A2.5 2.5 0 0 0 22-.5zM2 0v-.5A2.5 2.5 0 0 0-.5 2h1A1.5 1.5 0 0 1 2 .5z'
        mask='url(#Denmark_svg__c)'
      />
      <defs>
        <clipPath id='Denmark_svg__a'>
          <path fill='#fff' d='M0 2a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z' />
        </clipPath>
        <clipPath id='Denmark_svg__b'>
          <path fill='#fff' d='M0 0h24v18H0z' />
        </clipPath>
      </defs>
    </svg>
  ).props.children,
});
export default DenmarkSVG;
