import { BottomSheet, BottomSheetProps, MEDIA_KIND } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle, StoryTable } from '#storybook/components';

import { TEST_IDS } from './testIds';

const SIMPLE_CONTENT = <p>Базовое содержимое bottom-sheet&apos;а: заголовок, body, footer-кнопка для подтверждения.</p>;

const ACTION_BUTTON = (
  <Button view='function' appearance='neutral' label='⋯' aria-label='Ещё' onClick={() => undefined} />
);
const FOOTER_BUTTON = (
  <Button fullWidth view='filled' appearance='primary' label='Подтвердить' onClick={() => undefined} />
);

type Combo = {
  key: string;
  label: string;
  props: Omit<BottomSheetProps, 'open' | 'onClose'>;
};

// Композиции слотов — одна ось матрицы. Снимаются visual.spec'ом: клик по триггеру →
// открыть → screenshot → закрыть → следующий (full-viewport overlay рендерить в ячейке нельзя:
// portal + position: fixed + react-remove-scroll лочит скролл всей страницы).
const SLOT_COMBOS: Combo[] = [
  { key: 'only-content', label: 'only content', props: { content: SIMPLE_CONTENT } },
  { key: 'title', label: '+title', props: { title: 'Bottom-sheet headline', content: SIMPLE_CONTENT } },
  {
    key: 'title-slot-after',
    label: '+title+slotAfter',
    props: { title: 'Bottom-sheet headline', slotAfterTitle: <span>NEW</span>, content: SIMPLE_CONTENT },
  },
  {
    key: 'title-footer',
    label: '+title+footer',
    props: { title: 'Bottom-sheet headline', content: SIMPLE_CONTENT, footer: FOOTER_BUTTON },
  },
  {
    key: 'all-headline-slots',
    label: '+all-headline-slots',
    props: {
      title: 'С back- и action-кнопками',
      slotAfterTitle: <span>NEW</span>,
      onBackButtonClick: () => undefined,
      actionButton: ACTION_BUTTON,
      content: SIMPLE_CONTENT,
      footer: FOOTER_BUTTON,
    },
  },
];

const AXIS_COMBOS: Combo[] = [
  {
    key: 'media',
    label: '+ media (image)',
    props: {
      media: { src: 'https://placehold.co/360x184?text=Media', alt: 'Media', kind: MEDIA_KIND.Image },
      title: 'With media',
      content: SIMPLE_CONTENT,
      footer: FOOTER_BUTTON,
    },
  },
  {
    // Icon-вариант (Figma bottomSheetMediaIcon 360×104): иконка с padding-top: 24px,
    // body сохраняет horizontal padding — отдельная SCSS-ветка `[data-media-kind='icon']`.
    key: 'media-icon',
    label: '+ media (icon)',
    props: {
      media: { src: 'https://placehold.co/96x96?text=Icon', alt: 'Icon', kind: MEDIA_KIND.Icon },
      title: 'With icon media',
      content: SIMPLE_CONTENT,
      footer: FOOTER_BUTTON,
    },
  },
  {
    key: 'dividers',
    label: '+ dividers',
    props: { withDividers: true, title: 'With dividers', content: SIMPLE_CONTENT, footer: FOOTER_BUTTON },
  },
  {
    key: 'no-handle',
    label: '+ swipeEnabled=false (no handle)',
    props: { swipeEnabled: false, title: 'Без handle', content: SIMPLE_CONTENT, footer: FOOTER_BUTTON },
  },
  {
    // Footer actions, ориентация vertical (не дефолт — дефолт horizontal): 2 кнопки в столбик,
    // full-width, primary сверху. Без явного footerActionsOrientation пара отрендерилась бы горизонтально.
    key: 'actions-vertical',
    label: '+ actions (vertical)',
    props: {
      title: 'Footer actions vertical',
      content: SIMPLE_CONTENT,
      footerActionsOrientation: 'vertical',
      approveButton: { label: 'Подтвердить', onClick: () => undefined },
      cancelButton: { label: 'Отмена', onClick: () => undefined },
    },
  },
  {
    // Footer actions, ориентация horizontal: кнопки в ряд через space-between (secondary слева,
    // primary справа) — соответствие Figma bottomBar.buttonGroup.
    key: 'actions-horizontal',
    label: '+ actions (horizontal)',
    props: {
      title: 'Footer actions horizontal',
      content: SIMPLE_CONTENT,
      footerActionsOrientation: 'horizontal',
      approveButton: { label: 'Ок', onClick: () => undefined },
      cancelButton: { label: 'Отмена', onClick: () => undefined },
    },
  },
];

function triggerCell(combo: Combo, onOpen: (c: Combo) => void) {
  return (
    <Button
      key={combo.key}
      data-test-id={TEST_IDS.vm.trigger(combo.key)}
      label={combo.label}
      view={VIEW.Outline}
      appearance={APPEARANCE.Neutral}
      onClick={() => onOpen(combo)}
    />
  );
}

function VisualMatrixCanvas() {
  const [active, setActive] = useState<Combo | null>(null);
  const close = () => setActive(null);

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Visual matrix</DemoTitle>
        <DemoHint>
          Каждый триггер открывает одну композицию bottom-sheet&apos;а. Открыт всегда максимум один sheet — overlay
          full-viewport, поэтому в ячейке его рендерить нельзя. Снимки собираются visual.spec&apos;ом: клик → screenshot
          → закрыть → следующий.
        </DemoHint>

        <StoryTable
          sectionTitle='Slot composition'
          firstColumnHeader='Variant'
          columnHeaders={SLOT_COMBOS.map(c => c.label)}
          rows={[{ variantLabel: 'default', cells: SLOT_COMBOS.map(c => triggerCell(c, setActive)) }]}
        />

        <StoryTable
          sectionTitle='Visual axes'
          firstColumnHeader='Sheet'
          columnHeaders={AXIS_COMBOS.map(c => c.label)}
          rows={[{ variantLabel: 'composed', cells: AXIS_COMBOS.map(c => triggerCell(c, setActive)) }]}
        />
      </DemoPanel>

      {active && (
        <BottomSheet
          key={active.key}
          open
          onClose={close}
          {...active.props}
          footer={
            // Fallback-футер только когда комбинация не задаёт ни `footer`, ни action-кнопки —
            // иначе перетёрли бы approve/cancel-путь (и его ориентацию).
            active.props.footer ??
            (active.props.approveButton || active.props.cancelButton ? undefined : (
              <Button
                fullWidth
                view={VIEW.Filled}
                appearance={APPEARANCE.Neutral}
                label='Закрыть'
                data-test-id={TEST_IDS.vm.dismiss}
                onClick={close}
              />
            ))
          }
        />
      )}
    </DemoPage>
  );
}

const meta: Meta<typeof VisualMatrixCanvas> = {
  title: 'Components/BottomSheet',
  globals: { density: 'comfort' },
  component: VisualMatrixCanvas,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

type Story = StoryObj<typeof VisualMatrixCanvas>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
};
