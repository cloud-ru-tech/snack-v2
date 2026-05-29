import { Widget } from '@ds/uikit-product-widget';

export function LoadingState() {
  return (
    <Widget
      header={{ title: 'Billing', href: '#' }}
      state='loading'
      loadingState={{ showSkeleton: true }}
      actions={[{ label: 'Refresh' }]}
    >
      Billing summary
    </Widget>
  );
}
