import { BottomSheet } from '@ds/bottom-sheet';
import { APPEARANCE, Button, VIEW } from '@ds/button';
import { usePortalContext } from '@ds/portal-context';
import { Search } from '@ds/search';
import { Tag } from '@ds/tag';
import { QuestionTooltip } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const ALL_TAGS = ['Production', 'Staging', 'Dev', 'Backend', 'Frontend', 'Database', 'Network', 'Critical', 'Billing'];

/**
 * Figma-сценарий picker'а тегов: подсказка в шапке, поиск в subHeadline фильтрует сетку тегов,
 * клик по тегу переключает выбор, футер подтверждает выбор со счётчиком.
 */
function TagPickerRender() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>(['Production']);
  const portalRoot = usePortalContext();

  const visible = ALL_TAGS.filter(tag => tag.toLowerCase().includes(query.toLowerCase()));

  const toggle = (tag: string) =>
    setSelected(prev => (prev.includes(tag) ? prev.filter(x => x !== tag) : [...prev, tag]));

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>TagPicker</DemoTitle>
        <DemoHint>Поиск в subHeadline фильтрует сетку тегов; клик переключает выбор.</DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Выбрать теги'
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
        title='Теги'
        slotAfterHeadline={<QuestionTooltip tip='Отметьте теги, по которым нужно отфильтровать' />}
        subHeadline={
          <Search data-test-id={TEST_IDS.tagPicker.search} value={query} onChange={setQuery} placeholder='Поиск тега' />
        }
        content={
          <div className={styles.tagGrid}>
            {visible.map(tag => (
              <Tag
                key={tag}
                label={tag}
                size='s'
                appearance={selected.includes(tag) ? 'primary' : 'neutral'}
                onClick={() => toggle(tag)}
              />
            ))}
          </div>
        }
        approveButton={{ label: `Применить (${selected.length})`, onClick: () => setOpen(false) }}
        cancelButton={{ label: 'Отмена', onClick: () => setOpen(false) }}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof TagPickerRender> = {
  title: 'Components/BottomSheet/Examples/TagPicker',
  globals: { density: 'comfort' },
  component: TagPickerRender,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

type Story = StoryObj<typeof TagPickerRender>;

export const TagPicker: Story = {
  tags: ['dev', 'test'],
};
