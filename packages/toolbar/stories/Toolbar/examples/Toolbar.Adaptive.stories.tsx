import { LAYOUT_TYPE, TEST_IDS as TOOLBAR_TEST_IDS, Toolbar } from '@ds/toolbar';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const filterConfig = {
  open: true,
  filters: [
    {
      id: 'status',
      type: 'single' as const,
      label: 'Статус',
      options: [
        { value: 'active', label: 'Активные' },
        { value: 'archived', label: 'Архив' },
      ],
    },
  ],
  defaultValue: {},
};

const moreActions = [
  { content: { option: 'Экспорт' }, onClick: () => undefined },
  { content: { option: 'Настройки' }, onClick: () => undefined },
];

function AdaptiveExample() {
  const [search, setSearch] = useState('');
  const [desktopFilterValue, setDesktopFilterValue] = useState<Record<string, unknown>>({});
  const [mobileFilterValue, setMobileFilterValue] = useState<Record<string, unknown>>({});

  const commonToolbarProps = {
    search: { value: search, onChange: setSearch, placeholder: 'Поиск' },
    onRefresh: () => undefined,
    moreActions,
  };

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Adaptive</DemoTitle>
        <DemoHint>
          Один компонент Toolbar с layoutType: desktop — Droplist и ChipChoiceRow size s; mobile — BottomSheet для «⋯» и
          ChipChoiceRow size s. Откройте «⋯», чтобы увидеть разницу.
        </DemoHint>
        <DemoActions block>
          <section className={styles.adaptiveBlock}>
            <p className={styles.adaptiveLabel}>Desktop — Droplist, filter chips s</p>
            <div className={styles.containerAdaptive}>
              <Toolbar
                {...commonToolbarProps}
                layoutType={LAYOUT_TYPE.Desktop}
                data-test-id={TEST_IDS.adaptiveDesktop}
                filterRow={{
                  ...filterConfig,
                  value: desktopFilterValue,
                  onChange: setDesktopFilterValue,
                }}
              />
            </div>
          </section>

          <section className={styles.adaptiveBlock}>
            <p className={styles.adaptiveLabel}>Mobile — BottomSheet для «⋯», filter chips s</p>
            <div className={styles.containerAdaptiveMobile}>
              <Toolbar
                {...commonToolbarProps}
                layoutType={LAYOUT_TYPE.Mobile}
                data-test-id={TEST_IDS.adaptiveMobile}
                filterRow={{
                  ...filterConfig,
                  value: mobileFilterValue,
                  onChange: setMobileFilterValue,
                }}
              />
            </div>
          </section>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof AdaptiveExample> = {
  title: 'Components/Toolbar/Examples/Adaptive',
  component: AdaptiveExample,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof AdaptiveExample>;

export const Adaptive: Story = {
  tags: ['dev', 'test'],
  render: () => <AdaptiveExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId(TEST_IDS.adaptiveDesktop)).toBeVisible();
    await expect(canvas.getByTestId(TEST_IDS.adaptiveMobile)).toBeVisible();
    await expect(canvas.getAllByTestId(TOOLBAR_TEST_IDS.moreActionsButton)).toHaveLength(2);
    await expect(canvas.getAllByTestId(TOOLBAR_TEST_IDS.filterButton)).toHaveLength(2);
  },
};
