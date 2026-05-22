import { PlaceholderSVG } from '@ds/icons';
import { Search, SIZE } from '@ds/search';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const buttonFieldSlot = {
  action: <PlaceholderSVG size={16} />,
  onClick: () => {},
} as const;

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Search>;

const sizes = [SIZE.S, SIZE.M, SIZE.L] as const;

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
        sectionTitle='ButtonField × Outline'
        firstColumnHeader='Slot'
        columnHeaders={['outline=true', 'outline=false']}
        rows={[
          {
            variantLabel: 'без buttonField',
            cells: [
              <Wrap key='no-bf-outline'>
                <Search placeholder='Поиск' outline />
              </Wrap>,
              <Wrap key='no-bf-no-outline'>
                <Search placeholder='Поиск' outline={false} />
              </Wrap>,
            ],
          },
          {
            variantLabel: 'с buttonField',
            cells: [
              <Wrap key='bf-outline'>
                <Search placeholder='Поиск' outline buttonField={buttonFieldSlot} />
              </Wrap>,
              <Wrap key='bf-no-outline'>
                <Search placeholder='Поиск' outline={false} buttonField={buttonFieldSlot} />
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
