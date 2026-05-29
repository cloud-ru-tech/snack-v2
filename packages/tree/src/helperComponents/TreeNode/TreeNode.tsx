import { ChevronRightSVG, FileSVG, FolderOpenSVG, FolderSVG } from '@ds/icons';
import { Spinner } from '@ds/loader';
import { Checkbox, Radio } from '@ds/toggles';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { FocusEvent, forwardRef, KeyboardEventHandler, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { useTreeContext } from '../../contexts/TreeContext';
import { checkNestedNodesSelection } from '../../helpers';
import { TreeNodeProps } from '../../types';
import { TreeLine } from '../TreeLine';
import { TreeNodeActions, TreeNodeHref } from './components';
import { CONTROL_SIZE_BY_TREE_SIZE } from './constants';
import styles from './styles.module.scss';
import { TreeNodeComponentProps } from './types';
import { stopPropagationClick } from './utils';

export type { TreeNodeProps };

export const TreeNode = forwardRef<HTMLDivElement, TreeNodeComponentProps>(
  (
    {
      id,
      title,
      icon: iconProp,
      expandedIcon: expandedIconProp,
      collapsedIcon: collapsedIconProp,
      disabled,
      onClick,
      nested,
      className,
      onChevronClick,
      onKeyDown,
      isLoading,
      parentNode,
      tabIndexAvailable,
      href,
      ...rest
    },
    ref,
  ) => {
    const {
      isMultiSelect,
      isSelectable,
      onNodeClick,
      selected,
      expandedNodes,
      onSelect,
      nodeActions,
      parentActions,
      setFocusPosition,
      resetFocusPosition,
      focusedNodeId,
      setFocusIndex,
      focusableNodeIds,
      showToggle,
      showLines,
      showIcons,
      size = 'm',
    } = useTreeContext();

    const [isDroplistOpen, setDroplistOpen] = useState(false);
    const [isDroplistTriggerFocused, setFocusDroplistTrigger] = useState(false);

    const contentRef = useRef<HTMLDivElement | null>(null);

    const anchorRef = useRef<HTMLAnchorElement | null>(null);

    const isExpandable = Array.isArray(nested);
    const isExpanded = isExpandable ? expandedNodes?.includes(id) : undefined;

    const nestedNodesSelection = useMemo(() => {
      if (!nested || !selected) return undefined;

      return checkNestedNodesSelection(nested, Array.isArray(selected) ? selected : [selected]);
    }, [nested, selected]);

    const isSelected =
      (Array.isArray(selected) ? selected.includes(id) || nestedNodesSelection?.allSelected : selected === id) || false;

    const isFocused = focusedNodeId === id;

    useEffect(() => {
      if (contentRef.current && isFocused) {
        contentRef.current.focus();
      }
    }, [isFocused]);

    const treeNodeIcon = useMemo(() => {
      if (!showIcons) return undefined;

      // Размер svg задаётся в styles.module.scss через `.treeNodeIcon svg`,
      // зависит от data-size корня; size в JSX не прокидываем.
      if (isExpandable) {
        return isExpanded ? (expandedIconProp ?? <FolderOpenSVG />) : (collapsedIconProp ?? <FolderSVG />);
      }

      return iconProp ?? <FileSVG />;
    }, [showIcons, isExpandable, isExpanded, iconProp, expandedIconProp, collapsedIconProp]);

    const handleClick: TreeNodeProps['onClick'] = e => {
      onNodeClick(
        {
          id,
          title,
          disabled,
          nested,
          onClick,
          href,
        },
        e,
      );
    };

    const handleAnchorClick = (e: MouseEvent<Element>) => {
      e.stopPropagation();
      if (e?.metaKey || e?.ctrlKey || e?.button === 1) {
        return;
      }

      // preventDefault только если есть кастомный onClick на ноде — иначе
      // позволяем браузеру навигировать по href. Но handleClick зовём всегда,
      // чтобы Tree успел прокинуть onNodeClick/onSelect.
      if (onClick) {
        e.preventDefault();
      }
      handleClick(e);
    };

    const handleSelect = () => {
      onSelect(
        {
          id,
          disabled,
          nested,
        },
        parentNode,
      );
    };

    const handleFocus = (e?: FocusEvent) => {
      setFocusPosition(id);

      if (!e) {
        setFocusDroplistTrigger(false);
        contentRef.current?.focus();
      }
    };

    const handleBlurActions = () => {
      if (isDroplistTriggerFocused && !isDroplistOpen) {
        setFocusDroplistTrigger(false);

        contentRef.current?.blur();
      }
    };

    const handleKeyDown: KeyboardEventHandler<HTMLElement> = e => {
      onKeyDown?.(e);

      const focusableCount = focusableNodeIds.length;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();

          setFocusIndex((prev = 0) => {
            if (prev >= focusableCount - 1) {
              return focusableCount - 1;
            }
            return prev + 1;
          });

          return;
        }
        case 'ArrowUp': {
          e.preventDefault();

          setFocusIndex((prev = 0) => {
            if (!prev) {
              return 0;
            }
            return prev - 1;
          });

          return;
        }
        case 'ArrowRight': {
          e.preventDefault();

          // ArrowRight уводит фокус на droplist trigger row-actions — это нужно
          // только если на строке вообще есть actions. Без них клавиша не
          // должна давать визуального hover-эффекта (`data-droplist-active`).
          const hasRowActions = Boolean(nested ? parentActions : nodeActions);

          if (hasRowActions && (isExpanded || !isExpandable || disabled)) {
            setFocusDroplistTrigger(true);
          }

          return;
        }
        case 'ArrowLeft': {
          e.preventDefault();

          if (isDroplistTriggerFocused) {
            setFocusDroplistTrigger(false);
            contentRef.current?.focus();
          }

          return;
        }
        case 'Escape': {
          contentRef.current?.blur();
          return;
        }
        case ' ':
        case 'Enter': {
          e.preventDefault();
          handleSelect();

          if (href && anchorRef.current) {
            anchorRef.current.click();
          }

          return;
        }
        default:
          return;
      }
    };

    const getNodeActions = nested ? parentActions : nodeActions;

    return (
      <div
        role='presentation'
        className={cn(styles.treeNode, className)}
        {...extractSupportProps(rest)}
        data-node-id={id}
        data-size={size}
        ref={ref}
      >
        {parentNode && (
          <TreeLine halfWidth={isExpandable} horizontal visible={showLines} data-test-id={TEST_IDS.line} />
        )}

        {isExpandable && (
          <div className={styles.treeNodeExpandButtonWrapper}>
            <button
              type='button'
              onClick={onChevronClick}
              data-expanded={isExpanded || undefined}
              className={styles.treeNodeExpandButton}
              tabIndex={-1}
              data-test-id={TEST_IDS.chevron}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              <span className={styles.treeNodeExpandButtonStateLayer} aria-hidden data-state='regularFilled' />
              {isLoading ? <Spinner size={CONTROL_SIZE_BY_TREE_SIZE[size]} /> : <ChevronRightSVG />}
            </button>
            <TreeLine visible={isExpanded && showLines} />
          </div>
        )}

        <div
          role='treeitem'
          aria-expanded={isExpanded}
          aria-selected={
            isSelectable
              ? isSelected || (nestedNodesSelection?.someSelected && !isExpanded && !isMultiSelect)
              : undefined
          }
          aria-disabled={disabled}
          data-multiselect={isMultiSelect || undefined}
          data-droplist-active={isDroplistOpen || isDroplistTriggerFocused || undefined}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={resetFocusPosition}
          tabIndex={tabIndexAvailable ? 0 : -1}
          className={styles.treeNodeContent}
          data-test-id={TEST_IDS.item}
          ref={contentRef}
        >
          <span
            className={styles.stateLayer}
            aria-hidden
            data-state={isSelected && !isMultiSelect ? 'activatedFilled' : 'regularFilled'}
          />
          {(isMultiSelect || showToggle) && (
            <div className={styles.treeNodeCheckboxWrap}>
              {isMultiSelect && (
                <Checkbox
                  size={CONTROL_SIZE_BY_TREE_SIZE[size]}
                  disabled={disabled}
                  checked={isSelected}
                  indeterminate={!isSelected && nestedNodesSelection?.someSelected}
                  onChange={handleSelect}
                  onClick={stopPropagationClick}
                  data-test-id={TEST_IDS.checkbox}
                  tabIndex={-1}
                />
              )}
              {showToggle && (
                <Radio
                  size={CONTROL_SIZE_BY_TREE_SIZE[size]}
                  checked={isSelected}
                  disabled={disabled}
                  data-test-id={TEST_IDS.radio}
                  tabIndex={-1}
                />
              )}
            </div>
          )}

          {treeNodeIcon && (
            <div className={styles.treeNodeIcon} data-test-id={TEST_IDS.icon}>
              {treeNodeIcon}
            </div>
          )}

          <Typography variant='body' size={size} as='div' className={styles.treeNodeTitle}>
            <TreeNodeHref href={href} onClick={handleAnchorClick} ref={anchorRef}>
              {typeof title === 'string' && <TruncateString text={title} data-test-id={TEST_IDS.title} />}
              {typeof title !== 'string' && title({ id, disabled, nested } as TreeNodeProps)}
            </TreeNodeHref>
          </Typography>

          {getNodeActions && (
            <TreeNodeActions
              getNodeActions={getNodeActions}
              node={{
                id,
                title,
                disabled,
                nested,
              }}
              focusNode={handleFocus}
              onBlurActions={handleBlurActions}
              isDroplistTriggerFocused={isDroplistTriggerFocused}
              isDroplistOpen={isDroplistOpen}
              setDroplistOpen={setDroplistOpen}
              size={size}
            />
          )}
        </div>
      </div>
    );
  },
);
