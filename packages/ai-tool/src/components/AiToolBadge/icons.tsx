import { ReactElement, SVGProps } from 'react';

import { AI_TOOL_BADGE_TYPE } from '../../constants';
import { AiToolBadgeType } from '../../types';

type GlyphProps = SVGProps<SVGSVGElement>;

function CloudRuGlyph(props: GlyphProps): ReactElement {
  return (
    <svg width={16} height={16} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g transform='translate(1.3333 1.3333)'>
        <path
          d='M13.3333 7.33333V10.6667L7.33333 13.3333V7.33333H13.3333ZM13.3333 6V2.66667L7.33333 0V6H13.3333ZM0 2.66667V10.6667L6 13.3333V0L0 2.66667Z'
          fill='#26D07C'
        />
      </g>
    </svg>
  );
}

function OtherGlyph(props: GlyphProps): ReactElement {
  return (
    <svg width={16} height={16} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M6.58576 2.74751C7.36681 1.96646 8.63314 1.96646 9.41419 2.74751L13.2525 6.58578C14.0335 7.36683 14.0335 8.63316 13.2525 9.41421L9.4143 13.2524C8.63325 14.0334 7.36692 14.0334 6.58587 13.2524L2.7476 9.4141C1.96655 8.63305 1.96655 7.36672 2.7476 6.58567L6.58576 2.74751Z'
        stroke='currentColor'
      />
    </svg>
  );
}

export const AI_TOOL_BADGE_GLYPHS: Record<AiToolBadgeType, (props: GlyphProps) => ReactElement> = {
  [AI_TOOL_BADGE_TYPE.CloudRu]: CloudRuGlyph,
  [AI_TOOL_BADGE_TYPE.Other]: OtherGlyph,
};
