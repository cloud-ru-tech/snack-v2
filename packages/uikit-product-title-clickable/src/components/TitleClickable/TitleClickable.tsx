import { ArrowLinksSVG, ChevronRightSVG } from '@ds/icons/interface/system';
import { withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { ElementType } from 'react';

import { TEST_IDS } from '../../constants';
import { TitleClickableProps } from '../../types';
import { SimpleTitle as SimpleTitleComponent, SimpleTitleProps as SimpleTitleComponentProps } from '../SimpleTitle';
import { UserTitle as UserTitleComponent, UserTitleProps as UserTitleComponentProps } from '../UserTitle';
import styles from './styles.module.scss';

export function TitleClickable<T extends ElementType = 'a'>({
  as: asProp,
  innerRef,
  className,
  fullWidth,
  showArrow = true,
  content,
  ...rest
}: TitleClickableProps<T>) {
  const Tag: ElementType = asProp ?? 'a';
  const restProps = rest as Record<string, unknown>;
  const isAnchor = !asProp || asProp === 'a';
  const isExternal = isAnchor && restProps.target === '_blank';
  const rel = isExternal ? 'noopener noreferrer' : restProps.rel;
  const ArrowIcon = isExternal ? ArrowLinksSVG : ChevronRightSVG;

  return (
    <Tag
      {...restProps}
      rel={rel}
      ref={innerRef}
      className={cn(styles.titleClickable, className)}
      data-test-id={(restProps['data-test-id'] as string | undefined) ?? TEST_IDS.root}
      data-full-width={fullWidth || undefined}
    >
      <div data-test-id={TEST_IDS.content} className={styles.contentWrapper} data-full-width={fullWidth || undefined}>
        {content}
      </div>

      {showArrow && (
        <span data-test-id={TEST_IDS.chevron} className={styles.chevron} aria-hidden>
          <span className={styles.stateLayer} data-state='emptyNeutralOnBackground' aria-hidden />
          <ArrowIcon size={16} className={styles.chevronIcon} />
        </span>
      )}
    </Tag>
  );
}

export namespace TitleClickable {
  export type SimpleTitleProps = SimpleTitleComponentProps;
  export type UserTitleProps = UserTitleComponentProps;
  export const SimpleTitle = SimpleTitleComponent;
  export const UserTitle = UserTitleComponent;
}

withInnerRefSupport(TitleClickable);
