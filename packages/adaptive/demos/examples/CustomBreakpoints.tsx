import { AdaptiveProvider, isMobileLayout, useAdaptiveBootstrap, useAdaptiveLayout } from '@ds/adaptive';
import { Tag } from '@ds/tag';
import { Typography } from '@ds/typography';
import { Flex } from '@ds/uikit-product-flex';

// Раскладка приходит из контекста; Tag перекрашивается, когда ширина окна пересекает порог.
function LayoutSurface() {
  const { layoutType } = useAdaptiveLayout();
  const mobile = isMobileLayout(layoutType);

  return <Tag appearance={mobile ? 'blue' : 'green'} label={`layoutType: ${layoutType}`} />;
}

export function CustomBreakpoints() {
  // Брейкпоинты переопределяются на уровне приложения: mobile-порог опущен с 767 до 480 px.
  // useAdaptiveBootstrap() читает ширину окна в корне приложения и передаёт результат в AdaptiveProvider.
  const { layoutType } = useAdaptiveBootstrap({ breakpoints: { mobile: 480 } });

  return (
    <AdaptiveProvider layoutType={layoutType}>
      <Flex direction='column' gap='2m' align='flex-start'>
        <Typography variant='body' size='s'>
          Порог mobile опущен до 480 px. Сузьте окно до этой ширины, чтобы раскладка стала мобильной.
        </Typography>
        <LayoutSurface />
      </Flex>
    </AdaptiveProvider>
  );
}
