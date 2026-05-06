import { Card } from '@ds/card';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';

export function BackgroundFills() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Card backgroundPredefined={BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level}>neutralBackground1Level</Card>
      <Card backgroundPredefined={BACKGROUND_PREDEFINED_FILL.PrimaryBackground}>primaryBackground</Card>
      <Card backgroundPredefined={BACKGROUND_PREDEFINED_FILL.VioletBackground}>violetBackground</Card>
    </div>
  );
}
