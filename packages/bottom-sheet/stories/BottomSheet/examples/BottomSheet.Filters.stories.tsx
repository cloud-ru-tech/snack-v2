import { BottomSheet } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { Switch } from '@ds/toggles';
import { QuestionTooltip } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const PERIOD_ITEMS = [
  { value: 'day', label: 'День' },
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
];

/**
 * Figma-сценарий «Фильтры»: back-кнопка + заголовок с подсказкой, chips в subtitle,
 * SegmentControl и переключатели в теле, «Применить / Сбросить» в футере.
 */
function FiltersRender() {
  const [open, setOpen] = useState(false);
  const [period, setPeriod] = useState('week');
  const [onlyFavourite, setOnlyFavourite] = useState(true);
  const [withArchived, setWithArchived] = useState(false);
  const [chips, setChips] = useState(['Активные', 'За месяц']);
  const portalRoot = usePortalContext();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Filters</DemoTitle>
        <DemoHint>Фильтры: chips в subtitle, SegmentControl и переключатели в теле, два действия в футере.</DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Открыть фильтры'
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
        title='Фильтры'
        onBackButtonClick={() => setOpen(false)}
        slotAfterTitle={<QuestionTooltip tip='Настройте параметры выборки' />}
        slotSecondTitle={
          <div className={styles.chipRow}>
            {chips.map(chip => (
              <Tag
                key={chip}
                label={chip}
                appearance='primary'
                size='s'
                onDelete={() => setChips(prev => prev.filter(c => c !== chip))}
              />
            ))}
          </div>
        }
        content={
          <div className={styles.contentColumn}>
            <SegmentControl items={PERIOD_ITEMS} value={period} onChange={setPeriod} width='full' />
            <div className={styles.switchRow}>
              <span>Только избранное</span>
              <Switch checked={onlyFavourite} onChange={setOnlyFavourite} />
            </div>
            <div className={styles.switchRow}>
              <span>Показывать архив</span>
              <Switch checked={withArchived} onChange={setWithArchived} />
            </div>
          </div>
        }
        approveButton={{ label: 'Применить', onClick: () => setOpen(false) }}
        cancelButton={{
          label: 'Сбросить',
          onClick: () => {
            setPeriod('week');
            setOnlyFavourite(false);
            setWithArchived(false);
            setChips([]);
          },
        }}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof FiltersRender> = {
  title: 'Components/BottomSheet/Examples/Filters',
  globals: { density: 'comfort' },
  component: FiltersRender,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

type Story = StoryObj<typeof FiltersRender>;

export const Filters: Story = {
  tags: ['dev', 'test'],
};
