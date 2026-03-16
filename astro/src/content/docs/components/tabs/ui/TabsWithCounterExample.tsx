import { Tabs } from '@design-system/tabs';

export function TabsWithCounterExample() {
  return (
    <Tabs defaultValue='all'>
      <Tabs.TabBar>
        <Tabs.Tab label='Все' value='all' counter={{ label: 12 }} />
        <Tabs.Tab label='Новые' value='new' counter={{ label: 3 }} />
        <Tabs.Tab label='В работе' value='progress' counter={{ label: 5 }} />
        <Tabs.Tab label='Архив' value='archive' disabled />
      </Tabs.TabBar>
      <Tabs.TabContent value='all'>Список всех элементов</Tabs.TabContent>
      <Tabs.TabContent value='new'>Новые элементы</Tabs.TabContent>
      <Tabs.TabContent value='progress'>Элементы в работе</Tabs.TabContent>
      <Tabs.TabContent value='archive'>Архив</Tabs.TabContent>
    </Tabs>
  );
}
