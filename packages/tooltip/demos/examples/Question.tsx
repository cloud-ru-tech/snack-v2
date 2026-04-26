import { QuestionTooltip } from '@ds/tooltip';

export function Question() {
  return (
    <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
      <span>API-ключ</span>
      <input type='text' name='api-key' placeholder='sk_...' />
      <QuestionTooltip tip='Строка из 32 символов. Хранится зашифрованной, видна только владельцу.' />
    </label>
  );
}
