import { APPEARANCE, Button, VIEW } from '@ds/button';
import { ProductIcons } from '@ds/icons';
import { Tree, TreeNodeId, TreeNodeProps } from '@ds/tree';
import { SIZE, Typography, VARIANT } from '@ds/typography';
import { useMemo, useState } from 'react';

import { pageLayoutLocale } from '../../../../locale';
import styles from './styles.module.scss';
import { getExpandedNodes } from './utils';

type MenuProps = {
  menuTitle?: string;
  menuItems: TreeNodeProps[];
  enableShrinkMenuButton?: boolean;
  withDefaultOpenedMenuList?: boolean;
  selected?: TreeNodeId;
  onSelect?(selectedKey: TreeNodeId | undefined, node: TreeNodeProps): void;
};

export function Menu({
  menuTitle,
  menuItems,
  enableShrinkMenuButton = true,
  withDefaultOpenedMenuList,
  selected,
  onSelect,
}: MenuProps) {
  const { t } = pageLayoutLocale.useTranslations();
  const allExpandedNodes = useMemo(() => getExpandedNodes(menuItems), [menuItems]);

  const [expandedNodes, setExpandedNodes] = useState<string[]>(withDefaultOpenedMenuList ? allExpandedNodes : []);

  const isExpanded = expandedNodes.length > 0;

  const handleExpandAll = () => setExpandedNodes(getExpandedNodes(menuItems));
  const handleCollapseAll = () => setExpandedNodes([]);

  const showSubheader = Boolean(menuTitle || enableShrinkMenuButton);

  return (
    <div className={styles.sidebar}>
      {showSubheader && (
        <div className={styles.subheader}>
          <Typography variant={VARIANT.title} size={SIZE.m}>
            {menuTitle}
          </Typography>
          {enableShrinkMenuButton && (
            <Button
              view={VIEW.Simple}
              appearance={APPEARANCE.Neutral}
              label={isExpanded ? t('TreeNavigation.collapseAll') : t('TreeNavigation.expandAll')}
              icon={isExpanded ? <ProductIcons.HorizontalMenuCloseSVG /> : <ProductIcons.HorizontalMenuOpenSVG />}
              onClick={isExpanded ? handleCollapseAll : handleExpandAll}
            />
          )}
        </div>
      )}

      <Tree
        data={menuItems}
        selectionMode='single'
        expandedNodes={expandedNodes}
        onExpand={setExpandedNodes}
        selected={selected}
        onSelect={onSelect}
      />
    </div>
  );
}
