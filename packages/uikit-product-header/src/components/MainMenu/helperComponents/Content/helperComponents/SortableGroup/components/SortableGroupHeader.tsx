import { Button } from '@ds/button';
import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons/interface/system';
import { Typography } from '@ds/typography';
import { TitleClickable } from '@ds/uikit-product-title-clickable';
import { MouseEventHandler } from 'react';

import { LinksGroup, LinksGroupTitle } from '../../../../../types';
import { getLinkEmblem } from '../../../../../utils';
import styles from '../styles.module.scss';
import { SortableGroupDragHandle, SortableGroupDragHandleProps } from './SortableGroupDragHandle';

export type SortableGroupHeaderProps = Pick<LinksGroup, 'icon'> & {
  label: LinksGroupTitle;
  isExpanded?: boolean;
  enableServiceDrag?: boolean;
  isMobile?: boolean;
} & SortableGroupDragHandleProps;

export function SortableGroupHeader({
  label,
  icon,
  isExpanded,
  enableServiceDrag,
  attributes,
  listeners,
  isMobile,
}: SortableGroupHeaderProps) {
  const handleLabelClick: MouseEventHandler<HTMLElement> = e => {
    e.stopPropagation();

    label?.onClick?.(e);
  };

  return (
    <div className={styles.header} data-expanded={isExpanded || undefined}>
      <Typography
        variant='title'
        size='m'
        className={styles.headerTitle}
        data-test-id='header__drawer-menu__group-card-title'
      >
        {label.onClick || label.href ? (
          <TitleClickable
            {...(label.href ? { as: 'a', href: label.href } : { as: 'div' })}
            onClick={handleLabelClick}
            title={label.text}
            before={getLinkEmblem({ icon })}
          />
        ) : (
          label.text
        )}
      </Typography>

      {(enableServiceDrag || !isMobile) && (
        <div className={styles.headerActions} data-always-visible={isMobile || undefined}>
          {enableServiceDrag && <SortableGroupDragHandle attributes={attributes} listeners={listeners} />}

          {!isMobile && (
            <Button
              view='elevated'
              appearance='neutral'
              size='s'
              icon={isExpanded ? <ChevronUpSVG /> : <ChevronDownSVG />}
              data-test-id='header__drawer-menu__group-card-collapse'
            />
          )}
        </div>
      )}
    </div>
  );
}
