import { BottomSheet } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

/**
 * Полный футер: `approveButton` + `cancelButton` + `additionalButton`.
 * Три действия не помещаются в горизонтальный ряд на mobile-вьюпорте, поэтому собираются в
 * вертикальный full-width `ButtonGroup` с инверсией (primary снизу).
 * Горизонтальный ряд (space-between) применяется к паре cancel/confirm — см. Playground.
 * Альтернатива — произвольный `footer: ReactNode` (см. Nested).
 */
function FooterActionsRender() {
  const [open, setOpen] = useState(false);
  const portalRoot = usePortalContext();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Footer actions</DemoTitle>
        <DemoHint>
          Три кнопки футера (<code>approve</code> / <code>cancel</code> / <code>additional</code>).
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Открыть'
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
        title='Удалить ресурс?'
        content={<p>Действие необратимо. Все связанные данные будут удалены без возможности восстановления.</p>}
        approveButton={{ label: 'Удалить', appearance: APPEARANCE.Critical, onClick: () => setOpen(false) }}
        cancelButton={{ label: 'Отмена', onClick: () => setOpen(false) }}
        additionalButton={{ label: 'Подробнее', onClick: () => undefined }}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet/Examples/FooterActions',
  globals: { density: 'comfort' },
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const FooterActions: Story = {
  tags: ['dev', 'test'],
  render: () => <FooterActionsRender />,
};
