// @vitest-environment node
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { useDataPersist } from '../src/hooks/useDataPersist';

describe('useDataPersist outside the browser', () => {
  it('should ignore unavailable browser sources', () => {
    function Probe() {
      const { getDefaultData, setDataToStorages } = useDataPersist({
        options: {
          queryKey: 'filters',
          localStorageKey: 'orders_filter',
          storages: ['queryParams', 'sessionStorage', 'localStorage'],
          validateData: (value): value is string => typeof value === 'string',
        },
      });
      setDataToStorages('orders');
      return <span>{getDefaultData() ?? 'initial'}</span>;
    }
    expect(renderToString(<Probe />)).toBe('<span>initial</span>');
  });
});
