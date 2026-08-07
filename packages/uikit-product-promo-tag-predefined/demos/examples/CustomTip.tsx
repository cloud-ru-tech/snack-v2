import { Link } from '@ds/link';
import { Typography } from '@ds/typography';
import { PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';
import { Fragment, MouseEvent } from 'react';

const CUSTOM_TOOLTIP_CONTENT = `Demo content, for replacement, use the property: ◆Slot...
Connect your local component with unique content to this property`;

const customTipVariants = [VARIANTS.Soon, VARIANTS.Latest, VARIANTS.Private, VARIANTS.Public] as const;

function handleLinkClick(e: MouseEvent) {
  e.preventDefault();
}

function CustomTooltipTip() {
  return (
    <>
      <Typography variant='body' size='s' style={{ whiteSpace: 'pre-line' }}>
        {CUSTOM_TOOLTIP_CONTENT}
      </Typography>
      <Link underlined insideText appearance='invertNeutral' label='Link text' onClick={handleLinkClick} />
    </>
  );
}

export function CustomTip() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      <Typography variant='body' size='s'>
        Без тултипа
      </Typography>
      <Typography variant='body' size='s'>
        С тултипом
      </Typography>
      {customTipVariants.map(variant => (
        <Fragment key={variant}>
          <div>
            <PromoTagPredefined variant={variant} />
          </div>
          <div>
            <PromoTagPredefined variant={variant} tooltip={{ tip: <CustomTooltipTip /> }} />
          </div>
        </Fragment>
      ))}
    </div>
  );
}
