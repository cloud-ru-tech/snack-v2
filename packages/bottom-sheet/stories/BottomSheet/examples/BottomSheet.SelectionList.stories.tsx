import { BottomSheet } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Checkbox } from '@ds/toggles';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const OPTIONS = [
  { id: 'compute', label: 'Compute' },
  { id: 'storage', label: 'Object Storage' },
  { id: 'network', label: 'Networking' },
  { id: 'database', label: 'Managed Databases' },
];

/**
 * Figma-сценарий выбора из списка: чекбокс «Выбрать все» c indeterminate-состоянием,
 * список строк-опций и действие «Готово» со счётчиком в футере.
 */
function SelectionListRender() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(['compute']);
  const portalRoot = usePortalContext();

  const allChecked = selected.length === OPTIONS.length;
  const someChecked = selected.length > 0 && !allChecked;

  const toggle = (id: string) => setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  const toggleAll = () => setSelected(allChecked ? [] : OPTIONS.map(o => o.id));

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>SelectionList</DemoTitle>
        <DemoHint>Список с чекбоксами: «Выбрать все» с indeterminate, счётчик выбранного в действии.</DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Выбрать сервисы'
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
        title='Сервисы'
        withDividers
        content={
          <div className={styles.contentColumn}>
            {/* htmlFor связывает подпись с нативным input'ом внутри Checkbox — клик по тексту переключает чекбокс. */}
            <label className={styles.checkRow} htmlFor='sel-all'>
              <Checkbox
                id='sel-all'
                data-test-id={TEST_IDS.selection.selectAll}
                checked={allChecked}
                indeterminate={someChecked}
                onChange={toggleAll}
              />
              <span>Выбрать все</span>
            </label>
            {OPTIONS.map(option => (
              <label key={option.id} className={styles.checkRow} htmlFor={`sel-${option.id}`}>
                <Checkbox
                  id={`sel-${option.id}`}
                  checked={selected.includes(option.id)}
                  onChange={() => toggle(option.id)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        }
        approveButton={{ label: `Готово (${selected.length})`, onClick: () => setOpen(false) }}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof SelectionListRender> = {
  title: 'Components/BottomSheet/Examples/SelectionList',
  globals: { density: 'comfort' },
  component: SelectionListRender,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

type Story = StoryObj<typeof SelectionListRender>;

export const SelectionList: Story = {
  tags: ['dev', 'test'],
};
