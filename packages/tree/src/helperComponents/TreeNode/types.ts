import { KeyboardEventHandler, MouseEventHandler } from 'react';

import { ParentNode, TreeNodeProps } from '../../types';

export type TreeNodeComponentProps = TreeNodeProps & {
  onChevronClick?: MouseEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  loading?: boolean;
  parentNode?: ParentNode;
  tabIndexAvailable?: boolean;
};
