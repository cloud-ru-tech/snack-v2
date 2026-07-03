import { PlaceholderSVG } from '@ds/icons';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';

const longTitle =
  'Очень длинное название сервиса, которое не помещается в одну строку и обрезается через TruncateString';

export function WithTruncate() {
  return (
    <div style={{ maxWidth: 280 }}>
      <CardServiceLight title={longTitle} icon={<PlaceholderSVG size={24} />} truncate={{ title: 1 }} />
    </div>
  );
}
