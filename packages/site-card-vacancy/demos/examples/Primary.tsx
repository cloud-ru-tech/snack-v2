import { APPEARANCE, CardVacancy } from '@ds/site-card-vacancy';

export function Primary() {
  return (
    <CardVacancy
      href='#lead'
      appearance={APPEARANCE.Primary}
      title='Lead Product Designer'
      description='Hybrid · Full-time'
    />
  );
}
