import { AiButtonControls, DIRECTION } from '@ds/ai-button-controls';
import { useState } from 'react';

const SLIDES = ['Первый', 'Второй', 'Третий', 'Четвёртый'];

export function Carousel() {
  const [index, setIndex] = useState(0);
  const isFirst = index === 0;
  const isLast = index === SLIDES.length - 1;

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiButtonControls direction={DIRECTION.Left} disabled={isFirst} onClick={() => setIndex(prev => prev - 1)} />
      <span>{SLIDES[index]}</span>
      <AiButtonControls direction={DIRECTION.Right} disabled={isLast} onClick={() => setIndex(prev => prev + 1)} />
    </div>
  );
}
