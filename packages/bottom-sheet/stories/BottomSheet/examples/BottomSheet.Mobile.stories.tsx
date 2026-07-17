import { BottomSheet, MEDIA_KIND, SnapPoint } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { SegmentControl } from '@ds/segment-control';
import { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoSectionLabel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

type PhoneSize = 'sm' | 'md' | 'lg';
type SnapPreset = 'auto' | 'half' | 'half-full';

const PHONE_SIZE_ITEMS = [
  { value: 'sm' as const, label: 'SE · 360' },
  { value: 'md' as const, label: 'iPhone · 390' },
  { value: 'lg' as const, label: 'Pro Max · 430' },
];

const SNAP_PRESET_ITEMS = [
  { value: 'auto' as const, label: 'auto' },
  { value: 'half' as const, label: '50%' },
  { value: 'half-full' as const, label: '50% → full' },
];

const SNAP_POINT_PRESETS: Record<SnapPreset, SnapPoint[] | undefined> = {
  auto: undefined,
  half: [0.5],
  'half-full': [0.5, 1],
};

const PHONE_SIZE_CLASS: Record<PhoneSize, string> = {
  sm: styles.phoneSizeSm,
  md: styles.phoneSizeMd,
  lg: styles.phoneSizeLg,
};

const SAMPLE_CONTENT = (
  <div>
    {Array.from({ length: 12 }).map((_, i) => (
      <p key={i}>
        Параграф {i + 1}. Контент мобильного bottom-sheet&apos;а. Прокручиваемое тело, чтобы продемонстрировать
        scroll-поведение внутри ограниченного containing block&apos;а.
      </p>
    ))}
  </div>
);

function MobileDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [phoneSize, setPhoneSize] = useState<PhoneSize>('md');
  const [snapPreset, setSnapPreset] = useState<SnapPreset>('half-full');
  const [open, setOpen] = useState(false);
  const [withMedia, setWithMedia] = useState(false);
  const [withSubtitle, setWithSubtitle] = useState(false);
  const [withFooter, setWithFooter] = useState(true);

  return (
    <DemoPage className={styles.phonePage}>
      <DemoPanel width='narrow' className={styles.controlsColumn}>
        <DemoTitle>Mobile composition</DemoTitle>
        <DemoHint>
          Bottom-sheet привязан к safe-area телефонной рамки через <code>container</code> + containing block (
          <code>transform: translateZ(0)</code>). Sheet и backdrop живут внутри рамки, а не на всём вьюпорте Storybook.
        </DemoHint>

        <div className={styles.controlsRow}>
          <DemoSectionLabel>Размер экрана</DemoSectionLabel>
          <SegmentControl items={PHONE_SIZE_ITEMS} value={phoneSize} onChange={setPhoneSize} />
        </div>

        <div className={styles.controlsRow}>
          <DemoSectionLabel>Snap-points</DemoSectionLabel>
          <SegmentControl items={SNAP_PRESET_ITEMS} value={snapPreset} onChange={setSnapPreset} />
          <DemoHint>
            <code>auto</code> — sheet по высоте контента. <code>50%</code> — половина экрана. <code>50% → full</code> —
            открывается на половину, drag вверх раскрывает на full.
          </DemoHint>
        </div>

        <div className={styles.controlsRow}>
          <DemoSectionLabel>Слоты</DemoSectionLabel>
          <DemoActions>
            <Button
              view={withMedia ? VIEW.Filled : VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              label='Media'
              onClick={() => setWithMedia(v => !v)}
            />
            <Button
              view={withSubtitle ? VIEW.Filled : VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              label='Subtitle'
              onClick={() => setWithSubtitle(v => !v)}
            />
            <Button
              view={withFooter ? VIEW.Filled : VIEW.Outline}
              appearance={APPEARANCE.Neutral}
              label='Footer'
              onClick={() => setWithFooter(v => !v)}
            />
          </DemoActions>
        </div>

        <div className={styles.controlsActions}>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            view={VIEW.Filled}
            appearance={APPEARANCE.Primary}
            label='Открыть BottomSheet'
            onClick={() => setOpen(true)}
          />
          <Button
            data-test-id={TEST_IDS.triggerReset}
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            label='Закрыть'
            onClick={() => setOpen(false)}
            disabled={!open}
          />
        </div>
      </DemoPanel>

      <div className={`${styles.phoneFrame} ${PHONE_SIZE_CLASS[phoneSize]}`}>
        <div className={styles.phoneNotch} />
        <div className={styles.phoneStatusBar}>
          <span>9:41</span>
          <span>●●● ▮</span>
        </div>

        <div className={styles.phoneSafeArea} ref={frameRef}>
          <BottomSheet
            open={open}
            onClose={() => setOpen(false)}
            container={frameRef.current ?? undefined}
            snapPoints={SNAP_POINT_PRESETS[snapPreset]}
            defaultSnapIndex={0}
            safeArea={false}
            title='Bottom-sheet'
            subtitle={
              withSubtitle ? <div data-test-id={TEST_IDS.exampleContent}>SearchBar / SegmentControl</div> : undefined
            }
            media={
              withMedia
                ? { src: 'https://placehold.co/360x184?text=Media', alt: 'Media', kind: MEDIA_KIND.Image }
                : undefined
            }
            content={SAMPLE_CONTENT}
            approveButton={withFooter ? { label: 'Подтвердить', onClick: () => setOpen(false) } : undefined}
          />
        </div>

        <div className={styles.phoneHomeIndicator} />
      </div>
    </DemoPage>
  );
}

const meta: Meta<typeof MobileDemo> = {
  title: 'Components/BottomSheet/Examples/Mobile',
  globals: { density: 'comfort' },
  component: MobileDemo,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof MobileDemo>;

export const Mobile: Story = {
  tags: ['dev'],
};
