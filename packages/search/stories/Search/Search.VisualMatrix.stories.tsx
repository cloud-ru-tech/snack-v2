import { APPEARANCE, Button, VIEW } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Search, SIZE, Size } from '@ds/search';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Search>;

const sizes = [SIZE.S, SIZE.M, SIZE.L] as const;

// Типовое наполнение слота: иконочная кнопка того же размера, что поле.
function afterContentSlot(size: Size) {
  return (
    <Button
      size={size}
      view={VIEW.Function}
      appearance={APPEARANCE.Neutral}
      icon={<PlaceholderSVG />}
      minWidth={false}
      onClick={() => {}}
    />
  );
}

function Wrap({ children }: { children: ReactNode }) {
  return <div className={styles.item}>{children}</div>;
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Size × State'
        firstColumnHeader='Size'
        columnHeaders={['default', 'loading', 'disabled']}
        rows={sizes.map(size => ({
          variantLabel: size,
          cells: [
            <Wrap key={`${size}-d`}>
              <Search size={size} placeholder='Поиск' />
            </Wrap>,
            <Wrap key={`${size}-l`}>
              <Search size={size} placeholder='Поиск' loading />
            </Wrap>,
            <Wrap key={`${size}-dis`}>
              <Search size={size} placeholder='Поиск' disabled />
            </Wrap>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='AfterContent × Size'
        firstColumnHeader='Слот'
        columnHeaders={sizes.map(size => size.toUpperCase())}
        rows={[
          {
            variantLabel: 'без afterContent',
            cells: sizes.map(size => (
              <Wrap key={`no-slot-${size}`}>
                <Search size={size} placeholder='Поиск' />
              </Wrap>
            )),
          },
          {
            variantLabel: 'с afterContent',
            cells: sizes.map(size => (
              <Wrap key={`slot-${size}`}>
                <Search size={size} placeholder='Поиск' afterContent={afterContentSlot(size)} />
              </Wrap>
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='Outline'
        firstColumnHeader='Вариант'
        columnHeaders={['Search']}
        rows={[
          {
            variantLabel: 'outline=true',
            cells: [
              <Wrap key='outline-on'>
                <Search placeholder='Поиск' outline afterContent={afterContentSlot(SIZE.M)} />
              </Wrap>,
            ],
          },
          {
            variantLabel: 'outline=false',
            cells: [
              <Wrap key='outline-off'>
                <Search placeholder='Поиск' outline={false} afterContent={afterContentSlot(SIZE.M)} />
              </Wrap>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Background'
        firstColumnHeader='Вариант'
        columnHeaders={['Search']}
        rows={[
          {
            variantLabel: 'с фоном',
            cells: [
              <Wrap key='bg-on'>
                <Search placeholder='Поиск' background />
              </Wrap>,
            ],
          },
          {
            variantLabel: 'без фона',
            cells: [
              <Wrap key='bg-off'>
                <Search placeholder='Поиск' background={false} />
              </Wrap>,
            ],
          },
        ]}
      />
    </div>
  ),
};
