import { Button } from '@ds/button';
import { UpdateSVG } from '@ds/icons/interface/system';
import { SimpleTable } from '@ds/table';
import { useState } from 'react';

import { PRESET_USERS, presetUserColumns } from '../../presetFixtures';
import { TEST_IDS } from '../../testIds';

export function EmptyStateRefresh() {
  const [data, setData] = useState<typeof PRESET_USERS>([]);

  return (
    <SimpleTable
      data={data}
      columns={presetUserColumns}
      getRowId={user => user.id}
      fullWidth
      noDataState={{
        title: 'No data',
        content: 'Refresh to load the list of users',
        footer: (
          <Button
            label='Обновить'
            appearance='neutral'
            view='function'
            size='m'
            icon={<UpdateSVG />}
            iconPosition='after'
            onClick={() => setData(PRESET_USERS)}
          />
        ),
      }}
      data-test-id={TEST_IDS.table.root}
    />
  );
}
