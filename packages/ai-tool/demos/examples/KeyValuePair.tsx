import { AiToolKeyValue } from '@ds/ai-tool';

export function KeyValuePair() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      <AiToolKeyValue label='region' value='ru-central1' variant='line' />
      <AiToolKeyValue label='description' value='Постоянный инстанс для прод-окружения' variant='column' />
    </div>
  );
}
