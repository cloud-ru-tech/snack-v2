import { Tabs } from '@ds/tabs';

export function Disabled() {
  return (
    <Tabs defaultValue='a'>
      <Tabs.TabBar>
        <Tabs.Tab value='a' label='Активен' />
        <Tabs.Tab value='b' label='Выключен' disabled />
      </Tabs.TabBar>
    </Tabs>
  );
}
