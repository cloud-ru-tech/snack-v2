import { Kbd, KBD_KEY_NAME, KBD_PLATFORM } from '@ds/uikit-product-kbd';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Kbd> = {
  title: 'Uikit Product/Kbd/Kbd',
  component: Kbd,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

// Примеры клавиш из спецификации (Figma 19641:169) и длинные подписи — проверка min-width и nowrap.
const contentRows = [
  { label: 'Arrows', keys: ['↑', '↓', '←', '→'] },
  { label: 'Actions', keys: ['↵', 'Esc', '/', 'K'] },
  { label: 'Modifiers', keys: ['Ctrl', '⌘', 'Alt', 'Shift'] },
  { label: 'Long', keys: ['Backspace', 'Page Down', 'F12', 'Space'] },
];

const keyNames = Object.values(KBD_KEY_NAME);
const platforms = Object.values(KBD_PLATFORM);

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Content'
        firstColumnHeader='Group'
        columnHeaders={['1', '2', '3', '4']}
        rows={contentRows.map(({ label, keys }) => ({
          variantLabel: label,
          cells: keys.map(key => <Kbd key={key}>{key}</Kbd>),
        }))}
      />
      <StoryTable
        sectionTitle='KeyName × Platform'
        firstColumnHeader='KeyName'
        columnHeaders={platforms}
        rows={keyNames.map(keyName => ({
          variantLabel: keyName,
          cells: platforms.map(platform => <Kbd key={platform} keyName={keyName} platform={platform} />),
        }))}
      />
      <StoryTable
        sectionTitle='Alternative'
        firstColumnHeader='Kind'
        columnHeaders={platforms}
        rows={[
          {
            variantLabel: 'Alternative',
            cells: platforms.map(platform => (
              <span key={platform} className={styles.combination}>
                <Kbd keyName='up' platform={platform} />
                или
                <Kbd keyName='down' platform={platform} />
              </span>
            )),
          },
        ]}
      />
    </div>
  ),
};
