import { Button } from '@ds/button';
import { Dropdown, STATE } from '@ds/dropdown';
import { SearchPrivate } from '@ds/search-private';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const SimpleContent = () => <div className={styles.content}>Содержимое dropdown</div>;

const SHORT_ITEMS = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург'];
const LONG_ITEMS = Array.from({ length: 24 }, (_, i) => `Элемент списка ${i + 1}`);

function renderList(items: string[], className?: string) {
  return (
    <ul className={cn(styles.list, className)}>
      {items.map(item => (
        <li key={item} className={styles.listItem}>
          {item}
        </li>
      ))}
    </ul>
  );
}

const placements = ['bottom-start', 'bottom', 'bottom-end'] as const;

// Слоты шапки и футера — по мастеру `popupDropdownHeader` / `popupDropdownFooter`:
// titleWrapper (title + slotAfterTitle) → slotSecondTitle (search) → divider; футер — кнопки + divider.
const CHROME_ITEMS = SHORT_ITEMS.slice(0, 3);

const chromeFooter = (
  <div className={styles.row}>
    <Button size='s' view='outline' appearance='neutral' label='Сбросить' />
    <Button size='s' label='Применить' />
  </div>
);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Placement'
        firstColumnHeader='Opened'
        columnHeaders={[...placements]}
        rows={[
          {
            variantLabel: 'open',
            cells: placements.map(placement => (
              <div key={placement} className={styles.cell}>
                <Dropdown open placement={placement} content={<SimpleContent />}>
                  <Button label={placement} />
                </Dropdown>
              </div>
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='States'
        firstColumnHeader='State'
        columnHeaders={['loading', 'not-found', 'no-data', 'data-error']}
        rows={[
          {
            variantLabel: 'open',
            cells: [
              <div key='loading' className={styles.cell}>
                <Dropdown open state={{ type: STATE.Loading }} content={null}>
                  <Button label='loading' />
                </Dropdown>
              </div>,
              <div key='not-found' className={styles.cell}>
                <Dropdown
                  open
                  state={{ type: STATE.NotFound, content: 'Ничего не найдено', actionLabel: 'Retry' }}
                  content={null}
                >
                  <Button label='not-found' />
                </Dropdown>
              </div>,
              <div key='no-data' className={styles.cell}>
                <Dropdown
                  open
                  state={{ type: STATE.NoData, content: 'Нет данных', actionLabel: 'Retry' }}
                  content={null}
                >
                  <Button label='no-data' />
                </Dropdown>
              </div>,
              <div key='data-error' className={styles.cell}>
                <Dropdown
                  open
                  state={{ type: STATE.DataError, content: 'Ошибка загрузки', actionLabel: 'Retry' }}
                  content={null}
                >
                  <Button label='data-error' />
                </Dropdown>
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Chrome — header / footer / dividers'
        firstColumnHeader='Chrome'
        columnHeaders={['header + divider', 'header + search', 'footer + divider', 'all + dividers']}
        rows={[
          {
            variantLabel: 'open',
            cells: [
              <div key='header-divider' className={styles.chromeCell}>
                <Dropdown
                  open
                  title='Сортировать по'
                  headerDivider
                  bodyPadding={false}
                  content={renderList(CHROME_ITEMS)}
                >
                  <Button label='header + divider' />
                </Dropdown>
              </div>,
              <div key='header-search' className={styles.chromeCell}>
                <Dropdown
                  open
                  title='Сортировать по'
                  search={<SearchPrivate size='s' placeholder='Поиск' />}
                  headerDivider
                  bodyPadding={false}
                  content={renderList(CHROME_ITEMS)}
                >
                  <Button label='header + search' />
                </Dropdown>
              </div>,
              <div key='footer-divider' className={styles.chromeCell}>
                <Dropdown
                  open
                  footer={chromeFooter}
                  footerDivider
                  bodyPadding={false}
                  content={renderList(CHROME_ITEMS)}
                >
                  <Button label='footer + divider' />
                </Dropdown>
              </div>,
              <div key='all' className={styles.chromeCell}>
                <Dropdown
                  open
                  title='Сортировать по'
                  search={<SearchPrivate size='s' placeholder='Поиск' />}
                  headerDivider
                  footer={chromeFooter}
                  footerDivider
                  bodyPadding={false}
                  content={renderList(CHROME_ITEMS)}
                >
                  <Button label='all' />
                </Dropdown>
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Content shape'
        firstColumnHeader='Items'
        columnHeaders={['short list', 'long list (scrollable)']}
        rows={[
          {
            variantLabel: 'open',
            cells: [
              <div key='short' className={styles.cell}>
                <Dropdown open content={renderList(SHORT_ITEMS)}>
                  <Button label='Открыть список' />
                </Dropdown>
              </div>,
              <div key='long' className={styles.cell}>
                <Dropdown open content={renderList(LONG_ITEMS, styles.longList)}>
                  <Button label='Длинный список' />
                </Dropdown>
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
