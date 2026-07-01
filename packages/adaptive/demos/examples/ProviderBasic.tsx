import { AdaptiveProvider, isMobileLayout, LAYOUT_TYPE, LayoutType, useAdaptiveLayout } from '@ds/adaptive';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { Typography } from '@ds/typography';
import { Flex } from '@ds/uikit-product-flex';
import { useState } from 'react';

const LAYOUT_ITEMS = Object.values(LAYOUT_TYPE).map(value => ({ value, label: value }));

// Потребитель берёт раскладку из AdaptiveProvider через useAdaptiveLayout() — без пропа и обёрток.
// Так же ведут себя Adaptive*-компоненты внутри (на mobile уходят в BottomSheet).
function LayoutSurface() {
  const { layoutType } = useAdaptiveLayout();
  const mobile = isMobileLayout(layoutType);

  return (
    <Flex gap='2m' align='center' wrap>
      <Tag
        appearance={mobile ? 'blue' : 'green'}
        label={mobile ? 'Мобильная ветка → BottomSheet' : 'Десктопная ветка'}
      />
      <Typography variant='body' size='s'>
        useAdaptiveLayout(): {layoutType}
      </Typography>
    </Flex>
  );
}

export function ProviderBasic() {
  const [layoutType, setLayoutType] = useState<LayoutType>(LAYOUT_TYPE.Desktop);

  return (
    <AdaptiveProvider layoutType={layoutType}>
      <Flex direction='column' gap='2m' align='flex-start'>
        <SegmentControl
          items={LAYOUT_ITEMS}
          value={layoutType}
          onChange={value => setLayoutType(value as LayoutType)}
        />
        <LayoutSurface />
      </Flex>
    </AdaptiveProvider>
  );
}
