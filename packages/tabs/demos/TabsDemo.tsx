import { Tabs } from '@ds/tabs';

import tabsDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

type DemoProps = {
  defaultValue?: string;
};

function TabsPreview(props: DemoProps) {
  return (
    <Tabs defaultValue={props.defaultValue ?? 'overview'}>
      <Tabs.TabBar>
        <Tabs.Tab value='overview' label='Overview' />
        <Tabs.Tab value='settings' label='Settings' />
        <Tabs.Tab value='billing' label='Billing' />
      </Tabs.TabBar>
      <Tabs.TabContent value='overview'>
        <div style={{ padding: '12px 0' }}>Overview content</div>
      </Tabs.TabContent>
      <Tabs.TabContent value='settings'>
        <div style={{ padding: '12px 0' }}>Settings content</div>
      </Tabs.TabContent>
      <Tabs.TabContent value='billing'>
        <div style={{ padding: '12px 0' }}>Billing content</div>
      </Tabs.TabContent>
    </Tabs>
  );
}

export function TabsDemo() {
  return (
    <Canvas
      component={TabsPreview}
      componentName='Tabs'
      componentDoc={tabsDoc.Tabs}
      defaultProps={{
        defaultValue: 'overview',
      }}
      controls={{
        defaultValue: { type: 'select', options: ['overview', 'settings', 'billing'] },
      }}
      excludeProps={['value', 'onChange', 'children']}
    />
  );
}
