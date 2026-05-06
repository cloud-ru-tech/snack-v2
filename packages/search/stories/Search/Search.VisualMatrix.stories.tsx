import { Search, SIZE } from '@ds/search';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Search>;

const sizes = [SIZE.S, SIZE.M, SIZE.L] as const;

function Wrap({ children }: { children: JSX.Element }) {
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
