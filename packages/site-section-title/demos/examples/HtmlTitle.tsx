import { SectionTitle } from '@ds/site-section-title';

export function HtmlTitle() {
  return (
    <SectionTitle
      type='descriptionUnderTitle'
      title='Облако для <a href="#">бизнеса</a>'
      description='Строки из CMS могут содержать <strong>HTML-разметку</strong>.'
    />
  );
}
