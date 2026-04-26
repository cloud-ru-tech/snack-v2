import { Tabs } from '@ds/tabs';

export function WithContent() {
  return (
    <Tabs defaultValue='a'>
      <Tabs.TabBar>
        <Tabs.Tab value='a' label='Первая' />
        <Tabs.Tab value='b' label='Вторая' />
      </Tabs.TabBar>
      <Tabs.TabContent value='a'>
        <div style={{ padding: '12px 0' }}>Контент первого таба</div>
      </Tabs.TabContent>
      <Tabs.TabContent value='b'>
        <div style={{ padding: '12px 0' }}>Контент второго таба</div>
      </Tabs.TabContent>
    </Tabs>
  );
}
