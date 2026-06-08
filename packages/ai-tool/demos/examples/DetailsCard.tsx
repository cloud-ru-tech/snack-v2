import { AiToolDetails, AiToolText } from '@ds/ai-tool';

export function DetailsCard() {
  return (
    <AiToolDetails label='create_instance' state='default'>
      <AiToolText mono>{`{ "region": "ru-central1", "status": "ok" }`}</AiToolText>
    </AiToolDetails>
  );
}
