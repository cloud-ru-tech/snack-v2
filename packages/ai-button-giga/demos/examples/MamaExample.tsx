import { AiButtonGigaMama } from '@ds/ai-button-giga';
import { useState } from 'react';
export function MamaExample() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setCount(previous => previous + 1);
    setLoading(true);
  }
  function handleComplete() {
    setLoading(false);
  }
  return (
    <div>
      <AiButtonGigaMama label='Создать ресурс' loading={loading} onClick={handleClick} />
      <button type='button' onClick={handleComplete} disabled={!loading}>
        Завершить загрузку
      </button>
      <p role='status'>Количество запусков: {count}.</p>
    </div>
  );
}
