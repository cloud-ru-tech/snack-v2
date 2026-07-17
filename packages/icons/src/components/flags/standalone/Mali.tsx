// DO NOT EDIT MANUALLY
import { createStandaloneIcon } from '../../../factory/createStandaloneIcon';
const MaliSVG = createStandaloneIcon({
  testId: '-mali',
  nativeWidth: 24,
  nativeHeight: 18,
  preserveColor: true,
  rootFill: 'none',
  children: (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={18} fill='none'>
      <g clipPath='url(#Mali_svg__a)'>
        <mask id='Mali_svg__b' fill='#fff'>
          <path d='M0 2a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z' />
        </mask>
        <path fill='red' fillRule='evenodd' d='M15.968 0H24v18h-8.036z' clipRule='evenodd' />
        <path fill='#009A00' fillRule='evenodd' d='M0 0h7.984v18H0z' clipRule='evenodd' />
        <path fill='#FF0' fillRule='evenodd' d='M7.984 0h8.025v18H7.984z' clipRule='evenodd' />
      </g>
      <path
        fill='#DEE1E8'
        d='M2 0v.5h20v-1H2zm22 2h-.5v14h1V2zm-2 16v-.5H2v1h20zM0 16h.5V2h-1v14zm2 2v-.5A1.5 1.5 0 0 1 .5 16h-1A2.5 2.5 0 0 0 2 18.5zm22-2h-.5a1.5 1.5 0 0 1-1.5 1.5v1a2.5 2.5 0 0 0 2.5-2.5zM22 0v.5A1.5 1.5 0 0 1 23.5 2h1A2.5 2.5 0 0 0 22-.5zM2 0v-.5A2.5 2.5 0 0 0-.5 2h1A1.5 1.5 0 0 1 2 .5z'
        mask='url(#Mali_svg__b)'
      />
      <defs>
        <clipPath id='Mali_svg__a'>
          <path fill='#fff' d='M0 2a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z' />
        </clipPath>
      </defs>
    </svg>
  ).props.children,
});
export default MaliSVG;
