import { Card, VIEW } from '@ds/card';

export function ViewValues() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Card view={VIEW.Simple}>
        <div style={{ padding: 8 }}>simple</div>
      </Card>
      <Card view={VIEW.Outline}>
        <div style={{ padding: 8 }}>outline</div>
      </Card>
      <Card view={VIEW.Shadow}>
        <div style={{ padding: 8 }}>shadow</div>
      </Card>
    </div>
  );
}
