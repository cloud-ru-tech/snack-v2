import { KBD_PLATFORM, KbdPlatform, KbdShortcut, KbdShortcutKey, useKbdShortcut } from '@ds/uikit-product-kbd';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof KbdShortcut> = {
  title: 'Uikit Product/Kbd/KbdShortcut',
  component: KbdShortcut,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof KbdShortcut>;

const platforms = Object.values(KBD_PLATFORM);

const shortcuts: { label: string; keys: KbdShortcutKey[] }[] = [
  { label: 'Modifier + key', keys: ['mod', 'K'] },
  { label: 'Two modifiers', keys: ['mod', 'shift', 'P'] },
  { label: 'Ctrl + Alt', keys: ['ctrl', 'alt', 'Delete'] },
  { label: 'Meta', keys: ['meta', 'E'] },
  { label: 'Single key', keys: ['esc'] },
];

type ShortcutTextProps = { keys: KbdShortcutKey[]; platform: KbdPlatform };

function ShortcutText({ keys, platform }: ShortcutTextProps) {
  return <span className={styles.text}>{useKbdShortcut(keys, platform)}</span>;
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Keys × Platform'
        firstColumnHeader='Keys'
        columnHeaders={platforms}
        rows={shortcuts.map(({ label, keys }) => ({
          variantLabel: label,
          cells: platforms.map(platform => <KbdShortcut key={platform} keys={keys} platform={platform} />),
        }))}
      />
      <StoryTable
        sectionTitle='useKbdShortcut × Platform'
        firstColumnHeader='Keys'
        columnHeaders={platforms}
        rows={shortcuts.slice(0, 2).map(({ label, keys }) => ({
          variantLabel: label,
          cells: platforms.map(platform => <ShortcutText key={platform} keys={keys} platform={platform} />),
        }))}
      />
    </div>
  ),
};
