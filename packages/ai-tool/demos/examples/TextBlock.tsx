import { AiToolText } from '@ds/ai-tool';

export function TextBlock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <AiToolText>Обычный текст результата</AiToolText>
      <AiToolText mono>{`{ "status": "ok" }`}</AiToolText>
      <AiToolText error>Ошибка выполнения инструмента</AiToolText>
      <AiToolText mono error>{`{ "error": "timeout" }`}</AiToolText>
    </div>
  );
}
