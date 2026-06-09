import { APPEARANCE, CardVacancy } from '@ds/site-card-vacancy';

export function Mobile() {
  return (
    <CardVacancy
      href='#mobile'
      mobile
      appearance={APPEARANCE.Primary}
      title='Backend Engineer'
      description='Remote · Contract'
    />
  );
}
