import { AiToolDetails, AiToolText } from '@ds/ai-tool';

const DETAILS_CONTENT = '{ "region": "ru-central1", "status": "ok" }';

export function DetailsCard() {
  return (
    <AiToolDetails label='create_instance' state='default' height='large' copyValue={DETAILS_CONTENT}>
      <AiToolText mono>{DETAILS_CONTENT}</AiToolText>
    </AiToolDetails>
  );
}
