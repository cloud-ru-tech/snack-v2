import { Button, VIEW } from '@ds/button';
import { ProductIcons } from '@ds/icons';
import { Status } from '@ds/status';
import { Headline } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Headline> = {
  title: 'Uikit Product/PageLayout/Headline',
  component: Headline,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Headline>;

const LONG_TITLE =
  'Очень длинный заголовок страницы виртуальных машин, который должен быть обрезан многоточием в одну строку';

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Slots'
        firstColumnHeader='Scenario'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'title only',
            cells: [
              <div key='t' className={styles.frame}>
                <Headline title='Виртуальные машины' data-test-id={TEST_IDS.headline.root} />
              </div>,
            ],
          },
          {
            variantLabel: '+ actions',
            cells: [
              <div key='a' className={styles.frame}>
                <Headline title='Виртуальные машины' actions={<Button label='Создать' />} />
              </div>,
            ],
          },
          {
            variantLabel: '+ before / after',
            cells: [
              <div key='ba' className={styles.frame}>
                <Headline
                  title='Виртуальные машины'
                  beforeHeadline={<Button view={VIEW.Simple} icon={<ProductIcons.CloseSVG />} />}
                  afterHeadline={<Status label='Активно' appearance='green' />}
                />
              </div>,
            ],
          },
          {
            variantLabel: '+ subHeader',
            cells: [
              <div key='s' className={styles.frame}>
                <Headline title='Виртуальные машины' subHeader='Управление инстансами проекта' />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Truncate'
        firstColumnHeader='truncateTitle'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'true',
            cells: [
              <div key='trunc' className={styles.columnNarrow}>
                <Headline title={LONG_TITLE} truncateTitle />
              </div>,
            ],
          },
          {
            variantLabel: 'false',
            cells: [
              <div key='full' className={styles.columnNarrow}>
                <Headline title={LONG_TITLE} />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
