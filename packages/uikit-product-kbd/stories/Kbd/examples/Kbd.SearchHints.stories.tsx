import { SearchSVG } from '@ds/icons/interface/system';
import { Kbd, KbdPlatform, KbdShortcut } from '@ds/uikit-product-kbd';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';

// Подсказки клавиш в поповере сквозного поиска (Figma 18075:2666).
const meta: Meta<typeof Kbd> = {
  title: 'Uikit Product/Kbd/Kbd/Examples/SearchHints',
  component: Kbd,
  parameters: { layout: 'fullscreen', controls: { include: ['platform'] } },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

type SceneProps = { platform?: KbdPlatform };

function SearchScene({ platform }: SceneProps) {
  return (
    <>
      <span className={styles.searchTrigger}>
        <SearchSVG size={16} />
        Найти ресурс
        <KbdShortcut keys={['mod', '/']} platform={platform} />
      </span>
      <div className={styles.hints}>
        <span className={styles.hint}>
          <Kbd keyName='up' />
          <Kbd keyName='down' />
          Выбрать результат
        </span>
        <span className={styles.hint}>
          <Kbd keyName='enter' />
          Перейти
        </span>
        <span className={styles.hint}>
          <KbdShortcut keys={['mod', '/']} platform={platform} />
          Закрыть поиск
        </span>
      </div>
    </>
  );
}

export const SearchHints: Story = {
  tags: ['dev', 'test'],
  render: ({ platform }) => (
    <DemoPage>
      <DemoPanel width='wide' data-test-id={TEST_IDS.kbd.searchHints}>
        <DemoTitle>SearchHints</DemoTitle>
        <DemoHint>Клавиша — Kbd, сочетание — KbdShortcut; модификатор зависит от ОС (контрол platform).</DemoHint>
        <SearchScene platform={platform} />
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.kbd.searchHints)).toBeVisible();
  },
};
