import { Tabs, VARIANT } from '@ds/tabs';

export function Primary() {
  return (
    <Tabs defaultValue='a'>
      <Tabs.TabBar variant={VARIANT.Primary}>
        <Tabs.Tab value='a' label='Первая' />
        <Tabs.Tab value='b' label='Вторая' />
      </Tabs.TabBar>
    </Tabs>
  );
}
