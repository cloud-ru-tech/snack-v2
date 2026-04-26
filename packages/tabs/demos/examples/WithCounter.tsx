import { Tabs } from '@ds/tabs';

export function WithCounter() {
  return (
    <Tabs defaultValue='inbox'>
      <Tabs.TabBar>
        <Tabs.Tab value='inbox' label='Входящие' counter={{ label: 12 }} />
        <Tabs.Tab value='archive' label='Архив' />
      </Tabs.TabBar>
    </Tabs>
  );
}
