import { Table } from '@ds/table';
import { Meta } from '@storybook/react';

import { withTableStorySurface } from '../../decorators';

/** Общие meta для Table examples: fullscreen + синхронизация acrylic-подложки story с sticky chrome на mobile. */
export const tableExampleMeta = {
  component: Table,
  parameters: { layout: 'fullscreen' },
  decorators: [withTableStorySurface],
} satisfies Partial<Meta<typeof Table>>;
