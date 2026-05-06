import { Card, RADIUS, VIEW } from '@ds/card';

export function RadiusValues() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Card view={VIEW.Outline} radius={RADIUS.S}>
        radius S
      </Card>
      <Card view={VIEW.Outline} radius={RADIUS.M}>
        radius M
      </Card>
      <Card view={VIEW.Outline} radius={RADIUS.L}>
        radius L
      </Card>
    </div>
  );
}
