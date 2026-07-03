import { CardSuggest } from '@ds/uikit-product-card-predefined';

const longTitle =
  'Очень длинный заголовок подсказки, который не помещается в две строки и обрезается через TruncateString';
const longDescription =
  'Очень длинное описание подсказки, которое не помещается в три строки и обрезается через TruncateString. Дополнительный текст для демонстрации обрезки.';

export function WithTruncate() {
  return (
    <div style={{ maxWidth: 320 }}>
      <CardSuggest title={longTitle} description={longDescription} truncate={{ title: 2, description: 3 }} />
    </div>
  );
}
