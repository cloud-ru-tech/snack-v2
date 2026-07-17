import { APPEARANCE, Button, VIEW } from '@ds/button';
import { CloudSVG } from '@ds/icons/interface/product';
import { TREE_NAVIGATION_MODE, TreeNavigation } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { PageSectionContent, TREE_MENU_ITEMS } from '../demoData';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof TreeNavigation> = {
  title: 'Uikit Product/PageLayout/TreeNavigation',
  component: TreeNavigation,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof TreeNavigation>;

const header = {
  title: 'Облачный проект',
  icon: <CloudSVG />,
  description: 'Управление сетевыми ресурсами проекта',
  status: { label: 'Активно', appearance: 'green' as const },
  actions: (
    <>
      <Button view={VIEW.Outline} appearance={APPEARANCE.Neutral} label='Документация' />
      <Button view={VIEW.Filled} label='Создать сеть' />
    </>
  ),
};

const baseMenu = {
  menuTitle: 'Разделы',
  items: TREE_MENU_ITEMS,
  selected: 'subnets',
  withDefaultOpenedMenuList: true,
};

const content = <PageSectionContent />;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='mode'
        firstColumnHeader='mode'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'aside (open)',
            cells: [
              <div key='aside' className={styles.treeFrame} data-test-id={TEST_IDS.treeNavigation.root}>
                <TreeNavigation
                  mode={TREE_NAVIGATION_MODE.Aside}
                  header={header}
                  menu={{ ...baseMenu, defaultMenuOpened: true }}
                  content={content}
                />
              </div>,
            ],
          },
          {
            variantLabel: 'fixed',
            cells: [
              <div key='fixed' className={styles.treeFrame}>
                <TreeNavigation mode={TREE_NAVIGATION_MODE.Fixed} header={header} menu={baseMenu} content={content} />
              </div>,
            ],
          },
          {
            variantLabel: 'popover (closed)',
            cells: [
              <div key='popover' className={styles.treeFrame}>
                <TreeNavigation
                  mode={TREE_NAVIGATION_MODE.Popover}
                  header={header}
                  menu={{ ...baseMenu, defaultMenuOpened: false }}
                  content={content}
                />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
