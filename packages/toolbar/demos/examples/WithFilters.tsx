import { Toolbar } from '@ds/toolbar';
import { useState } from 'react';

export function WithFilters() {
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [filterValue, setFilterValue] = useState<Record<string, unknown>>({});

  return (
    <div style={{ width: '100%', maxWidth: 720 }}>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
        onRefresh={() => setSearch('')}
        filterRow={{
          open: filtersOpen,
          onOpenChange: setFiltersOpen,
          value: filterValue,
          onChange: setFilterValue,
          filters: [
            {
              id: 'status',
              type: 'single',
              label: 'Статус',
              options: [
                { value: 'active', label: 'Активные' },
                { value: 'archived', label: 'Архив' },
              ],
            },
          ],
          defaultValue: {},
        }}
      />
    </div>
  );
}
