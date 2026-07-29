import { withInnerRefSupport } from '@ds/utils';

import { TagLinkProps, TagProps } from '../../types';
import { TagBase } from '../TagBase';
import { TagLink } from '../TagLink';

export function isTagLinkProps(props: TagProps): props is TagLinkProps {
  return 'href' in props && props.href !== undefined;
}

export function Tag(props: TagProps) {
  return isTagLinkProps(props) ? <TagLink {...props} /> : <TagBase {...props} />;
}

withInnerRefSupport(Tag);
