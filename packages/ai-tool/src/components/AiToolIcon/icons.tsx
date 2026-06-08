import { ReactElement, SVGProps } from 'react';

import { AI_TOOL_ICON_TYPE } from '../../constants';
import { AiToolIconType } from '../../types';

type GlyphProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: GlyphProps): ReactElement {
  return (
    <svg
      width={16}
      height={16}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      {children}
    </svg>
  );
}

function ReasoningGlyph(props: GlyphProps): ReactElement {
  return (
    <Svg {...props}>
      <circle cx='8' cy='8' r='1.33333' fill='currentColor' />
    </Svg>
  );
}

function SearchGlyph(props: GlyphProps): ReactElement {
  return (
    <Svg {...props}>
      <path
        d='M14 14L11.0376 11.0376M11.0376 11.0376C12.0304 10.0447 12.5882 8.69817 12.5882 7.29409C12.5882 5.89001 12.0304 4.54344 11.0376 3.5506C10.0447 2.55777 8.69817 2 7.29409 2C5.89001 2 4.54344 2.55777 3.5506 3.5506C2.55777 4.54344 2 5.89001 2 7.29409C2 8.69817 2.55777 10.0447 3.5506 11.0376C4.54344 12.0304 5.89001 12.5882 7.29409 12.5882C8.69817 12.5882 10.0447 12.0304 11.0376 11.0376Z'
        stroke='currentColor'
      />
    </Svg>
  );
}

function ReadGlyph(props: GlyphProps): ReactElement {
  return (
    <Svg {...props}>
      <path d='M5 10.6667H11M5 8.00002H11M5 5.33335H7M13 14H3V2H10L13 5V14Z' stroke='currentColor' />
    </Svg>
  );
}

function ActGlyph(props: GlyphProps): ReactElement {
  return (
    <Svg {...props}>
      <path
        d='M11.8543 5.22471L12.2543 6.15805L12.6543 5.22471L13.5876 4.82471L12.6543 4.42471L12.2543 3.49138L11.8543 4.42471L10.921 4.82471L11.8543 5.22471Z'
        fill='currentColor'
      />
      <path
        d='M9.37275 2.66667H4L2.66667 4V6.66667M2.66667 6.66667V12L4 13.3333H12L13.3333 12V8M2.66667 6.66667H9.37275M5 11.6667L6.66667 10L5 8.33333M8 11.3333H11.3333M12.2543 6.15805L11.8543 5.22471L10.921 4.82471L11.8543 4.42471L12.2543 3.49138L12.6543 4.42471L13.5876 4.82471L12.6543 5.22471L12.2543 6.15805Z'
        stroke='currentColor'
      />
    </Svg>
  );
}

function SecurityGlyph(props: GlyphProps): ReactElement {
  return (
    <Svg {...props}>
      <path
        d='M3.30896 6.66667V2.66667H8.64229L11.309 5.33333V12.6667H9.00004M11.309 5.33333H8.64229V2.66667M13.6423 13.1456V4.33333L11.309 2M4.99997 13.3333L6.81244 12.4271C7.13168 12.2675 7.33333 11.9412 7.33333 11.5843V8.66667H2.66667V11.5843C2.66667 11.9412 2.86832 12.2675 3.18756 12.4271L4.99997 13.3333Z'
        stroke='currentColor'
      />
    </Svg>
  );
}

function WaitGlyph(props: GlyphProps): ReactElement {
  return (
    <Svg {...props}>
      <path
        d='M5.33333 7.33333V8.66667M8 7.33333V8.66667M10.6667 7.33333V8.66667M8 13.3333C5.05448 13.3333 2.66667 10.9455 2.66667 8C2.66667 5.05448 5.05448 2.66667 8 2.66667C10.9455 2.66667 13.3333 5.05448 13.3333 8C13.3333 9.1124 12.9928 10.1453 12.4102 11L13.3333 13.3333H8Z'
        stroke='currentColor'
      />
    </Svg>
  );
}

export const AI_TOOL_ICON_GLYPHS: Record<AiToolIconType, (props: GlyphProps) => ReactElement> = {
  [AI_TOOL_ICON_TYPE.Reasoning]: ReasoningGlyph,
  [AI_TOOL_ICON_TYPE.Search]: SearchGlyph,
  [AI_TOOL_ICON_TYPE.Read]: ReadGlyph,
  [AI_TOOL_ICON_TYPE.Act]: ActGlyph,
  [AI_TOOL_ICON_TYPE.Security]: SecurityGlyph,
  [AI_TOOL_ICON_TYPE.Wait]: WaitGlyph,
};
