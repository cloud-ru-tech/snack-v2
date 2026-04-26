import { TruncateString } from '@ds/truncate-string';

export function TruncateMultiline() {
  return (
    <div style={{ width: 260 }}>
      <TruncateString
        variant='end'
        maxLines={3}
        text='Длинное описание, которое укладывается в три строки, а затем обрезается с троеточием в конце.'
      />
    </div>
  );
}
