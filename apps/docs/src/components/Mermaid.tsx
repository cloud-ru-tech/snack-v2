import mermaid from 'mermaid';
import { useEffect, useId, useRef, useState } from 'react';

import styles from './Mermaid.module.scss';

type MermaidProps = {
  chart: string;
};

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'strict',
      fontFamily: 'inherit',
    });

    mermaid
      .render(`mermaid-${id}`, chart.trim())
      .then(({ svg, bindFunctions }) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = svg;
        bindFunctions?.(containerRef.current);
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className={styles.root}>
        <p className={styles.error}>Не удалось отрисовать диаграмму: {error}</p>
      </div>
    );
  }

  return <div ref={containerRef} className={styles.root} aria-busy={true} />;
}
