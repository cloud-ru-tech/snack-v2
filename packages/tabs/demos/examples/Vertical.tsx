import { ORIENTATION, Tabs } from '@ds/tabs';

export function Vertical() {
  return (
    <Tabs defaultValue='a' orientation={ORIENTATION.Vertical}>
      <Tabs.TabBar>
        <Tabs.Tab value='a' label='Профиль' />
        <Tabs.Tab value='b' label='Безопасность' />
      </Tabs.TabBar>
    </Tabs>
  );
}
