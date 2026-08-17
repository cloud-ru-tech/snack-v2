import { APPEARANCE, Link, ROLE_APPEARANCE } from '@ds/link';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Link>;

const keyAppearances = [
  APPEARANCE.Primary,
  APPEARANCE.Neutral,
  APPEARANCE.Red,
  APPEARANCE.Orange,
  APPEARANCE.Yellow,
  APPEARANCE.Green,
  APPEARANCE.Blue,
  APPEARANCE.Violet,
  APPEARANCE.Pink,
] as const;

const underlinedStates = [false, true] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Appearance × Underlined (roleAppearance=regular)'
        firstColumnHeader='Appearance'
        columnHeaders={['underlined=false', 'underlined=true']}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: underlinedStates.map(u => (
            <Link key={String(u)} appearance={appearance} underlined={u} label='Link text' href='#' />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='insideText (внутри <p>)'
        firstColumnHeader='insideText'
        columnHeaders={['Link']}
        rows={[false, true].map(insideText => ({
          variantLabel: String(insideText),
          cells: [
            <p key={String(insideText)} className={styles.paragraph}>
              Подробнее о работе сервиса читайте{' '}
              <Link insideText={insideText} label='в документации' href='https://example.com' />, а также ознакомьтесь с
              условиями.
            </p>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='truncateVariant (container=200px)'
        firstColumnHeader='truncateVariant'
        columnHeaders={['Link']}
        rows={(['end', 'middle'] as const).map(variant => ({
          variantLabel: variant,
          cells: [
            <div key={variant} className={styles.narrow}>
              <Link truncateVariant={variant} label='very-long-document-name-abc-2024.pdf' href='#' />
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Role appearance × Appearance'
        firstColumnHeader='Role appearance'
        columnHeaders={keyAppearances.map(a => a)}
        rows={[ROLE_APPEARANCE.Regular, ROLE_APPEARANCE.OnAccent].map(roleAppearance => ({
          variantLabel: roleAppearance,
          cells: keyAppearances.map(appearance => (
            <div key={appearance} className={roleAppearance === ROLE_APPEARANCE.OnAccent ? styles.onAccent : undefined}>
              <Link roleAppearance={roleAppearance} appearance={appearance} label='Link text' href='#' />
            </div>
          )),
        }))}
      />
    </div>
  ),
};
