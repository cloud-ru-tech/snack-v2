import { TruncateString } from '@ds/truncate-string';

export function TruncateEnd() {
  return (
    <div style={{ width: 220 }}>
      <TruncateString variant='end' text='Очень длинный заголовок, который не помещается' maxLines={1} />
    </div>
  );
}
