import { Button } from '@ds/button';
import { Droplist } from '@ds/list';
import { Tag } from '@ds/tag';
import cn from 'classnames';
import { Dispatch, ReactElement, SetStateAction } from 'react';

import { Action } from '../../types';
import { stopPropagationClick } from '../../utils';
import styles from './styles.module.scss';

export type ActionsButtonTestIds = {
  wrapper: string;
  droplist: string;
  droplistTrigger: string;
  droplistAction: string;
};

export type ActionsButtonProps = {
  actions: Action[];
  open: boolean;
  setDroplistOpen: Dispatch<SetStateAction<boolean>>;
  icon: ReactElement;
  /** Доступное имя кнопки-триггера (icon-only кнопка иначе безымянна для скринридера). */
  triggerAriaLabel: string;
  testIds: ActionsButtonTestIds;
  className?: string;
};

export function ActionsButton({
  actions,
  open,
  setDroplistOpen,
  icon,
  triggerAriaLabel,
  testIds,
  className,
}: ActionsButtonProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={cn(styles.inlineFlex, className)} data-test-id={testIds.wrapper} onClick={stopPropagationClick}>
      <Droplist
        size='m'
        trigger='clickAndFocusVisible'
        open={open}
        onOpenChange={setDroplistOpen}
        placement='bottom-end'
        scroll
        data-test-id={testIds.droplist}
        items={actions.map(({ onClick, disabled, content, tagLabel, icon: itemIcon }, index) => ({
          onClick: e => {
            setDroplistOpen(false);
            onClick?.(e);
          },
          disabled,
          content,
          beforeContent: itemIcon,
          afterContent: tagLabel ? <Tag label={tagLabel} /> : undefined,
          'data-test-id': `${testIds.droplistAction}-${index}`,
        }))}
        triggerClassName={styles.inlineFlex}
      >
        <Button
          view='function'
          appearance='neutral'
          size='m'
          icon={icon}
          aria-label={triggerAriaLabel}
          data-test-id={testIds.droplistTrigger}
        />
      </Droplist>
    </div>
  );
}
