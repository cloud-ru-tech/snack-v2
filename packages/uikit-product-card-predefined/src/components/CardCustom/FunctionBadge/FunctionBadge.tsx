import { TEST_IDS, useCardContext } from '@ds/card';
import { KebabSVG } from '@ds/icons';
import { BaseItemProps, Droplist } from '@ds/list';
import { Tag } from '@ds/tag';
import { useLayoutEffect } from '@ds/utils';
import { MouseEvent, ReactElement, ReactNode, useCallback, useContext, useRef, useState } from 'react';

import { FunctionBadgeContext } from '../../../functionBadgeContext';
import { FunctionBadgeWrapper } from '../../../helperComponents/FunctionBadgeWrapper';
import styles from './styles.module.scss';

type Option = {
  tagLabel?: string;
  icon?: ReactElement;
} & Pick<BaseItemProps, 'onClick' | 'content' | 'disabled'>;

export type FunctionBadgeProps = {
  /** Иконка */
  icon?: ReactNode;
  /** Вложенные опции */
  options: Option[];
  /** Всегда показывать FunctionBadge */
  alwaysVisible?: boolean;
};

function FunctionBadgeButton({ icon, options }: Pick<FunctionBadgeProps, 'icon' | 'options'>) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { setVisible } = useContext(FunctionBadgeContext);

  useLayoutEffect(() => {
    setVisible?.(isOpen);
  }, [isOpen, setVisible]);

  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(open => !open);
  }, []);

  return (
    <span className={styles.wrapper}>
      <Droplist
        size='m'
        trigger='clickAndFocusVisible'
        open={isOpen}
        onOpenChange={setIsOpen}
        widthStrategy='gte'
        scroll
        data-test-id={TEST_IDS.droplist}
        placement='bottom-end'
        triggerElemRef={buttonRef}
        items={options.map(({ icon: optionIcon, tagLabel, onClick: onItemClick, ...item }) => ({
          ...item,
          className: styles.item,
          beforeContent: optionIcon,
          afterContent: tagLabel ? <Tag label={tagLabel} /> : undefined,
          onClick: e => {
            e.stopPropagation();
            setIsOpen(false);
            onItemClick?.(e);
          },
        }))}
      >
        <button
          type='button'
          data-test-id={TEST_IDS.functionBadge}
          className={styles.button}
          onClick={onClick}
          ref={buttonRef}
        >
          {icon || <KebabSVG />}
        </button>
      </Droplist>
    </span>
  );
}

export function FunctionBadge({ icon, options, alwaysVisible }: FunctionBadgeProps) {
  const { disabled } = useCardContext();

  if (disabled) {
    return null;
  }

  return (
    <FunctionBadgeWrapper alwaysVisible={alwaysVisible}>
      <FunctionBadgeButton icon={icon} options={options} />
    </FunctionBadgeWrapper>
  );
}

FunctionBadge.displayName = 'CardCustom.FunctionBadge';
