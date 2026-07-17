import { Card, RADIUS, Radius } from '@ds/card';
import { KebabSVG, PlaceholderSVG } from '@ds/icons/interface/system';
import { Typography, VARIANT } from '@ds/typography';
import { CardCustom, MODE } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement, ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import { DEMO_CARD_IMAGE_ALT, DEMO_CARD_IMAGE_SRC } from '../../demos/constants';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof Card> = {
  title: 'Uikit Product/CardPredefined/CardCustom',
  component: Card,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Card>;

type ImageMode = (typeof MODE)[keyof typeof MODE];
type FooterMode = 'action' | 'callToAction' | 'promo' | 'dimension';
type EmblemKind = 'icon' | 'picture' | undefined;

const FUNCTION_BADGE_OPTIONS: CardCustom.FunctionBadgeProps['options'] = [
  { content: { option: 'Option 1' } },
  { content: { option: 'Option 2' } },
  { content: { option: 'Option 3' }, tagLabel: 'Tag' },
];

const keyRadii = Object.values(RADIUS);
const imageModes = [undefined, MODE.Little, MODE.Middle, MODE.Background] as const;
const footerModes: FooterMode[] = ['action', 'callToAction', 'promo', 'dimension'];

function renderImage(mode: ImageMode | undefined): ReactNode {
  switch (mode) {
    case MODE.Little:
      return <CardCustom.Image src={DEMO_CARD_IMAGE_SRC} alt={DEMO_CARD_IMAGE_ALT} mode={MODE.Little} />;
    case MODE.Middle:
      return <CardCustom.Image src={DEMO_CARD_IMAGE_SRC} alt={DEMO_CARD_IMAGE_ALT} mode={MODE.Middle} />;
    case MODE.Background:
      return <CardCustom.Image src={DEMO_CARD_IMAGE_SRC} alt={DEMO_CARD_IMAGE_ALT} mode={MODE.Background} />;
    default:
      return undefined;
  }
}

function renderFooter(mode: FooterMode): ReactNode {
  switch (mode) {
    case 'action':
      return <CardCustom.Footer.Action button={{ label: 'Label text' }} secondaryButton={{ label: 'Label text' }} />;
    case 'callToAction':
      return <CardCustom.Footer.CallToAction label='Call to action' icon={<PlaceholderSVG />} />;
    case 'promo':
      return <CardCustom.Footer.Promo button={{ label: 'Label text' }} />;
    case 'dimension':
      return (
        <CardCustom.Footer.Promo
          button={{ label: 'Buy' }}
          volume={{ currentValue: '999 999,00', oldValue: '1 000 000,00', dimension: '₽' }}
        />
      );
    default:
      return undefined;
  }
}

function renderEmblem(kind: EmblemKind): CardCustom.HeaderProps['emblem'] {
  if (kind === 'icon') {
    return { icon: PlaceholderSVG };
  }
  if (kind === 'picture') {
    return { src: DEMO_CARD_IMAGE_SRC, alt: DEMO_CARD_IMAGE_ALT };
  }
  return undefined;
}

type CellOptions = {
  radius?: Radius;
  disabled?: boolean;
  imageMode?: ImageMode;
  footer?: FooterMode;
  emblem?: EmblemKind;
  functionBadge?: boolean;
  body?: boolean;
};

function renderCardCustom({
  radius = RADIUS.M,
  disabled,
  imageMode,
  footer,
  emblem = 'icon',
  functionBadge,
  body = true,
}: CellOptions): ReactElement {
  return (
    <div className={styles.cardFrame}>
      <Card radius={radius} disabled={disabled} data-test-id={TEST_IDS.root}>
        {functionBadge && (
          <CardCustom.FunctionBadge icon={<KebabSVG />} options={FUNCTION_BADGE_OPTIONS} alwaysVisible />
        )}
        {renderImage(imageMode)}
        <CardCustom.Header
          title='Title text'
          description='Description text'
          metadata='Metadata text'
          emblem={renderEmblem(emblem)}
        />
        {body && (
          <CardCustom.Body>
            <Typography as='div' variant={VARIANT.body} size={radius === RADIUS.L ? 'l' : 'm'}>
              Body content text
            </Typography>
          </CardCustom.Body>
        )}
        {footer && renderFooter(footer)}
      </Card>
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Footer × Radius'
        firstColumnHeader='Footer'
        columnHeaders={keyRadii.map(radius => radius.toUpperCase())}
        rows={footerModes.map(footer => ({
          variantLabel: footer,
          cells: keyRadii.map(radius => renderCardCustom({ radius, footer, functionBadge: true })),
        }))}
      />

      <StoryTable
        sectionTitle='Image × Radius'
        firstColumnHeader='Image'
        columnHeaders={keyRadii.map(radius => radius.toUpperCase())}
        rows={imageModes.map(imageMode => ({
          variantLabel: imageMode ?? 'none',
          cells: keyRadii.map(radius => renderCardCustom({ radius, imageMode, emblem: undefined, body: false })),
        }))}
      />

      <StoryTable
        sectionTitle='Slots (radius=m)'
        firstColumnHeader='Slot'
        columnHeaders={['Card']}
        rows={[
          { variantLabel: 'emblem: icon', cells: [renderCardCustom({ emblem: 'icon' })] },
          { variantLabel: 'emblem: picture', cells: [renderCardCustom({ emblem: 'picture' })] },
          { variantLabel: 'functionBadge', cells: [renderCardCustom({ emblem: 'icon', functionBadge: true })] },
          { variantLabel: 'no emblem', cells: [renderCardCustom({ emblem: undefined })] },
        ]}
      />

      <StoryTable
        sectionTitle='State (radius=m)'
        firstColumnHeader='State'
        columnHeaders={['Card']}
        rows={[
          {
            variantLabel: 'default',
            cells: [renderCardCustom({ footer: 'action', functionBadge: true })],
          },
          {
            variantLabel: 'disabled',
            cells: [renderCardCustom({ footer: 'action', functionBadge: true, disabled: true })],
          },
        ]}
      />
    </div>
  ),
};
