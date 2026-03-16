import { Tabs } from '@design-system/tabs';

export function TabsBasicExample() {
  return (
    <Tabs defaultValue='tab1'>
      <Tabs.TabBar>
        <Tabs.Tab label='Вкладка 1' value='tab1' />
        <Tabs.Tab label='Вкладка 2' value='tab2' />
        <Tabs.Tab label='Вкладка 3' value='tab3' />
      </Tabs.TabBar>
      <Tabs.TabContent value='tab1'>Контент вкладки 1</Tabs.TabContent>
      <Tabs.TabContent value='tab2'>Контент вкладки 2</Tabs.TabContent>
      <Tabs.TabContent value='tab3'>Контент вкладки 3</Tabs.TabContent>
    </Tabs>
  );
}
