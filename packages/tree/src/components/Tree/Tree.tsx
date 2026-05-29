import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { SIZE } from '../../constants';
import { TreeContextProvider } from '../../contexts/TreeContext';
import { TreeItem } from '../../helperComponents';
import { TreeBaseProps } from '../../types';
import styles from './styles.module.scss';
import { extractSelectableProps } from './utils';

export type TreeProps = WithSupportProps<TreeBaseProps>;

export function Tree({
  data,
  onNodeClick,
  onExpand,
  expandedNodes,
  nodeActions,
  parentActions,
  onDataLoad,
  showLines = true,
  showIcons = true,
  size = SIZE.M,
  className,
  ...rest
}: TreeProps) {
  return (
    <div className={cn(styles.tree, className)} role='tree' data-size={size} {...extractSupportProps(rest)}>
      <TreeContextProvider
        value={{
          showToggle: rest.selectionMode === 'single' && rest.showToggle,
          data,
          expandedNodes,
          onNodeClick,
          onExpand,
          nodeActions,
          parentActions,
          onDataLoad,
          showLines,
          showIcons,
          size,
          ...extractSelectableProps(rest),
        }}
      >
        {data.map((node, index) => (
          <TreeItem key={node.id} node={node} tabIndexAvailable={index === 0 || index === data.length - 1} />
        ))}
      </TreeContextProvider>
    </div>
  );
}
