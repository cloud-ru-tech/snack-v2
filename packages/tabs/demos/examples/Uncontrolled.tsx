import { Tabs } from '@ds/tabs';

export function Uncontrolled() {
  return (
    <Tabs defaultValue='a'>
      <Tabs.TabBar>
        <Tabs.Tab value='a' label='Alpha' />
        <Tabs.Tab value='b' label='Beta' />
      </Tabs.TabBar>
      <Tabs.TabContent value='a'>Alpha content</Tabs.TabContent>
      <Tabs.TabContent value='b'>Beta content</Tabs.TabContent>
    </Tabs>
  );
}
