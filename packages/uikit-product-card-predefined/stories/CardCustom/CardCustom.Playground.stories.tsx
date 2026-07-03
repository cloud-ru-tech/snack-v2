import { Card, RADIUS, Radius } from '@ds/card';
import { KebabSVG, PlaceholderSVG } from '@ds/icons';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { Typography, VARIANT } from '@ds/typography';
import { CardCustom, MODE } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { DEMO_CARD_IMAGE_ALT, DEMO_CARD_IMAGE_SRC } from '../../demos/constants';
import { TEST_IDS } from './testIds';

const ACTION_FOOTER: CardCustom.FooterActionProps = {
  button: { label: 'Label text', onClick: fn() },
  secondaryButton: { label: 'Label text', onClick: fn() },
};

const PROMO_FOOTER: CardCustom.FooterPromoProps = {
  button: { label: 'Label text', onClick: fn() },
  volume: {
    currentValue: '999 999,00',
    oldValue: '1 000 000,00',
    dimension: '₽',
  },
};

const FUNCTION_BADGE_OPTIONS: CardCustom.FunctionBadgeProps['options'] = [
  { content: { option: 'Option 1' }, onClick: fn() },
  { content: { option: 'Option 2' }, onClick: fn() },
  { content: { option: 'Option 3' }, tagLabel: 'Tag', onClick: fn() },
];

type ImageMode = (typeof MODE)[keyof typeof MODE];

const FOOTER_MODES = {
  action: 'action',
  promo: 'promo',
  callToAction: 'callToAction',
} as const;

type FooterMode = (typeof FOOTER_MODES)[keyof typeof FOOTER_MODES];

type StoryArgs = {
  title: string;
  description: string;
  metadata: string;
  body: string;
  /** Режим футера. Не задано — карточка без футера. */
  footerMode?: FooterMode;
  showEmblem: boolean;
  showFunctionBadge: boolean;
  /** Режим изображения. Не задано — карточка без изображения. */
  imageMode?: ImageMode;
  radius: Radius;
  disabled: boolean;
  'data-test-id'?: string;
};

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

function renderFooter(mode: FooterMode | undefined): ReactNode {
  switch (mode) {
    case FOOTER_MODES.action:
      return <CardCustom.Footer.Action {...ACTION_FOOTER} />;
    case FOOTER_MODES.promo:
      return <CardCustom.Footer.Promo {...PROMO_FOOTER} />;
    case FOOTER_MODES.callToAction:
      return <CardCustom.Footer.CallToAction label='Call to action' icon={<PlaceholderSVG />} />;
    default:
      return undefined;
  }
}

const meta: Meta<StoryArgs> = {
  title: 'Uikit Product/CardPredefined/CardCustom',
  component: Card,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Title text',
    description: 'Description text',
    metadata: 'Metadata text',
    body: 'Body content text',
    footerMode: FOOTER_MODES.action,
    showEmblem: true,
    showFunctionBadge: true,
    imageMode: MODE.Little,
    radius: RADIUS.M,
    disabled: false,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    footerMode: {
      control: 'radio',
      options: Object.values(FOOTER_MODES),
    },
    radius: {
      control: 'radio',
      options: Object.values(RADIUS),
    },
    showEmblem: { control: 'boolean' },
    showFunctionBadge: { control: 'boolean' },
    imageMode: {
      control: 'radio',
      options: Object.values(MODE),
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

function CardCustomPlaygroundExample(args: StoryArgs) {
  const { title, description, metadata, body, footerMode, showEmblem, showFunctionBadge, imageMode, radius, disabled } =
    args;
  const footer = renderFooter(footerMode);
  const image = renderImage(imageMode);
  const emblem = showEmblem ? { icon: PlaceholderSVG } : undefined;

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>CardCustom</DemoTitle>
        <DemoHint>
          Компоновка карточки через `Card` + `CardCustom.Header` / `CardCustom.Image` / `CardCustom.FunctionBadge` /
          `CardCustom.Footer.*` и `Typography` для body.
        </DemoHint>
        <DemoActions block>
          <DemoResizable>
            <Card
              radius={radius}
              disabled={disabled}
              backgroundPredefined={BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level}
              data-test-id={args['data-test-id']}
            >
              {showFunctionBadge && <CardCustom.FunctionBadge icon={<KebabSVG />} options={FUNCTION_BADGE_OPTIONS} />}
              {image}
              <CardCustom.Header title={title} description={description} metadata={metadata} emblem={emblem} />
              {body && (
                <CardCustom.Body>
                  <Typography as='div' variant={VARIANT.body} size={radius === RADIUS.L ? 'l' : 'm'}>
                    {body}
                  </Typography>
                </CardCustom.Body>
              )}
              {footer}
            </Card>
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <CardCustomPlaygroundExample {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
