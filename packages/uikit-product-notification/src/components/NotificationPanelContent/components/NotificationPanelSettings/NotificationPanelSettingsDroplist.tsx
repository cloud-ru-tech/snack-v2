import { Button, ButtonProps } from '@ds/button';
import { Droplist } from '@ds/list';
import { Tag } from '@ds/tag';
import { ElementType, useState } from 'react';

import { TEST_IDS } from '../../../../constants';
import { Action } from '../../../../types';
import styles from '../../styles.module.scss';

type NotificationPanelSettingsDroplistProps = {
  actions: Action[];
  button: ButtonProps<ElementType>;
};

export function NotificationPanelSettingsDroplist({ actions, button }: NotificationPanelSettingsDroplistProps) {
  const [isDroplistOpen, setDroplistOpen] = useState(false);

  return (
    <Droplist
      trigger='click'
      open={isDroplistOpen}
      onOpenChange={setDroplistOpen}
      scroll
      placement='bottom-end'
      size='m'
      data-test-id={TEST_IDS.panel.settings.droplist}
      triggerClassName={styles.inlineFlex}
      items={actions.map(({ icon, content, tagLabel, disabled, onClick }, index) => ({
        onClick: e => {
          setDroplistOpen(false);
          onClick?.(e);
        },
        disabled,
        content,
        beforeContent: icon,
        afterContent: tagLabel ? <Tag label={tagLabel} /> : undefined,
        'data-test-id': `${TEST_IDS.panel.settings.droplistAction}-${index}`,
      }))}
    >
      <Button {...button} />
    </Droplist>
  );
}
