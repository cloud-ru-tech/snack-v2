import { Card, VIEW } from '@ds/card';

export function ViewValues() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Card view={VIEW.Simple}>simple</Card>
      <Card view={VIEW.Outline}>outline</Card>
      <Card view={VIEW.Shadow}>shadow</Card>
    </div>
  );
}
