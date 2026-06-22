import { AiFieldNotice, SIZE, VARIANT } from '@ds/ai-field-notice';

export function Password() {
  return <AiFieldNotice size={SIZE.S} variant={VARIANT.Password} onActionClick={() => undefined} />;
}
