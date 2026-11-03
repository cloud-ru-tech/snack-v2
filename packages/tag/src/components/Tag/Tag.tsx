import { WithTooltip } from '@ds/tooltip';
import { withInnerRefSupport } from '@ds/utils';
import { useState } from 'react';

import { TagLinkProps, TagProps } from '../../types';
import { TagBase } from '../TagBase';
import { TagLink } from '../TagLink';

export function isTagLinkProps(props: TagProps): props is TagLinkProps {
  return 'href' in props && props.href !== undefined;
}

export function Tag({ tooltip, ...props }: TagProps) {
  const [restrictOpenTooltip, setRestrictOpenTooltip] = useState(false);

  return (
    <WithTooltip tooltip={tooltip && { ...tooltip, open: restrictOpenTooltip ? false : tooltip.open }}>
      {isTagLinkProps(props) ? (
        <TagLink {...props} />
      ) : (
        <TagBase
          {...props}
          changeRestrictTooltipState={tooltip ? setRestrictOpenTooltip : undefined}
          hideTruncateTooltip={Boolean(tooltip)}
        />
      )}
    </WithTooltip>
  );
}

withInnerRefSupport(Tag);
