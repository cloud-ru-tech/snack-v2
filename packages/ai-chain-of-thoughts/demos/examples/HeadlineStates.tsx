import { AiChainOfThoughtsHeadline } from '@ds/ai-chain-of-thoughts';

export function HeadlineStates() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <AiChainOfThoughtsHeadline inProgress duration={31568949} />
      <AiChainOfThoughtsHeadline inProgress={false} duration={31568949} />
    </div>
  );
}
