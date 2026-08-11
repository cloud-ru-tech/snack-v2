import { MoreSVG } from '@ds/icons/interface/system';
import { Droplist, DroplistProps } from '@ds/list';
import cn from 'classnames';
import { RefObject, useContext, useRef } from 'react';

import { ELEMENT_TYPE, ITEM_RENDER_MODE } from '../../constants';
import { BreadcrumbsContext } from '../../context';
import { BreadcrumbsConfigChain, InnerItem } from '../../types';
import { getTestId } from '../../utils';
import styles from './styles.module.scss';

export type CollapseProps = {
  className?: string;
  currentConfig: BreadcrumbsConfigChain;
};

export function Collapse({ currentConfig, className }: CollapseProps) {
  const ctx = useContext(BreadcrumbsContext);
  const { hidden, size, testId } = ctx;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const collapsedItems: DroplistProps['items'] = currentConfig
    .filter(node => node.element === ELEMENT_TYPE.Item && node.item.renderMode === ITEM_RENDER_MODE.Collapsed)
    .map(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (node: { element: typeof ELEMENT_TYPE.Item; width: number; item: InnerItem }) => ({
        content: { label: node.item.label },
        ...(node.item.href
          ? {
              itemWrapRender: crumb => (
                <a href={node.item.href} onClick={node.item.onClick} className={styles.link}>
                  {crumb}
                </a>
              ),
            }
          : {
              onClick: node.item.onClick,
            }),
      }),
    );

  return (
    <div
      className={cn(className, styles.wrapper)}
      data-size={size}
      data-test-id={getTestId('collapse', testId)}
      data-element-type={ELEMENT_TYPE.Collapse}
    >
      <BreadcrumbsContext.Provider value={{ ...ctx, testId: `${testId}-collapsed` }}>
        <Droplist
          triggerClassName={styles.triggerClassName}
          trigger='hoverAndFocusVisible'
          size='s'
          scroll
          triggerElemRef={buttonRef as RefObject<HTMLElement>}
          items={collapsedItems}
        >
          <button type='button' ref={buttonRef} className={styles.collapse} tabIndex={hidden ? -1 : 0}>
            <MoreSVG size={16} />
          </button>
        </Droplist>
      </BreadcrumbsContext.Provider>
    </div>
  );
}
