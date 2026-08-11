import { BottomSheetCustom, BottomSheetCustomProps, SnapPoint } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle, DemoWarning } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const SNAP_POINT_PRESETS: Record<string, SnapPoint[] | undefined> = {
  auto: undefined,
  half: [0.5],
  'half-full': [0.5, 1],
  'peek-half-full': [0.25, 0.5, 1],
  'full-height': [1],
};

type SnapPreset = keyof typeof SNAP_POINT_PRESETS;

type StoryProps = BottomSheetCustomProps & {
  snapPointsPreset: SnapPreset;
};

function PlaygroundRender(args: StoryProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- open отбрасываем, открытие управляется триггером
    open: _open,
    snapPointsPreset,
    ...rest
  } = args;
  const [isOpen, setOpen] = useState(false);
  const portalRoot = usePortalContext();
  const openSheet = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Открыть кастомный BottomSheet триггером ниже. Состав слотов задан вручную в render.</DemoHint>
        <DemoWarning>
          Только для мобильной версии браузера. На desktop поведение (swipe, snap-points, scroll-lock) может быть
          некорректным — используйте Modal или Drawer.
        </DemoWarning>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.bottomSheetCustom.triggerOpen}
            label='Open custom bottom sheet'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={openSheet}
          />
        </DemoActions>
      </DemoPanel>
      {/* Low-level BottomSheetCustom не знает про title-слот → accessible name задаём aria-label сами. */}
      <BottomSheetCustom
        {...rest}
        open={isOpen}
        onClose={close}
        container={portalRoot.current || undefined}
        snapPoints={SNAP_POINT_PRESETS[snapPointsPreset]}
        aria-label='Custom composition'
      >
        <BottomSheetCustom.Header title='Custom composition' subtitle='Шапка, тело и футер собираются вручную.' />
        <BottomSheetCustom.Body
          content={
            <div className={styles.customBody}>
              <p>Тело BottomSheet собирается из произвольной разметки — ограничений нет.</p>
              <p>Скролл включается автоматически при большом содержимом.</p>
            </div>
          }
        />
        <BottomSheetCustom.Footer>
          <div className={styles.footer}>
            <Button fullWidth label='Close' appearance={APPEARANCE.Neutral} view={VIEW.Outline} onClick={close} />
            <Button fullWidth label='Confirm' appearance={APPEARANCE.Primary} view={VIEW.Filled} onClick={close} />
          </div>
        </BottomSheetCustom.Footer>
      </BottomSheetCustom>
    </DemoPage>
  );
}

const meta: Meta<StoryProps> = {
  title: 'Components/BottomSheet/BottomSheetCustom',
  globals: { density: 'comfort' },
  component: BottomSheetCustom,
  parameters: { layout: 'fullscreen' },
  args: {
    showBackdrop: true,
    lockScroll: true,
    swipeEnabled: true,
    safeArea: true,
    closeOnPopstate: true,
    snapPointsPreset: 'auto',
    'data-test-id': TEST_IDS.bottomSheetCustom.root,
  },
  argTypes: {
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    onSnapIndexChange: { table: { disable: true } },
    snapIndex: { table: { disable: true } },
    snapPoints: { table: { disable: true } },
    children: { table: { disable: true } },
    container: { table: { disable: true } },
    snapPointsPreset: {
      name: '[Stories]: snapPointsPreset',
      control: 'radio',
      options: Object.keys(SNAP_POINT_PRESETS),
    },
    defaultSnapIndex: { control: { type: 'number', min: 0 } },
  },
  render: PlaygroundRender,
};
export default meta;

type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.bottomSheetCustom.triggerOpen)).toBeVisible();
  },
};
