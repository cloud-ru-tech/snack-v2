import { PlusSVG } from '@design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import alertReadme from '../../README.md?raw';
import { Alert, type AlertProps, ALIGN, APPEARANCE, SIZE } from '../../src';

const meta: Meta<AlertProps> = {
  title: 'Components/Alert/Alert',
  component: Alert,
  parameters: {
    readme: { content: alertReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3222-166&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<AlertProps>;

const appearances = Object.values(APPEARANCE);
const sizes = Object.values(SIZE);

const shortTitle = 'Title';
const shortDescription = 'Description text';
const longTitle =
  'Very long title that should exceed one line when the container is narrow enough for collapse and truncation demos';
const longDescription =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam voluptatum quidem voluptates quod voluptate quibusdam quia.';

const matrixActions: AlertProps['actions'] = {
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

/** Горизонтальный скролл остаётся внутри `StoryTable` (`.container`), без вылезания за канвас превью. */
const visualMatrixTableMinWidthPx = 720;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div style={matrixStackStyle}>
      <StoryTable
        sectionTitle='Appearance × Size (outline)'
        firstColumnHeader='Appearance'
        columnHeaders={sizes.map(s => s.toUpperCase())}
        tableMinWidthPx={visualMatrixTableMinWidthPx}
        rows={appearances.map(appearance => ({
          variantLabel: appearance,
          cells: sizes.map(size => (
            <Alert
              key={`outline-${appearance}-${size}`}
              appearance={appearance}
              size={size}
              title={shortTitle}
              description={shortDescription}
              outline
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Appearance × Size (filled)'
        firstColumnHeader='Appearance'
        columnHeaders={sizes.map(s => s.toUpperCase())}
        tableMinWidthPx={visualMatrixTableMinWidthPx}
        rows={appearances.map(appearance => ({
          variantLabel: appearance,
          cells: sizes.map(size => (
            <Alert
              key={`filled-${appearance}-${size}`}
              appearance={appearance}
              size={size}
              title={shortTitle}
              description={shortDescription}
              outline={false}
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Chrome (neutral, outline, title + description)'
        firstColumnHeader='Variant'
        columnHeaders={['S']}
        tableMinWidthPx={visualMatrixTableMinWidthPx}
        rows={[
          {
            variantLabel: 'Default',
            cells: [
              <Alert
                key='chrome-default-s'
                appearance={APPEARANCE.Neutral}
                size={SIZE.S}
                title={shortTitle}
                description={shortDescription}
                outline
              />,
            ],
          },
          {
            variantLabel: 'No icon',
            cells: [
              <Alert
                key='chrome-no-icon-s'
                appearance={APPEARANCE.Neutral}
                size={SIZE.S}
                icon={false}
                title={shortTitle}
                description={shortDescription}
                outline
              />,
            ],
          },
          {
            variantLabel: 'Close',
            cells: [
              <Alert
                key='chrome-close-s'
                appearance={APPEARANCE.Neutral}
                size={SIZE.S}
                title={shortTitle}
                description={shortDescription}
                outline
                onClose={matrixOnClose}
              />,
            ],
          },
          {
            variantLabel: 'Actions',
            cells: [
              <Alert
                key='chrome-actions-s'
                appearance={APPEARANCE.Neutral}
                size={SIZE.S}
                title={shortTitle}
                description={shortDescription}
                outline
                actions={matrixActions}
              />,
            ],
          },
          {
            variantLabel: 'Close + actions',
            cells: [
              <Alert
                key='chrome-close-actions-s'
                appearance={APPEARANCE.Neutral}
                size={SIZE.S}
                title={shortTitle}
                description={shortDescription}
                outline
                onClose={matrixOnClose}
                actions={matrixActions}
              />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Align × Size (neutral, outline, close + actions)'
        firstColumnHeader='Size · Align'
        columnHeaders={['']}
        tableMinWidthPx={visualMatrixTableMinWidthPx}
        rows={sizes.flatMap(size =>
          ([ALIGN.Vertical, ALIGN.Horizontal] as const).map(align => ({
            variantLabel: `${size.toUpperCase()} · ${align === ALIGN.Vertical ? 'Vertical' : 'Horizontal'}`,
            cells: [
              <Alert
                key={`align-${size}-${align}`}
                appearance={APPEARANCE.Neutral}
                size={size}
                align={align}
                title={shortTitle}
                description={shortDescription}
                outline
                onClose={matrixOnClose}
                actions={matrixActions}
              />,
            ],
          })),
        )}
      />

      <StoryTable
        sectionTitle='Content (neutral, M, outline)'
        firstColumnHeader='Variant'
        columnHeaders={['']}
        tableMinWidthPx={visualMatrixTableMinWidthPx}
        rows={[
          {
            variantLabel: 'Title + description',
            cells: [
              <Alert
                key='content-both'
                appearance={APPEARANCE.Neutral}
                size={SIZE.M}
                title={shortTitle}
                description={shortDescription}
                outline
              />,
            ],
          },
          {
            variantLabel: 'Title only',
            cells: [
              <Alert
                key='content-title'
                appearance={APPEARANCE.Neutral}
                size={SIZE.M}
                title={shortTitle}
                description={null}
                outline
              />,
            ],
          },
          {
            variantLabel: 'Description only',
            cells: [
              <Alert
                key='content-desc'
                appearance={APPEARANCE.Neutral}
                size={SIZE.M}
                description={shortDescription}
                outline
              />,
            ],
          },
          {
            variantLabel: 'Truncated title (1 line)',
            cells: [
              <Alert
                key='content-truncate'
                appearance={APPEARANCE.Neutral}
                size={SIZE.M}
                title={longTitle}
                truncate={{ title: 1 }}
                description={shortDescription}
                outline
              />,
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
            <Alert
              key={`collapsible-${size}`}
              appearance={APPEARANCE.Neutral}
              size={size}
              collapsible
              title={longTitle}
              description={longDescription}
              outline
              onClose={matrixOnClose}
              actions={matrixActions}
            />,
          ],
        }))}
      />
    </div>
  ),
};
