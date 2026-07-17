import { BottomSheet } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { KebabSVG } from '@ds/icons/interface/system';
import { usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const MENU_ACTIONS = [
  { id: 'share', label: 'Поделиться' },
  { id: 'duplicate', label: 'Дублировать' },
  { id: 'delete', label: 'Удалить' },
];

function WithActionButtonRender() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const portalRoot = usePortalContext();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>WithActionButton</DemoTitle>
        <DemoHint>
          Back-button слева появляется автоматически по <code>onBackButtonClick</code>; <code>actionButton</code> —
          kebab-кнопка справа, открывает Dropdown со списком действий.
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Открыть с действиями'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        container={portalRoot.current || undefined}
        title='Detail view'
        onBackButtonClick={() => setOpen(false)}
        actionButton={
          // TODO: заменить на дроплист
          <Dropdown
            open={menuOpen}
            onOpenChange={setMenuOpen}
            placement='bottom-end'
            content={
              <div className={styles.menu}>
                {MENU_ACTIONS.map(action => (
                  <button
                    key={action.id}
                    type='button'
                    data-test-id={TEST_IDS.actionMenu.item(action.id)}
                    className={styles.menuItem}
                    onClick={() => {
                      setLastAction(action.label);
                      setMenuOpen(false);
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            }
          >
            <Button
              data-test-id={TEST_IDS.actionMenu.trigger}
              view={VIEW.Function}
              appearance={APPEARANCE.Neutral}
              icon={<KebabSVG />}
              aria-label='Действия'
            />
          </Dropdown>
        }
        content={
          <p>
            Кнопка-меню в правом верхнем углу открывает список действий.
            {lastAction ? ` Выбрано: «${lastAction}».` : ''}
          </p>
        }
        approveButton={{ label: 'Готово', onClick: () => setOpen(false) }}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet/Examples/WithActionButton',
  globals: { density: 'comfort' },
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const WithActionButton: Story = {
  tags: ['dev', 'test'],
  render: () => <WithActionButtonRender />,
};
