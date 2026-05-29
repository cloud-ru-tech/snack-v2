import { WIDTH } from '@ds/segment-control';
import { Widget } from '@ds/uikit-product-widget';

export function DefaultContent() {
  return (
    <Widget
      header={{ title: 'Cloud servers', href: '#' }}
      segmentControl={{
        width: WIDTH.Full,
        defaultValue: 'overview',
        items: [
          { value: 'overview', label: 'Overview' },
          { value: 'events', label: 'Events' },
        ],
      }}
    >
      Keep product metrics, shortcuts, and status details in one compact card.
    </Widget>
  );
}
