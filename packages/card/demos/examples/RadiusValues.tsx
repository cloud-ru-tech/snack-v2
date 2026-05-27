import { Card, RADIUS, VIEW } from '@ds/card';

export function RadiusValues() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Card view={VIEW.Outline} radius={RADIUS.S}>
        <div style={{ padding: 8 }}>radius S</div>
      </Card>
      <Card view={VIEW.Outline} radius={RADIUS.M}>
        <div style={{ padding: 8 }}>radius M</div>
      </Card>
      <Card view={VIEW.Outline} radius={RADIUS.L}>
        <div style={{ padding: 8 }}>radius L</div>
      </Card>
    </div>
  );
}
