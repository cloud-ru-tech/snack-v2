import { BottomSheet } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

/**
 * Вложенные bottom-sheet'ы: из основного sheet'а открывается action-sheet поверх него
 * (типовой мобильный паттерн «выбор действия над сущностью»). Каждый sheet — отдельный portal:
 * вложенный рендерится позже и ложится сверху, его backdrop затемняет нижний sheet, focus-trap
 * топового слоя не конфликтует с нижним (см. `useFocusTrap`), а закрытие возвращает к нижнему.
 */
function NestedRender() {
  const [open, setOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const portalRoot = usePortalContext();
  const container = portalRoot.current || undefined;

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Nested bottom-sheets</DemoTitle>
        <DemoHint>Откройте основной sheet, затем «Действия» — вложенный action-sheet ляжет поверх.</DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Открыть документ'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        container={container}
        title='Документ'
        content={
          <div className={styles.nestedActions}>
            <p>Основной bottom-sheet. Выберите действие над документом.</p>
            <Button
              data-test-id={TEST_IDS.nestedOpen}
              label='Действия'
              view={VIEW.Filled}
              appearance={APPEARANCE.Primary}
              onClick={() => setActionsOpen(true)}
            />
          </div>
        }
      />

      <BottomSheet
        open={actionsOpen}
        onClose={() => setActionsOpen(false)}
        container={container}
        data-test-id={TEST_IDS.nestedRoot}
        title='Действия'
        content={
          <div className={styles.nestedActions}>
            <Button
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              label='Переименовать'
              onClick={() => setActionsOpen(false)}
            />
            <Button
              view={VIEW.Outline}
              appearance={APPEARANCE.Critical}
              label='Удалить'
              onClick={() => setActionsOpen(false)}
            />
          </div>
        }
        cancelButton={{ label: 'Отмена', onClick: () => setActionsOpen(false) }}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof NestedRender> = {
  title: 'Components/BottomSheet/Examples/Nested',
  globals: { density: 'comfort' },
  component: NestedRender,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

type Story = StoryObj<typeof NestedRender>;

export const Nested: Story = {
  tags: ['dev', 'test'],
};
