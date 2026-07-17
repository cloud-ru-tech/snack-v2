import { BottomSheet } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { MoreSVG } from '@ds/icons/interface/system';
import { usePortalContext } from '@ds/portal-context';
import { Search } from '@ds/search';
import { Tag } from '@ds/tag';
import { QuestionTooltip } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

// Цвета тегов 1:1 с макетом (tagRow): neutral → pink.
const TAG_APPEARANCES = ['neutral', 'primary', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink'] as const;

/**
 * Пиксельная сверка с Figma-макетом `sheet` (node 12689-13277, вариант padding=true):
 * handle + topBar (back + headline + QuestionTooltip + actionButton) + Search в subHeadline +
 * tagRow в body + два действия в футере горизонтальным рядом (space-between: secondary слева /
 * primary справа) — как в Figma `bottomBar.buttonGroup`. Лейблы — как в макете («Label text»).
 * Панель Figma рядом со story (`parameters.design`) — для прямого сравнения.
 */
function FigmaMatchRender() {
  const [open, setOpen] = useState(false);
  const portalRoot = usePortalContext();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Figma match</DemoTitle>
        <DemoHint>Воспроизведение макета sheet (padding=true) 1:1 — сверка через панель Figma.</DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Открыть макет'
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
        title='Headline text'
        withDividers
        onBackButtonClick={() => setOpen(false)}
        slotAfterHeadline={<QuestionTooltip tip='Headline tooltip' size='s' />}
        actionButton={
          <Button
            view={VIEW.Function}
            appearance={APPEARANCE.Neutral}
            icon={<MoreSVG />}
            aria-label='Действия'
            onClick={() => undefined}
          />
        }
        subHeadline={
          <Search
            value=''
            size='s'
            onChange={() => undefined}
            placeholder='Search'
            outline={false}
            background={false}
          />
        }
        content={
          <div className={styles.tagGrid}>
            {TAG_APPEARANCES.map((appearance, i) => (
              <Tag key={`${appearance}-${i}`} label='Label text' size='xs' appearance={appearance} />
            ))}
          </div>
        }
        approveButton={{ label: 'Label text', onClick: () => setOpen(false) }}
        cancelButton={{ label: 'Label text', onClick: () => setOpen(false) }}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof FigmaMatchRender> = {
  title: 'Components/BottomSheet/Examples/FigmaMatch',
  globals: { density: 'comfort' },
  component: FigmaMatchRender,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=12689-13277',
    },
  },
};

export default meta;

type Story = StoryObj<typeof FigmaMatchRender>;

export const FigmaMatch: Story = {
  tags: ['dev', 'test'],
};
