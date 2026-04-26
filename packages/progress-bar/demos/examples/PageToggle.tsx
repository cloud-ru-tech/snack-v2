import { ProgressBarPage } from '@ds/progress-bar';
import { useState } from 'react';

export function PageToggle() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <ProgressBarPage inProgress={loading} />
      <button type='button' onClick={() => setLoading(v => !v)}>
        {loading ? 'Stop' : 'Start'} loading
      </button>
    </>
  );
}
