import { BottomSheet, BottomSheetProps, MEDIA_KIND, SnapPoint, TEST_IDS as PUBLIC_TEST_IDS } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle, DemoWarning } from '#storybook/components';

import { TEST_IDS } from './testIds';

const SNAP_POINT_PRESETS: Record<string, SnapPoint[] | undefined> = {
  auto: undefined,
  half: [0.5],
  'half-full': [0.5, 1],
  'peek-half-full': [0.25, 0.5, 1],
};

type SnapPreset = keyof typeof SNAP_POINT_PRESETS;

type StoryProps = BottomSheetProps & {
  showMedia: boolean;
  showHeader: boolean;
  showAfterHeadline: boolean;
  showSubHeadline: boolean;
  showBackButton: boolean;
  showActionButton: boolean;
  showFooter: boolean;
  longContent: boolean;
  snapPointsPreset: SnapPreset;
};

type Story = StoryObj<StoryProps>;

const SHORT_CONTENT =
  'Bottom-sheet — мобильный overlay, открывающийся снизу. Используйте его для диалогов, выпадающих списков, фильтров и любых полу-полно-экранных UI.';

const LONG_CONTENT = Array.from({ length: 40 })
  .map((_, i) => `Параграф ${i + 1}. ${SHORT_CONTENT}`)
  .join('\n\n');

function PlaygroundRender(args: StoryProps) {
  const {
    showMedia,
    showHeader,
    showAfterHeadline,
    showSubHeadline,
    showBackButton,
    showActionButton,
    showFooter,
    longContent,
    snapPointsPreset,
    title,
    // open/onClose спрятаны из argTypes — управление снизу через локальный useState
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    open: _open,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onClose: _onClose,
    content,
    ...rest
  } = args;

  const [open, setOpen] = useState(false);
  const portalRoot = usePortalContext();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>BottomSheet</DemoTitle>
        <DemoHint>Открыть bottom-sheet триггером ниже. Слоты, snap-points и оси — из Controls.</DemoHint>
        <DemoWarning>
          Только для мобильной версии браузера. На desktop поведение (swipe, snap-points, scroll-lock) может быть
          некорректным — используйте Modal или Drawer.
        </DemoWarning>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Открыть BottomSheet'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>

      <BottomSheet
        {...rest}
        open={open}
        onClose={() => setOpen(false)}
        container={portalRoot.current || undefined}
        snapPoints={SNAP_POINT_PRESETS[snapPointsPreset]}
        title={showHeader ? title : undefined}
        slotAfterHeadline={
          showHeader && showAfterHeadline ? (
            <span data-test-id={PUBLIC_TEST_IDS.slotAfterHeadline}>NEW</span>
          ) : undefined
        }
        subtitle={
          showHeader && showSubHeadline ? (
            <div data-test-id={PUBLIC_TEST_IDS.subHeadline}>SearchBar / SegmentControl …</div>
          ) : undefined
        }
        onBackButtonClick={showHeader && showBackButton ? () => setOpen(false) : undefined}
        actionButton={
          showHeader && showActionButton ? (
            <Button view='function' appearance='neutral' label='⋯' aria-label='Ещё' onClick={() => undefined} />
          ) : undefined
        }
        media={
          showMedia
            ? {
                src: 'https://placehold.co/360x184?text=Media',
                alt: 'Media',
                kind: MEDIA_KIND.Image,
              }
            : undefined
        }
        content={
          <div data-test-id={TEST_IDS.exampleContent}>{longContent ? LONG_CONTENT : content || SHORT_CONTENT}</div>
        }
        approveButton={showFooter ? { label: 'Подтвердить', onClick: () => setOpen(false) } : undefined}
        cancelButton={showFooter ? { label: 'Отмена', onClick: () => setOpen(false) } : undefined}
      />
    </DemoPage>
  );
}

const meta: Meta<StoryProps> = {
  title: 'Components/BottomSheet',
  globals: { density: 'comfort' },
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  args: {
    title: 'Bottom-sheet headline',
    showBackdrop: true,
    withDividers: false,
    safeArea: true,
    swipeEnabled: true,
    closeOnPopstate: true,
    snapPointsPreset: 'auto',
    showMedia: false,
    showHeader: true,
    showAfterHeadline: false,
    showSubHeadline: false,
    showBackButton: false,
    showActionButton: false,
    showFooter: true,
    footerActionsOrientation: 'horizontal',
    longContent: false,
  },
  argTypes: {
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    onSnapIndexChange: { table: { disable: true } },
    snapIndex: { table: { disable: true } },
    media: { table: { disable: true } },
    content: { table: { disable: true } },
    actionButton: { table: { disable: true } },
    slotAfterHeadline: { table: { disable: true } },
    subtitle: { table: { disable: true } },
    footer: { table: { disable: true } },
    onBackButtonClick: { table: { disable: true } },
    // Пропсы, которыми управляет render (story-toggle / preset / portal context root),
    // а не панель Controls — иначе это «контролы, которые ничего не делают».
    // snapPoints → [Stories]: snapPointsPreset; approve/cancel/additional/disclaimer → showFooter;
    // container → portal context root.
    snapPoints: { table: { disable: true } },
    approveButton: { table: { disable: true } },
    cancelButton: { table: { disable: true } },
    additionalButton: { table: { disable: true } },
    disclaimer: { table: { disable: true } },
    container: { table: { disable: true } },
    snapPointsPreset: {
      name: '[Stories]: snapPointsPreset',
      control: 'radio',
      options: Object.keys(SNAP_POINT_PRESETS),
      description:
        'Пресет `snapPoints` (доли высоты вьюпорта): `auto` — по контенту; `half` — `[0.5]`; ' +
        '`half-full` — `[0.5, 1]`; `peek-half-full` — `[0.25, 0.5, 1]` (peek-превью → половина → весь экран). ' +
        'На малом snap’е тело прокручивается, если контент выше его высоты — это ожидаемое поведение «превью → раскрытие».',
    },
    showMedia: { name: '[Stories]: showMedia', control: 'boolean' },
    showHeader: { name: '[Stories]: showHeader', control: 'boolean' },
    showAfterHeadline: {
      name: '[Stories]: showAfterHeadline',
      control: 'boolean',
      if: { arg: 'showHeader', eq: true },
    },
    showSubHeadline: { name: '[Stories]: showSubHeadline', control: 'boolean', if: { arg: 'showHeader', eq: true } },
    showBackButton: { name: '[Stories]: showBackButton', control: 'boolean', if: { arg: 'showHeader', eq: true } },
    showActionButton: { name: '[Stories]: showActionButton', control: 'boolean', if: { arg: 'showHeader', eq: true } },
    showFooter: { name: '[Stories]: showFooter', control: 'boolean' },
    longContent: { name: '[Stories]: longContent', control: 'boolean' },
    defaultSnapIndex: { control: { type: 'number', min: 0 } },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.triggerOpen)).toBeVisible();
  },
};
