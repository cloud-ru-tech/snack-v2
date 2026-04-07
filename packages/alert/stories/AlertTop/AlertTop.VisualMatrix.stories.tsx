import { PlusSVG } from '@design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import alertReadme from '../../README.md?raw';
import { AlertTop, type AlertTopProps, ALIGN, APPEARANCE, SIZE } from '../../src';

const meta: Meta<AlertTopProps> = {
  title: 'Components/Alert/AlertTop',
  component: AlertTop,
  parameters: {
    readme: { content: alertReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3222-166&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<AlertTopProps>;

const appearances = Object.values(APPEARANCE);
const sizes = Object.values(SIZE);

/** Достаточно для двух кнопок с иконками в превью ячейки (раньше 480 обрезало actions). */
const cellWidthPx = 600;

/** Широкая таблица + скролл внутри `StoryTable`, чтобы колонки не сжимали баннер до обрезки. */
const visualMatrixTableMinWidthPx = 720;

const shortTitle = 'Title';
const shortDescription = 'Description text';
const longTitle =
  'Very long title that should exceed one line when the container is narrow enough for collapse and truncation demos';
const longDescription =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam voluptatum quidem voluptates quod voluptate quibusdam quia.';

const matrixActions: AlertTopProps['actions'] = {
  primary: { label: 'Primary', icon: <PlusSVG />, onClick: () => undefined },
  secondary: {
    label: 'Secondary',
    icon: <PlusSVG />,
    iconPosition: 'after',
    onClick: () => undefined,
  },
};

const matrixOnClose = () => undefined;

const matrixStackStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 32,
  maxWidth: '100%',
  minWidth: 0,
};

function wrapCell(node: ReactNode, key: string) {
  return (
    <div key={key} style={{ width: '100%', maxWidth: cellWidthPx, minWidth: 0, boxSizing: 'border-box' }}>
      {node}
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div style={matrixStackStyle}>
      <StoryTable
        sectionTitle='Appearance × Size'
        firstColumnHeader='Appearance'
        columnHeaders={sizes.map(s => s.toUpperCase())}
        tableMinWidthPx={visualMatrixTableMinWidthPx}
        rows={appearances.map(appearance => ({
          variantLabel: appearance,
          cells: sizes.map(size =>
            wrapCell(
              <AlertTop appearance={appearance} size={size} title={shortTitle} description={shortDescription} />,
              `${appearance}-${size}`,
            ),
          ),
        }))}
      />

      <StoryTable
        sectionTitle='Chrome (neutral, title + description)'
        firstColumnHeader='Variant'
        columnHeaders={['S']}
        tableMinWidthPx={visualMatrixTableMinWidthPx}
        rows={[
          {
            variantLabel: 'Default',
            cells: [
              wrapCell(
                <AlertTop
                  appearance={APPEARANCE.Neutral}
                  size={SIZE.S}
                  title={shortTitle}
                  description={shortDescription}
                />,
                'top-default-s',
              ),
            ],
          },
          {
            variantLabel: 'No icon',
            cells: [
              wrapCell(
                <AlertTop
                  appearance={APPEARANCE.Neutral}
                  size={SIZE.S}
                  icon={false}
                  title={shortTitle}
                  description={shortDescription}
                />,
                'top-no-icon-s',
              ),
            ],
          },
          {
            variantLabel: 'Close',
            cells: [
              wrapCell(
                <AlertTop
                  appearance={APPEARANCE.Neutral}
                  size={SIZE.S}
                  title={shortTitle}
                  description={shortDescription}
                  onClose={matrixOnClose}
                />,
                'top-close-s',
              ),
            ],
          },
          {
            variantLabel: 'Actions',
            cells: [
              wrapCell(
                <AlertTop
                  appearance={APPEARANCE.Neutral}
                  size={SIZE.S}
                  title={shortTitle}
                  description={shortDescription}
                  actions={matrixActions}
                />,
                'top-actions-s',
              ),
            ],
          },
          {
            variantLabel: 'Close + actions',
            cells: [
              wrapCell(
                <AlertTop
                  appearance={APPEARANCE.Neutral}
                  size={SIZE.S}
                  title={shortTitle}
                  description={shortDescription}
                  onClose={matrixOnClose}
                  actions={matrixActions}
                />,
                'top-close-actions-s',
              ),
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Align × Size (close + actions)'
        firstColumnHeader='Size · Align'
        columnHeaders={['']}
        tableMinWidthPx={visualMatrixTableMinWidthPx}
        rows={sizes.flatMap(size =>
          ([ALIGN.Vertical, ALIGN.Horizontal] as const).map(align => ({
            variantLabel: `${size.toUpperCase()} · ${align === ALIGN.Vertical ? 'Vertical' : 'Horizontal'}`,
            cells: [
              wrapCell(
                <AlertTop
                  appearance={APPEARANCE.Neutral}
                  size={size}
                  align={align}
                  title={shortTitle}
                  description={shortDescription}
                  onClose={matrixOnClose}
                  actions={matrixActions}
                />,
                `top-align-${size}-${align}`,
              ),
            ],
          })),
        )}
      />

      <StoryTable
        sectionTitle='Content (neutral, M)'
        firstColumnHeader='Variant'
        columnHeaders={['']}
        tableMinWidthPx={visualMatrixTableMinWidthPx}
        rows={[
          {
            variantLabel: 'Title + description',
            cells: [
              wrapCell(
                <AlertTop
                  appearance={APPEARANCE.Neutral}
                  size={SIZE.M}
                  title={shortTitle}
                  description={shortDescription}
                />,
                'top-content-both',
              ),
            ],
          },
          {
            variantLabel: 'Title only',
            cells: [
              wrapCell(
                <AlertTop appearance={APPEARANCE.Neutral} size={SIZE.M} title={shortTitle} description={null} />,
                'top-title',
              ),
            ],
          },
          {
            variantLabel: 'Description only',
            cells: [
              wrapCell(
                <AlertTop appearance={APPEARANCE.Neutral} size={SIZE.M} description={shortDescription} />,
                'top-desc',
              ),
            ],
          },
          {
            variantLabel: 'Truncated title (1 line)',
            cells: [
              wrapCell(
                <AlertTop
                  appearance={APPEARANCE.Neutral}
                  size={SIZE.M}
                  title={longTitle}
                  truncate={{ title: 1 }}
                  description={shortDescription}
                />,
                'top-truncate',
              ),
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Collapsible (narrow width, collapsed)'
        firstColumnHeader='Size'
        columnHeaders={['']}
        tableMinWidthPx={visualMatrixTableMinWidthPx}
        rows={sizes.map(size => ({
          variantLabel: `${size.toUpperCase()} · Long text + actions`,
          cells: [
            wrapCell(
              <AlertTop
                appearance={APPEARANCE.Neutral}
                size={size}
                collapsible
                title={longTitle}
                description={longDescription}
                onClose={matrixOnClose}
                actions={matrixActions}
              />,
              `top-collapsible-${size}`,
            ),
          ],
        }))}
      />
    </div>
  ),
};
