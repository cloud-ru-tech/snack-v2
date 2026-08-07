import {
  PREVIEW_CONTEXT,
  PreviewContext,
  PromoTagPredefined,
  Variant,
  VARIANTS,
} from '@ds/uikit-product-promo-tag-predefined';
import { ComponentType, MouseEvent } from 'react';

import { Canvas } from '#docs/components/Canvas';

import promoTagPredefinedDoc from '../docs/props.json';
import { CUSTOM_TOOLTIP_CONTENT } from '../stories/constants';
import { CustomTooltipTip } from '../stories/PromoTagPredefined/CustomTooltipTip';

type DemoProps = {
  variant: Variant;
  context?: PreviewContext;
  tooltipTip?: string;
};

function sampleSupportClick(e: MouseEvent) {
  e.preventDefault();
}

function PromoTagPredefinedCanvas({ variant, context, tooltipTip = CUSTOM_TOOLTIP_CONTENT }: DemoProps) {
  if (variant === VARIANTS.Default) {
    return <PromoTagPredefined variant={VARIANTS.Default} />;
  }

  if (
    variant === VARIANTS.Soon ||
    variant === VARIANTS.Latest ||
    variant === VARIANTS.Private ||
    variant === VARIANTS.Public
  ) {
    const tip = tooltipTip?.trim();
    return tip ? (
      <PromoTagPredefined variant={variant} tooltip={{ tip: <CustomTooltipTip text={tip} /> }} />
    ) : (
      <PromoTagPredefined variant={variant} />
    );
  }

  if (variant === VARIANTS.Preview) {
    return <PromoTagPredefined variant={VARIANTS.Preview} context={context ?? PREVIEW_CONTEXT.Service} />;
  }

  if (variant === VARIANTS.Connecting) {
    return <PromoTagPredefined variant={VARIANTS.Connecting} tooltip={{ onSupportClick: sampleSupportClick }} />;
  }

  return <PromoTagPredefined variant={variant} />;
}

export function PromoTagPredefinedDemo() {
  return (
    <Canvas
      component={PromoTagPredefinedCanvas as ComponentType<DemoProps>}
      componentName='PromoTagPredefined'
      componentDoc={promoTagPredefinedDoc.PromoTagPredefined}
      defaultProps={{
        variant: VARIANTS.Preview,
        context: PREVIEW_CONTEXT.Service,
        tooltipTip: CUSTOM_TOOLTIP_CONTENT,
      }}
      controls={{
        variant: {
          type: 'select',
          options: Object.values(VARIANTS),
        },
        context: {
          type: 'select',
          options: Object.values(PREVIEW_CONTEXT),
        },
        tooltipTip: {
          type: 'text',
        },
      }}
      excludeProps={['className', 'tooltip', 'innerRef']}
    />
  );
}
