import { PortalContextProvider, usePortalContext } from '@ds/portal-context';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

function PortalChild() {
  const root = usePortalContext();

  if (!root.current) return null;

  return createPortal(<span>Я отрендерен в кастомном root-узле через PortalContext</span>, root.current);
}

export function CustomRoot() {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const root = useMemo(() => ({ current: node }), [node]);

  return (
    <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
      <PortalContextProvider root={root}>
        <span>Хост-компонент</span>
        <PortalChild />
      </PortalContextProvider>
      <div ref={setNode} data-test-id='portal-root' />
    </div>
  );
}
