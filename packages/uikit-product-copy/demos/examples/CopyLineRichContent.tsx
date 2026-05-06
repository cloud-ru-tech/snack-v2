import { CopyLine } from '@ds/uikit-product-copy';

export function CopyLineRichContent() {
  return (
    <CopyLine
      content={
        <span>
          <strong>Token:</strong> <code>sk-prod-9000</code>
        </span>
      }
      valueToCopy='sk-prod-9000'
    />
  );
}
