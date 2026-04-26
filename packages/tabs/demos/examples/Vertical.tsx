import { ORIENTATION, Tabs } from '@ds/tabs';

export function Vertical() {
  return (
    <Tabs defaultValue='a'>
      <Tabs.TabBar orientation={ORIENTATION.Vertical}>
        <Tabs.Tab value='a' label='Профиль' />
        <Tabs.Tab value='b' label='Безопасность' />
      </Tabs.TabBar>
    </Tabs>
  );
}
