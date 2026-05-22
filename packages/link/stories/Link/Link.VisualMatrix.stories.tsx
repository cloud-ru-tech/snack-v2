import { APPEARANCE, Link, ROLE } from '@ds/link';
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
        sectionTitle='Appearance × Underlined (role=regular)'
        firstColumnHeader='Appearance'
        columnHeaders={['underlined=false', 'underlined=true']}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: underlinedStates.map(u => (
            <Link key={String(u)} appearance={appearance} underlined={u} text='Link text' href='#' />
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
              <Link insideText={insideText} text='в документации' href='https://example.com' />, а также ознакомьтесь с
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
              <Link truncateVariant={variant} text='very-long-document-name-abc-2024.pdf' href='#' />
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Role × Appearance'
        firstColumnHeader='Role'
        columnHeaders={keyAppearances.map(a => a)}
        rows={[ROLE.Regular, ROLE.OnAccent].map(role => ({
          variantLabel: role,
          cells: keyAppearances.map(appearance => (
            <div key={appearance} className={role === ROLE.OnAccent ? styles.onAccent : undefined}>
              <Link role={role} appearance={appearance} text='Link text' href='#' />
            </div>
          )),
        }))}
      />
    </div>
  ),
};
