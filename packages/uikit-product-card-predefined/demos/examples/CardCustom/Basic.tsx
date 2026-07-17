import { Card } from '@ds/card';
import { KebabSVG, PlaceholderSVG } from '@ds/icons/interface/system';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { Typography, VARIANT } from '@ds/typography';
import { CardCustom } from '@ds/uikit-product-card-predefined';

import { DEMO_CARD_IMAGE_ALT, DEMO_CARD_IMAGE_SRC } from '../../constants';

const FUNCTION_BADGE_OPTIONS = [
  { content: { option: 'Option 1' } },
  { content: { option: 'Option 2' } },
  { content: { option: 'Option 3' }, tagLabel: 'Tag' },
];

export function Basic() {
  return (
    <Card radius='m' backgroundPredefined={BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level}>
      <CardCustom.Image src={DEMO_CARD_IMAGE_SRC} alt={DEMO_CARD_IMAGE_ALT} />
      <CardCustom.FunctionBadge icon={<KebabSVG />} options={FUNCTION_BADGE_OPTIONS} />
      <CardCustom.Header
        title='Title text'
        description='Description text'
        metadata='Metadata text'
        emblem={{ icon: PlaceholderSVG, appearance: 'primary' }}
      />
      <CardCustom.Body>
        <Typography as='div' variant={VARIANT.body} size='m'>
          Body content text
        </Typography>
      </CardCustom.Body>
      <CardCustom.Footer.Action button={{ label: 'Label text' }} />
    </Card>
  );
}
