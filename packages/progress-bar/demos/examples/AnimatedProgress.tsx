import { ProgressBar } from '@ds/progress-bar';
import { useEffect, useState } from 'react';

export function AnimatedProgress() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setValue(prev => (prev >= 100 ? 0 : prev + 5));
    }, 400);
    return () => clearInterval(id);
  }, []);

  return <ProgressBar progress={value} />;
}
