import { PlaceholderSVG } from '@ds/icons';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';

const longTitle =
  'Очень длинное название сервиса, которое не помещается в одну строку и обрезается через TruncateString';

export function WithTruncate() {
  return (
    <div style={{ maxWidth: 280 }}>
      <CardServiceSmall title={longTitle} emblem={{ icon: PlaceholderSVG }} truncate={{ title: 1 }} />
    </div>
  );
}
