import { SIZE, Tabs } from '@ds/tabs';

export function SizeL() {
  return (
    <Tabs defaultValue='a'>
      <Tabs.TabBar size={SIZE.L}>
        <Tabs.Tab value='a' label='Первая' />
        <Tabs.Tab value='b' label='Вторая' />
      </Tabs.TabBar>
    </Tabs>
  );
}
